const express = require('express');
const app = express();

const todosRouter = require('./routes/todos.router.js');


let PORT = process.env.PORT || 5000;

// Do not modify this!
if (process.env.NODE_ENV == 'test') {
  PORT = 5002;
}

app.use(express.json());
app.use(express.static('./server/public'));


app.use(express.urlencoded({extended: true}))

app.use('/todos', todosRouter);

app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});
