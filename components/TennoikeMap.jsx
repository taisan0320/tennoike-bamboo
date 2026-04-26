// 天王池マップ・音声ガイダンス
const MAP_SPOTS = [
  {
    id: "path",
    name: { ja: "竹林の小径", en: "Bamboo Path", zh: "竹林小径" },
    desc: { ja: "全長約70mの青竹のトンネル", en: "70m bamboo tunnel", zh: "全长约70米的青竹隧道" },
    x: 28, y: 58,
    img: "images/spot-path.jpeg",
    audio: { ja: "audio/path-ja.mp3", en: "audio/path-en.mp3", zh: "audio/path-zh.mp3" },
  },
  {
    id: "door",
    name: { ja: "どこでもドア", en: "Anywhere Door", zh: "任意门" },
    desc: { ja: "三色の扉が竹林に佇む撮影スポット", en: "Three colorful doors in the grove", zh: "竹林中的三色之门" },
    x: 50, y: 42,
    img: "images/spot-door.webp",
    audio: { ja: "audio/door-ja.mp3", en: "audio/door-en.mp3", zh: "audio/door-zh.mp3" },
  },
  {
    id: "wind",
    name: { ja: "森のささやき", en: "Whispers of the Forest", zh: "森林的低语" },
    desc: { ja: "竹に吊された風鈴の道", en: "Path of wind chimes", zh: "悬挂风铃的小道" },
    x: 64, y: 30,
    img: "images/spot-wind.jpg",
    audio: { ja: "audio/wind-ja.mp3", en: "audio/wind-en.mp3", zh: "audio/wind-zh.mp3" },
  },
  {
    id: "pond",
    name: { ja: "天王池ビュー", en: "Tennoike Pond View", zh: "天王池景观" },
    desc: { ja: "水鏡に映る竹と空", en: "Bamboo and sky reflected in the pond", zh: "倒映在水中的竹与天" },
    x: 76, y: 56,
    img: "images/spot-pond.webp",
    audio: { ja: "audio/pond-ja.mp3", en: "audio/pond-en.mp3", zh: "audio/pond-zh.mp3" },
  },
  {
    id: "shrine",
    name: { ja: "お社と鳥居", en: "Shrine & Torii", zh: "神社与鸟居" },
    desc: { ja: "朱塗りの鳥居と地域の鎮守", en: "Vermillion torii gate", zh: "朱红色的鸟居" },
    x: 18, y: 76,
    img: "images/spot-shrine.jpg",
    audio: { ja: "audio/shrine-ja.mp3", en: "audio/shrine-en.mp3", zh: "audio/shrine-zh.mp3" },
  },
];

const LANG_LABEL = {
  ja: { code: "JA", name: "日本語" },
  en: { code: "EN", name: "English" },
  zh: { code: "中", name: "中文" },
};

