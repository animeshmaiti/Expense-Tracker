import './App.css';
import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layouts';
import { Orb } from './components/Orb';
import { Navigation } from './components/Navigation';
import { useMemo, useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { Incomes } from './components/Incomes';
import { Expenses } from './components/Expenses';
import LoginForm from './components/LoginForm';
import Alert from './components/Alert';
// import { useGlobalContext } from './context/globalContext';

function App() {
  const [active, setActive] = useState(1);
  const orbMemo = useMemo(() => <Orb />, []);

  // const global = useGlobalContext();
  // console.log(global);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard/>;
      case 2:
        return <Incomes />;
      case 3:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  }
  const [alert, setAlert] = useState(null);
  const showAlert = (type, massage) => {
    setAlert({
      msg: massage,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1000);
  };
  return (
    <AppStyled className="App">
      {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          <Alert alert={alert}/>
          {localStorage.getItem('token')?displayData():<LoginForm alert={showAlert}/>}
        </main>
      </MainLayout>
    </AppStyled>
  );
}

const AppStyled = styled.div`
    background-image: url(${bg});
    position: relative;
    height: 100vh;
    main{
      flex: 1;
      background: rgba(252, 246, 249, 0.78);
      border: 3px solid #FFFFFF;
      backdrop-filter: blur(4.5px);
      border-radius: 32px;
      overflow-x: hidden;
      &::-webkit-scrollbar{
        width: 0;
      }
    }
`;

export default App;
