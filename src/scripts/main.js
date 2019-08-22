import data from "./data.js";
import dom from "./dom.js";
import interestMod from "./interestMod.js";
import placesMod from "./placesMod.js";


interestMod.displayInterestsPage();
dom.renderPlaceForm();
placesMod.displayPlaces();

const submitButton = document.querySelector(".interest__form--submit");
submitButton.addEventListener("click", event => {
    // Get references to inputs
    const interestName = document.querySelector(".interest__form--name");
    const interestDescription = document.querySelector(".interest__form--desc");
    const interestCost = document.querySelector(".interest__form--cost");
    const hiddenInput = document.querySelector(".interestId--hidden");
    const interestReview = document.querySelector(".interest__form--review");

    // Get interests and check place to get the placeId
    const placeInput = document.querySelector(".interest__form--place");
    console.log(placeInput.value);

    // Save a new interest if hiddenInput field is blank
    if (hiddenInput.value === "") {

        data.getPlaces().then(parsedPlaces => {
            let placeId = 0;
            parsedPlaces.forEach(place => {
                if (placeInput.value === place.name) {
                    placeId = place.id;
                    console.log(place);
                    console.log(placeId);
                }
            });
            return placeId;
        })
        .then((placeId) => {
            const newInterest = interestMod.createNewInterestObject(
                placeId,
                interestName.value,
                interestDescription.value,
                parseInt(interestCost.value),
                interestReview.value);

            data.saveInterest(newInterest)
                .then(interestMod.displayInterests);
        });
    } else {
        // Edit the point of interest if hiddenInput field is not blank
        data.getPlaces().then(parsedPlaces => {
            let placeId = 0;
            parsedPlaces.forEach(place => {
                if (placeInput.value === place.name) {
                    placeId = place.id;
                }
            });
            return placeId;
        })
        .then((placeId) => {
            const editedInterest = interestMod.createNewInterestObject(
                placeId,
                interestName.value,
                interestDescription.value,
                parseInt(interestCost.value),
                interestReview.value);

            data.editInterest(editedInterest, hiddenInput.value)
                .then(interestMod.displayInterests)
                .then(() => {
                    hiddenInput.value = "";
                    interestReview.classList.add("hidden");
                    document.querySelector(".review__label").classList.add("hidden");
                    interestName.value = "";
                    interestDescription.value = "";
                    interestReview.value = "";
                    interestCost.value = "";
                });
        });
    }

});

const interestsContainer = document.querySelector(".interests__container");
interestsContainer.addEventListener("click", event => {

    if (event.target.classList[0].startsWith("interest__item--edit")) {
        console.log(event.target.classList);
        // Get the id of the interest whose edit button was clicked
        const interestId = event.target.classList[1].split("--")[1];
        console.log(interestId);
        // Get the respective interest from database and use its data to fill the input fields
        data.getInterest(interestId).then(interest => {

            const interestName = document.querySelector(".interest__form--name");
            const interestDescription = document.querySelector(".interest__form--desc");
            const interestCost = document.querySelector(".interest__form--cost");
            const interestReview = document.querySelector(".interest__form--review");
            const reviewLabel = document.querySelector(".review__label");
            const placeInput = document.querySelector(".interest__form--place");
            const hiddenInput = document.querySelector(".interestId--hidden");

            interestName.value = interest.name;
            interestDescription.value = interest.description;
            interestCost.value = interest.cost;
            interestReview.value = interest.review;
            placeInput.value = interest.place.name;
            hiddenInput.value = interest.id;

            interestReview.classList.remove("hidden");
            reviewLabel.classList.remove("hidden");
        });
        // Delete point of interest if user clicks on delete button and confirms it
    } else if (event.target.classList[0].startsWith("interest__item--delete")) {
        const interestId = event.target.classList[1].split("--")[1];
        console.log(interestId);
        const message = "Are you sure you want to delete this point of interest?";

        if (window.confirm(message)) {
            data.deleteInterest(interestId).then(interestMod.displayInterests);
        }
    }
});

// Functionality to add or remove places

const addPlaceButton = document.querySelector(".addPlace__button");
const addPlaceDialog = document.querySelector(".addPlace__container");

addPlaceButton.addEventListener("click", event => {
    addPlaceDialog.showModal();
});

const submitPlaceButton = document.querySelector(".place__form--submit");
submitPlaceButton.addEventListener("click", event => {
    const placeName = document.querySelector(".place__form--place");
    const placeVisa = document.querySelector(".place__form--visa");

    const newPlace = placesMod.createPlaceObject(placeName.value, placeVisa.value);

    data.savePlace(newPlace).then(() => {
        placeName.value = "";
        addPlaceDialog.close();
    });
});

// Close add place form if user clicks "cancel"
const cancelAddPlace = document.querySelector(".place__form--cancel");
cancelAddPlace.addEventListener("click", event => {
    addPlaceDialog.close();
});

