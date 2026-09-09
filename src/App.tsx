import { Container } from '@mantine/core';
import { Route, Switch } from 'wouter';
import { NotFound } from './pages/NotFound/NotFound';
import { Showcase } from './pages/Showcase/Showcase';

/** Корневой компонент. */
function App() {
  return (
    <Container p="lg" fluid>
      <Switch>
        <Route path="/" component={Showcase} />
        <Route component={NotFound} />
      </Switch>
    </Container>
  );
}

export default App;
