import { SetStateAction, useState } from "react";
import { Button, Form } from "react-bootstrap"
import config from "../config";
import Book from "../model/Book";

interface SearchBookProps {
    setCurrentBook: (book: Book) => void;
    setError: (val: boolean) => void;
}

export default function SearchBook({ setCurrentBook, setError }: SearchBookProps) {

    const [openLibraryId, setOpenLibraryId] = useState<string>();



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


                setCurrentBook(book[`ISBN:${openLibraryId}`].details);
                setOpenLibraryId("");

            })
            .catch((error: any) => {
                setError(true);
                setTimeout(() => {

                    setError(false);
                }, 1000);
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
    </div>

    );
}