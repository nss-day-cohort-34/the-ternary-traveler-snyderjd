import data from "./data.js";
import dom from "./dom.js";
import interestMod from "./interestMod.js";

data.getInterests("interests").then(parsedInterests => {
    console.log(parsedInterests);
});

interestMod.displayInterests();