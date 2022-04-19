import { DraggableId, DraggableLocation } from "react-beautiful-dnd";
export declare type Id = string;
export declare type AuthorColors = {
    soft: string;
    hard: string;
};
export declare type Author = {
    id: Id;
    name: string;
    avatarUrl: string;
    url: string;
    colors: AuthorColors;
};
export declare type Quote = {
    id: Id;
    content: string;
    author: Author;
};
export declare type Dragging = {
    id: DraggableId;
    location: DraggableLocation;
};
export declare type QuoteMap = {
    [key: string]: Quote[];
};
export declare type Task = {
    id: Id;
    content: string;
};
