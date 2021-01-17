import {
    render,
    screen,
    fireEvent,
} from "@testing-library/react";

import ShallowRenderer from 'react-test-renderer/shallow';
import Register from "./Register";
import React from 'react';


describe("Register", () => {

    it('Successfully renders register', () => {
        const renderer = new ShallowRenderer();
        renderer.render(<Register />);
        const result = renderer.getRenderOutput();
        expect(result).toMatchSnapshot();
    });

    it("Register account success", async () => {
        render(<Register/>)

        const inputUsername = screen.getByTestId("register-input-username")
        fireEvent.change(inputUsername, {target: {value: "username"}})
        expect(inputUsername.value).toBe("username")

        const inputEmail = screen.getByTestId("register-input-email")
        fireEvent.change(inputEmail, {target: {value: "newuser@hotmail.com"}})
        expect(inputEmail.value).toBe("newuser@hotmail.com")

        const inputPassword = screen.getByTestId("register-input-password")
        fireEvent.change(inputPassword, {target: {value: "password"}})
        expect(inputPassword.value).toBe("password")

        const inputSubmit = screen.getByTestId("register-button-submit")
        fireEvent.click(inputSubmit)

        const header = await screen.findByText("Login")
        expect(header).toBeTruthy()
    })

    it("Register account password too short", async () => {
        render(<Register />);

        const inputUsername = screen.getByTestId("register-input-username")
        fireEvent.change(inputUsername, {target: { value: "username"}})
        expect(inputUsername.value).toBe("username")

        const inputEmail = screen.getByTestId("register-input-email")
        fireEvent.change(inputEmail, {target: { value: "newuser@hotmail.com"}})
        expect(inputEmail.value).toBe("newuser@hotmail.com")

        const inputPassword = screen.getByTestId("register-input-password")
        fireEvent.change(inputPassword, {target: { value: "1"}})
        expect(inputPassword.value).toBe("1")

        const inputSubmit = screen.getByTestId("register-button-submit")
        fireEvent.click(inputSubmit)

        const header = await screen.findByText("The password must be between 6 and 40 characters.")
        expect(header).toBeTruthy()
    });

    it("Register account invalid email", async () => {
        render(<Register />);

        const inputUsername = screen.getByTestId("register-input-username")
        fireEvent.change(inputUsername, {target: { value: "username"}})
        expect(inputUsername.value).toBe("username")

        const inputEmail = screen.getByTestId("register-input-email")
        fireEvent.change(inputEmail, {target: { value: "newuser@hotmail.com2"}})
        expect(inputEmail.value).toBe("newuser@hotmail.com2")

        const inputPassword = screen.getByTestId("register-input-password")
        fireEvent.change(inputPassword, {target: { value: "password"}})
        expect(inputPassword.value).toBe("password")

        const inputSubmit = screen.getByTestId("register-button-submit")
        fireEvent.click(inputSubmit)

        const header = await screen.findByText("This is not a valid email.")
        expect(header).toBeTruthy()
    });

    it("Register account username too short", async () => {
        render(<Register />);

        const inputUsername = screen.getByTestId("register-input-username")
        fireEvent.change(inputUsername, {target: { value: "us"}})
        expect(inputUsername.value).toBe("us")

        const inputEmail = screen.getByTestId("register-input-email")
        fireEvent.change(inputEmail, {target: { value: "newuser@hotmail.com"}})
        expect(inputEmail.value).toBe("newuser@hotmail.com")

        const inputPassword = screen.getByTestId("register-input-password")
        fireEvent.change(inputPassword, {target: { value: "password"}})
        expect(inputPassword.value).toBe("password")

        const inputSubmit = screen.getByTestId("register-button-submit")
        fireEvent.click(inputSubmit)

        const header = await screen.findByText("The username must be between 3 and 20 characters.")
        expect(header).toBeTruthy()
    });
})
