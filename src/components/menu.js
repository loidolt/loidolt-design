import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

import Icon from "./icon";

import style from "../styles/menu.module.css";

const MainMenu = ({ mainMenu, mainMenuItems, isMobileMenu }) => {
  const menu = mainMenu.slice(0);
  !isMobileMenu && menu.splice(mainMenuItems);

  return menu.map((menuItem, index) => (
    <li key={index}>
      <Link to={menuItem.path}>{menuItem.title}</Link>
    </li>
  ));
};

const SubMenu = ({ mainMenu, mainMenuItems, onToggleSubMenu }) => {
  const menu = mainMenu.slice(0);
  menu.splice(0, mainMenuItems);

  const items = menu.map((menuItem, index) => (
    <li key={index}>
      <Link to={menuItem.path}>{menuItem.title}</Link>
    </li>
  ));

  return (
    <>
      {items}
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div
        className={style.subMenuOverlay}
        role="button"
        tabIndex={0}
        onClick={onToggleSubMenu}
      />
    </>
  );
};

const menuIcon = `M4 34H40V30H4V34ZM4 24H40V20H4V24ZM4 10V14H40V10H4Z`;
const searchIcon = `M37.536,35.297l-10.806,-10.806c2.093,-2.586 3.353,-5.871 3.353,-9.449c0,-8.294 -6.748,-15.042 -15.042,-15.042c-8.293,0 -15.041,6.748 -15.041,15.042c-0,8.293 6.748,15.041 15.042,15.041c3.578,0 6.863,-1.26 9.449,-3.353l10.806,10.806c0.309,0.309 0.714,0.464 1.119,0.464c0.406,-0 0.811,-0.155 1.12,-0.464c0.619,-0.619 0.619,-1.62 -0,-2.239Zm-22.494,-8.38c-6.549,-0 -11.875,-5.327 -11.875,-11.875c-0,-6.549 5.326,-11.875 11.875,-11.875c6.548,-0 11.874,5.326 11.874,11.875c0,6.548 -5.326,11.875 -11.874,11.875Z`;
const toggleIcon = `M22 41C32.4934 41 41 32.4934 41 22C41 11.5066 32.4934 3 22
3C11.5066 3 3 11.5066 3 22C3 32.4934 11.5066 41 22 41ZM7 22C7
13.7157 13.7157 7 22 7V37C13.7157 37 7 30.2843 7 22Z`;

const Menu = ({
  mainMenu,
  mainMenuItems,
  menuMoreText,
  isMobileMenuVisible,
  isSubMenuVisible,
  onToggleMobileMenu,
  onToggleSubMenu,
  onChangeTheme,
}) => {
  const isSubMenu = !(mainMenuItems >= mainMenu.length) && mainMenuItems > 0;

  return (
    <>
      <div className={style.mobileMenuContainer}>
        <>
          {isMobileMenuVisible ? (
            <>
              {/* eslint-enable */}
              <ul className={style.mobileMenu}>
                <MainMenu mainMenu={mainMenu} isMobileMenu />
              </ul>
              {/* eslint-disable */}
              <div
                onClick={onToggleMobileMenu}
                className={style.mobileMenuOverlay}
              />
            </>
          ) : null}
          <button
            className={style.menuTrigger}
            style={{ color: "inherit" }}
            onClick={onToggleMobileMenu}
            type="button"
            aria-label="Menu"
          >
            <Icon style={{ cursor: "pointer" }} size={24} d={menuIcon} />
          </button>
        </>
      </div>
      <div className={style.desktopMenuContainer}>
        <ul className={style.menu}>
          <MainMenu mainMenu={mainMenu} mainMenuItems={mainMenuItems} />
          {isSubMenu ? (
            <>
              <button
                className={style.subMenuTrigger}
                onClick={onToggleSubMenu}
                type="button"
                aria-label="Menu"
              >
                {menuMoreText || "Menu"}{" "}
                <span className={style.menuArrow}>{">"}</span>
              </button>
              {isSubMenuVisible ? (
                <ul className={style.subMenu}>
                  <SubMenu
                    mainMenu={mainMenu}
                    mainMenuItems={mainMenuItems}
                    onToggleSubMenu={onToggleSubMenu}
                  />
                </ul>
              ) : null}
            </>
          ) : null}
        </ul>
      </div>
      <Link to={"/search"} className={style.themeToggle}>
        <Icon style={{ cursor: "pointer" }} size={24} d={searchIcon} />
      </Link>
      <button
        className={style.themeToggle}
        onClick={onChangeTheme}
        type="button"
        aria-label="Theme toggle"
      >
        <Icon style={{ cursor: "pointer" }} size={24} d={toggleIcon} />
      </button>
    </>
  );
};

Menu.propTypes = {
  mainMenu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
  mainMenuItems: PropTypes.number,
  menuMoreText: PropTypes.string,
  isMobileMenuVisible: PropTypes.bool,
  isSubMenuVisible: PropTypes.bool,
  onToggleMobileMenu: PropTypes.func,
  onToggleSubMenu: PropTypes.func,
  onChangeTheme: PropTypes.func,
};

SubMenu.propTypes = {
  mainMenu: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
    }),
  ),
  mainMenuItems: PropTypes.number,
  onToggleSubMenu: PropTypes.func,
};

export default Menu;
