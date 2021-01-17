import React from 'react';
import Logo from "../../Components/Logo/Logo";
function NotFoundPage() {

    return (
        <div className="container h-100 d-flex justify-content-center">
            <Logo/>
            <div className="my-auto">
                <h className={"PageErrorCode"}>404</h>
                <h className={"PageMessage"}>Page not found</h>
            </div>
        </div>
    );
}

export default NotFoundPage;
