export default {
    SINGLE_BOOK_API: (openLibraryId: string | undefined) => `https://openlibrary.org/api/books?bibkeys=ISBN:${openLibraryId}&format=json&details=true`,
};