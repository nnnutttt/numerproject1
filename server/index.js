const express  = require( "express");
const cors  = require ("cors");
const mysql  = require ("mysql2");

const swaggerUi = require("swagger-ui-express");  // swagger ติดต่อหลังบ้าน
const swaggerFile = require("./swagger.json"); 

const jwt = require("jsonwebtoken")

const App = express()
App.use(cors())
App.use(express.json())

const secretKeys = "tk"


/* const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"thagkwar783",
    database:"inputlinear_re"
}) */

//docker
const db = mysql.createPool({  //creatpool = สร้างคอนเนคชั่นว่าจะติดต่อ db ...
  host: process.env.DB_HOST || "172.17.0.3",
  user: process.env.DB_USER || "root",
  password:process.env.DB_PASSWORD || "thagkwar783",
  database: process.env.DB_NAME || "inputlinear_re",
});

App.get("/gettoken/:name", (req, res) => {
    console.log(req.params.name);
    const token = jwt.sign({ user: req.params.name }, secretKeys);  //jwt = json web token, .sign = ทำให้เป็นลายเซ็น
    console.log("get token successfully");
    res.send(token);
  });

App.get("/getalldata", authorization, (req, res)=>{
    const q = `SELECT * FROM lineardata`
    db.query(q, (err, data)=>{
        if(err) return res.send(err)
        console.log(data)
        res.send(data)
    })
})

App.get("/linear", (req, res)=>{
  const q = `SELECT * FROM lineardata`
  db.query(q, (err, data)=>{
      if(err) return res.send(err)
      console.log(data)
      res.send(data)
  })
})

App.post("/getdata", authorization, (req, res)=>{
    console.log(req.body)
    const q = `SELECT * FROM lineardata WHERE num = ${req.body.num}`
    console.log(q)
    db.query(q, (err, data)=>{
        if(err) return res.send(err)
        console.log(data)
        res.send(data)
    })
})

App.post("/insertdata", (req, res)=>{
    let d = JSON.stringify(req.body)
    console.log(d)
    const q = `SELECT * FROM lineardata WHERE alldata='${d}'`
    //console.log(q)
    console.log(req.body.x)
    db.query(q, (err, data)=>{
        if(err) return res.send(err)
        //console.log(data)
        if(data.length > 0){
            console.log("have data")
            res.send("have data")
        }
        else{
            console.log("no have data")
            const q1 = `INSERT INTO lineardata(alldata, num) VALUES(?, ?)`;
            db.query(q1, [d, req.body.numgen], (err)=>{
                if(err) return res.send(err)
                console.log("add data success")
            })
        }
    })
})

App.get("/", (req, res)=>{
    console.log("1111")
    res.send("222")
})

function authorization(req, res, next) {  
    let token = req.headers["authorization"];  //token ส่งผ่าน headers
    console.log(req.headers)
    console.log(token)
    if (token === undefined) {
      res.send("don't have authorization");
    } else {
      try {
        // console.log(token1 = ${token});
        token = token.split(" ")[1];
        console.log(token);
        let decode = jwt.verify(token, secretKeys);
        console.log(decode);  //user: 'tk', iat: 1681306545
        if (decode.user === "tk") {
          next();
        } else {
          res.send("pls authen");
        }
      } catch {
        res.send("no correct");
      }
    }
  }

App.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));  //setup = set file

App.listen(4000, ()=>{
    console.log("connect port")
})

module.exports = App