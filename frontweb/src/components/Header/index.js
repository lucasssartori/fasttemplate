import React, { useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';

import { signOut } from '~/store/modules/auth/actions';
import { Container, Content, DivLogo, NavLinkStyle } from './styles';
import logo from '~/assets/logo.png';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState('navbar');

  const dispatch = useDispatch();

  function handleSignOut() {
    dispatch(signOut());
  }

  useLayoutEffect(() => {
    function menuSize() {
      if (window.innerWidth > 740) {
        setMenuOpen('navbar');
      }
    }
    window.addEventListener('resize', menuSize);
    menuSize();
  }, []);

  function handleMenu() {
    if (menuOpen === 'navbar') {
      setMenuOpen('navbar open');
    } else {
      setMenuOpen('navbar');
    }
  }

  function handleCloseMenu() {
    if (window.innerWidth < 740) {
      setMenuOpen('navbar');
    }
  }

  const { name } = useSelector((state) =>
    state.user ? state.user.user : { name: '' }
  );

  return (
    <Container>
      <Content>
        <DivLogo>
          <Link to="/">
            <img src={logo} alt="FastTemplates" />
          </Link>
        </DivLogo>
        <button type="button" className="menu" onClick={() => handleMenu()}>
          <IoMdMenu size={20} color="#0040ff" />
        </button>
        <div className={menuOpen}>
          <nav>
            <ul>
              <li>
                <NavLinkStyle
                  activeStyle={{
                    color: '#444444',
                  }}
                  to="/jobs/list"
                  isActive={(match, location) => {
                    if (location.pathname.indexOf('/jobs/') !== -1) {
                      return true;
                    }
                    return false;
                  }}
                  onClick={handleCloseMenu}
                >
                  JOBS
                </NavLinkStyle>
              </li>
            </ul>
          </nav>
          <aside>
            <strong>{name}</strong>
            <button type="button" onClick={handleSignOut}>
              Sair do Sistema
            </button>
          </aside>
        </div>
      </Content>
    </Container>
  );
}
