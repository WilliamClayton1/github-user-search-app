import {pullUsersFromApi, userSearched} from "./github-user-api.js";

//Main Method
(async () => {

    const searchBtn = document.querySelector('#submit-btn');

    //on click searches for user data
    searchBtn.addEventListener('click', userSearched);

    //grab the necessary data from the response
    //display it on the DOM


})();