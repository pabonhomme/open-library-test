import { SetStateAction, useEffect, useState } from "react";
import Book from "../model/Book";
import { Button, Container, Dropdown, Form, Row } from "react-bootstrap";
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

    const sortBooks = (sortBy: string) => {
        let sortedBooks = [...books];
        if (sortBy === "dateAdded") {
            sortedBooks.sort((a, b) => {
                if (a.dateAdded && b.dateAdded) {
                    return a.dateAdded.getTime() - b.dateAdded.getTime();
                }
                // Handle cases where dateAdded is undefined
                return 0;
            });
        } else if (sortBy === "titleAscending") {
            sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === "titleDescending") {
            sortedBooks.sort((a, b) => b.title.localeCompare(a.title));
        }

        setBooks(sortedBooks);
    };

    const handleSortClick = (sortOption: string) => {
        sortBooks(sortOption);
    };

    const handleDescriptionChange = (updatedBook: Book) => {
        setBooks((prevBooks) => {
            const updatedBooks = prevBooks.map((book) => {
                if (book.key === updatedBook.key) {
                    return updatedBook;
                }
                return book;
            });
            return updatedBooks;
        });
    };

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
            <div className="d-flex justify-content-end">
                <Dropdown className="align-self-end">
                    <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        Filter
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleSortClick("dateAdded")}>Added order</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortClick("titleAscending")}>Title ascending</Dropdown.Item>
                        <Dropdown.Item onClick={() => handleSortClick("titleDescending")}>Title descending</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>

            <div className="books-list mt-4">
                {books.length === 0 && (<Container className="grid-no-books p-5">
                    <Row className="justify-content-md-center">
                        <div>No book added</div>
                    </Row>
                </Container>)}
                {books &&
                    books.map((book) => {
                        return <BookCard
                            key={book.key}
                            book={book}
                            onDescriptionChange={handleDescriptionChange}
                        />
                    })
                }
            </div>

        </div>
    );

}