import React from 'react';
import {cleanup } from '@testing-library/react';
import FloorplanEditPage from "./FloorplanEditPage";
import * as renderer from 'react-test-renderer';

afterEach(cleanup);

const renderWithProps = () => {
    const defaultProps = {
        match: { params:
                {ssid: 1 }
        },
    }
    return renderer.create(<FloorplanEditPage {...defaultProps}/>)
}

it('should render', () => {
    expect(renderWithProps({}).toJSON()).toMatchSnapshot()
});
