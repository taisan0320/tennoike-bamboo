// アクセス・地図
const Access = () => {
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
    <section ref={ref} className={`access reveal ${inView ? 'in' : ''}`} id="access">
      <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <span className="section-eyebrow">ACCESS · 道のり</span>
        <h2 className="section-title">竹林への<br/>道のり</h2>
        <div className="section-divider" style={{ maxWidth: 400, margin: '32px auto 0' }}>
          <span>所在地</span>
        </div>
      </div>

      <div className="access-grid">
        <div className="access-info">
          <dl>
            <dt>住所</dt>
            <dd>
              〒706-0226<br/>
              岡山県玉野市長尾1858-8 付近
            </dd>
            <dt>車で</dt>
            <dd>
              岡山ICより約45分<br/>
              瀬戸中央自動車道・水島ICより約30分
            </dd>
            <dt>公共交通</dt>
            <dd>
              JR宇野線「宇野」駅より<br/>
              路線バス・タクシーにて約20分
            </dd>
            <dt>駐車場</dt>
            <dd>
              無料駐車場あり（数台）<br/>
              満車の際は近隣案内所にご相談ください
            </dd>
            <dt>見学</dt>
            <dd>
              入園無料・終日開放<br/>
              （日没後は足元にご注意ください）
            </dd>
          </dl>
        </div>
        <div className="access-map">
          <iframe
            src="https://www.google.com/maps?q=岡山県玉野市長尾1858&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="天王池の竹林・地図"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

window.Access = Access;
