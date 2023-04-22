import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { create, derivative, elementaryChargeDependencies, evaluate, index } from 'mathjs'
import ReactDOM from 'react-dom/client';

const Cramer =()=>{
    var A = [], B = [];
    const givenmat = [];
    const [m, setM] = useState(0)
    const [n, setN] = useState(0)
    const [matrix, setMatrix] = useState()



    const inputM = (event) =>{
        setM(event.target.value)
        console.log(event.target.value)
    }

    const inputN = (event) =>{
        setN(event.target.value)
        console.log(event.target.value)
    }

    const inputMatrix =()=>{
        createMatrix(m, n)
        setMatrix(result());
    }

    const ClearCreateMatrix = () =>{
        setM(0);
        setN(0);
    }

    /* const ClearMatrix = () =>{
        A = [0];
        B = [0];
    } */
    
    const createMatrix = (m, n) =>{
        for(let i=0;i<m;i++){
            for(let j=0;j<n;j++){
                A.push(<input type="number" style={{width:"5%", marginLeft:10}}/>)
            }
            A.push(<br/>)
            B.push(<input type="number" style={{width:"5%", margin:10}}/>, <br/>)
        }
        givenmat.push({A, B})
    }

    const result=()=>{
        return(
            <div>
                
                <div>
                    {givenmat.map((data)=>(
                        <div style={{display: "block", flexDirection:"row"}}>
                            <br/>
                            <h4>A</h4>
                            <div>{data.A}</div>

                            <br/>
                            <h4>B</h4>
                            <div>{data.B}</div>
                    </div>
                    ))}
                </div>
                {/* <Button type = "reset" onClick={ClearMatrix} style={{margin:10, backgroundColor: "#ccff66", borderColor: "#ccff66"}}>Clear</Button> */}
                <Button>Calculate</Button>
            </div>
        );
    }
    
    const CalCramer=()=>{

    }
    
    return (
        <Form className="ipinput">
            <h1>Cramer Rule</h1>
            <Form.Label>Input row</Form.Label>
                <input type="number" id="m" onChange={inputM} style={{width:"5%", margin:10}} className="form-control"></input>
            <Form.Label>Input column</Form.Label>
                <input type="number" id="n" onChange={inputN} style={{width:"5%", margin:10}} className="form-control"></input>
                <br/>
                
                <Button onClick={inputMatrix}>Create Matrix</Button>
                <Button type = "reset" onClick={ClearCreateMatrix} style={{margin:10, backgroundColor: "#ccff66", borderColor: "#ccff66"}}>Clear</Button>
                <br/>
                <div className="matrix">
                    {matrix}
                </div>
        </Form>
    ) 
}

export default Cramer