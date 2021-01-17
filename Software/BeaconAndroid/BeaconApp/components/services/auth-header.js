import LocalStorage from '@react-native-async-storage/async-storage'

export default function authHeader() {
    const user = LocalStorage.getItem("user")

    if(user && user.accessToken) {
        //checks if theres a logged in user, return authorization header
        return { Authorization: 'Bearer ' + user.accessToken}

        // if not a logged in user return empty object
    } else {
        return {}
    }
}
