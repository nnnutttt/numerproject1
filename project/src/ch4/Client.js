import axios from 'axios';
import React, { useState } from 'react'
import {Button} from 'react-bootstrap'


const Client=()=> {
    const inputx=[], inputfx=[]
    const giventable = [];
    let n=0;

    const [tab, setTab] = useState()

    const inputN=(e)=>{
        console.log(e.target.value)
        n = parseFloat(e.target.value)
        createTable()
        setTab(result_tab())
    }

    const createTable=()=>{
        for(let i=0;i<n;i++){
            inputx.push(<div><input type='number' id={"x" + i}></input></div>)
            inputfx.push(<div><input type='number' id={"fx" + i}></input></div>)
        }
        giventable.push({inputx, inputfx})
    }

    const result_tab=()=>{
        return(
            <div>
                {giventable.map((data)=>(

                    <div style={{display: "inline-flex"}}>
                        <br/>
                        <h2>X</h2>
                        <div>{data.inputx}</div>
                        <br/>
                        <h2>f(x)</h2>
                        <div>{data.inputfx}</div>
                    </div>
                ))}
                <br/>
                <Button onClick={examplee}>Example</Button>
                
            </div>
        )
    }

    const examplee=()=>{
        try{
            axios.post("http://localhost:4040/getdata", {num: n}).then((res)=>{
                const ran = Math.floor(Math.random()*res.data.length)
                console.log(res.data[ran])
                const json = JSON.parse(res.data[ran].alldata)
                for(let i=0;i<n;i++){
                    document.getElementById("x"+i).value = json.x[i]
                    document.getElementById("fx"+i).value = json.y[i]
                }
            })
        }
        catch(err){console.log(err)}
    }

  return (
    <div>
        <h4>Linear Regression</h4>
        <h4> input n</h4>
        <input type = "number" onChange={inputN}></input>
        <br/>
        
        {tab}
    </div>
  )
}

export default Client