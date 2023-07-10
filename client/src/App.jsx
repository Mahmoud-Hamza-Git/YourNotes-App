// import './App.css';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Header from './components/UI/Header';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/Sign/SignUp';
import CompleteSignUp from './pages/SignUp/CompleteSign/CompleteSignUp';
import NotFound from './pages/NotFound';
import Home from './pages/Home/Home';
import { nightMode, lightMode } from './utils/modes';
import { useContext, useEffect } from 'react';
import { ModeContext } from './context/ModeContext';
import { useTranslation } from 'react-i18next';
import Info from './pages/Info/Info';

function App() {
  const { mode } = useContext(ModeContext);
  const theme = mode == 1 ? lightMode : nightMode;
  const { i18n } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem('lang')) i18n.changeLanguage(localStorage.getItem('lang'));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={i18n.language}>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup'>
            <Route index element={<SignUp />} />
            <Route path='complete' element={<CompleteSignUp />} />
          </Route>

          <Route path='/' element={<Header />}>
            <Route index element={<Home />} />
            <Route path='user-info' element={<Info />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
