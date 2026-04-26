// お問い合わせフォーム
const Contact = () => {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [form, setForm] = React.useState({
    name: '', email: '', phone: '', category: '', message: ''
  });

  React.useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleChange = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    fetch('https://formspree.io/f/xeevdwbl', {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        お名前: form.name,
        メールアドレス: form.email,
        電話番号: form.phone,
        ご用件: form.category,
        メッセージ: form.message,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setSubmitted(true);
        } else {
          setError('送信に失敗しました。時間をおいて再度お試しください。');
        }
      })
      .catch(() => setError('通信エラーが発生しました。インターネット接続をご確認ください。'))
      .finally(() => setSending(false));
  };

  const valid = form.name && form.email && form.category && form.message;

  return (
    <section ref={ref} className={`contact reveal ${inView ? 'in' : ''}`} id="contact">
      <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto' }}>
        <span className="section-eyebrow">CONTACT · お問い合わせ</span>
        <h2 className="section-title">お便り、<br/>お待ちしております</h2>
        <div className="section-divider" style={{ maxWidth: 400, margin: '32px auto 0' }}>
          <span>御連絡</span>
        </div>
        <p className="section-lead" style={{ margin: '40px auto 0' }}>
          見学・取材・ボランティアのご応募など、<br/>
          どうぞお気軽にご連絡ください。数日以内にお返事いたします。
        </p>
      </div>

      {!submitted ? (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row-2col">
            <div className="form-row">
              <label>お名前 <span className="required">*</span></label>
              <input type="text" value={form.name} onChange={handleChange('name')} placeholder="山田 花子" required />
            </div>
            <div className="form-row">
              <label>メールアドレス <span className="required">*</span></label>
              <input type="email" value={form.email} onChange={handleChange('email')} placeholder="example@mail.com" required />
            </div>
          </div>

          <div className="form-row-2col">
            <div className="form-row">
              <label>電話番号</label>
              <input type="tel" value={form.phone} onChange={handleChange('phone')} placeholder="000-0000-0000" />
            </div>
            <div className="form-row">
              <label>ご用件 <span className="required">*</span></label>
              <select value={form.category} onChange={handleChange('category')} required>
                <option value="">お選びください</option>
                <option value="visit">見学について</option>
                <option value="press">取材のご依頼</option>
                <option value="volunteer">ボランティア応募</option>
                <option value="event">イベント・撮影利用</option>
                <option value="other">その他</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <label>メッセージ <span className="required">*</span></label>
            <textarea
              value={form.message}
              onChange={handleChange('message')}
              placeholder="ご用件の詳細をお書きください。&#10;見学希望日や人数なども、お気軽にご記入ください。"
              required
            ></textarea>
          </div>

          {error && (
            <p style={{ color: 'var(--accent-vermillion)', fontSize: 13, textAlign: 'center', marginBottom: 16, letterSpacing: '0.05em' }}>{error}</p>
          )}
          <div style={{ textAlign: 'center' }}>
            <button type="submit" className="form-submit" disabled={!valid || sending}>
              {sending ? '送信中…' : '送信する'}
              {!sending && <span style={{ fontSize: 16 }}>→</span>}
            </button>
          </div>
        </form>
      ) : (
        <div className="contact-form">
          <div className="form-success">
            <div className="form-success-title">お送りいたしました</div>
            <p style={{ fontSize: 14, lineHeight: 2, color: 'var(--ink-soft)' }}>
              お問い合わせありがとうございます。<br/>
              内容を確認のうえ、数日以内にご返信いたします。<br/>
              竹林にてお会いできる日を楽しみにしております。
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

window.Contact = Contact;
