import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import Colors from '~/components/Colors';

export const Container = styled.div`
  width: 100%;
  height: 64px;
  background: ${Colors.PrimaryColor};
  border: 1px solid #cccccc;
  box-sizing: border-box;
  position: fixed;
  z-index: 999;
  left: 0px;
  top: 0px;
  box-shadow: 5px 5px 10px #bbbbbb;
`;

export const DivLogo = styled.div`
  padding: 0 20px;
  margin-right: 20px;
  border-right: 1px solid #dddddd;
  img {
    width: 32px;
    height: 40px;
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  max-width: 1440px;
  width: 100%;
  height: 100%;
  margin: 0 auto;

  .navbar {
    max-width: 1285px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .menu {
    display: none;
  }

  .open {
    display: none;
  }

  @media (max-width: 740px) {
    justify-content: space-between;

    .navbar {
      display: none;
    }

    .menu {
      display: flex;
      border: 0;
      background: #ffffff;
      padding: 0;
      margin-right: 20px;
      z-index: 2;
    }
  }

  .open {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 51, 102, 0.9);
    z-index: 1;
  }

  .open nav {
    border-bottom: 1px solid #dddddd;
    padding-bottom: 10px;
    margin-bottom: 10px;
    padding-left: 20px;
  }

  .open ul {
    display: flex;
    flex-direction: column;
  }

  .open aside {
    padding-left: 20px;
  }

  nav {
    display: flex;
  }

  ul {
    display: flex;
    align-items: center;

    li {
      margin-right: 20px;
    }
  }

  aside {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 20px;

    p {
      font-weight: normal;
      font-size: 12px;
      color: #eeeeee;
    }

    button {
      margin-top: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 0;
      background: transparent;
      padding: 0;

      p {
        margin-right: 4px;
        font-weight: normal;
        font-size: 12px;
        text-align: right;
        color: #fab000;
      }
    }

    @media (max-width: 740px) {
      align-items: center;
    }
  }
`;

export const NavLinkStyle = styled(NavLink)`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  color: #bbbbbb;

  :hover {
    color: #fab000;
  }
`;
