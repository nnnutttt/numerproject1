import { useState } from "react"
import { Button, Container, Form} from "react-bootstrap";
import Table from "react-bootstrap/Table"
import { evaluate } from 'mathjs'
import { Line } from "react-chartjs-2";
import { Calbisection } from "./Calbi";
//import Chart from 'chart.js/auto';

const Bisection =()=>{
    let data =[];
    /* const [valueIter, setValueIter] = useState([]); */
    /* const [valueXl, setValueXl] = useState([]);
    const [valueXm, setValueXm] = useState([]);
    const [valueXr, setValueXr] = useState([]); */
    let valueXl = []
    let valueXm = []
    let valueXr = []
    let valueIter = []

    const [html, setHtml] = useState(null);
    const [Equation,setEquation] = useState("x-(7^(1/2))")
    /* const [X,setX] = useState(0) */
    let X = 0
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
        const {datanew, xnew} = Calbisection(Equation, xlnum,xrnum);
        data = datanew;
        X = xnew;

        valueIter.push(data.map((x)=>x.iteration));
        valueXl.push(data.map((x)=>x.Xl));
        valueXm.push(data.map((x)=>x.Xm));
        valueXr.push(data.map((x)=>x.Xr));
     
        setHtml(print());
           
        console.log(valueIter[0])
        console.log(valueXl[0])
        console.log(valueXm[0])
        console.log(valueXr[0])
    }

    const print = () =>{
        console.log(data)
        /* setValueIter(data.map((x)=>x.iteration));
        setValueXl(data.map((x)=>x.Xl));
        setValueXm(data.map((x)=>x.Xm));
        setValueXr(data.map((x)=>x.Xr)); */
        return(
            <Container>
                <h5 
                    style={{
                        color: "red", 
                        fontSize: 20,
                        fontFamily: "Arial"
                    }} data-testid="ans" >Answer = {X.toPrecision(7)}
                </h5>
                <Table striped hover size="dark">
                    <thead>
                        <tr>
                            <th style={{width: 600}}>Iteration</th>
                            <th style={{width: 50}}>Xl</th>
                            <th style={{width: 300}}>Xm</th>
                            <th style={{width: 200}}>Xr</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((element, index)=>{
                            return  (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.Xl}</td>
                                <td>{element.Xm}</td>
                                <td>{element.Xr}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                <Line data={{
                        labels: valueIter[0],
                        datasets: [
                        {
                            label: "Xl",
                            data: valueXl[0],
                            borderColor: "rgba(28, 95, 73, 1)"
                        },
                        {
                            label: "Xm",
                            data: valueXm[0],
                            borderColor: "rgba(255, 99, 132, 0.5)"
                        },
                        {
                            label: "Xr",
                            data: valueXr[0],
                            borderColor: "rgba(53, 162, 235, 0.5)"
                        },
                        ]
                }}></Line>
            </Container>
        );
    }

    /* const error =(xold, xnew)=> Math.abs((xnew-xold)/xnew)*100; */
   
    /* const Calbisection = (xl, xr) => {
        var xm,fxm,fxr,ea;
        var iter = 0;
        var MAX = 50;
        const e = 0.00001;
        var obj={};
        do
        {
            xm = (xl+xr)/2.0;
            fxr = evaluate(Equation, {x:xr})
            fxm = evaluate(Equation, {x:xm})

            iter ++;
            if (fxm*fxr > 0)
            {
                ea = error(xr, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr
                }
                data.push(obj)
                xr = xm;
            }
            else if (fxm*fxr < 0)
            {
                ea = error(xl, xm);
                obj = {
                    iteration:iter,
                    Xl:xl,
                    Xm:xm,
                    Xr:xr
                }
                data.push(obj)
                xl = xm;
            }
        }while(ea>e && iter<MAX)
        setX(xm)
    } */

    const Clear = () =>{
        setEquation("");
        setXL(0);
        setXR(0);
    }

    return (
        <Form className="ipinput">
            <h1 className="h1">Bisection</h1>

            <Form.Label>Input f(x)</Form.Label>
            <input type="text" id="equation" data-testid="Equation" value={Equation} onChange={inputEquation} style={{width:"20%", margin:10}} className="form-control"></input>
            <Form.Label>Input XL</Form.Label>
            <input type="number" id="XL" data-testid="XL" onChange={inputXL} style={{width:"5%", margin:10}} className="form-control"></input>
            <Form.Label>Input XR</Form.Label>
            <input type="number" id="XR" data-testid="XR" onChange={inputXR} style={{width:"5%", margin:10}} className="form-control"></input>
            <br/>
            <Button data-testid="myBtn" onClick={calculateRoot}>Calculate</Button>
            <Button type = "reset" onClick={Clear} style={{margin:10, backgroundColor: "#ccff66", borderColor: "#ccff66"}}>Clear</Button>
            <div>
                {html}
            </div>
        </Form>
    )
}

export default Bisection