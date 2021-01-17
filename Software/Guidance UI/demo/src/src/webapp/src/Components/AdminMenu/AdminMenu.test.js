import React from 'react';
import { cleanup } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AdminMenu from "./AdminMenu";


afterEach(cleanup);

it('renders correctly react-test-renderer', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<AdminMenu />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});
