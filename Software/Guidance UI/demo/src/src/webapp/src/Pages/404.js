import React from 'react';
import Logo from "../Components/Logo";

function NotFoundPage() {

    return (
        <div className="App">
            <Logo/>
            <h className={"PageErrorCode"}>404</h>
            <h className={"PageMessage"}>Page not found</h>
        </div>
    );
}

export default NotFoundPage;
