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
import { Routes, Route ,useLocation} from "react-router-dom";
import { SignupForm } from './components/SignupForm';
import { useGlobalContext } from './context/globalContext';

function App() {
  const [active, setActive] = useState(1);
  const {token}=useGlobalContext();
  const orbMemo = useMemo(() => <Orb />, []);

  const location = useLocation();
  const hideNavigationRoutes = ['/login', '/register'];
  const shouldHideNavigation = hideNavigationRoutes.includes(location.pathname);

  return (
    <AppStyled>
      {orbMemo}
      <MainLayout>
      {!shouldHideNavigation && <Navigation active={active} setActive={setActive} />}
        <main>
            <Routes>
              <Route exact path="/" element={token ? <Dashboard />:<LoginForm/>} />
              <Route exact path="/incomes" element={token?<Incomes />:<LoginForm />} />
              <Route exact path="/expenses" element={token ?<Expenses />:<LoginForm />} />
              <Route exact path="/login" element={<LoginForm />} />
              <Route exact path="/register" element={<SignupForm  />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
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
