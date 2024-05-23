import './App.css';
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import { Orb } from './components/Orb';
import { Navigation } from './components/Navigation';
import { useMemo, useState } from 'react';

const AppStyled = styled.div`
    background-image: url(${bg});
    position: relative;
    height: 100vh;
`;

function App() {
  const [active, setActive] = useState(1);
  const orbMemo = useMemo(() => <Orb/>, []);
  return (
    <AppStyled className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive}/>
      </MainLayout>
    </AppStyled>
  );
}



export default App;
