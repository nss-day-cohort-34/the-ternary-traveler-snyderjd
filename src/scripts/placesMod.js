import data from "./data.js";
import dom from "./dom.js";

const placesMod = Object.create({

    createPlaceObject: (name, visa_required) => {
        return {
            name: name,
            visa_required: visa_required === "Yes" ? true : false
        };
    },

    displayPlaces: () => {
        const placesContainer = document.querySelector(".places__container");
        data.getPlaces().then(parsedPlaces => {
            placesContainer.innerHTML = "";

            parsedPlaces.forEach(place => {
                const placeHTML = dom.createPlaceHTML(place);
                dom.addToDOM(placesContainer, placeHTML);
            });
        });
    }
});

export default placesMod;