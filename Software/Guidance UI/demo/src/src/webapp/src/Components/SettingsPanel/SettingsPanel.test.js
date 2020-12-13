import React from 'react';
import { render, cleanup, fireEvent} from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import SettingsPanel from "./SettingsPanel";

afterEach(cleanup);

it('renders correctly react-test-renderer', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<SettingsPanel />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});