import headerLogo from '../images/logo.svg'

function Header(props) {
    return (
        <header className="header">
            <img src={headerLogo} className="header__logo" alt="Логотип" />
            <nav className="menu">
                {props.children}
            </nav>
        </header>
    );
}

export default Header;