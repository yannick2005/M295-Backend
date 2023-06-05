'use strict'

const http = require('http');
let url = "http://api.openweathermap.org/geo/1.0/direct?q=Zurich&limit=5&appid=67df2bd5acc0d3f9a295204c264d17fc";

http.get({url: url, json: true, headers: {'User-Agent': 'request'}}, (err, res, data) => {
    if (err) {
        console.log('Error:', err);
    } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
    } else {
        // data is already parsed as JSON:
        console.log(data);
    }
});
