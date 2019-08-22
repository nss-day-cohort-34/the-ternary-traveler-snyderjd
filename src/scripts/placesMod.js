const placesMod = Object.create({

    createPlaceObject: (name, visa_required) => {
        return {
            name: name,
            visa_required: visa_required === "Yes" ? true : false
        };
    }
});

export default placesMod;