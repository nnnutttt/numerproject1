import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { derivative, evaluate, factorial, pow} from 'mathjs'
import { Typography } from "antd";
import { Line } from "react-chartjs-2";

const Taylor =()=>{
    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueA, setValueA] = useState([]);
    const [valueX0, setValueX0] = useState([]);
    const [valueN, setValueN] = useState([]);
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("x-(7^(1/2))")
    const [X,setX] = useState(0)
    const [A,setA] = useState(0)
    const [X0,setX0] = useState(0)
    const [N,setN] = useState(0)

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }
    const inputA = (event) =>{
        console.log(event.target.value)
        setA(event.target.value)
    }
    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
    }
    const inputN = (event) =>{
        console.log(event.target.value)
        setN(event.target.value)
    }


    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueA(data.map((x)=>x.A));
        setValueX0(data.map((x)=>x.X0));
        setValueN(data.map((x)=>x.N));
        return(
            <Container>
                <h5 
                    style={{
                        color: "red", 
                        fontSize: 20,
                        fontFamily: "Arial"
                    }}>Answer = {X.toPrecision(7)}</h5>
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th style={{width: 650}}>Iteration</th>
                            <th style={{width: 100}}>f(Xi)</th>
                            <th style={{width: 500}}>f(Xi+1)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.A}</td>
                                <td>{element.X0}</td>
                                <td>{element.N}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <Line data={{
                        labels: valueIter,
                        datasets: [
                        {
                            label: "f(Xi)",
                            data: valueX0,
                            backgroundColor: "rgba(75,192,192,0.2)",
                            borderColor: "rgba(75,192,192,1)"
                        },
                        {
                            label: "f(Xi+1)",
                            data: valueA,
                            backgroundColor: "rgba(75,192,192,0.2)",
                            borderColor: "rgba(255, 99, 132, 0.5)"
                        },
                        ]
                }}></Line>
            </Container>
           
        );
    }

    const error =(xreal, xcal)=> Math.abs((xreal-xcal)/xreal)*100;
   
    const Caltaylor = (x,x0,n) => {
        var fx0,d,ea,fx;
        var ans = 0;
        var maxiter = 50
        var fxd, fxi;
        const e = 0.000001;
        var i=0
        var obj = {}
        do{
            if(i>0){
                d = derivative(Equation, 'x').toString();
                fxd = evaluate(d, {x:x0});
                ans += (pow((x-x0),i)/factorial(i))*fxd;
                i++;
            }
            else if(i === 0){
                
                fx0 = evaluate(Equation, {x:x0})
                ans += fx0
                fx = Equation
                i++;
            }
            fx = evaluate(Equation, {x:x})
            obj = {
                iteration:i,
                A:fx,
                X0:ans,
            }
            data.push(obj)
            //fxi = fxd;
            
            ea = error(fx, fxi);
        }while(ea>e && i<n)
        setX(ans)
    }

    const calculateRoot = () =>{
        const a = parseFloat(A)  
        const x0 = parseFloat(X0) 
        const n = parseFloat(N) 
        Caltaylor(a,x0,n);
     
        setHtml(print());
           
        console.log(valueIter)
        console.log(valueX0)
        console.log(valueA)
        console.log(valueN)
    }

    const Clear = () =>{
        setEquation("");
        setX(0);
        setX0(0);
        setN(0);
    }

    return (
            <Form className="ipinput">
                <h1>Taylor series</h1>
                <Form.Label>Input f(x)</Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:10}} className="form-control"></input>
                <Form.Label>Input X</Form.Label>
                    <input type="number" id="A" onChange={inputA} style={{width:"5%", margin:10}} className="form-control"></input>
                <Form.Label>Input X0</Form.Label>
                    <input type="number" id="X0" onChange={inputX0} style={{width:"5%", margin:10}} className="form-control"></input>
                <Form.Label>Input N</Form.Label>
                    <input type="number" id="N" onChange={inputN} style={{width:"5%", margin:10}} className="form-control"></input>
                <br/>
                <Button onClick={calculateRoot}>Calculate</Button>
                <Button type = "reset" onClick={Clear} style={{margin:10, backgroundColor: "#ccff66", borderColor: "#ccff66"}}>Clear</Button>
                <Container>
                    {html}
                </Container>
            </Form>
    )
}
export default Taylor