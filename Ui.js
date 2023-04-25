/* Class that handles creation of UI elements*/

export class Ui {

    // Creates a city div and puts it in the city section
    static createCity(city) {
        const citySection = document.getElementById("city-section");

        const div = document.createElement("div");
        div.className = "col-12 d-flex justify-content-between";

        const cityName = document.createElement("p");
        cityName.className = "city-name";
        cityName.textContent = `${city.name}, ${city.state}, ${city.country}`;
        div.appendChild(cityName);

        const cityTemp = document.createElement("p");
        cityTemp.textContent = `${city.temp}° F`;
        div.appendChild(cityTemp);

        const deleteCity = document.createElement("a");
        deleteCity.className = "delete-city";
        deleteCity.textContent = "X";
        cityTemp.appendChild(deleteCity);

        citySection.appendChild(div);
    }

    // Creates a city card and puts it in the card section
    static createCityCard(city) {
        const icon = document.createElement("i");
        if (city.iconId > 200 & city.iconId < 299) {
            icon.className = "fa-solid fa-cloud-bolt icon-spacer";
        } else if (city.iconId > 300 & city.iconId < 599) {
            icon.className = "fa-solid fa-cloud-rain icon-spacer";
        } else if (city.iconId > 600 & city.iconId < 699) {
            icon.className = "fa-solid fa-cloud-bolt icon-spacer";
        } else if (city.iconId > 700 & city.iconId <= 800) {
            icon.className = "fa-solid fa-sun icon-spacer";
        } else if (city.iconId > 800 & city.iconId < 899) {
            icon.className = "fa-solid fa-cloud-sun icon-spacer";
        }

        const cityCard = document.getElementById("card-section");
        cityCard.innerHTML = "";

        const cardDiv = document.createElement("div");
        cardDiv.className = "card mx-auto mt-3";
        const div = document.createElement("div");
        div.className = "card-body";

        const cityName = document.createElement("h3");
        cityName.className = "card-title";
        cityName.textContent = `${city.name}, ${city.state}, ${city.country}`;;
        cityName.appendChild(icon);
        div.appendChild(cityName);

        const cityTemp = document.createElement("p");
        cityTemp.className = "card-text";
        cityTemp.textContent = `Temperature: ${city.temp}° F`;
        div.appendChild(cityTemp);

        const cityHumidity = document.createElement("p");
        cityHumidity.className = "card-text";
        cityHumidity.textContent = `Humidity: ${city.humidity}%`;
        div.appendChild(cityHumidity);

        const cityRain = document.createElement("p");
        cityRain.className = "card-text";
        cityRain.textContent = `Weather: ${city.weather}`;
        div.appendChild(cityRain);

        cardDiv.appendChild(div);

        cityCard.appendChild(cardDiv);
    }

    // Empties the city section of its contents
    static emptyCitySection() {
        const citySection = document.getElementById("city-section");

        while (citySection.firstChild) {
            citySection.removeChild(citySection.firstChild);
        }
    }
}