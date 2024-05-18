const todosRouter = require('express').Router();
const pool = require('../modules/pool');
const pg = require('pg')


// GET 
todosRouter.get('/', (req, res) => {
    let queryText = `SELECT * FROM "todos" ORDER BY "task";` 
    res.sendStatus(200)
})



//POST
todosRouter.post('/', (req, res) => {
    res.sendStatus(201)
})



//PUT 






//DELETE




module.exports = todosRouter;
