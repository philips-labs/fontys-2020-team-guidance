import React from 'react';
import { render, cleanup, fireEvent} from '@testing-library/react';
import ShallowRenderer from 'react-test-renderer/shallow';
import IBeacon from './IBeacon'

afterEach(cleanup);

it('renders correctly react-test-renderer', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<IBeacon />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});