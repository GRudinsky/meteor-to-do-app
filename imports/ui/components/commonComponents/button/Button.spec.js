import React from 'react';
import { mount } from 'enzyme';
import Button from './Button';

describe('<Button />',() => {
  let wrapper,
    props = {
      clickHandler: jest.fn(),
      text: 'SomeText',
      id: 'someId',
    };

  beforeEach(() => {
    wrapper = mount(<Button { ...props }/>);
  });

  afterEach(() => {
    wrapper = null;
  });

  it('should render correctly',() => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should call clickHandler on click',() => {
    
    wrapper.find('button').simulate('click');

    expect(props.clickHandler).toHaveBeenCalledTimes(1);
  });

  [{ secondary: true }, { primary: true }].forEach(item => {
    const className = Object.keys(item)[0];
    
    it(`should have button--${ className } class when passed ${ className } prop`,() => {
      
      const newProps = {
        ...props,
        ...item
      };

      wrapper = mount(<Button { ...newProps } />);

      expect(wrapper.find(`button.button--${ className }`)).toHaveLength(1);
    });
  });
});