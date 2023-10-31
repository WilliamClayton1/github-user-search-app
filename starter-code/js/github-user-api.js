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
    const repoCount = document.querySelector('#repo');
    const followerCount = document.querySelector('#follower');
    const followingCount = document.querySelector('#follow');
    const location = document.querySelector('#location-unavailable');
    const locationIcon = document.querySelector('#location-svg');
    const githubLink = document.querySelector('#github-link-unavailable');
    const githubIcon = document.querySelector('#github-link-svg');
    const twitterLink = document.querySelector("#twitter-unavailable");
    const twitterIcon = document.querySelector("#twitter-svg");
    const companyLink = document.querySelector("#company-unavailable");
    const companyIcon = document.querySelector("#company-svg");

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

    //displaying repo, followers, following count
    repoCount.innerHTML = gitHubUser.public_repos;
    followerCount.innerHTML = gitHubUser.followers;
    followingCount.innerHTML = gitHubUser.following;

    //displaying location
    if (gitHubUser.location != null) {
        location.innerHTML = gitHubUser.location;
        location.style.opacity = '100%';
        locationIcon.style.opacity = '100%';
    } else {
        location.innerHTML = 'Not Available'
        location.style.opacity = '45%';
        locationIcon.style.opacity = '55%';
    }

    //display blog link
    if (gitHubUser.blog !== "") {
        githubLink.innerHTML = gitHubUser.blog;
        githubLink.style.opacity = '100%';
        githubIcon.style.opacity = '100%';
    } else {
        githubLink.innerHTML = 'Not Available'
        githubLink.style.opacity = '45%';
        githubIcon.style.opacity = '55%';
    }

    //display twitter link
    if (gitHubUser.twitter_username != null) {
        twitterLink.innerHTML = gitHubUser.twitter_username;
        twitterLink.style.opacity = '100%';
        twitterIcon.style.opacity = '100%';
    } else {
        twitterLink.innerHTML = 'Not Available'
        twitterLink.style.opacity = '45%';
        twitterIcon.style.opacity = '55%';
    }

    //display company link
    if (gitHubUser.company != null) {
        companyLink.innerHTML = gitHubUser.company;
        companyLink.style.opacity = '100%';
        companyIcon.style.opacity = '100%';
    } else {
        companyLink.innerHTML = 'Not Available'
        companyLink.style.opacity = '45%';
        companyIcon.style.opacity = '55%';
    }



}

export {pullUsersFromApi, usernameSearched}