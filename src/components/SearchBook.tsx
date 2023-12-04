import { SetStateAction, useState } from "react";
import { Button, Form } from "react-bootstrap"
import config from "../config";
import Book from "../model/Book";

interface SearchBookProps {
    setCurrentBook: (book: Book) => void;
}

export default function SearchBook({ setCurrentBook }: SearchBookProps) {

    const [openLibraryId, setOpenLibraryId] = useState<string>();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    async function onsubmit(event: any) {
        event.preventDefault();
        const apiUrl = config.SINGLE_BOOK_API(openLibraryId);

        fetch(apiUrl, {
            method: "GET",
        })
            .then((response) => {
                if (!response.ok) {
                    return response.text().then((errorMessage: any) => {
                        throw new Error(errorMessage);
                    });
                }
                return response.json();
            }).then((book) => {
                setSuccess(true);

                setCurrentBook(book[`ISBN:${openLibraryId}`].details);
                setTimeout(() => {
                    setOpenLibraryId("");
                    setSuccess(false);
                }, 1000);
            })
            .catch((error: any) => {
                setError(error.message);
            });
    }

    function handleBookChange(event: { target: { value: SetStateAction<string | undefined>; }; }) {
        setOpenLibraryId(event.target.value);
    }



    return (<div><Form className="d-flex justify-content-around form-book" onSubmit={onsubmit}>
        <Form.Group className="mb-3 book-input-search" controlId="formBasicBook">
            <Form.Label className="book-text">
                Add a book by Open Library ID Number
            </Form.Label>
            <Form.Control
                className="inputText"
                required={false}
                type="text"
                placeholder="OLID"
                value={openLibraryId}
                onChange={handleBookChange}
            />
        </Form.Group>
        <Button
            className="submit-button-search align-self-center bg-secondary"
            type="submit"
        >
            Add
        </Button>
    </Form>
        {error != null && (
            <p className="alert alert-danger mt-3">{error}</p>
        )}
        {success && (
            <p className="alert alert-success mt-3">Book Added</p>
        )}</div>

    );
}