/**
 * @jest-environment jsdom
 */
import { movieSort } from "../functions";
import { movies } from "../services/__mocks__/movieservice";

test("Sholud test movieSort", () => { 

    movieSort(movies, true);

    //expect(container.children.length).toBe(4);
    //expect(container.children[0].children[0].innerHTML).toBe("Dödens grotta");
});