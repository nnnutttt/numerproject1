import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const Cramer1=()=> {
    var A = [], B = [], X, matrixA = [], matrixB = [], output = []
    const[R,setr]= useState(0)
    const[C,setc] = useState(0)
    const[matrix,setmat] = useState();
    const givenmat = [];

    const createMatrix=(row, column)=>{
        matrixA = []
        matrixB = []
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                matrixA.push(
                <input type='number' placeholder={"a" + i + "" + j} style={{margin:10}} />
                )}
            matrixA.push(<br />)
            matrixB.push(
            <div>
            <input type='number' style={{margin:10}} />
            </div>
            )}
            givenmat.push({ matrixA, matrixB });
    }

    const result = () => {
        console.log(givenmat);
        return (
            <div>

            <div>
                <h3>Matrix[A]</h3>
            {givenmat.map((data) => (
            <div style={{ display: "block" }}>
                <div>{data.matrixA}</div>
            </div>
            ))}
            </div>

            <div>
                <h3>Vector B</h3>
            {givenmat.map((data) => (
            <div style={{ display: "block" }}>
                <div>{data.matrixB}</div>
            </div>
            ))}
            </div>

            {/* <Button
            onClick={() => this.gauss(this.state.row)}>
            Submit
            </Button> */}
      
      </div>
        );
      };

    const inputR =(event)=>{
        setr(event.target.value)
        console.log(event.target.value)
    }
    const inputC =(event)=>{
        setc(event.target.value)
        console.log(event.target.value)
    }
    const inputnum=()=>{
        createMatrix(R,C)
        setmat(result());

    }
    return (
    <div style={{textAlign:'center'}}>
        <div>
        <label style={{margin:10}}>Row</label><input type='number' onChange={inputR}></input>
        <label style={{margin:10}}>Column</label><input type='number' onChange={inputC}></input><br></br>
        <Button onClick={inputnum}> Create</Button> <br></br><br></br>
        </div>

        <div>
        {matrix}             
        </div>
    </div>

  );
};
export default Cramer1