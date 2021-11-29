import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import axios from "axios";
import { ArrowUpOutline } from 'react-ionicons'
import { Carrusel } from '../components/carrusel';
import {Spinner} from './../components/spinner';
import {Navbar} from '../components/navbar';
import styled from "styled-components";



const Container = styled.div`
    position:relative;
    width: 100%;
    height: auto;
    display: flex;
    border-bottom: 1px solid green;
    padding: 20px;
`
const Divisor = styled.div`
    position:relative;
    width: 50%;
    height: auto;
    display: block;
    text-align:center;
    align-items: center;
    justify-content: center;
`
const Title = styled.h2`
    position:relative;
    font-size:25px;
    display:block;
`
const Input = styled.input`
    position:relative;
    margin:0 0 10px 0;
    border:1px solid;
    border-radius:5px;
    width:40%;
    height:30px;
    font-size:20px;

    
    
`
const Select = styled.select`
    position:relative;
    margin:0 0 10px 0;
    border:1px solid;
    border-radius:5px;
    width:40%;
    height:30px;
    font-size:20px;
    
`
const Button = styled.button`
    position:relative;
    margin:0 0 10px 0;
    border:1px solid #4CAF50;
    border-radius:5px;
    width:40%;
    height:30px;
    background-color: #4CAF50;
    color: white;
`
const Salto = styled.div`
    position:relative;
    display: block;
    width:100%;
    height:1px;
    
`

const Image = styled.img`
    position:relative;
    width:45%;
    margin-right:5px;
`
const Table = styled.table`
    position:relative;
    width:100%;
    text-align:center;
    align-items: center;
    justify-content: center;

    `
const Th = styled.th`
    position:relative;
    width:16.66%;
    position: sticky;
    top: 80px;
    background-color: #4CAF50;
    z-index:9;
    color: white;
`
const ButtonFloat = styled.button`
    position:fixed;
    bottom: 20px;
    width:fit-content;
    right:20px;
    background: none;
    border:none;
    z-index:9;
`
const Alert = styled.div`
    position:fixed;
    top: 20px;
    width:25%;
    left:50%;
    padding:10px;
    color: white;
    -webkit-box-shadow: -7px 10px 20px 9px rgba(0,0,0,0.88); 
    box-shadow: -7px 10px 20px 9px rgba(0,0,0,0.88);
    transform:translate(-50%);
    background-color:  #4CAF50;
    border:none;
    border-radius:5px;
    z-index:9;
    text-align:center;
`

