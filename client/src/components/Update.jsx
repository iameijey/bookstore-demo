import {useState} from "react";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";

function Update() {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        cover: "",
        price: 0
    })

    const navigate = useNavigate();
    const location = useLocation();

    const bookId = location.pathname.split("/")[2]; 

    const handleChange = (e) => {
        setBook((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/books/${bookId}`, book);
            navigate("/");
        }catch(err) {
            console.log(err);
        }
    }

    return (
        <form action="#" className="form">
            <h1>Update Book</h1>
            <input type="text" placeholder="Title of the Book" name="title" onChange={handleChange} />
            <input type="text" placeholder="Description" name="desc" onChange={handleChange} />
            <input type="text" placeholder="Cover" name="cover" onChange={handleChange} />
            <input type="number" placeholder="0.00" name="price" onChange={handleChange} />
            <button className="formButton" onClick={handleClick}>Update</button>
        </form>
    )
}

export default Update;