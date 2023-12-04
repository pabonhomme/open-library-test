import Book from "../model/Book";

interface BookCardProps {
    book: Book;
}

export default function BookCard({ book }: BookCardProps) {



    return (
        <div className="book-card">
            <span>{book.title}</span>

        </div>
    );
}