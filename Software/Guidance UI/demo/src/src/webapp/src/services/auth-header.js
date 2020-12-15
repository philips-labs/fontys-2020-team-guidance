export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"))

    if(user && user.accessToken) {
        //checks if theres a logged in user, return authorization header
        console.log(user.accessToken)
        return { Authorization: 'Bearer ' + user.accessToken}

    // if not a logged in user return empty object
    } else {
        return {}
    }
}
