import { SetStateAction, useEffect, useState } from "react";
import Book from "../model/Book";
import { Button, Form } from "react-bootstrap";
import { cp } from "fs";
import SearchBook from "../components/SearchBook";

export default function Books() {

    const [books, setBooks] = useState<Book[]>();
    const [currentBook, setCurrentBook] = useState<Book>();

    async function getAllBooks() {

    }

    useEffect(() => {
        console.log(currentBook);
    }, [currentBook]);


    return (
        <div className="books-container container-fluid p-5 mt-5">
            <h1 className="font-weight-bold text-center">
                Book Manager
            </h1>
            <SearchBook setCurrentBook={setCurrentBook}/>

        </div>
    );

}