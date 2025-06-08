const express = require('express');
const mongoose = require('mongoose');
const Document = require('./models/Document');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST'] }
});

mongoose.connect('mongodb://localhost:27017/docs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

io.on('connection', socket => {
  socket.on('get-document', async documentId => {
    const document = await Document.findById(documentId) || await Document.create({ _id: documentId, data: '' });
    socket.join(documentId);
    socket.emit('load-document', document.data);

    socket.on('send-changes', delta => {
      socket.broadcast.to(documentId).emit('receive-changes', delta);
    });

    socket.on('save-document', async data => {
      await Document.findByIdAndUpdate(documentId, { data });
    });
  });
});

http.listen(3001, () => {
  console.log('Server running on port 3001');
});
