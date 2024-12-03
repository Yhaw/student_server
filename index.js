const express = require('express');
const app = express();
const port = process.env.PORT || 3030;
const {Pool} = require('pg');
const bodyParser = require('body-parser')

app.use(bodyParser.json());

const pool = new Pool({
    user:"student",
    host:"dpg-ct7ms6aj1k6c73cjrtog-a.oregon-postgres.render.com",
    database:"student_info_j27y",
    password:"qeeRJKfGGvMZKBNmT1J98fnyFEeI4v29",
    port: 5432,
    ssl: true
})

if(pool.connect()){
    console.log("Server Connected Successfully!!");
}

app.post('/create_new_student_info',async(req,res)=>{
    const {name,email,password,student_id} = req.body;

    const query = await pool.query(
        'INSERT INTO users (name , email, password, student_id) VALUES ($1 ,$2 , $3 ,$4 ) RETURNING *',
        [name,email,password, student_id]
    );

    res.status(201).json({message:"Student Information Created",info: query.rows[0]})
})

app.get('/get_students_info',async(req,res)=>{

    const query = await pool.query(
        'SELECT * FROM users ORDER BY id ASC'
    )

    res.status(200).json(query.rows);
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})