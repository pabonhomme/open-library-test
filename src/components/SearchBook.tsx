import { SetStateAction, useState } from "react";
import { Button, Form } from "react-bootstrap"

export default function SearchBook() {

    const [bookName, setBookName] = useState<string>();
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    async function onsubmit(event: any) {
        setSuccess(true);
        setTimeout(() => {
        }, 2000);
    }

    function handleBookChange(event: { target: { value: SetStateAction<string | undefined>; }; }) {
        setBookName(event.target.value);
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