//import { resolve } from "path";
import { IOmdbResponse } from "../../models/IOmdbResponse";
import axios from "axios";
import { IMovie } from "../../models/Movie";
import { resolve } from "path";
import { title } from "process";

let movies: IMovie[] = [
    {Title:"Dödens grotta", imdbID:"fyra", Type:"skräck", Poster:"finns", Year:"1989"},
    {Title:"Jag vet vad som hände förra sommaren", imdbID:"tre", Type:"humor", Poster:"finns", Year:"2000"},
    {Title:"Julens små glädjestunder", imdbID:"två", Type:"drama", Poster:"finns", Year:"2025"},  
    {Title:"Äventyr i yttre rymden", imdbID:"fem", Type:"si-fi", Poster:"finns", Year:"2025"}
];

export const getData = async (searchText: string): Promise<IMovie[]> => {
    return new Promise ((resolve) => {
        if (searchText != "") {
            resolve(movies.filter((p) => p.Title === searchText));
        } else {
            resolve([]);
        }    
    });
};