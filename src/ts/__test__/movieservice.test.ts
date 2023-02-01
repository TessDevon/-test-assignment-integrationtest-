/*
 * @jest-environment.jsdom 
 */

import {getData} from './../services/movieservice';

jest.mock("axios", () => ({
    get: async (url:string) => {
        return new Promise((resolve,reject) => {
            if(url.endsWith("error")) {
            reject([]);
            }
            else {
            resolve([
                {Title:"Dödens grotta", imdbID:"fyra", Type:"skräck", Poster:"finns", Year:"1989"},
                {Title:"Jag vet vad som hände förra sommaren", imdbID:"tre", Type:"humor", Poster:"finns", Year:"2000"},
                {Title:"Julens små glädjestunder", imdbID:"två", Type:"drama", Poster:"finns", Year:"2025"}])
            }
        });
    }
}));

test("Should get data correctly", async () => {
    let data= await getData("test");
});

test("Should get error getting data",async () => {
    try {
        let data = await getData("error");
    }
    catch(error:any) {
        expect(error.length).toBe(0);
    }
});
