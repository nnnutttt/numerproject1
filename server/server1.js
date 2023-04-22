const express =  require("express")
const cors =  require("cors")
const mysql = require("mysql2")

const b = express()
b.use(cors());
b.use(express.json())

const db = mysql.createPool({
    host: "localhost",
    user:"root",
    database:"inputlinear_re"
})

b.post("/getdata", (req, res)=>{
    const q = `SELECT * FROM lineardata WHERE num = ${req.body.num}`
    db.query(q, (err, data)=>{
        if(err) return res.send(err)
        res.send(data)
        //console.log(data)
    });

})

b.get("/", (req, res)=>{
    console.log("yayy")
    res.send("ma laewww")
})

b.listen(4040, ()=>{
    console.log("port connect")
})