function BookRental() {
    const sleep = (ms) => { return new Promise(resolve => setTimeout(resolve, ms)); }
    const url = "http://localhost:3001/"
    const { idLibro } = useParams();
    const [visibleButton, setvisibleButton] = useState(false);
    const [visibleAlert, setvisibleAlert] = useState(false);
    const [spinShow, setspinShow] = useState(false)
    const [mensaje, setmensaje] = useState("")
    const [setidLibro, setsetidLibro] = useState();
    const [buscador, setbuscador] = useState("")
    const [libro, setlibro] = useState();
    const [libros, setLibros] = useState([]);
    const [autor, setautor] = useState();
    const [images, setimages] = useState(['https://islandpress.org/sites/default/files/default_book_cover_2015.jpg', 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg'])
    const [fecha, setFecha] = useState("");
    const [total, setTotal] = useState(0);
    const [usuariosid, setusuariosid] = useState([])
    const [client, setClient] = useState(0);
    const [nombre, setnombre] = useState("")
    const [apellido, setapellido] = useState("")
    const [telefono, settelefono] = useState("")
    const [direccion, setdireccion] = useState("")
    const [email, setemail] = useState("")
    const [renta, setrenta] = useState([])

    useEffect(() => {

        axios.get(`${url}renta`).then(response => {
            setrenta(response.data.response)
        }).catch((err) => {

        })
        axios.get(`${url}client`).then(response => {
            setusuariosid(response.data.clientDB)

        }).catch((err) => {

        })
        axios.get(`${url}libro/`).then(response => {
            setLibros(response.data.libros)
        }).catch((err) => {
        })
        if (idLibro == 0) {
            setlibro('');
            setautor('');
            setimages(['https://islandpress.org/sites/default/files/default_book_cover_2015.jpg', 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg'])
        } else {
            axios.get(`${url}libro/buscar=${idLibro}`).then(response => {
                setsetidLibro(response.data.libros[0]._id);
                setlibro(response.data.libros[0].titulo);
                setautor(response.data.libros[0].autor);
                setimages(response.data.libros[0].img)

            }).catch((err) => {
                setlibro('');
                setautor('');
                setimages(['https://islandpress.org/sites/default/files/default_book_cover_2015.jpg', 'https://islandpress.org/sites/default/files/default_book_cover_2015.jpg'])

            })
        }
        window.onscroll = () => {
            if (window.pageYOffset > 140) {
                setvisibleButton(true)
            } else {
                setvisibleButton(false)

            }
        }

    }, [])
    useEffect(() => {
        // setusuariosid(...usuariosid, usuariosid)
    }, [usuariosid])
    useEffect(() => {
        axios.get(`${url}libro/buscar=${libro}`).then(response => {
            setsetidLibro(response.data.libros[0]._id);
            setlibro(response.data.libros[0].titulo);
            setautor(response.data.libros[0].autor);
            setimages(response.data.libros[0].img)
            
        }).catch((err) => {
        })

    }, [libro])
    useEffect(() => {
        setlibro(idLibro)
    }, [idLibro])
    useEffect(() => {
        let now = new Date()
        let strToDate = new Date(fecha);
        setTotal((Math.round((strToDate - now) / (1000 * 60 * 60 * 24)) + 1) * 5 || 0)

    }, [fecha])
    useEffect(() => {
        if (client == 0) {
            setnombre('')
            setapellido('')
            settelefono('')
            setdireccion('')
            setemail('')
        } else {
            axios.get(`${url}client/buscar=${client}`).then(response => {
                setnombre(response.data.usuarios.nombre)
                setapellido(response.data.usuarios.apellido)
                settelefono(response.data.usuarios.telefono)
                setdireccion(response.data.usuarios.direccion)
                setemail(response.data.usuarios.correo)
            }).catch((err) => {
                setnombre('')
                setapellido('')
                settelefono('')
                setdireccion('')
                setemail('')
            })
        }
    }, [client])
useEffect(() => {
    axios.get(`${url}libro/regex=${buscador}`).then(response => {
        setLibros(response.data.libros)
    }).catch((err) => {
        axios.get(`${url}libro/`).then(response => {
            setLibros(response.data.libros)
        }).catch((err) => {
        })
    })
}, [buscador])
    const createRental = async () => {
        setspinShow(true)
        if (total == 0 || nombre == '') {
            setspinShow(false)
            await setmensaje("Todos los campos son obligatorios")
            await setvisibleAlert(true)
            await sleep(3000)
            await setvisibleAlert(false)
        } else {


            let data = {
                libro: setidLibro,
                usuario: client,
                total: total,
                entrega: fecha
            }
            axios.post(`${url}renta`, data).then(response => {
                axios.get(`${url}renta`).then(async response => {
                    setspinShow(false)
                    await setmensaje("Se registro correctamente la renta")
                    await setrenta(response.data.response)
                    await setvisibleAlert(true)
                    await sleep(3000)
                    await setvisibleAlert(false)
                    
                }).catch((err) => {
                    setspinShow(false)
                })
            }).catch((err) => {
                console.log(err);
                setspinShow(false)
            })
        }
    }
    const delteRental = (id, key) => {
        setspinShow(true)
        let data = {
            estado: false,

        }
        axios.put(`${url}renta/delete=${id}`, data).then(response => {
            axios.get(`${url}renta`).then(async response => {
                setspinShow(false)
                await setmensaje("Se entrego correctamente la renta")
                await setrenta(response.data.response)
                await setvisibleAlert(true)
                await sleep(3000)
                await setvisibleAlert(false)

            }).catch((err) => {
                setspinShow(false)

            })
        }).catch((err) => {
            setspinShow(false)
            console.log(err);
        })
    }

    return (
        <div>
                    <Navbar></Navbar>

            {   
                spinShow ? <Spinner></Spinner> : null
            } 
            {visibleAlert ? <Alert>{mensaje}</Alert> : null}
            {visibleButton ? <ButtonFloat>
                <ArrowUpOutline color={'#FF0000'} height="40px" width="40px" onClick={() => window.scrollTo(0, 0)} />
            </ButtonFloat> : null}
            <Container>
                <div style={{ width: '100%' }}>
                    <Input placeholder="Buscar Libro..." onChange={(event) => setbuscador(event.target.value)}></Input>
                    <Salto></Salto>
                    <Carrusel libros={libros}></Carrusel>
                </div>

            </Container>
            <Container>
                <Divisor>
                    <Image src={images[0]}></Image>
                    <Image src={images[1]}></Image>

                </Divisor>
                <Divisor>
                    <Title>Rentar Libro</Title>
                    <Salto></Salto>
                    <Input type="text" value={libro} placeholder="Buscar Libro" onChange={e => setlibro(e.target.value)}></Input>
                    <Salto></Salto>
                    <Input type="text" value={autor} placeholder="Autor" onChange={e => setautor(e.target.value)}></Input>
                    <Salto></Salto>
                    <Input type="date" onChange={e => setFecha(e.target.value)}></Input>
                    <Salto></Salto>
                    <Select onChange={e => setClient(e.target.value)}>
                        <option value="1">Seleccionar Cliente</option>
                        {
                            usuariosid.map(usuario => {
                                return (
                                    <option value={usuario._id}>{usuario.shortId + ' - ' + usuario.nombre}</option>
                                )
                            })
                        }
                    </Select>
                    <Salto></Salto>
                    <Input type="text" placeholder="Nombre" value={nombre} onChange={e => setnombre(e.target.value)}></Input>
                    <Salto></Salto>
                    <Input type="text" placeholder="Apellido" value={apellido} onChange={e => setapellido(e.target.value)}></Input>
                    <Salto></Salto>
                    <Input type="text" placeholder="Telefono" value={telefono} onChange={e => settelefono(e.target.value)}></Input>
                    <Salto></Salto>
                    <Input type="text" placeholder="Email" value={email} onChange={e => setemail(e.target.value)}></Input>
                    <Salto></Salto>
                    <Input type="text" placeholder="Direccion" value={direccion} onChange={e => setdireccion(e.target.value)}></Input>
                    <Salto></Salto>
                    <Input type="text" value={"$" + total + ".00"}></Input>
                    <Salto></Salto>
                    <Button onClick={createRental}>Rentar</Button>
                </Divisor>

            </Container>
            <Container>
                <Table>
                    <tr>
                        <Th>Libro</Th>
                        <Th>Cliente</Th>
                        <Th>Telefono</Th>
                        <Th>Fecha Entrega</Th>
                        <Th>Cargos</Th>
                        <Th>Acciones</Th>
                    </tr>
                    <tbody>
                        {
                            renta.map((renta, key) => {
                                return (
                                    renta.cargos < 0 ?
                                        <tr key={key} style={{ color: 'red' }}>
                                            <td>{renta.libro}</td>
                                            <td>{renta.client}</td>
                                            <td>{renta.telefono}</td>
                                            <td>{renta.fecha_entrega.split('T')[0]}</td>
                                            <td>${Math.abs(renta.cargos)}.00</td>
                                            <td><Button key={key} onClick={() => delteRental(renta._id, key)}>Entregado</Button></td>
                                        </tr>
                                        :
                                        <tr key={key}>
                                            <td>{renta.libro}</td>
                                            <td>{renta.client}</td>
                                            <td>{renta.telefono}</td>
                                            <td>{renta.fecha_entrega.split('T')[0]}</td>
                                            <td>${Math.abs(renta.cargos)}.00</td>
                                            <td><Button key={key} onClick={() => delteRental(renta._id, key)}>Entregado</Button></td>
                                        </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </Container>
        </div>
    );
}


export default BookRental;
