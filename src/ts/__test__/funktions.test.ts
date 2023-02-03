/**
 * @jest-environment jsdom
 */

import { movieSort } from "../functions";
import { movies } from "../services/__mocks__/movieservice";
import { IMovie } from "../models/Movie";

let samemovies: IMovie[] = [
    {Title:"Dödens grotta", imdbID:"4", Type:"skräck", Poster:"img", Year:"1989"},
    {Title:"Dödens grotta", imdbID:"4", Type:"skräck", Poster:"img", Year:"1989"}
];

let moviesInOtherOrder: IMovie[] = [
    {Title:"Äventyr i yttre rymden", imdbID:"5", Type:"si-fi", Poster:"img", Year:"2025"},
    {Title:"Julens små glädjestunder", imdbID:"2", Type:"drama", Poster:"img", Year:"2025"}, 
    {Title:"Jag vet vad som hände förra sommaren", imdbID:"3", Type:"humor", Poster:"img", Year:"2000"},
    {Title:"Dödens grotta", imdbID:"4", Type:"skräck", Poster:"img", Year:"1989"}
];

describe("MovieSort", () => {
    test("sholud test movieSortUp", () => { 
        //act
        movieSort(movies, true);
        
        //assert
        expect(movies[0].Title).toBe("Dödens grotta");
    });

    test("sholud test movieSortDown", () => { 
        //act
        movieSort(movies, false);

        //assert
        expect(movies[0].Title).toBe("Äventyr i yttre rymden");
    });
});

describe("MovieSortListInOtherOrder", () => {

    test("sholud test movieSortDown", () => { 
        //act
        movieSort(moviesInOtherOrder, false);

        //assert
        expect(moviesInOtherOrder[0].Title).toBe("Äventyr i yttre rymden");
    });    
    
    test("sholud test movieSortUp", () => { 
        //act
        movieSort(moviesInOtherOrder, true);

        //assert
        expect(moviesInOtherOrder[0].Title).toBe("Dödens grotta");
    });
});

describe("MovieSortSameValue", () => {
    test("sholud test moviSameValue", () => { 
        //act
        movieSort(samemovies, true);

        //assert
        expect(samemovies[0].Title).toBe("Dödens grotta");
    });

    test("sholud test moviSameValue", () => { 
        //act
        movieSort(samemovies, false);

        //assert
        expect(samemovies[0].Title).toBe("Dödens grotta");
    });
});