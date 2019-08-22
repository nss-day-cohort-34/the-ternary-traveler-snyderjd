import data from "./data.js";
import dom from "./dom.js";
import interestMod from "./interestMod.js";


interestMod.displayInterestsPage();

const submitButton = document.querySelector(".interest__form--submit");
submitButton.addEventListener("click", event => {
    // Get references to other inputs
    const interestName = document.querySelector(".interest__form--name");
    const interestDescription = document.querySelector(".interest__form--desc");
    const interestCost = document.querySelector(".interest__form--cost");

    // Get interests and check place to get the placeId
    const placeInput = document.querySelector(".interest__form--place");
    console.log(placeInput.value);

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
            parseInt(interestCost.value));

        data.saveInterest(newInterest)
            .then(interestMod.displayInterests);
    });
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
    }
});

