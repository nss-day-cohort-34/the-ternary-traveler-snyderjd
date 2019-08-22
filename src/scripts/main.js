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
    const interestReview = document.querySelector(".interest__form--review");

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

