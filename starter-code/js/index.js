import {pullUsersFromApi} from "./github-user-api.js";

const usernameSearched = async () => {
    const search = document.querySelector('#search');
    let userInput = search.value;
    let gitHubUser = await pullUsersFromApi(userInput);
    return gitHubUser.login;
}

//Main Method
(async () => {

    const searchBtn = document.querySelector('#submit-btn');

    //on click searches for user data
    searchBtn.addEventListener('click', usernameSearched)


    //grab the necessary data from the response
    //display it on the DOM

})();