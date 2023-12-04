import { SetStateAction, useState } from "react";
import Book from "../model/Book";
import Author from "../model/Author";

interface BookCardProps {
    book: Book;
}

export default function BookCard({ book }: BookCardProps) {


    return (
        <div className="d-flex flex-column book-card p-2">
            <div className="d-flex justify-content-around">

                <h6 className="book-title">{book.title}</h6>
                <span className="">{book.publish_date}</span>

                {!book.authors && (<span>No author</span>)
                }
                {book.authors && (<span>{book.authors?.map((author: Author) => author.name).join(", ")}</span>)
                }

            </div>

            <input
                className="form-control input-description"
                type="text"
                value={book.description}
                placeholder="Enter a description ..."
            />

        </div>
    );
}