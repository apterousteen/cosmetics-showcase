import { Container } from '@mantine/core';
import { Showcase } from './pages/Showcase/Showcase';

/**
 * Корневой контейнер с отступами от краёв.
 */
function App() {
  return (
    <Container p="lg" fluid>
      <Showcase />
    </Container>
  );
}

export default App;
