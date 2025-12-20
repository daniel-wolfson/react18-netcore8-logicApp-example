import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store/store';
import App from '../app';
import { number } from 'prop-types';

test('renders app component', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  // Basic test to ensure app renders without crashing
  expect(true).toBe(true);
});

const fakeAxois = {
  get: (url: string, waitLonger = 200) => new Promise<{data: {docs: string}}>((resolve, reject) => {
    var wait: number =  Math.floor(Math.random() * Math.floor(300)) + waitLonger;
    setTimeout(() => 
      resolve({data: {docs: url + ' data fetched'}}), 
    // eslint-disable-next-line testing-library/await-async-utils
    wait);
  })
}

export default fakeAxois