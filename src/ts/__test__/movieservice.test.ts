/**
 * @jest-environment jsdom 
 */

import { getData } from './../services/movieservice';
import { movies } from '../services/__mocks__/movieservices'; 

jest.mock("axios", () => ({
    get: async (url:string) => {
        return new Promise((resolve,reject) => {
            if(!url.endsWith("error")) {
            resolve({data:{Search:movies}});
            }
            else {
            reject({data:{Search:[]}});
            }
        });
    },
}));

test("Should get data correctly", async () => {
    let data= await getData("test");

    expect(data.length).toBe(4);
    expect(data[0].Title).toBe("Dödens grotta");
});

test("Should get error getting data",async () => {
    let data = await getData("error");
    
    expect(data.length).toBe(0);
});
