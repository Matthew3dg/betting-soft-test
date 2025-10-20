import React from 'react';
import { Provider } from 'react-redux';

import { store } from './store';
import { HomePage } from '../pages/home';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
};

export default App;
