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

const userSearched = async () => {
    const search = document.querySelector('#search');
    let userInput = search.value;

    let gitHubUser = await pullUsersFromApi(userInput);

    console.log(gitHubUser);
}

export {pullUsersFromApi, userSearched}