import Axios from 'axios';
import '../styles/libro.css';
import { useState, useEffect } from 'react';

function Libro({auth}) {

    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [editorial, setEditorial] = useState('');
    const [fecha, setFecha] = useState('');
    const [bookList, setBookList] = useState([]);
    const [bookDeleted, setBookDeleted] = useState(null);
    const [newBook, setNewBook] = useState(null);
    // let enabled;

    /* useEffect(()=>{
        if(!auth){
            return <Redirect to="/login" />
        }
    },[]); */

    useEffect(() => {
        Axios.get('http://localhost:3001/libro').then((res) => {
            setBookList(res.data);
            console.log(res.data);
        });    
        // sub();
    }, [bookDeleted, newBook]);

    const addBook = () => {
        try {
            Axios.post('http://localhost:3001/libro',{
            titulo:titulo,
            autor:autor,
            categoria: categoria,
            editorial:editorial,
            fecha:fecha
        }).then(()=>{
            alert('Book Saved');
            setNewBook(titulo);
        });
        } catch (error) {
            console.log(error);
        } 
    };

    const deleteBook = (id) => {
        Axios.delete(`http://localhost:3001/libro/${id}`, {
        }).then(()=>{
            alert('deleted');
        });
      }

      /* const activateInput=()=>{
        enabled=!enabled;
      } */

    return ( 
    <div className = "App" >
        <h1 > Registro de libros </h1> 
        <label > Titulo </label> 
        <input type = "text"
        onChange = {
            (event) => { setTitulo(event.target.value) } }
        />

        <label > Autor </label> 
        <input type = "text"
        onChange = {
            (event) => { setAutor(event.target.value) } }
        />

        <label > Categoria </label> 
        <input type = "text"
        onChange = {
            (event) => { setCategoria(event.target.value) } }
        />

        <label> Editorial </label> 
        <input type = "text"
        onChange = {
            (event) => { setEditorial(event.target.value) } }
        />

        <label > Fecha </label> 
        <input type = "date"
        onChange = {
            (event) => { setFecha(event.target.value) } }
        />

        <button className = "button-pressed"
        onClick ={ ()=>{ addBook() }} >
             Añadir libro 
        </button>
        <div>
        <h1> Libros </h1> {
            bookList.libros?.map((val, key) => {
                return ( 
                < div key = { key }>
                    <ol>
                        <label> Titulo: </label>
                        <input type="text" value={ val.titulo } disabled/><br/>
                        <label> Autor: </label>
                        <input type="text" value={ val.autor } disabled/><br/>
                        <label> Categoria: </label>
                        <input type="text" value={ val.categoria } disabled/><br/>
                        <label> Editorial: </label>
                        <input type="text" value={ val.editorial } disabled/><br/>
                        <label> Fecha: </label>
                        <input type="date" value={ val.fecha } disabled/> <br/>
                    </ol>
                    <button className = "button-pressed" onClick = { () => {deleteBook(val._id)
                        setBookDeleted(val._id) }}>Eliminar</button>
                    <br/>    
                    <button className = "button-pressed" onClick = { () => {console.log('Actualizando')}}>Actualizar</button>
                </div>
                );
            })
        }
            </div>
        </div>
        
    );
}

export default Libro;