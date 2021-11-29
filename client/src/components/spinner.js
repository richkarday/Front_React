import React, { Component } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Background = styled.div`
    position:fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(14,120,6,0.6110819327731092);
    top:0px;
    let:0px;
    z-index:9;
    text-align:center;
    overflow-x: hidden;
    overflow-y: hidden;
    white-space: nowrap;
    align-items: center;
    justify-content: center;
`
const Spin = styled.img`
position:absolute;
left:50%;
top:40%;
width:25%;
transform: translate(-50%,-50%);
`
const Text = styled.h3`
position:absolute;
left:50%;
top:50%;
width:25%;
transform: translate(-50%,-50%);
z-index:9;
`
export class Spinner extends Component {
    render() {
        return (
            <Background>
                <Spin src='https://cdn.edu.buncee.com/rackspace/bnc-assets/animations/bde/1433255400-Young_animation_education060115_01.gif'>
                </Spin>
                <Text>Loading...</Text>
            </Background>

        )
    }

}