const TennoikeMap = () => {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  const [activeSpot, setActiveSpot] = React.useState(null);
  const [lang, setLang] = React.useState("ja");
  const [playing, setPlaying] = React.useState(false);
  const audioRef = React.useRef(null);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // ポップアップ閉じたら音声停止
  React.useEffect(() => {
    if (!activeSpot && audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  }, [activeSpot]);

  // 言語切替時に音声を停止
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlaying(false);
    }
  }, [lang, activeSpot]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setPlaying(true))
        .catch(() => {
          alert("音声ファイルがまだ用意されていません。後ほど追加されます。");
          setPlaying(false);
        });
    }
  };

  return (
    <section ref={ref} className={`section illust-map reveal ${inView ? 'in' : ''}`} id="map">
      <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 60px' }}>
        <span className="section-eyebrow">MAP · 竹林絵図</span>
        <h2 className="section-title">天王池絵図</h2>
        <div className="section-divider" style={{ maxWidth: 400, margin: '32px auto 0' }}>
          <span>音声ガイド付</span>
        </div>
        <p className="section-lead" style={{ margin: '40px auto 0' }}>
          絵図の上の印をクリックすると、その場所の写真と音声ガイダンスが再生できます。<br/>
          日本語・English・中文の3言語に対応しています。
        </p>
      </div>

      <div className="map-frame">
        <IllustratedMap />
        {MAP_SPOTS.map((s) => (
          <button
            key={s.id}
            className={`map-pin ${activeSpot?.id === s.id ? 'active' : ''}`}
            style={{ left: `${s.x}%`, top: `${s.y}%` }}
            onClick={() => setActiveSpot(s)}
            aria-label={s.name.ja}
          >
            <span className="map-pin-dot"></span>
            <span className="map-pin-ring"></span>
            <span className="map-pin-label">{s.name.ja}</span>
          </button>
        ))}
      </div>

      {activeSpot && (
        <div className="map-popup-backdrop" onClick={() => setActiveSpot(null)}>
          <div className="map-popup" onClick={(e) => e.stopPropagation()}>
            <button className="map-popup-close" onClick={() => setActiveSpot(null)} aria-label="閉じる">×</button>

            <div
              className="map-popup-image"
              style={{ backgroundImage: `url(${activeSpot.img})` }}
            ></div>

            <div className="map-popup-body">
              <div className="map-popup-eyebrow">SPOT · {activeSpot.id.toUpperCase()}</div>
              <h3 className="map-popup-title">{activeSpot.name[lang]}</h3>
              <p className="map-popup-desc">{activeSpot.desc[lang]}</p>

              <div className="map-popup-audio">
                <div className="map-popup-langs">
                  {Object.keys(LANG_LABEL).map((l) => (
                    <button
                      key={l}
                      className={`map-popup-lang ${lang === l ? 'on' : ''}`}
                      onClick={() => setLang(l)}
                    >
                      <span className="map-popup-lang-code">{LANG_LABEL[l].code}</span>
                      <span className="map-popup-lang-name">{LANG_LABEL[l].name}</span>
                    </button>
                  ))}
                </div>

                <button className={`map-popup-play ${playing ? 'playing' : ''}`} onClick={togglePlay}>
                  {playing ? (
                    <svg viewBox="0 0 24 24" width="20" height="20"><rect x="6" y="5" width="4" height="14" fill="currentColor"/><rect x="14" y="5" width="4" height="14" fill="currentColor"/></svg>
                  ) : (
                    <svg viewBox="0 0 24 24" width="20" height="20"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>
                  )}
                  <span>{playing ? '一時停止' : '音声ガイドを再生'}</span>
                </button>

                <audio
                  ref={audioRef}
                  src={activeSpot.audio[lang]}
                  onEnded={() => setPlaying(false)}
                  preload="none"
                ></audio>

                <div className="map-popup-note">※ 音声データは順次設置予定</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// イラスト風の竹林マップ（SVGで描画）
const IllustratedMap = () => {
  return (
    <svg className="map-illust" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="paper-tex" width="6" height="6" patternUnits="userSpaceOnUse">
          <rect width="6" height="6" fill="var(--paper)"/>
          <circle cx="2" cy="3" r="0.4" fill="var(--ink-faint)" opacity="0.08"/>
          <circle cx="5" cy="1" r="0.3" fill="var(--ink-faint)" opacity="0.06"/>
        </pattern>
        <radialGradient id="pondGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="var(--bamboo-far)" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="var(--bamboo-mid)" stopOpacity="0.3"/>
        </radialGradient>
      </defs>

      {/* 和紙風背景 */}
      <rect width="1000" height="600" fill="url(#paper-tex)"/>
      <rect width="1000" height="600" fill="var(--bg-mist)" opacity="0.3"/>

      {/* 山々（背景） */}
      <path d="M 0 220 Q 100 140, 200 200 Q 300 240, 400 180 Q 500 130, 620 200 Q 750 250, 880 190 Q 950 160, 1000 200 L 1000 280 L 0 280 Z"
        fill="var(--bamboo-far)" opacity="0.5"/>
      <path d="M 0 260 Q 150 200, 280 250 Q 420 290, 560 240 Q 720 200, 880 260 L 1000 250 L 1000 320 L 0 320 Z"
        fill="var(--bamboo-mid)" opacity="0.4"/>

      {/* 天王池 */}
      <ellipse cx="760" cy="335" rx="160" ry="70" fill="url(#pondGrad)" stroke="var(--bamboo-mid)" strokeWidth="2"/>
      <ellipse cx="760" cy="335" rx="140" ry="55" fill="none" stroke="var(--bamboo-mid)" strokeWidth="1" opacity="0.5" strokeDasharray="3 3"/>
      <text x="760" y="340" textAnchor="middle" fill="var(--ink-soft)" fontSize="14" fontFamily="Klee One, serif" letterSpacing="6">天王池</text>

      {/* 竹林エリア（緑のもや） */}
      <path d="M 80 420 Q 200 350, 350 400 Q 500 430, 600 380 Q 700 340, 850 400 Q 920 420, 950 480 Q 900 540, 750 530 Q 600 520, 450 540 Q 300 550, 150 530 Q 60 510, 80 420 Z"
        fill="var(--bamboo-mid)" opacity="0.25"/>
      <path d="M 100 440 Q 220 390, 360 420 Q 500 450, 620 410 Q 750 380, 870 430"
        fill="none" stroke="var(--bamboo-near)" strokeWidth="1" opacity="0.4" strokeDasharray="2 4"/>

      {/* 散歩道 */}
      <path d="M 120 480 Q 250 460, 380 440 Q 520 420, 660 380 Q 760 340, 760 335"
        fill="none" stroke="var(--ink-faint)" strokeWidth="2" strokeDasharray="4 4" opacity="0.6"/>
      <path d="M 120 480 Q 200 520, 280 510 Q 350 500, 380 440"
        fill="none" stroke="var(--ink-faint)" strokeWidth="2" strokeDasharray="4 4" opacity="0.6"/>

      {/* 個別の竹（装飾） */}
      {Array.from({ length: 28 }).map((_, i) => {
        const x = 80 + (i * 32) + (Math.sin(i * 1.7) * 30);
        const baseY = 380 + Math.sin(i * 0.8) * 50;
        const h = 60 + (i % 4) * 20;
        return (
          <g key={i} opacity="0.55">
            <line x1={x} y1={baseY} x2={x} y2={baseY - h} stroke="var(--bamboo-near)" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx={x - 4} cy={baseY - h - 2} r="3" fill="var(--bamboo-near)"/>
            <circle cx={x + 4} cy={baseY - h - 4} r="3" fill="var(--bamboo-mid)"/>
            <circle cx={x} cy={baseY - h - 8} r="2.5" fill="var(--bamboo-near)"/>
          </g>
        );
      })}

      {/* 鳥居（左下） */}
      <g transform="translate(180, 440)" opacity="0.85">
        <rect x="-22" y="-30" width="44" height="4" fill="var(--accent-vermillion)"/>
        <rect x="-26" y="-26" width="52" height="3" fill="var(--accent-vermillion)"/>
        <rect x="-18" y="-26" width="3" height="26" fill="var(--accent-vermillion)"/>
        <rect x="15" y="-26" width="3" height="26" fill="var(--accent-vermillion)"/>
      </g>

      {/* 駐車場 */}
      <g transform="translate(80, 540)">
        <rect x="-18" y="-12" width="36" height="24" fill="none" stroke="var(--ink-faint)" strokeWidth="1" opacity="0.5" strokeDasharray="2 2"/>
        <text x="0" y="3" textAnchor="middle" fill="var(--ink-faint)" fontSize="9" fontFamily="Klee One, serif" letterSpacing="2">P</text>
      </g>

      {/* 方位 */}
      <g transform="translate(940, 90)" opacity="0.55">
        <circle cx="0" cy="0" r="22" fill="none" stroke="var(--ink-soft)" strokeWidth="1"/>
        <path d="M 0 -16 L 4 4 L 0 0 L -4 4 Z" fill="var(--accent-vermillion)"/>
        <path d="M 0 16 L 4 -4 L 0 0 L -4 -4 Z" fill="var(--ink-soft)" opacity="0.5"/>
        <text x="0" y="-26" textAnchor="middle" fill="var(--ink-soft)" fontSize="10" fontFamily="Klee One, serif">北</text>
      </g>

      {/* タイトル札 */}
      <g transform="translate(60, 80)">
        <rect x="-4" y="-22" width="180" height="40" fill="var(--paper)" stroke="var(--ink-faint)" strokeWidth="0.5" opacity="0.7"/>
        <text x="6" y="-4" fill="var(--ink-soft)" fontSize="11" fontFamily="Klee One, serif" letterSpacing="4">TENNOIKE MAP</text>
        <text x="6" y="12" fill="var(--ink)" fontSize="14" fontFamily="Shippori Mincho, serif" letterSpacing="3">天王池竹林・絵図</text>
      </g>
    </svg>
  );
};

window.TennoikeMap = TennoikeMap;
