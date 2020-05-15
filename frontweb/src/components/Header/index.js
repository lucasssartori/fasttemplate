import React, { useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import { MdDescription } from 'react-icons/md';
import { GoSignOut } from 'react-icons/go';

import { signOut } from '~/store/modules/auth/actions';
import { Container, Content, DivLogo, NavLinkStyle } from './styles';

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
            <MdDescription color="#ffffff" size={30} />
          </Link>
        </DivLogo>
        <button type="button" className="menu" onClick={() => handleMenu()}>
          <IoMdMenu size={20} color="#003366" />
        </button>
        <div className={menuOpen}>
          <nav>
            <ul>
              <li>
                <NavLinkStyle
                  activeStyle={{
                    color: '#eeeeee',
                  }}
                  to="/jobs/list"
                  isActive={(match, location) => {
                    if (
                      location.pathname.indexOf('/jobs/') !== -1 ||
                      location.pathname.indexOf('/transmission/') !== -1
                    ) {
                      return true;
                    }
                    return false;
                  }}
                  onClick={handleCloseMenu}
                >
                  JOBS
                </NavLinkStyle>
              </li>
              <li>
                <NavLinkStyle
                  activeStyle={{
                    color: '#eeeeee',
                  }}
                  to="/history/list"
                  isActive={(match, location) => {
                    if (location.pathname.indexOf('/history/') !== -1) {
                      return true;
                    }
                    return false;
                  }}
                  onClick={handleCloseMenu}
                >
                  HISTORIAS
                </NavLinkStyle>
              </li>
            </ul>
          </nav>
          <aside>
            <p>{name}</p>
            <button type="button" onClick={handleSignOut}>
              <p>Sair</p>
              <GoSignOut color="#fab000" size={12} />
            </button>
          </aside>
        </div>
      </Content>
    </Container>
  );
}
