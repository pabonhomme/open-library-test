import { SetStateAction, useEffect, useState } from "react";
import Book from "../model/Book";
import { Button, Container, Form, Row } from "react-bootstrap";
import { cp } from "fs";
import SearchBook from "../components/SearchBook";
import BookCard from "../components/BookCard";

export default function Books() {

    const [books, setBooks] = useState<Book[]>([]);
    const [currentBook, setCurrentBook] = useState<Book | undefined>();
    const [error, setError] = useState<boolean>(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (currentBook) {
            if (books.findIndex(book => book.key === currentBook.key) == -1) {
                setSuccess(true);
                const booksCopy = [...books];

                booksCopy.push(currentBook);

                setBooks(booksCopy);
                setTimeout(() => {

                    setSuccess(false);
                }, 1000);
            } else {
                setError(true);
                setTimeout(() => {

                    setError(false);
                }, 1000);
            }

        }

    }, [currentBook]);

    return (
        <div className="books-container container-fluid p-5 mt-5">
            <h1 className="font-weight-bold text-center">
                Book Manager
            </h1>
            <SearchBook setCurrentBook={setCurrentBook}
                setError={setError} />
            {error && (
                <p className="alert alert-danger mt-3">Book not found or already added</p>
            )}
            {success && (
                <p className="alert alert-success mt-3">Book found</p>
            )}
            <div className="books-list">
                {books.length === 0 && (<Container className="grid-no-books p-5">
                    <Row className="justify-content-md-center">
                        <div>No book added</div>
                    </Row>
                </Container>)}
                {books &&
                    books.map((book) => {
                        return <BookCard key={book.key} book={book} />
                    })
                }
            </div>

        </div>
    );

}