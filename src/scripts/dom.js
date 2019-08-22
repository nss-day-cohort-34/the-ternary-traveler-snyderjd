import data from "./data.js";

const dom = Object.create({
    createInterestHTML: (interestObject) => {
        return `<section class="interest__item interest__item--${interestObject.id}">
                    <h2 class="interest__item--heading">${interestObject.name}</h2>
                    <h5 class="interest__item--place">Place: ${interestObject.place.name}</h5>
                    <p class="interest__item--description">Description: ${interestObject.description}</p>
                    <p class="interest__item--cost">Cost: ${interestObject.cost}</p>
                    <p class="interest__item--review">Review: ${interestObject.review}</p>
                    <button class="interest__item--edit interest__edit--${interestObject.id}">Edit</button>
                    <button class="interest__item--delete interest__delete--${interestObject.id}">Delete</button>
                </section>`;
    },

    addToDOM: (container, HTMLString) => {
        container.innerHTML += HTMLString;
    },

    createInterestForm: () => {
        const formHTML =    `<section class="interest__form--fields">
                                <h2>Add/Edit Point of Interest</h2>
                                <input type="hidden" id="interestId" class="interestId--hidden" value=""/>
                                <label for="interest__form--name">Name </label>
                                <input id="interest__form--name" class="interest__form--name" type="text">
                                <label for="interest__form--desc">Description </label>
                                <input id="interest__form--desc" class="interest__form--desc" type="text">
                                <label for="interest__form--cost">Cost </label>
                                <input id="interest__form--cost" class="interest__form--cost" type="text">
                                <label for="interest__form--review" class="review__label hidden">Review </label>
                                <input id="interest__form--review" class="interest__form--review hidden" type="text">
                                <label for="interest__form--place">Place </label>
                                <select name="placeList" id="interest__form--place" class="interest__form--place">
                                </select>
                                <button class="interest__form--submit">Submit</button>
                            </section>`;
        return formHTML;
    },

    createOptionsHTML: () => {
        data.getPlaces().then(parsedPlaces => {
            const optionSelect = document.querySelector("#interest__form--place");
            console.log(parsedPlaces);
            parsedPlaces.forEach(place => {
                const optionHTML = `<option value="${place.name}">${place.name}</option>`;
                optionSelect.innerHTML += optionHTML;
            });
        });
    },

    renderInterestForm: () => {
        const interestFormContainer = document.querySelector(".interests__form");
        const interestForm = dom.createInterestForm();
        dom.addToDOM(interestFormContainer, interestForm);
        dom.createOptionsHTML();
    }
});

export default dom;