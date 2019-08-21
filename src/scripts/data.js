const data = Object.create({
    getInterests: () => {
        return fetch("http://localhost:8088/interests?_expand=place")
            .then(response => response.json());
    }

});

export default data;