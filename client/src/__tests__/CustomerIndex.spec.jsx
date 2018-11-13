import React from 'react';
import { List, Map } from 'immutable';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { CustomerIndex } from '../app/pages/CustomerIndex';
import { Alert, Header, Footer } from '../components/common';

configure({ adapter: new Adapter() });

const props = {
  match: {},
  history: {},
  app: Map({
    loading: false,
    showSearch: false,
    showNav: false,
  }),
  auth: Map({
    loading: false,
    showSearch: false,
    showNav: false,
  }),
  customerIndex: Map({
    customers: List([]),
    totalCount: 0,
    error: Map({}),
    message: Map({}),
  }),
  attemptGetCustomers: jest.fn(),
  attemptSignOut: jest.fn(),
  purgeUser: jest.fn(),
  toggleSearch: jest.fn(),
  toggleNav: jest.fn(),
};

describe('Customer Index Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<CustomerIndex {...props} />);
  });

  test('Should render the CustomerIndex component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  test('CustomerIndex component should have a header, footer and Alert', () => {
    expect(wrapper.children().length).toBe(3);
    expect(wrapper.children().find(Header).length).toBe(1);
    expect(wrapper.children().find(Footer).length).toBe(1);
    expect(wrapper.children().find(Alert).length).toBe(1);
  });
});
