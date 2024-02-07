import React, { useState } from "react";
import header from './header.module.css';
import { useSelector } from "../../services/hooks";
import { TUserInfo } from "../../utils/types";
import Arrow from "../arrow/arrow";
import { useDispatch } from "../../services/hooks";
import { logout } from "../../services/actions/auth";
import { Link, useLocation } from "react-router-dom";

interface IHeaderProps {

}

const Header: React.FC<IHeaderProps> = ({ }: IHeaderProps): JSX.Element => {
    const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
    const pathname = useLocation().pathname;
    const userInfo: TUserInfo = useSelector(
    (store) => store.auth.userInfo
    );
    const dispatch = useDispatch();

    function onMenuOpen() {
        setIsMenuOpened(!isMenuOpened);
    }

    function onLogout() {
        dispatch(logout());
    }
  return (
    <header className={header.header}>
        <h1 className={header.title}>url shortener</h1>
        <nav className={header.navigation}>
            <ul className={header.list}>
                <li className={header.listItem}><Link className={`${header.link} ${pathname.includes("/new-link") && header.linkActive}`} to="/new-link">Создать новую ссылку</Link></li>
                <li className={header.listItem}><Link className={`${header.link} ${pathname.includes("/statistics") && header.linkActive}`} to="/statistics">Статистика</Link></li>
            </ul>
        </nav>
        <div>
            <button onClick={onMenuOpen} className={`${header.userInfoContainer} ${isMenuOpened ? header.userInfoContainerOpened : '' }`}>
                <div className={header.userInfo}>
                <p className={header.userInfoTitle}>Username</p>
                <p className={header.userInfoSubtitle}>{userInfo.username}</p>
                </div>
                <Arrow isOpen={isMenuOpened} />
            </button>
            <button type="button" onClick={onLogout} className={`${header.logoutButton} ${isMenuOpened ? header.logoutButtonVisible : '' }`}>Выйти</button>
        </div>

    </header>
  );
};

export default Header;