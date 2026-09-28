import { Container } from '@mantine/core';
import { Route, Switch } from 'wouter';
import { DataUpdatedNotification } from './components/DataUpdatedNotification/DataUpdatedNotification';
import { NotFound } from './pages/NotFound/NotFound';
import { Product } from './pages/Product/Product';
import { Showcase } from './pages/Showcase/Showcase';

/** Корневой компонент. */
function App() {
  return (
    <Container p="lg" fluid>
      <Switch>
        <Route path="/" component={Showcase} />
        {/* Без key стейт залипнет и могут отобразиться данные прошлого товара. */}
        <Route path="/product/:id">{({ id }) => <Product key={id} />}</Route>
        <Route component={NotFound} />
      </Switch>
      <DataUpdatedNotification />
    </Container>
  );
}

export default App;
