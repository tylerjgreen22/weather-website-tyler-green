/* Class that creates a city object*/

export class City {
    constructor(name, temp, humidity, weather, country, iconId = "800", state) {
        this.name = name;
        this.temp = temp;
        this.humidity = humidity;
        this.weather = weather;
        this.country = country;
        this.iconId = iconId;
        this.state = state;
    }
}