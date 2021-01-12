import React from 'react';
import { cleanup } from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SuperAdminPage from "./SuperAdminPage";


afterEach(cleanup);

it('renders correctly react-test-renderer', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<SuperAdminPage />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});
