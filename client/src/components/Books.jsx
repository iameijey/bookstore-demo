import axios from "axios";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";

function Books() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchAllBooks();
    }, [])

    const fetchAllBooks = async () => {
        try {
            const response = await axios.get("http://localhost:8000/books");
            console.log(response);
            setBooks(response.data);
        }catch(err) {
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/books/${id}`);
            window.location.reload();
        }catch(err) {
            console.log(err);
        }
    }
    
    return (
        <>
            <h1>My Bookshop</h1>
            <div className="books">
                {books.map((book) => (
                    <div key={book.book_id} className="book">
                        <img src={book.cover} alt="" />
                        <h2>{book.title}</h2>
                        <p>{book.desc}</p>
                        <span>{book.price}</span>
                        <button className="update">
                            <Link to={`/update/${book.book_id}`}>Update</Link>
                        </button>
                        <button className="delete" onClick={() => handleDelete(book.book_id)}>Delete</button>
                    </div>
                ))}
            </div>
            <button>
                <Link to="/add">Add New Book</Link>
            </button>
        </>
    )
}

export default Books;