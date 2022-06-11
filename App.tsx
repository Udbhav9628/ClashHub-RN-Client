import React from 'react';
import { Provider } from 'react-redux';
import RootContainer from './src/screens/Navigation/RootContainer';
import store from './src/store/Store';

export default function App() {
  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
}
