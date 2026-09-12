import { Container } from '@mantine/core';
import { Route, Switch } from 'wouter';
import { DataUpdatedNotification } from './components/DataUpdatedNotification/DataUpdatedNotification';
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
      <DataUpdatedNotification />
    </Container>
  );
}

export default App;
