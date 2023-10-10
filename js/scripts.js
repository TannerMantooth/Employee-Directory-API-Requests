/*Code for dynamically adding HTML elements to the DOM 
to create the users on the page for the employee
directory */ 

//Selects gallery div that employee cards will be added to
const gallery = document.getElementById("gallery");

/*Fetches data from url for 12 random employees.
Returns JSON that is used to create users using callback function.
Catch handles errors that may come from request. */
fetch('https://randomuser.me/api/?results=12')
    .then(checkStatus)
    .then(res => res.json())
    .then((response) => {
        const workersInfo = response.results;
        createUsers(workersInfo);
    })
    .catch(error => console.error(error))

//Function that checks status for ok response
function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

//Function that creates the employee card elements and dynamically adds them to the DOM
function createUsers(employee) {
    employee.forEach((user) => {
        const cardElement = document.createElement('div');
        cardElement.innerHTML = `
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text cap">${user.location.city}, ${user.location.state}</p>
            </div>`;
        cardElement.classList.add('card');
        
        //Event listener set up for clicks on the employee cards that creates modal using callback function
        cardElement.addEventListener('click', () => {
            modalOpen(user);
        })
        gallery.appendChild(cardElement);
    });
}

//Function creates modal for user with fetched data when employee card is clicked
function generateModal(user) {
    const modalCon = document.createElement('div');
    modalCon.innerHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${user.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${user.name.first} ${user.name.last}</h3>
                    <p class="modal-text">${user.email}</p>
                    <p class="modal-text cap">${user.location.city}</p>
                    <hr>
                    <p class="modal-text">${formatCell(user)}</p>
                    <p class="modal-text">${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state} ${user.location.postcode}</p>
                    <p class="modal-text">Birthday: ${formatBirthday(user)}</p>
                </div>
            </div>`;
    modalCon.querySelector('#modal-close-btn').addEventListener('click', exitModal);
    gallery.insertAdjacentElement('afterend', modalCon);
}

//Converts birthday into wanted format
function formatBirthday(user) {
    const dob = user.dob.date;
    const date = dob.split('T')[0].split('-');
    const day = date[2];
    const month = date[1];
    const year = date[0];    
    return `${month}/${day}/${year}`;
}

/*Checks cell for correct number of digits and puts number in correct format.
Returns message on modal for card if cell number had incorrect amount of digits */
function formatCell(user) {
    const cell = user.cell;
    const cleaned = ('' + cell).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        return '(' + match[1] + ') ' + match[2] + '-' + match[3];
      }
    return 'No cell phone number available';
}

//Adds function to modal exit button
function exitModal() {
    document.querySelector('.modal-container').innerHTML = '';
    document.querySelector('.modal-container').style.display = 'none';
}

//Creates modal via callback and opens modal when employee card is clicked
function modalOpen(user) {
    generateModal(user);
    document.querySelector('.modal-container').style.display = 'block';
}
