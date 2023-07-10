import React, { useContext, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { MdLightMode, MdNightlight } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { ModeContext } from '../../context/ModeContext';
import StyledLink from '../StyledLink';
import PrimaryButton from '../PrimaryButton';
import SecondaryButton from '../SecondaryButton';

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  max-width: 1600px;
  height: 6.5rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5rem;
  background-color: ${({ theme }) => theme.fill1};
  color: ${({ theme }) => theme.pink};
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  z-index: 3;
  @media (max-width: 500px) {
    padding: 0 3rem;
  }
`;

const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  .logo-title {
    font-size: 2.5rem;
    font-weight: 500;
    user-select: none;
  }
  @media (max-width: 500px) {
    gap: 0.5rem;
    .logo {
      width: 3.2rem;
    }
  }
`;

const HeaderIcons = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
  font-size: 2.8rem;
  .lang {
    font-size: 2.8rem;
    user-select: none;
  }
  .mode,
  .lang,
  .person {
    cursor: pointer;
  }

  @media (max-width: 500px) {
    gap: 1rem;
    font-size: 2.5rem;
    .lang {
      font-size: 2.5rem;
    }
  }
`;

const Menu = styled.div`
  display: ${({ open }) => (open ? 'flex' : 'none')};
  position: absolute;
  top: 8rem;
  ${({ lang }) => (lang == 'en' ? 'right: 2.5rem;' : 'left:2.5rem;')}
  flex-direction: column;
  width: 22rem;
  gap: 2rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${({ theme }) => theme.fill1};
  color: ${({ theme }) => theme.pink};
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);

  .greeting {
    font-size: 2.5rem;
    padding: 2rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 700px) {
    width: 100%;
    height: calc(100vh - 6.5rem);
    background-color: #000000a9;
    top: 6.5rem;
    left: 0;
    right: 0;
    padding-top: 10%;
  }
`;

//

//

const Header = () => {
  const { t, i18n } = useTranslation();
  const { mode, setMode } = useContext(ModeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(0);

  //
  // Handlers
  const toggleMode = () => {
    setMode((prev) => {
      localStorage.setItem('mode', prev == 1 ? '2' : '1');
      return prev == 1 ? 2 : 1;
    });
  };
  const toggleLang = () => {
    localStorage.setItem('lang', i18n.language == 'en' ? 'ar' : 'en');
    i18n.changeLanguage(i18n.language == 'en' ? 'ar' : 'en');
  };
  const toggleMenu = () => {
    setIsMenuOpen((prev) => (prev ? 0 : 1));
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
  };

  return (
    <>
      <Container>
        <StyledLink to='/'>
          <HeaderLogo>
            <img src='images/logo_pink.png' alt='logo icon' className='logo' />
            <h3 className='logo-title'>Your Notes</h3>
          </HeaderLogo>
        </StyledLink>
        <HeaderIcons>
          {mode == 1 ? (
            <MdNightlight className='mode' onClick={toggleMode} />
          ) : (
            <MdLightMode className='mode' onClick={toggleMode} />
          )}
          {i18n.language == 'en' ? (
            <h2 className='ar lang' onClick={toggleLang}>
              Ar
            </h2>
          ) : (
            <h2 className='en lang' onClick={toggleLang}>
              En
            </h2>
          )}
          <BsFillPersonFill className='person' onClick={toggleMenu} />
        </HeaderIcons>
        <Menu lang={i18n.language} open={isMenuOpen}>
          <p className='greeting'>
            <span>{t('header_greeting')}</span> <span> mohamed</span>
          </p>
          <StyledLink to='/user-info'>
            <SecondaryButton>{t('header_secondary')}</SecondaryButton>
          </StyledLink>
          <StyledLink to='/login' onClick={handleLogout}>
            <PrimaryButton>{t('header_primary')}</PrimaryButton>
          </StyledLink>
        </Menu>
      </Container>
      <Outlet />
    </>
  );
};

export default Header;
