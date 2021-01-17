import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Login from "./Login";

describe("Login", () => {
    it('Renders login correctly', () => {
        const renderer = new ShallowRenderer();
        renderer.render(<Login />);
        const result = renderer.getRenderOutput();
        expect(result).toMatchSnapshot();
    });
})

