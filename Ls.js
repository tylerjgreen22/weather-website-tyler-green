/* Class containing methods for working with local storage */

export class Ls {

    // Gets data from local storage
    static getFromLs() {
        let data;
        if (localStorage.getItem('data') === null) {
            data = [];
        } else {
            data = JSON.parse(localStorage.getItem('data'));
        }

        return data;
    }

    //Stores data in local storage
    static setLs(dataName, data) {
        localStorage.setItem(dataName, JSON.stringify(data));
    }

    // Removes data from local storage
    static removeFromLs(cityName) {
        let data = this.getFromLs();

        data.forEach((city, index) => {
            if (city.name === cityName) {
                data.splice(index, 1);
            }
        })

        this.setLs('data', data);
    }
}