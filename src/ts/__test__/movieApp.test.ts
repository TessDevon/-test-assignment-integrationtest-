/**
 * @jest-environment jsdom
 */

import * as movieApp from "./../movieApp"
import { movies } from "../services/__mocks__/movieservice";

jest.mock("./../services/movieservice.ts");

beforeEach(() => {
    document.body.innerHTML = "";
});

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

test("should test createHtml", () => {
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

describe("Tests for handleSubmit", () => {
    test ("should test handleSubmit known search", async () => {
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
        await movieApp.handleSubmit();

        //assert
        expect(spy).toBeCalled();
        spy.mockRestore();
    });

    test("should test handleSubmit unknown search", async () => {
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
        await movieApp.handleSubmit();

        //assert
        expect(spy).toBeCalled();
        spy.mockRestore();
    });

    test("should test handleSubmit without searchword", async () => {
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
        await movieApp.handleSubmit();

        //assert
        expect(spy).toBeCalled();
        spy.mockRestore();
    });
});

test("should test displayNoResult", () => {
    //arrage
    document.body.innerHTML = `
    <div id="movie-container">
    </div>
    `;
    let container: HTMLDivElement = document.getElementById("movie-container") as HTMLDivElement;

    //act
    movieApp.displayNoResult(container);

    //assert
    expect(container.children.length).toBe(1);
    expect(container.children[0].innerHTML).toBe("Inga sökresultat att visa");
});
