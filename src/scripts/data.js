const data = Object.create({
    getInterests: () => {
        return fetch("http://localhost:8088/interests?_expand=place")
            .then(response => response.json());
    },

    getInterest: (interestId) => {
        return fetch(`http://localhost:8088/interests/${interestId}?_expand=place`)
            .then(response => response.json());
    },

    getPlaces: () => {
        return fetch("http://localhost:8088/places")
            .then(response => response.json());
    },

    saveInterest: (interestObject) => {
        return fetch("http://localhost:8088/interests", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interestObject)
        })
            .then(response => response.json());
    },

    editInterest: (interestObject, interestId) => {
        return fetch(`http://localhost:8088/interests/${interestId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(interestObject)
        })
            .then(response => response.json());
    },

    // Delete an interest from the database
    deleteInterest: (interestId) => {
        return fetch(`http://localhost:8088/interests/${interestId}`, {
            method: "DELETE"
        }).then(response => response.json());
    }

});

export default data;