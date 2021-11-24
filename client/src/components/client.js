import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "http://localhost:3001/client"


function Client() {
    
   const [client, setClient] = useState("");
   const [modal, setModal] = useState(false);

   const [nombre, setNombre] = useState("")
   const [apellido, setApellido] = useState("")
   const [telefono, setTelefono] = useState("")
   const [direccion, setDireccion] = useState("")

   const [newClient, setNewCLient ] = useState(null)
   const [deletedClient, setDeletedClient] = useState(null)


    useEffect(() => {
        axios.get(url).then(response => {
            console.log(response.data)
              setClient(response.data);
        });
    }, [deletedClient, newClient])
  

   const modalInsertar = () => {
       setModal(current => !current)
   }

   const addClient =  async () =>{
       await axios.post(url , {
           nombre: nombre,
           apellido: apellido,
           telefono: telefono,
           direccion: direccion
       }).then(response => {
           modalInsertar();
           setNewCLient(nombre);
           
       }).catch(err => {
           console.log(err)
       })
   }

   const deleteClient = async (id) => {
       await axios.delete(`http://localhost:3001/client/${id}`, {
       }).then(() => {
           alert('deleted')
       })
   }


    
    
    
        return(
            <div className="App">
                <br />
                <button className="btn btn-success" onClick={() => modalInsertar()}>Agregar Cliente</button>
                <br /><br />
                <table className="table">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Telefono</th>
                        <th>Dirección</th>
                        <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {client.clientDB?.map((client) => {
                            return(
                                <tr>
                                <td>{client._id}</td>
                                <td>{client.nombre}</td>
                                <td>{client.apellido}</td>
                                <td>{client.telefono}</td>
                                <td>{client.direccion}</td>
                                <td>
                                    <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt} 
                                    onClick = {() => {deleteClient(client._id) 
                                    setDeletedClient(client._id)}}/>
                                    </button>
                                </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <Modal isOpen={modal}>
                    <ModalHeader style={{display: 'block'}}>
                        <span style={{float: 'right'}}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="nombre">Nombre</label>
                            <input className="form-control" type="text" name="nombre" id="nombre" onChange={(event) => {setNombre(event.target.value)}}/>
                            <br />
                            <label htmlFor="nombre">Apellido</label>
                            <input className="form-control" type="text" name="apellido" id="apellido" onChange={(event) => {setApellido(event.target.value)}}/>
                            <br />
                            <label htmlFor="nombre">Telefono</label>
                            <input className="form-control" type="text" name="telefono" id="telefono" onChange={(event) => {setTelefono(event.target.value)}}/>
                            <br />
                            <label htmlFor="nombre">Direccion</label>
                            <input className="form-control" type="text" name="direccion" id="direccion" onChange={(event) => {setDireccion(event.target.value)}}/>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <button className="btn btn-success" onClick={() => addClient()}>
                            Agregar
                        </button>
                        <button className="btn btn-danger" onClick={() => modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
}


export default Client;