import Axios from 'axios';
import '../styles/libro.css';
import { useState, useEffect } from 'react';
import {Spinner} from './../components/spinner'
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function Libro() {
    //Estados para mostarr spinner
    const [spinShow, setspinShow] = useState(false)

    //Estados para agregar libros
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [categoria, setCategoria] = useState('');
    const [editorial, setEditorial] = useState('');
    const [fecha, setFecha] = useState('');

    //Estados para actualizar libros
    const [newTitle, setNewTitle] = useState('');
    const [newAutor, setNewAutor] = useState('');
    const [newCategory, setNewCategory] = useState('');
    const [newEditorial, setNewEditorial] = useState('');
    const [newDate, setNewDate] = useState('');

    //Estado para mapear la lista de libros desde la DB
    const [bookList, setBookList] = useState([]);

    //Estados para re-render
    const [newBook, setNewBook] = useState(null);
    const [bookDeleted, setBookDeleted] = useState(null);
    const [bookUpdated, setBookUpdated] = useState(null);

    //Estado para mostrar modal
    const [modal, setModal] = useState(false);

    useEffect(() => {
        //Obtener libros desde la API
        Axios.get('http://localhost:3001/libro').then((res) => {
            setBookList(res.data);
            console.log(res.data);
        });    
    }, [bookDeleted, newBook, bookUpdated]);

    //Agregar nuevo libro
    const addBook = () => {
        setspinShow(true)
        try {
            Axios.post('http://localhost:3001/libro',{
            titulo:titulo,
            autor:autor,
            categoria: categoria,
            editorial:editorial,
            fecha:fecha
        }).then(()=>{
            setspinShow(false)
            alert('Book Saved');
            setNewBook(titulo);
            modalInsertar();
        });
        } catch (error) {
            console.log(error);
            setspinShow(false)
        } 
    };

    //Eliminar un libro en base a un ID
    const deleteBook = (id) => {
        setspinShow(true)
        Axios.delete(`http://localhost:3001/libro/${id}`, {
        })
        .then(()=>{
            setspinShow(false)
            alert('deleted');
        })
        .catch((error)=>{
            setspinShow(false)
            console.log(error);
        });
      }

    //Actualizar un libro en base a un ID  
    const updateBook = (id) => {
        Axios.put(`http://localhost:3001/libro/${id}`, {
            newTitle: newTitle,
            newAutor: newAutor,
            newCategory: newCategory,
            newEditorial: newEditorial,
            newDate: newDate
        })
        .then(()=>{
            alert('updated');
        })
        .catch((error)=>{
            console.log(error);
        });
    }  

    const modalInsertar = () => {
        setModal(current => !current)
    }

    return ( 
        <div className="App">
            {   
                spinShow ? <Spinner></Spinner> : null
            } 
                <br />
                <button className="btn btn-success" onClick={() => modalInsertar()}>Agregar Libro</button>
                <br /><br />
                <table className="table">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>Categoria</th>
                        <th>Editorial</th>
                        <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookList.libros?.map((value) => {
                            return(
                                <tr>    
                                <td>{value._id}</td>
                                <td>{value.titulo}</td>
                                <td>{value.autor}</td>
                                <td>{value.categoria}</td>
                                <td>{value.editorial}</td>
                                <td>{value.fecha}</td>
                                <td>
                                    <button className="btn btn-danger" onClick = {() => {deleteBook(value._id) 
                                                                                         setBookDeleted(value._id)}}>
                                        <FontAwesomeIcon icon={faTrashAlt} />
                                    </button>
                                </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>

                <Modal isOpen={modal}>
                    <ModalHeader style={{display: 'block'}}>
                        
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="nombre">Titulo</label>
                            <input className="form-control" type="text" name="titulo" id="titulo" onChange={(event) => {setTitulo(event.target.value)}}/>
                            <br />
                            <label htmlFor="nombre">Autor</label>
                            <input className="form-control" type="text" name="autor" id="autor" onChange={(event) => {setAutor(event.target.value)}}/>
                            <br />
                            <label htmlFor="nombre">Categoria</label>
                            <input className="form-control" type="text" name="categoria" id="categoria" onChange={(event) => {setCategoria(event.target.value)}}/>
                            <br />
                            <label htmlFor="nombre">Editorial</label>
                            <input className="form-control" type="text" name="editorial" id="editorial" onChange={(event) => {setEditorial(event.target.value)}}/>
                            <br />
                            <label htmlFor="nombre">Fecha</label>
                            <input className="form-control" type="date" name="fecha" id="fecha" onChange={(event) => {setFecha(event.target.value)}}/>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <button className="btn btn-success" onClick={() => addBook()}>
                            Agregar
                        </button>
                        <button className="btn btn-danger" onClick={() => modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>
            </div>
    );
}

export default Libro;