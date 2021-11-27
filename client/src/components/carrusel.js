import React, { Component } from 'react';
import styled from "styled-components";
import { Link } from 'react-router-dom';

const Caarrusel = styled.div`
    position:relative;
    width: 100%;
    height: auto;
    text-align:center;
    overflow-x: scroll;
    overflow-x: hidden;
    overflow-y: hidden;
    white-space: nowrap;
    cursor: grab;
    align-items: center;
    justify-content: center;
`
const Titulo = styled.p`
    position:absolute;
    background-color: rgba(0,0,0,0.3925945378151261);
    display:none;
    width:100%;
    height:100%;
    text-align:center;
    white-space:initial;
    color: white;
    font-size:20px;
    padding:10px;
    cursor: grab;

    
`
const Libro = styled.div`
    position:relative;
    width: 10%;
    height: 25%;
    display:inline-flex;
    text-align:center;
    align-items: center;
    justify-content: center;
    margin-right:10px;
    &:hover ${Titulo} {
        display: block;
      }
`
const Image = styled.img`
    position:relative;
    width:100%;
    height:100%;
    text-align:center;
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: cover;

`
export class Carrusel extends Component {
    
    componentDidMount() {
        
        const slider = document.getElementById('carrusel');
        let isDown = false;
        let startX;
        let scrollLeft;
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.classList.remove('active');
        });
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 3; //scroll-fast
            slider.scrollLeft = scrollLeft - walk;
        });
    }
    render() {
        return (
            <Caarrusel id='carrusel'>
                {
                    this.props.libros.map((element, index) => {
                        return (
                            <Link  key={index} to={'/bookRental/'+element.shortId}>
                            <Libro key={index}>
                                <Image src={element.img}></Image>
                                <Titulo>{element.titulo}</Titulo>
                            </Libro>
                             </Link>
                        )
                    })
                }

            </Caarrusel>

        )
    }

}
