/* Makes use of the other classes to provide interactivity to the html file*/

import { City } from "./City.js";
import { Api } from "./Api.js";
import { Ui } from "./Ui.js";
import { Ls } from "./Ls.js";

// Arrray to hold all of the cities
let cities = [];

// Gets the data of each city from local storage and creates a city object that is then push onto the cities array. Then creates a UI element for each city
const getCities = function () {
    let data = Ls.getFromLs();

    data.forEach(element => {
        cities.push(new City(element.name, element.main.temp, element.main.humidity, element.weather[0].main, element.sys.country, element.weather[0].id));
    })

    cities.forEach((city) => {
        Ui.createCity(city);
    });

}

document.addEventListener('DOMContentLoaded', getCities);

// Adds a city by taking the value from the searchbar, and adding it to the cities in local storage using the api method get city. 
// Splits the search value so that a country can be specified
// It then empties the city section of the UI, gets the cities from local storage which will now include the new city, and repopulates the city section
const addCity = async function () {
    const searchVal = document.getElementById("searchbar");
    try {
        const searchValList = searchVal.value.split(",");
        await Api.getCity(searchValList[0], searchValList[1]);
        searchVal.value = "";
    } catch (error) {
        console.error(error);
        window.alert("an error has occured");
    }


    if (cities) {
        cities = [];
    }
    Ui.emptyCitySection();
    getCities();
}

const search = document.getElementById("search");
search.addEventListener('click', addCity);

// When clicking on the city section, if a name is selected it will create a card for that city
// When click on the red X it will remove a city
const citySectionOptions = function (e) {
    if (e.target.className === "delete-city") {
        const target = e.target.parentElement.parentElement;
        removeCity(target);
    } else if (e.target.className === "city-name") {
        // This is split like this so that the load city card can find the city name properly as the country is not included in the city name
        const target = e.target.innerText;
        const targetList = target.split(',');
        // This is needed for if a city has multiple comma seperated names in its name. It recombines the city name, up to the country but leaves off the country
        // That way when the load city card gets the target name, it can properly find it
        if (targetList.length > 2) {
            let targetString = "";
            for (let i = 0; i < targetList.length - 1; i++) {
                targetString += `${targetList[i]},`;
            }
            targetString = targetString.slice(0, - 1);
            loadCityCard(targetString);
            return
        }
        loadCityCard(targetList[0])
    }
}

// This removes a city from local storage and from the UI using the target city name
const removeCity = function (target) {
    const cityName = target.firstChild.textContent;
    const cityNameList = cityName.split(',');
    Ls.removeFromLs(cityNameList[0]);
    target.remove();
}

// This will find the targeted city in the array of cities and create a card for it
const loadCityCard = function (target) {
    const targetCity = cities.find(city => city.name === target);
    Ui.createCityCard(targetCity);
}

const citySection = document.getElementById("city-section");
citySection.addEventListener('click', citySectionOptions);