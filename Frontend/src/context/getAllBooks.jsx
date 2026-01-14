import React, { useEffect, useState } from "react";
import axios from "axios";
import { getAllBooks } from '../api/books';

function useGetAllBooks() {

    const [allBooks, setAllBooks] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getBooks = async () => {
            setLoading(true);
            try {
                const books = await getAllBooks();
                console.log(books);
                setAllBooks(books.data)
                setLoading(false);
            } catch (error) {
                console.log("Error in useGetAllBooks: " + error);
            }
        };
        getBooks();
    }, []);
    return { allBooks, loading };
}

export default useGetAllBooks;