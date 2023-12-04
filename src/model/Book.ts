import Author from "./Author";

export default interface Book{
    title: string;
    key: string;
    publish_date: number;
    authors?: Author[];
};