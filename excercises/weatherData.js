'use strict'

async function getData(){
    const url = "http://api.openweathermap.org/geo/1.0/direct?q=Zurich&limit=5&appid=67df2bd5acc0d3f9a295204c264d17fc";
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log(data)

    } catch(err) {
        console.error(err);
    }
}

getData();

// fetch("https://api.openweathermap.org/geo/1.0/direct?q=Zurich&limit=5&appid=67df2bd5acc0d3f9a295204c264d17fc")
// .then((response) => response.json())
// .then((data) => console.log(data));