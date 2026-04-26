// 四季のギャラリー
const GALLERY = [
  { season: "冬 · WINTER", title: "天王池・水面の景", img: "images/spot-pond.webp", cls: "g-large" },
  { season: "新緑 · GREEN", title: "どこでもドア・桃色の扉", img: "images/spot-door.webp", cls: "g-small" },
  { season: "夏 · SUMMER", title: "竹林の小径", img: "images/spot-path.jpeg", cls: "g-medium" },
  { season: "冬 · WINTER", title: "竹林の入口", img: "images/gallery-3.jpg", cls: "g-medium" },
  { season: "春 · SPRING", title: "頂きより望む眺望", img: "images/gallery-5.jpg", cls: "g-medium" },
  { season: "夏 · SUMMER", title: "森のささやき・風鈴の道", img: "images/spot-wind.jpg", cls: "g-medium" },
];

const Gallery = () => {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className={`section gallery reveal ${inView ? 'in' : ''}`} id="gallery">
      <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 60px' }}>
        <span className="section-eyebrow">GALLERY · 四季の表情</span>
        <h2 className="section-title">めぐる季節、<br/>移ろう光</h2>
        <div className="section-divider" style={{ maxWidth: 400, margin: '32px auto 0' }}>
          <span>四季</span>
        </div>
        <p className="section-lead" style={{ margin: '40px auto 0' }}>
          芽吹きの春、風鈴の夏、黄金の秋、白雪の冬。<br/>
          同じ場所が、季節ごとにまったく別の顔を見せてくれます。
        </p>
      </div>

      <div className="gallery-grid">
        {GALLERY.map((g, i) => (
          <div key={i} className={`gallery-item ${g.cls}`}>
            <img src={g.img} alt={g.title} loading="lazy" />
            <div className="gallery-item-label">
              <div style={{ fontSize: 10, opacity: 0.8, marginBottom: 4 }}>{g.season}</div>
              <div>{g.title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

window.Gallery = Gallery;
