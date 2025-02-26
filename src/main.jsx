import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from 'react-redux';
import store from './store/store.js';
import App from './App.jsx'
import { ModalContextProvider } from './Context/ModalContext.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
      <ModalContextProvider>
        <Provider store={store}>
          <App /> 
        </Provider>
      </ModalContextProvider>
      
    </QueryClientProvider>
)
