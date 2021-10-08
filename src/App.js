import React from 'react';
import Main from './components/Main';
import myStore from './redux/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <Provider store={myStore}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </Provider>

    </div>
  );
}

export default App;
