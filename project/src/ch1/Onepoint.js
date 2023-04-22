import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { Line } from "react-chartjs-2";

const Onepoint =()=>{
    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueX0, setValueX0] = useState([]);
    const [valueX1, setValueX1] = useState([]);
        
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("x-(7^(1/2))")
    const [X,setX] = useState(0)
    const [X0,setX0] = useState(0)
    const [X1,setX1] = useState(0)


    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputX0 = (event) =>{
        console.log(event.target.value)
        setX0(event.target.value)
        console.log("x0 = ", X0)
    }

    const calculateRoot = () =>{
        const x0num = parseFloat(X0)
        Calonepoint(x0num);
     
        setHtml(print());
           
        console.log(valueIter)
        console.log(valueX0)
    }


    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueX0(data.map((x)=>x.X0));
        setValueX1(data.map((x)=>x.X1));
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
                            <th style={{width: 100}}>Xi</th>
                            <th style={{width: 500}}>Xi+1</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.X0}</td>
                                <td>{element.X1}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <Line data={{
                        labels: valueIter,
                        datasets: [
                        {
                            label: "Xi",
                            data: valueX0,
                            backgroundColor: "rgba(75,192,192,0.2)",
                            borderColor: "rgba(75,192,192,1)"
                        },
                        {
                            label: "Xi+1",
                            data: valueX1,
                            backgroundColor: "rgba(75,192,192,0.2)",
                            borderColor: "rgba(255, 99, 132, 0.5)"
                        },
                        ]
                }}></Line>
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const Calonepoint = (x0) => {
        var x1,fX1,ea;
        var iter = 0;
        var MAXiter = 50;
        const e = 0.000001;
        var obj={};
        do
        {
            fX1 = evaluate(Equation, {x:x0})
            x1 = fX1;
            
            iter ++;
            ea = error(x0, x1);
            obj = {
                iteration:iter,
                X0:x0,
                X1:x1,
            }
            data.push(obj)
            x0 = x1;
        }while(ea>e && iter<MAXiter)
        setX(x1)
    }

    const Clear = () =>{
        setEquation("");
        setX0(0);
    }

    return (
            <Form className="ipinput">
                <h1>One-point Iteration</h1>
                <Form.Label>Input f(x)</Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:10}} className="form-control"></input>
                <Form.Label>Input X</Form.Label>
                    <input type="number" id="Xi" onChange={inputX0} style={{width:"5%", margin:10}} className="form-control"></input>
                <br/>
                <Button onClick={calculateRoot}>Calculate</Button>
                <Button type = "reset" onClick={Clear} style={{margin:10, backgroundColor: "#ccff66", borderColor: "#ccff66"}}>Clear</Button>
                <Container>
                    {html}
                </Container>
            </Form>
    )
}

export default Onepoint