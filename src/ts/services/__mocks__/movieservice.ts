import { IOmdbResponse } from "../../models/IOmdbResponse";
import axios from "axios";
import { IMovie } from "../../models/Movie";
import { resolve } from "path";
import { title } from "process";

export let movies: IMovie[] = [
    {Title:"Dödens grotta", imdbID:"4", Type:"skräck", Poster:"img", Year:"1989"},
    {Title:"Jag vet vad som hände förra sommaren", imdbID:"3", Type:"humor", Poster:"img", Year:"2000"},
    {Title:"Julens små glädjestunder", imdbID:"2", Type:"drama", Poster:"img", Year:"2025"},  
    {Title:"Äventyr i yttre rymden", imdbID:"5", Type:"si-fi", Poster:"img", Year:"2025"}
];

export const getData = async (searchText: string): Promise<IMovie[]> => {
    console.log("Hello");
    return new Promise ((resolve) => {
        console.log(searchText);
        if (searchText != "") {
            resolve(movies.filter((p) => p.Title === searchText));
        } else {
            resolve([]);
        }    
    });
}
