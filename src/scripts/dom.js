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
    }
});

export default dom;