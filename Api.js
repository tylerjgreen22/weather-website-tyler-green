/* Class that handles all calls to API*/
import API_KEY from "./apiKey.js";
import { Ls } from "./Ls.js";

export class Api {

    // Makes a call to the Openweather API and stores the data in local storage
    static async getData(lat, lon) {
        const apiKey = API_KEY;
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;

        try {
            const response = await fetch(api);
            const data = await response.json();

            let lsData = Ls.getFromLs();
            Ls.setLs('data', lsData.concat(data));
        } catch (error) {
            console.error(error);
            window.alert("an error has occured");
        }
    }

    // Makes a call to the Openweather Geo API to get the lat and lon of a given city
    static async getCity(cityName, country) {
        const apiKey = '22612070b9aed2863e5dfe56c04b0759';
        let api;
        if (country) {
            api = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${country}&limit=5&appid=${apiKey}`;
        } else {
            api = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`;
        }


        try {
            const response = await fetch(api);
            const data = await response.json();

            const lat = data[0].lat;
            const lon = data[0].lon;

            await this.getData(lat, lon);
        } catch (error) {
            console.error(error);
            window.alert("city not found");
        }
    }
}