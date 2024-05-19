const todosRouter = require('express').Router();
const pool = require('../modules/pool');
const pg = require('pg')



// GET 
todosRouter.get('/', (req, res) => {
    let queryText = `SELECT * FROM "todos" ORDER BY "text";` 
    pool.query(queryText)
    .then((result)=>{
        res.send(result.rows)
    })
    .catch((err)=>{
        console.error('Error getting tasks', err)
        res.sendStatus(500)
    })
})




//POST
todosRouter.post('/', (req, res) => {
    let newTask = req.body
    console.log('Adding task', newTask);
    let taskArray = [newTask.text, newTask.isComplete]
    console.log('Adding task', taskArray)

    let queryText = `

    INSERT INTO "todos" ("text", "isComplete")

    VALUES ($1, $2);
    `
    pool.query(queryText, taskArray)
        .then((result)=>{
            res.sendStatus(201)
        })
        .catch((err)=>{
            console.error('Error adding task', err)
            res.sendStatus(500)
        })
})



//PUT 
todosRouter.put('/complete/:id', (req, res)=>{
    let taskId = req.params.id
    let isReady = req.body.isComplete
    // console.log("req.body", req.body)
// console.log("is ready?" , isReady)
// console.log("koala id", koalaId)
    let queryText = ''

    if (isReady === true){
        queryText = `
        UPDATE "todos" SET "isComplete"=true
        WHERE "id"=$1;
        `;
    } 
    else if(isReady === false){
        queryText = `
        UPDATE "todos" SET "isComplete"=false
        WHERE "id"=$1;
        `;
    }    
    else {
        res.sendStatus(500)
        console.error('Trouble marking as ready')
    }

    pool.query(queryText, [taskId])
        .then(()=>{
            res.sendStatus(204)
        })
        .catch((err)=>{
            console.log(`Error making query ${queryText}`, err)
            res.sendStatus(500)
        })
})



//DELETE

todosRouter.delete('/:id', (req,res)=>{
    console.log("req params", req.params)

    let taskId = req.params.id
    let queryText = `
    DELETE FROM "todos" WHERE "id"=$1;
    `
    pool.query(queryText, [taskId])
        .then(()=>{
            res.sendStatus(200)
        })
        .catch((err)=>{
            console.error(`Error making query ${queryText}`, err)
            res.sendStatus(500)
        })
})


module.exports = todosRouter;
