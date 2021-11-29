import React, { Component } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';
import companyLogo from './../assets/logo.png';
const Navbardiv = styled.div`
    position:sticky;
    width: 100%;
    height: 80px;
    background-color: #4CAF50;
    top:0px;
    let:0px;
    z-index:9;
    text-align:left;
    overflow-x: hidden;
    overflow-y: hidden;
    white-space: nowrap;
    align-items: left;
    justify-content: center;
    padding:10px;
`
const Logo = styled.img`
    position: relative;
    height:100%;
    left:0px;
    background:none;
`
const Button = styled.button`
position: relative;
height:100%;
left:0px;
background:none;
border:none;
color:white;
font-size:20px;
&:hover {
    border-bottom:1px solid green;
    font-size:21px;
  }
`
export class Navbar extends Component {
    render() {
        return (
            <Navbardiv>
                <Link to={'/home'} >
                <Logo src={companyLogo}></Logo>
                </Link>
                <Link to={'/books'}>
                <Button >Libros</Button>
                </Link>
                <Link to={'/client'}>
                <Button >Clientes</Button>
                </Link>
                <Link to={'/bookRental/0'}>
                <Button >Rentas</Button>
                </Link>

            </Navbardiv>

        )
    }

}
