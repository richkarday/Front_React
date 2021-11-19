import React, { useState, useEffect }  from 'react';
import Axios from 'axios';
import '../App.css';

function User() {
  // const [foodName, setFoodName] = useState("")
  // const [days, setDays] = useState(0);
  const [newNombre, setNewNombre] = useState("");

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  const [usuario, setUsuarios] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/usuario").then((response) => {
      setUsuarios(response.data)
      console.log(response.data)
      
    })
  },[])

  const addToList = () => {
    Axios.post("http://localhost:3001/usuario", {
      nombre: nombre, 
      apellido: apellido,
      telefono: telefono,
      correo: correo,
      password: password
    })
  }

  const updateNombre = (id) => {
    Axios.put("http://localhost:3001/usuario", {
      id: id, 
      newNombre: newNombre
    });
  }

  const deleteUsuario = (id) => {
    Axios.delete(`http://localhost:3001/usuario/${id}`, {
    });
  }

  return (
    <div className="User">
      <h1>Crud App con Mearn</h1>

      <label>Nombre: </label>
      <input type="text" onChange={(event) => {setNombre(event.target.value)}} />
      <label>Apellido</label>
      <input type="text" onChange={(event) => {setApellido(event.target.value)}}/>
      <label>Telefono</label>
      <input type="text" onChange={(event) => {setTelefono(event.target.value)}}/>
      <label>Correo</label>
      <input type="text" onChange={(event) => {setCorreo(event.target.value)}}/>
      <label>Password</label>
      <input type="password" onChange={(event) => {setPassword(event.target.value)}}/>
      <button onClick={addToList}>Agregar usuario</button>

      <h1>Lista de Usuarios</h1>
      <div>
        {usuario.usuarios?.map((val, key) => (
          <div key ={key} className="usuarios">
            <h1>{val.nombre}</h1>
            <input type="text" placeholder="Nuevo nombre" onChange={(event) => 
              {setNewNombre(event.target.value)}}/>
            <button onClick={() => updateNombre(val._id)}>Actualizar</button>
            <button onClick={() => deleteUsuario(val._id)}>Eliminar</button>
          </div>
        ))}
      </div>
      {/* <h1>Lista de Usuarios</h1>
      {usuarios.usuarios.map((val, key) => {
        return (
        <div key={key} className="usuarios"> 
          <h1>{val.nombre}</h1><h1>{val.apellido}</h1>
           <input type="text" placeholder="Nuevo nombre" onChange={(event) =>  
            {setNewNombre(event.target.value)}}/>
          <button onClick={() => updateNombre(val._id)}>Actualizar</button> 
          <button onClick={() => deleteFood(val._id)}>Eliminar</button>
          </div>
        ); */}
    </div>
  );
}

export default User;
