"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var form = document.querySelector('form');
var addressInput = document.getElementById('address');
var GOOGLE_API_KEY = 'AIzaSyAXz8uafQlznKcPvo-4_wf7mNLTuu4_dm0';
function searchAddressHandler(event) {
    event.preventDefault();
    var enteredAddress = addressInput.value;
    axios_1.default
        .get("https://maps.googleapis.com/maps/api/geocode/json?address=".concat(encodeURI(enteredAddress), "&key=").concat(GOOGLE_API_KEY))
        .then(function (res) {
        if (res.data.status !== 'OK') {
            throw new Error('Could not fetch location!');
        }
        var coordinates = res.data.results[0].geometry.location;
        var map = new google.maps.Map(document.getElementById('map'), {
            center: coordinates,
            zoom: 16
        });
        new google.maps.Marker({ position: coordinates, map: map });
    })
        .catch(function (err) {
        alert(err.message);
        console.log(err);
    });
}
form.addEventListener('submit', searchAddressHandler);
