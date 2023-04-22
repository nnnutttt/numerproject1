import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { pow, inv, multiply, sum } from 'mathjs';
import { Line } from 'react-chartjs-2';
import axios from "axios"
import { CalLinear } from './callinear';

const LinearRegression=()=> {
    var x=[], fx=[], mA=[], mAinv=[], mB=[], mX=[], gx=[];
    var inputx=[], inputfx=[];
    var outputA=[];

    const givenprob = [];
    const [A, setA] = useState([])
    const [probtable, setProbtable] = useState()
    let n = 0;

    const [token, setToken] = useState()

    const inputN=(event)=>{
        console.log(event.target.value)
        n = parseFloat(event.target.value)
        createTable(n);
        setProbtable(result_problem());

    }
    
    const createTable=(n)=>{
        console.log(n)
        for(let i=0;i<n;i++){
            inputx.push(<div><input type='number' id={"x" + i} ></input></div>)
            inputfx.push(<div><input type='number' id={"fx" + i} ></input></div>)
        }
        givenprob.push({inputx, inputfx})
    }
    
    const result_problem=()=>{
        console.log(givenprob)
        return(
            <div>
                <div>
                    {givenprob.map((data)=>(
                        <div style={{display: "inline-flex"}}>
                            <br/>
                            <h4>X</h4>
                            <div>{data.inputx}</div>
    
                            <h4>f(x)</h4>
                            <div>{data.inputfx}</div>
                        </div>
                    ))}
                </div>
                
                <br/>
                <Button onClick={Example}>Example</Button>

                <br/>
                <Button onClick={CalculateRoot}>Calculate</Button>
                
            </div>
        );
    }

    const getToken=()=>{
        let name = document.getElementById("tokenName").value
        try{
            axios.get(`http://localhost:4000/gettoken/${name}`).then((res)=>{
                console.log(res.data)
                setToken(res.data)
            })
        }catch(err){console.log(err)}
    }

    const Example =()=>{
        console.log(token)
        console.log(n)
        if(token !== undefined){
            try{
                axios.post("http://localhost:4000/getdata",{num: n}, {headers:{authorization:`T ${token}`}}).then((res)=>{
                    console.log(res.data)
                    const ran = Math.floor(Math.random()*res.data.length)
                    console.log(res.data[ran].alldata)
                    const jsons = JSON.parse(res.data[ran].alldata)
                    console.log(jsons)
                    for(let i=0;i<n;i++){
                        document.getElementById("x"+i).value = jsons.x[i]
                        document.getElementById("fx"+i).value = jsons.y[i]
                    }
                })
            }
            catch(err){console.log(err)}
        }
        else{
            alert("you must to get token")
            window.location.reload()
        }
    }

   
    
    const CalculateRoot =()=>{
        for(let i=0;i<n;i++){
            x[i] = (parseFloat(document.getElementById("x" + i).value));
            fx[i] = (parseFloat(document.getElementById("fx" + i).value));
            if(isNaN(x[i]) || isNaN(fx[i])){
                //alert("no have data")
                break
            }
        }
            console.log(x, fx)
            const {gxnew, outputAnew} = CalLinear(x, fx, n);
            gx = gxnew
            outputA = outputAnew
            console.log(gx, outputA)
            setA(printA());
            try{
                axios.post("http://localhost:4000/insertdata", {
                    numgen: n,
                    x: x,
                    y: fx
                })
            }catch(err){console.log(err)}
        
    }
    
    /* const CalLinear=(x, fx)=>{
        console.log(x, fx)

        var sumx=0, sumx2=0, sumy=0, sumxy=0;
        sumx = sum(x);
        sumy = sum(fx);
        for(let i=0;i<n;i++){
           sumx2 += pow(x[i],2);
           sumxy += x[i]*fx[i];
        }
        console.log("sumx",sumx)
        console.log("sumy = ",sumy)
        console.log("sumx2 = ",sumx2)
        console.log("sumxy = ",sumxy)

        mA = [[n, sumx],[sumx, sumx2]]
        mAinv = inv(mA)

        mB = [sumy, sumxy]
        mX = multiply(mAinv, mB)

        console.log("ma = ",mA)
        console.log("mb = ",mB)
        console.log("mx = ",mX)

        for(let i=0;i<n;i++){
            gx[i] = mX[0]+(mX[1]*x[i]);
        }
        outputA.push({mX, gx})

    } */
    
    const printA=()=>{
        return(
            <div>
                {outputA.map((data,i)=>(
                    <div key={i}>
                        <br/>
                        <h4>A{i} = {data.mX[i]}</h4>
                        <h4>A{i+1} = {data.mX[i+1]}</h4>
                    </div>
                ))}

                    <Line data={{
                        labels: x,
                        datasets: [
                        {
                            label: "g(x)",
                            data: gx,
                            borderColor: "rgba(28, 95, 73, 1)",
                            pointRadius:0,
                        },
                        {
                            type: "scatter",
                            label: "data",
                            data: fx,
                            borderColor: "blue",
                        }
                        ]                        
                }}
                
                /* options={{
                    scales:{
                        y:{
                            min:0,
                            max:800,
                        }
                    }
                }} */></Line>
            </div>
        )
    }

    return (
        <Form className='ipinput'>
        <h1>Linear Regression</h1>
        <input type='text' id='tokenName'></input>
            <Button onClick={getToken} style={{marginLeft:10}}>Get Token</Button>
        <br/><br/>
        <Form.Label style={{marginRight:10}}>input n</Form.Label>
        <input type = "number" onChange={inputN}></input>
        <br/><br/>
        <div>
            {probtable}
            {A}
        </div>
    </Form>
  )
}

export default LinearRegression