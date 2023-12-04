import { SetStateAction, useEffect, useState } from "react";
import Book from "../model/Book";
import { Button, Container, Form, Row } from "react-bootstrap";
import { cp } from "fs";
import SearchBook from "../components/SearchBook";
import BookCard from "../components/BookCard";

export default function Books() {

    const [books, setBooks] = useState<Book[]>([]);
    const [currentBook, setCurrentBook] = useState<Book | undefined>();

    useEffect(() => {
        if (currentBook) {
            const booksCopy = [...books];

            booksCopy.push(currentBook);

            setBooks(booksCopy);
        }
    }, [currentBook]);

    return (
        <div className="books-container container-fluid p-5 mt-5">
            <h1 className="font-weight-bold text-center">
                Book Manager
            </h1>
            <SearchBook setCurrentBook={setCurrentBook} />
            <div className="books-list">
                {books.length === 0 && (<Container className="grid-no-books p-5">
                    <Row className="justify-content-md-center">
                        <div>No book added</div>
                    </Row>
                </Container>)}
                {books && (<Container className="grid-books p-5">
                    {books.map((book) => {
                        return <Row key={book.key} xs={4}><BookCard book={book} /></Row>
                    })}
                </Container>)}
            </div>

        </div>
    );

}