import GITHUB_API_TOKEN from "./keys.js"


//GET request for a list of users' data
const pullUsersFromApi = async (input) => {
    const url = `https://api.github.com/users/${input}`
    const options = {
        "method": "GET",
        "headers": {
            "Content-Type": "application/json",
            'Authorization': `${GITHUB_API_TOKEN}`
        }
    }
    const response = await fetch(url, options)
    return await response.json()
}

//Date Time Conversion
const dateConversion = (data) => {
    let date = new Date(data);
    let dateArray = date.toString().split(' ');
    let month = dateArray[1];
    let year = date.getFullYear();
    let day = date.getDate();
    return `${day} ${month} ${year}`;
}


const usernameSearched = async () => {
    const search = document.querySelector('#search');
    const profileTitle = document.querySelector('#profile-title');
    const profilePicture = document.querySelector('#profile-picture');
    const profileBio = document.querySelector('#profile-bio');
    const profileLink = document.querySelector('#profile-username');
    const profileDate = document.querySelector('#date');
    let userInput = search.value;
    let gitHubUser = await pullUsersFromApi(userInput);

    //console logging data
    console.log(gitHubUser);

    //displaying data on header
    if (gitHubUser.name != null) {
        profileTitle.innerHTML = gitHubUser.name;
    } else {
        profileTitle.innerHTML = gitHubUser.login;
    }

    //displaying bio if not null
    if (gitHubUser.bio != null) {
        profileBio.innerHTML = gitHubUser.bio;
        profileBio.style.fontSize = '15px';
    } else {
        profileBio.innerHTML = "This profile has no bio";
    }

    //displaying profile picture
    profilePicture.src = gitHubUser.avatar_url;
    profilePicture.style.width = '117px';

    //display @github link
    profileLink.innerHTML = "@" + gitHubUser.login.toLowerCase();

    //display date

    profileDate.innerHTML = dateConversion(gitHubUser.created_at);






}

export {pullUsersFromApi, usernameSearched}