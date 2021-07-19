import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import Dictionary from './Components/SearchDictionary';

function App() {
  return (
    <Provider store={store}>
      <Dictionary />
    </Provider>
  );
}

export default App;
