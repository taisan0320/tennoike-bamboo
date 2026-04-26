// 見どころスポット
const SPOTS = [
  {
    num: "壱",
    label: "ICHI",
    title: "竹林の小径",
    titleEn: "BAMBOO PATH",
    desc: "全長およそ70メートル。両側から覆いかぶさる青竹のトンネルを抜けると、空気の色が変わる。風が通り抜けるたび、竹の葉がかすかな音色を奏で、訪れる者を森の奥へと誘う。京都嵐山を範とし、整備されてきたこの道は、玉野の小さな名所として静かに育ちつつある。",
    meta: [
      { k: "全長", v: "約70m" },
      { k: "所要", v: "5〜10分" },
    ],
    img: "images/spot-path.jpeg",
  },
  {
    num: "弐",
    label: "NI",
    title: "どこでもドア",
    titleEn: "ANYWHERE DOOR",
    desc: "竹林の中に忽然と現れる、桃色・藤色・子ども用の黄色――三つの扉。くぐった先に広がるのは、見慣れた竹林であり、同時に新しい風景でもある。SNSで「映える」と話題になり、遠方から訪れる方も多い、この竹林を象徴するスポット。",
    meta: [
      { k: "扉", v: "3色" },
      { k: "撮影", v: "終日可" },
    ],
    img: "images/spot-door.webp",
  },
  {
    num: "参",
    label: "SAN",
    title: "森のささやき",
    titleEn: "WHISPERS OF THE FOREST",
    desc: "竹の枝に吊された無数の風鈴が、風の通り道を教えてくれる。澄んだ高音が竹を伝い、葉ずれの音と重なって、夏の暑さを忘れさせる。風の強さで音色が変わるため、同じ音色は二度とない。耳をすまし、しばし佇んでみてほしい。",
    meta: [
      { k: "見頃", v: "6〜9月" },
      { k: "風鈴", v: "南部鉄器ほか" },
    ],
    img: "images/spot-wind.jpg",
  },
  {
    num: "肆",
    label: "SHI",
    title: "天王池ビュースポット",
    titleEn: "POND VIEW",
    desc: "竹林を抜けたところに、ひっそりと水面を湛える天王池。水鏡に映り込む青竹と空が、ひとつの絵のように静かに揺れる。早朝には霧が立ち、昼には木漏れ日が差し、夕には茜の色を映す――刻々と表情を変える、この竹林の核となる場所。",
    meta: [
      { k: "おすすめ", v: "早朝・夕方" },
      { k: "光景", v: "水鏡の竹" },
    ],
    img: "images/spot-pond.webp",
  },
  {
    num: "伍",
    label: "GO",
    title: "お社と鳥居",
    titleEn: "SHRINE",
    desc: "竹林の入り口に静かに佇む朱塗りの鳥居と、その先のお社。古くから地域の人々に守られてきた小さな祈りの場である。竹の青と鳥居の朱の対比は、日本の原風景そのもの。一礼して、竹林の世界へ。",
    meta: [
      { k: "歴史", v: "地域の鎮守" },
      { k: "参拝", v: "自由" },
    ],
    img: "images/spot-shrine.jpg",
  },
];

const Spots = () => {
  return (
    <section className="section spots" id="spots">
      <div className="spots-intro reveal">
        <span className="section-eyebrow">SPOTS · 見どころ</span>
        <h2 className="section-title">五つの<br/>静かな景色</h2>
        <div className="section-divider" style={{ maxWidth: 400, margin: '32px auto 0' }}>
          <span>五景</span>
        </div>
        <p className="section-lead" style={{ margin: '40px auto 0' }}>
          竹林を歩きながら、ぜひ立ち止まってほしい場所を五つ。<br/>
          季節と時間によって、どの景色も別の顔を見せてくれます。
        </p>
      </div>

      {SPOTS.map((spot, i) => (
        <SpotItem key={i} spot={spot} reverse={i % 2 === 1} />
      ))}
    </section>
  );
};

const SpotItem = ({ spot, reverse }) => {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      setScrollY(center);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={ref} className={`spot ${reverse ? 'reverse' : ''} ${inView ? 'in' : ''} reveal ${inView ? 'in' : ''}`}>
      <div className="spot-visual">
        <div
          className="spot-visual-inner"
          style={{
            backgroundImage: `url(${spot.img})`,
            transform: `scale(${inView ? 1.05 : 1.15}) translateY(${scrollY * -0.08}px)`,
          }}
        ></div>
      </div>
      <div className="spot-text">
        <div style={{ position: 'relative' }}>
          <div className="spot-number">{spot.num}</div>
          <span className="spot-label">{spot.label} · 第{spot.num}景</span>
          <h3 className="spot-title">{spot.title}</h3>
          <span className="spot-title-en">{spot.titleEn}</span>
          <p className="spot-desc">{spot.desc}</p>
          <div className="spot-meta">
            {spot.meta.map((m, i) => (
              <div key={i} className="spot-meta-item">
                {m.k}
                <strong>{m.v}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

window.Spots = Spots;
