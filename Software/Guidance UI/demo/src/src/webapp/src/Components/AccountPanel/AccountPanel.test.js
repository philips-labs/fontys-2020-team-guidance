import React from 'react';
import { render, cleanup, fireEvent} from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AccountPanel from "./AccountPanel";

afterEach(cleanup);

it('renders correctly react-test-renderer', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<AccountPanel />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});

it("showes the header", () => {
    const { getByTestId, getByText } = render(<AccountPanel/>);
    expect(getByTestId("setting-header").textContent).toBe("Account");
})

it("updates the state for setting-name", async () => {
    const { getByTestId, getByText } = render(<AccountPanel/>);
    const input = getByTestId("setting-input");
    fireEvent.change(input, { target: { value: 'test' } })
    fireEvent.keyDown(input,  { key: 'Enter', code: '13', charCode: 13});
    expect(getByTestId("setting-name").textContent).toBe("test");
});