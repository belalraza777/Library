import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { getAllBooks } from '../api/books';

// Custom hook to fetch all books and manage loading state
// This hook can be used across different components to access the list of books and loading status
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
    const memoizedBooks = useMemo(() => allBooks, [allBooks]);
    return { allBooks: memoizedBooks, loading };
}

export default useGetAllBooks;