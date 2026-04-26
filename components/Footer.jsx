// フッター
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">天王池の竹林</div>
      <div className="footer-tag">TENNOIKE BAMBOO GROVE · OKAYAMA TAMANO</div>
      <div style={{ fontSize: 13, letterSpacing: '0.2em', lineHeight: 2, opacity: 0.7 }}>
        玉野市天王池竹林の会<br/>
        〒706-0226 岡山県玉野市長尾1858-8 付近
      </div>
      <div className="footer-divider"></div>
      <div className="footer-copy">
        © 2026 TENNOIKE BAMBOO GROVE. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

window.Footer = Footer;
