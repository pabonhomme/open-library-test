import { SetStateAction, useState } from "react";
import Book from "../model/Book";
import { Button, Form } from "react-bootstrap";
import { cp } from "fs";
import SearchBook from "../components/SearchBook";

export default function Books() {

    const [books, setBooks] = useState<Book>();

    async function getAllBooks() {

    }

    return (
        <div className="books-container container-fluid p-5 mt-5">
            <h1 className="font-weight-bold text-center">
                Book Manager
            </h1>
            <SearchBook/>
            

        </div>
    );

}