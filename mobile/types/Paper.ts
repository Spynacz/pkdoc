import {PaperType} from "./PaperType";

export interface Paper {
    id: number;
    title: string;
    abstractText: string;
    authors: string[];
    publishDate: string; // INFO: should probably be parsed into date
    doi: string;
    points: number;
    privateOnly: boolean;
    type: keyof typeof PaperType;
    keywords: {id: number; text: string};
}
