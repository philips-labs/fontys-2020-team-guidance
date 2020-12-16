import React, {useEffect, useState} from "react";
import AuthService from "../../services/auth.service";

const Profile = () => {

    const [user, setCurrentUser] = useState(undefined)
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setIsLoaded(true)
        }
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3 style={{color: '#FFFFFF'}}>
                    {isLoaded === true ? user.username : ''} Profile
                </h3>
            </header>
            <p style={{color: '#FFFFFF'}}>
                Email: {isLoaded === true ? user.email : ''}
            </p>
        </div>
    );
};

export default Profile;
