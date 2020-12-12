import React from 'react';
import Logo from "../Components/Logo/Logo";

function NotFoundPage() {

    return (
        <div className="NotFound">
            <Logo/>
            <h className={"PageErrorCode"}>404</h>
            <h className={"PageMessage"}>Page not found</h>
        </div>
    );
}

export default NotFoundPage;
