import './App.css';
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import { Orb } from './components/Orb';

const AppStyled = styled.div`
    background-image: url(${bg});
    position: relative;
    height: 100vh;
`;

function App() {
  return (
    <AppStyled className="App">
      <Orb/>
      <MainLayout>

      </MainLayout>
    </AppStyled>
  );
}



export default App;
