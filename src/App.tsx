import { ChakraProvider } from '@chakra-ui/react';
import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Layout from '~/lib/layout';
import { theme } from '~/lib/styles/theme';

const Home = React.lazy(() => import('~/lib/pages/home'));

const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Layout>
        <Suspense>
          <Home />
        </Suspense>
      </Layout>
    </Router>
  </ChakraProvider>
);

export default App;
