import React from 'react';
import { render, cleanup, fireEvent} from '@testing-library/react';
import { create } from "react-test-renderer";
import { Router } from 'react-router-dom';
import { mount } from 'enzyme';
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

afterEach(cleanup);

it('renders correctly react-test-renderer', () => {
    const renderer = new ShallowRenderer();
    renderer.render(<UserCom />);
    const result = renderer.getRenderOutput();
    expect(result).toMatchSnapshot();
});