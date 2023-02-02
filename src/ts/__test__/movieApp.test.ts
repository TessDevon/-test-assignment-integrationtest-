/**
 * @jest-environment jsdom
 */

import * as movieApp from "./../movieApp"
//import { init, handleSubmit, createHtml, displayNoResult} from "../movieApp";
import { toBindingIdentifierName, valueToNode } from "@babel/types";
import { resolve } from "path";
import { movies } from "../services/__mocks__/movieservices";
import { getData } from "../services/__mocks__/movieservices";

jest.mock("./../services/movieservice.ts");

test("should check if handleSubmit is checked", () =>{
    //arrage
    document.body.innerHTML = `
    <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
    </form>
    `;

    //act
    movieApp.init();
    let spy = jest.spyOn(movieApp, 'handleSubmit').mockReturnValue( new Promise<void>((resolve) =>
        resolve()
    )); 

    //assert
    (document.querySelector('#searchForm') as HTMLFormElement)?.submit();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore()
});

describe("Tests for handleSubmit", () => {
   test("Should test handleSubmit known search", () => {
        //arrage

    document.body.innerHTML = `
    <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>
    `;

        let spy = jest.spyOn(movieApp, "createHtml").mockReturnValue(); 
        (document.querySelector("#searchText") as HTMLInputElement).value = "Dödens grotta";

        //act
        movieApp.handleSubmit();

        //assert
        expect(spy).toBeCalled();
    });

    test("Should test handleSubmit unknown search", () => {
        //arrage
        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;

        let spy = jest.spyOn(movieApp, "displayNoResult").mockReturnValue(); 
        (document.querySelector("#searchText") as HTMLInputElement).value = "Bondens liv";

        //act
        movieApp.handleSubmit();

        //assert
        expect(spy).toBeCalled();
    });

    test("Should test handleSubmit without searchword", () => {
        //arrage
        document.body.innerHTML = `
        <form id="searchForm">
            <input type="text" id="searchText" placeholder="Skriv titel här" />
            <button type="submit" id="search">Sök</button>
        </form>
        <div id="movie-container"></div>
        `;

        let spy = jest.spyOn(movieApp, "displayNoResult").mockReturnValue(); 
        (document.querySelector("#searchText") as HTMLInputElement).value = "";

        //act
        movieApp.handleSubmit();

        //assert
        expect(spy).toBeCalled();
    });
});

test("Should test createHtml to whrite movies", () => {
    //arrage
   document.body.innerHTML = `
    <div id="movie-container">
    </div>
    `;
    let container: HTMLDivElement = document.getElementById("movie-container") as HTMLDivElement;

    //act
    movieApp.createHtml(movies, container);

    //assert
    expect(container.children.length).toBe(4);
    expect(container.children[0].children[0].innerHTML).toBe("Dödens grotta");
});

test("Should test displayNoResult whites", () => {
    //arrage
    document.body.innerHTML = `
    <div id="movie-container">
    </div>
    `;
    let container: HTMLDivElement = document.getElementById("movie-container") as HTMLDivElement;

    //act
    movieApp.displayNoResult(container);

    //assert
    //(document.querySelector('#searchform') as HTMLFormElement)?.submit();
    expect(container.children.length).toBe(1);
    expect(container.children[0].innerHTML).toBe("Inga sökresultat att visa");
});
