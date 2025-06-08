import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { io } from 'socket.io-client';

const SAVE_INTERVAL_MS = 2000;
const TOOLBAR_OPTIONS = [['bold', 'italic'], ['code-block']];

export default function Editor() {
  const wrapperRef = useRef();
  const socketRef = useRef();
  const quillRef = useRef();

  useEffect(() => {
    socketRef.current = io('http://localhost:3001');
    const editor = document.createElement('div');
    wrapperRef.current.append(editor);
    const q = new Quill(editor, { theme: 'snow', modules: { toolbar: TOOLBAR_OPTIONS } });
    q.disable();
    q.setText('Loading...');
    quillRef.current = q;

    socketRef.current.once('load-document', document => {
      q.setContents(document);
      q.enable();
    });

    socketRef.current.emit('get-document', 'doc1');

    const handler = delta => q.updateContents(delta);
    socketRef.current.on('receive-changes', handler);

    q.on('text-change', (delta, oldDelta, source) => {
      if (source !== 'user') return;
      socketRef.current.emit('send-changes', delta);
    });

    const interval = setInterval(() => {
      socketRef.current.emit('save-document', q.getContents());
    }, SAVE_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      socketRef.current.disconnect();
    };
  }, []);

  return <div ref={wrapperRef} style={{ height: '100vh' }} />;
}
