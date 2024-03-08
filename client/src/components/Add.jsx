import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Add() {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        cover: "",
        price: 0
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
        setBook((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:8000/books", book);
            navigate("/");
        }catch(err) {
            console.log(err);
        }
    }

    return (
        <form action="#" className="form">
            <h1>Add New Book</h1>
            <input type="text" placeholder="Title of the Book" name="title" onChange={handleChange} />
            <input type="text" placeholder="Description" name="desc" onChange={handleChange} />
            <input type="text" placeholder="Cover" name="cover" onChange={handleChange} />
            <input type="number" placeholder="0.00" name="price" onChange={handleChange} />
            <button className="formButton" onClick={handleClick}>Add</button>
        </form>
    )
}

export default Add;