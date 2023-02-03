import { IMovie } from "../../models/Movie";


export let movies: IMovie[] = [
    {Title:"Dödens grotta", imdbID:"4", Type:"skräck", Poster:"img", Year:"1989"},
    {Title:"Jag vet vad som hände förra sommaren", imdbID:"3", Type:"humor", Poster:"img", Year:"2000"},
    {Title:"Julens små glädjestunder", imdbID:"2", Type:"drama", Poster:"img", Year:"2025"},  
    {Title:"Äventyr i yttre rymden", imdbID:"5", Type:"si-fi", Poster:"img", Year:"2025"}
];

export const getData = async (searchText: string): Promise<IMovie[]> => {
    return new Promise ((resolve) => {
        if (searchText != "") {
            resolve(movies.filter((p) => p.Title === searchText));
        } else {
            resolve([]);
        }    
    });
}
