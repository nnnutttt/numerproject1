import { useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { Line } from "react-chartjs-2";

const Falseposition =()=>{

    const data =[];
    const [valueIter, setValueIter] = useState([]);
    const [valueXl, setValueXl] = useState([]);
    const [valueX1, setValueX1] = useState([]);
    const [valueXr, setValueXr] = useState([]);
     
   
    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("x-(7^(1/2))")
    const [X,setX] = useState(0)
    const [XL,setXL] = useState(0)
    const [XR,setXR] = useState(0)

    const inputEquation = (event) =>{
        console.log(event.target.value)
        setEquation(event.target.value)
    }

    const inputXL = (event) =>{
        console.log(event.target.value)
        setXL(event.target.value)
    }

    const inputXR = (event) =>{
        console.log(event.target.value)
        setXR(event.target.value)
    }

    const calculateRoot = () =>{
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        CalFalseposition(xlnum,xrnum);
     
        setHtml(print());
           
        console.log(valueIter)
        console.log(valueXl)
    }

    const print = () =>{
        console.log(data)
        setValueIter(data.map((x)=>x.iteration));
        setValueXl(data.map((x)=>x.Xl));
        setValueX1(data.map((x)=>x.X1));
        setValueXr(data.map((x)=>x.Xr));
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
                            <th style={{width: 600}}>Iteration</th>
                            <th style={{width: 50}}>XL</th>
                            <th style={{width: 300}}>X1</th>
                            <th style={{width: 200}}>XR</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xl}</td>
                                <td>{element.X1}</td>
                                <td>{element.Xr}</td>
                            </tr>)

                        })}
                    </tbody>
                </Table>
                <Line data={{
                        labels: valueIter,
                        datasets: [
                        {
                            label: "Xl",
                            data: valueXl,
                            backgroundColor: "rgba(75,192,192,0.2)",
                            borderColor: "rgba(75,192,192,1)"
                        },
                        {
                            label: "X1",
                            data: valueX1,
                            backgroundColor: "rgba(75,192,192,0.2)",
                            borderColor: "rgba(255, 99, 132, 0.5)"
                        },
                        {
                            label: "Xr",
                            data: valueXr,
                            backgroundColor: "rgba(75,192,192,0.2)",
                            borderColor: "rgba(53, 162, 235, 0.5)"
                        },
                        ]
                }}></Line>
            </Container>
           
        );
    }

    const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100;
   
    const CalFalseposition = (xl, xr) => {
        var x1,fX1,fXl,fXr,ea;
        var iter = 0;
        var MAXiter = 50;
        const e = 0.000001;
        var obj={};
        do
        {
            fXl = evaluate(Equation, {x:xl})
            fXr = evaluate(Equation, {x:xr})
            x1 = (((xl*fXr)-(xr*fXl))/(fXr-fXl));
            fX1 = evaluate(Equation, {x:x1})

            iter ++;
            if (fX1*fXr > 0)
            {
                ea = error(xr, x1);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    X1:x1,
                    Xr:xr
                }
                data.push(obj)
                xr = x1;
            }
            else if (fX1*fXr <= 0)
            {
                ea = error(xl, x1);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    X1:x1,
                    Xr:xr
                }
                data.push(obj)
                xl = x1;
            }
        }while(ea>e && iter<MAXiter)
        setX(x1)
    }

    const Clear = () =>{
        setEquation("");
        setXL(0);
        setXR(0);
    }
    
    return (
            <Form className="ipinput">
                <h1>False position</h1>
                <Form.Label>Input f(x)</Form.Label>
                <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:10}} className="form-control"></input>
                <Form.Label>Input XL</Form.Label>
                <input type="number" id="XL" onChange={inputXL} style={{width:"5%", margin:10}} className="form-control"></input>
                <Form.Label>Input XR</Form.Label>
                <input type="number" id="XR" onChange={inputXR} style={{width:"5%", margin:10}} className="form-control"></input>
                <br/>
                <Button onClick={calculateRoot}>Calculate</Button>
                <Button type = "reset" onClick={Clear} style={{margin:10, backgroundColor: "#ccff66", borderColor: "#ccff66"}}>Clear</Button>
                <Container>
                {html}
                </Container>
            </Form>
           
    )
}

export default Falseposition