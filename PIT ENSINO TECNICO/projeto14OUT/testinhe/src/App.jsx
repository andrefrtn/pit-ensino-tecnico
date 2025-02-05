import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from './contexts/auth'; // Certifique-se de que o caminho esteja correto
import './styles.css';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider> {/* Envolva o conteúdo com AuthProvider */}
        <BrowserRouter>
          <div className="app">
            <Router />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
