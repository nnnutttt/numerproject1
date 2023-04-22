import { Layout, Menu } from "antd";
import { Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";

import { CiCalculator1 } from 'react-icons/ci'
import { Bs1Square } from 'react-icons/bs'
import { Bs2Square } from 'react-icons/bs'
import { Bs3Square } from 'react-icons/bs'
import { Bs4Square } from 'react-icons/bs'

import { useState } from "react"
import React from 'react';

import Bisection from "./ch1/Bisection";
import Falseposition from "./ch1/Falseposition";
import Onepoint from "./ch1/Onepoint";
import Taylor from "./ch1/Taylor";
import Newton from "./ch1/Newton";
import Secant from "./ch1/Secant";

import Cramer from "./ch2/Cramer";

import LinearRegression from "./ch4/LinearRegression";

import { Route, Routes, useNavigate } from 'react-router-dom';

import "./App.css";


const AppHeader =()=>{

    const navigate = useNavigate()
    const [collpased, setCollpased] = useState(false)

    return (
        <Layout className="header">
            <Header
                style={{
                    backgroundColor: "cornflowerblue",
                }}
            >
            <div style={{ display: "flex", alignItems: "center", marginLeft: -30 }}>
                <CiCalculator1 
                    onClick={() => setCollpased(!collpased)}
                    size={40} 
                    style={{ marginRight: 15 }} 
                />
                <div className="text-header">Numerical Calculator</div>
            </div>
                    
            </Header>
                <Layout style={{background: "#e6ffff"}}>
                    <Sider collapsed={collpased} style={{background: "#ffffb3"}}>
                        <Menu 
                            style={{background: "#ffffb3", height: 650}}
                            onClick={({key})=>{
                                if(key === key){
                                    navigate(key)
                                }
                            }}
                            mode="inline"
                            items={[
                                {
                                    label: "Roots of equation",
                                    key: "chap1",
                                    icon : <Bs1Square />,
                                    children: [
                                        {
                                            label: "Bisection method",
                                            key: "/Bisection",
                                        },
                                        {
                                            label: "False-position method",
                                            key: "/False-position",
                                        },
                                        {
                                            label: "One-point iteration method",
                                            key: "/One-point-iteration",
                                        },
                                        {
                                            label: "Taylor series",
                                            key: "/Taylor-series",
                                        },
                                        {
                                            label: "Newton-Raphson method",
                                            key: "/Newton-Raphson",
                                        },
                                        {
                                            label: "Secant method",
                                            key: "/Secant",
                                        },
                                    ]
                                },
                                {
                                    label: "Solutions of linear  algebraic  equations",
                                    key: "chap2",
                                    icon : <Bs2Square />,
                                    children: [
                                        {
                                            label: "Cramer's rule",
                                            key: "/Cramer",
                                        },
                                        {
                                            label: "Gauss elimination method",
                                            key: "gauss_e",
                                        },
                                        {
                                            label: "Gauss-Jordan method",
                                            key: "gauss_j",
                                        },
                                        {
                                            label: "Matrix inversion method",
                                            key: "matrix",
                                        },
                                        {
                                            label: "LU decomposition method",
                                            key: "lu",
                                        },
                                        {
                                            label: "Cholesky decomposition method",
                                            key: "cholesky",
                                        },
                                        {
                                            label: "Jacobi iteration method",
                                            key: "jacobi",
                                        },
                                        {
                                            label: "Gauss-Seidel iteration method",
                                            key: "gauss_s",
                                        },
                                        {
                                            label: "Conjugate gradient method",
                                            key: "conjugate",
                                        },
                                    ]
                                },
                                {
                                    label: "Interpolation & Extrapolation",
                                    key: "chap3",
                                    icon : <Bs3Square />,
                                    children: [
                                        {
                                            label: "Newton's divided-differences",
                                            key: "Newtons-divided",
                                        },
                                        {
                                            label: "Lagrange interpolation",
                                            key: "Lagrange-interpolation",
                                        },
                                    ]
                                },
                                {
                                    label: "Least-squares regression",
                                    key: "chap4",
                                    icon : <Bs4Square />,
                                    children: [
                                        {
                                            label: "Linear Regression",
                                            key: "/Linear-Regression",
                                        }
                                        
                                    ]
                                },
                            ]}
                        />
                    </Sider>
                    <Content />
                </Layout>
            </Layout>
    );
}

const Content=()=>{
    return(
            <Routes>
                {/* chap1 */}
                <Route exact path="/Bisection" element={<Bisection/>}></Route>
                <Route exact path="/False-position" element={<Falseposition/>}></Route>
                <Route exact path="/One-point-iteration" element={<Onepoint/>}></Route>
                <Route exact path="/Taylor-series" element={<Taylor/>}></Route>
                <Route exact path="/Newton-Raphson" element={<Newton/>}></Route>
                <Route exact path="/Secant" element={<Secant/>}></Route>

                {/* chap2 */}
                <Route exact path="/Cramer" element={<Cramer/>}></Route>

                {/* chap4 */}
                <Route exact path="/Linear-Regression" element={<LinearRegression/>}></Route>
                {/* <Route exact path="/test-api" element={<Testapi/>}></Route> */}
            </Routes>
    )
}

export default AppHeader