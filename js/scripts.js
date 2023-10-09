const gallery = document.getElementById("gallery");

fetch('https://randomuser.me/api/?results=12')
    .then(checkStatus)
    .then(res => res.json())
    .then((response) => {
        const workers = response.results;
        makeCard(workers);
    })
    .catch(error => console.error(error))

function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

function makeCard(person) {
    person.forEach((user) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
        <div class="card-img-container">
            <img class="card-img" src="${user.picture.medium}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
            <p class="card-text">${user.email}</p>
            <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
        </div>`;
        gallery.appendChild(card);
    });
}