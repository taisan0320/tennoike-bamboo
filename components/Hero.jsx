// ヒーローセクション
const Hero = () => {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // パララックス係数
  const p = (factor) => `translateY(${scrollY * factor}px)`;
  const opacity = Math.max(0, 1 - scrollY / 600);

  // タイトルを文字ごとに分解してアニメーション
  const titleChars = "天王池の竹林".split("");

  return (
    <section className="hero" id="hero">
      {/* 背景：遠景の竹（薄い） */}
      <div className="hero-layer" style={{ transform: p(0.15), opacity: 0.4 }}>
        <BambooSVG count={14} color="var(--bamboo-far)" opacity={0.7} />
      </div>

      {/* 霧 */}
      <div className="mist" style={{ transform: p(0.1) }}></div>

      {/* 中景の竹 */}
      <div className="hero-layer" style={{ transform: p(0.35), opacity: 0.7 }}>
        <BambooSVG count={9} color="var(--bamboo-mid)" opacity={0.9} xOffset={40} />
      </div>

      {/* 光の差し込み */}
      <div className="light-rays" style={{ transform: p(0.05) }}></div>

      {/* タイトル */}
      <div className="hero-content" style={{ opacity, transform: `translateY(${scrollY * 0.3}px)` }}>
        <h1 className="hero-title">
          <span className="main">
            {titleChars.map((c, i) => (
              <span key={i} style={{ animationDelay: `${0.3 + i * 0.15}s` }}>{c}</span>
            ))}
          </span>
          <span className="hero-sub">TENNOIKE BAMBOO GROVE</span>
        </h1>
      </div>

      {/* 近景の竹（濃い） */}
      <div className="hero-layer" style={{ transform: p(0.7), opacity: 0.85 }}>
        <BambooSVG count={6} color="var(--bamboo-near)" opacity={1} xOffset={-80} />
      </div>

      {/* 葉が舞う */}
      <FloatingLeaves count={10} />

      {/* 下部情報 */}
      <div className="hero-location" style={{ opacity }}>
        OKAYAMA &nbsp;·&nbsp; TAMANO &nbsp;·&nbsp; 岡山県玉野市長尾
      </div>
      <div className="hero-scroll" style={{ opacity }}>
        SCROLL
      </div>
    </section>
  );
};

window.Hero = Hero;
