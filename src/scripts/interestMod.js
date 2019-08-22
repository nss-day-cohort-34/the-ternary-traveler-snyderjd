import data from "./data.js";
import dom from "./dom.js";

const interestMod = Object.create({
    displayInterestsPage: () => {

        dom.renderInterestForm();

        interestMod.displayInterests();
    },

    displayInterests: () => {
        const interestsContainer = document.querySelector(".interests__container");

        data.getInterests().then(parsedInterests => {
            interestsContainer.innerHTML = "";

            parsedInterests.forEach(interest => {
                const interestHTML = dom.createInterestHTML(interest);
                dom.addToDOM(interestsContainer, interestHTML);
            });
        });
    },

    createNewInterestObject: (placeId, name, description, cost, review) => {
        return {
            placeId: placeId,
            name: name,
            description: description,
            cost: cost,
            review: review
        };
    },

});

export default interestMod;