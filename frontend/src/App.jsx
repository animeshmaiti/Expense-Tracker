import './App.css';
import bg from './assets/bg.png';
import { MainLayout } from './styles/Layouts';
import { Orb } from './components/Orb';
import Navigation from './components/Navigation';
import { useMemo, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useGlobalContext } from './context/globalContext';
import Dashboard from './pages/Dashboard';
import LoginForm from './pages/LoginForm';
import Incomes from './pages/Incomes';
import Expenses from './pages/Expenses';
import SignupForm from './pages/SignupForm';

function App() {
  const [active, setActive] = useState(1);
  const { token } = useGlobalContext();
  const orbMemo = useMemo(() => <Orb />, []);

  const location = useLocation();
  const hideNavigationRoutes = ['/login', '/register'];
  const shouldHideNavigation = hideNavigationRoutes.includes(location.pathname);

  return (
    <div
      className='relative h-screen'
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {orbMemo}
      <div className='p-4 h-full w-full flex flex-col gap-4'>
        {shouldHideNavigation ? (
          <main className='flex-1 bg-[rgba(252,246,249,0.78)] border-[3px] border-white backdrop-blur-sm rounded-[32px] overflow-x-hidden no-scrollbar'>
            <Routes>
              <Route path='/' element={token ? <Dashboard /> : <LoginForm />} />
              <Route path='/incomes' element={token ? <Incomes /> : <LoginForm />} />
              <Route path='/expenses' element={token ? <Expenses /> : <LoginForm />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path='/register' element={<SignupForm />} />
              <Route path='*' element={<h1>Not Found</h1>} />
            </Routes>
          </main>
        ) : (
          <MainLayout>
            <Navigation active={active} setActive={setActive} />
            <main className='flex-1 bg-[rgba(252,246,249,0.78)] border-[3px] border-white backdrop-blur-sm rounded-[32px] overflow-x-hidden no-scrollbar'>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/incomes' element={<Incomes />} />
                <Route path='/expenses' element={<Expenses />} />
                <Route path='*' element={<h1>Not Found</h1>} />
              </Routes>
            </main>
          </MainLayout>
        )}
      </div>
    </div>
  );
}

export default App;
