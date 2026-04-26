// 団体紹介＋YouTube
const VIDEOS = [
  { id: "3tfmPUuay_g", title: "天王池の竹林 紹介映像" },
  { id: "-mSfvC38Rn0", title: "天王池の竹林の風景" },
  { id: "Fma6SAvTN3k", title: "天王池の竹林の活動" },
];

const YouTubeCard = ({ video }) => {
  const [activated, setActivated] = React.useState(false);
  const thumb = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;
  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <div className="youtube-item">
      <div className="youtube-frame">
        {activated ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { e.preventDefault(); setActivated(true); }}
            className="youtube-thumb"
            aria-label={video.title}
          >
            <img src={thumb} alt={video.title} loading="lazy" />
            <span className="youtube-play" aria-hidden="true">
              <svg viewBox="0 0 68 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55C3.97 2.33 2.27 4.81 1.48 7.74 0 13.05 0 24 0 24s0 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C68 34.95 68 24 68 24s0-10.95-1.48-16.26z" fill="#cc1f1f" opacity="0.95"/>
                <path d="M45 24L27 14v20" fill="#fff"/>
              </svg>
            </span>
          </a>
        )}
      </div>
      <div className="youtube-title">{video.title}</div>
    </div>
  );
};

const Organization = () => {
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
    <section ref={ref} className={`section org reveal ${inView ? 'in' : ''}`} id="org">
      <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <span className="section-eyebrow">SUPPORTERS · 竹林を支える人々</span>
        <h2 className="section-title">玉野市<br/>天王池竹林の会</h2>
        <div className="section-divider" style={{ maxWidth: 400, margin: '32px auto 0' }}>
          <span>有志の会</span>
        </div>

        <blockquote className="org-quote vertical-text">
          「目指すは、日本一映える竹林。<br/>
          京都嵐山を見本に、玉野の小さな宝物を、<br/>
          みんなで少しずつ育てていきたい。」
          <span className="org-quote-author">代表 髙畠 眞人</span>
        </blockquote>

        <p className="section-lead" style={{ margin: '0 auto', textAlign: 'left' }}>
          天王池竹林の会は、地域の有志により発足した竹林整備のボランティア団体です。
          かつては手入れの行き届かなかった竹林に、八年の歳月をかけて道を通し、
          スポットを設え、訪れる方々を迎える場所として育ててきました。
          会員は十数名。月に数度、鎌と鋸を手に集まり、竹を伐り、葉を掃き、
          季節ごとの設えを整える――地味でありながら、続けることでしか得られない景色がここにあります。
        </p>
      </div>

      <div className="org-meta">
        <div className="org-meta-item">
          <div className="org-meta-num">8<small>年</small></div>
          <div className="org-meta-label">活動年数</div>
        </div>
        <div className="org-meta-item">
          <div className="org-meta-num">十数<small>名</small></div>
          <div className="org-meta-label">会員</div>
        </div>
        <div className="org-meta-item">
          <div className="org-meta-num">5<small>景</small></div>
          <div className="org-meta-label">整備スポット</div>
        </div>
        <div className="org-meta-item">
          <div className="org-meta-num">70<small>m</small></div>
          <div className="org-meta-label">竹林の小径</div>
        </div>
      </div>

      <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 40px' }}>
        <span className="section-eyebrow" style={{ color: 'var(--ink-faint)' }}>YOUTUBE · 竹林の会の活動</span>
        <h3 style={{ fontSize: 24, letterSpacing: '0.15em', fontWeight: 500, marginTop: 12 }}>
          動く竹林の風景
        </h3>
      </div>

      <div className="youtube-grid">
        {VIDEOS.map((v, i) => (
          <YouTubeCard key={i} video={v} />
        ))}
      </div>
    </section>
  );
};

window.Organization = Organization;
