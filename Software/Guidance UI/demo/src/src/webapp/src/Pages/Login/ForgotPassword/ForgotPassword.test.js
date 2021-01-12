import React from 'react';
import {  cleanup } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ForgotPassword from "./ForgotPassword";


afterEach(cleanup);

it('renders correctly react-test-renderer', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<ForgotPassword />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});



