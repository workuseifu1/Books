import { useState, useEffect } from "react";
import BookCreate from './components/BookCreate';
import BookList from "./components/BookList";
import axios from "axios";

function App() {
const [books, setBooks] = useState([]);

const fetchBooks = async () => {
  const response = await axios.get('http://localhost:3001/books');

  setBooks(response.data);
}
useEffect(() => {
  fetchBooks();
}, []);
const editBookById = async (id, newTitle) => {
  const response = await axios.put(`http://localhost:3001/books/${id}`,{title:newTitle});
  
  const updateBooks = books.map((book) => {
    if (book.id === id) {
      return {...book, ...response.data}
    }

    return book;
  });
  setBooks(updateBooks);
};

const deletBookById = async(id) => {
 await axios.delete(`http://localhost:3001/books/${id}`);
  
 const deleteBooks = books.filter((book) =>  {
    return book.id !== id;
  });
  setBooks(deleteBooks);
 }
 const createBook = async(title) => {
  const response = await axios.post('http://localhost:3001/books',{title});
  console.log(response);
    const updateBooks = [
      ...books,
      response.data
    ];
    setBooks(updateBooks);
  }
  return(
    <div>
      <h1>Reading List</h1>
      <BookList books = {books} onDelete ={deletBookById} onEdit={editBookById}/>
      <BookCreate onCreate = {createBook} />
    </div>
  )
}

export default App;