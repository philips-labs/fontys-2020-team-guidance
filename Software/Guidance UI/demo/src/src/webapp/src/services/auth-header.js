export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"))

    if(user && user.accessToken) {
        //checks if theres a logged in user, return authorization header
        return { Authorization: 'Bearer ' + user.accessToken}

    // if not a logged in user return empty object
    } else {
        return {}
    }
}