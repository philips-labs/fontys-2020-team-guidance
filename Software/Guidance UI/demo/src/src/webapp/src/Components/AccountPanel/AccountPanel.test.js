import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AccountPanel from "./AccountPanel";
import {  MemoryRouter } from 'react-router-dom';


afterEach(cleanup);

it('renders correctly react-test-renderer', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<MemoryRouter><AccountPanel /></MemoryRouter>);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});

it("showes the header", () => {
    const { getByTestId } = render(<MemoryRouter><AccountPanel/></MemoryRouter>);
    expect(getByTestId("setting-header").textContent).toBe("Account");
})


