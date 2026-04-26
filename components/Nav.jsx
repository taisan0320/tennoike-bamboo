// ナビゲーション
const Nav = () => {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <a href="#hero" className="nav-logo">
        天王池の竹林
        <span className="small">TENNOIKE</span>
      </a>
      <ul className="nav-links">
        <li><a href="#spots">見どころ</a></li>
        <li><a href="#map">絵図</a></li>
        <li><a href="#gallery">四季</a></li>
        <li><a href="#org">竹林の会</a></li>
        <li><a href="#access">アクセス</a></li>
        <li><a href="#contact">お問い合わせ</a></li>
      </ul>
    </nav>
  );
};

window.Nav = Nav;
