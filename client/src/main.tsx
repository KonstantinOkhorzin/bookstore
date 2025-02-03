import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { Global } from '@emotion/react';

import App from './App.tsx';
import store from './redux/store';
import { globalStyles } from './styles/globalStyles.ts';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Global styles={globalStyles} />
    </Provider>
  </StrictMode>
);
