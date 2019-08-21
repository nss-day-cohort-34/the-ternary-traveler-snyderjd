import data from "./data.js";
import dom from "./dom.js";

const interestMod = Object.create({
    displayInterests: () => {
        const interestsContainer = document.querySelector(".interests__container");

        data.getInterests().then(parsedInterests => {
            parsedInterests.forEach(interest => {
                const interestHTML = dom.createInterestHTML(interest);
                dom.addToDOM(interestsContainer, interestHTML);
            });
        });
    }
});

export default interestMod;