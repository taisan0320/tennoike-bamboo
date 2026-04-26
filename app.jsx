// メインアプリ
const App = () => {
  const tweakDefaults = /*EDITMODE-BEGIN*/{
    "theme": "mist",
    "anim": "normal",
    "writing": "horizontal",
    "ambientSound": false
  }/*EDITMODE-END*/;

  const [tweaks, setTweak] = useTweaks(tweakDefaults);
  const [audioPlaying, setAudioPlaying] = React.useState(false);

  // テーマ・モード適用
  React.useEffect(() => {
    document.documentElement.dataset.theme = tweaks.theme;
    document.documentElement.dataset.anim = tweaks.anim;
    document.documentElement.dataset.writing = tweaks.writing;
  }, [tweaks.theme, tweaks.anim, tweaks.writing]);

  // 環境音
  React.useEffect(() => {
    const audio = document.getElementById('ambient-audio');
    if (!audio) return;
    if (tweaks.ambientSound) {
      audio.volume = 0.3;
      audio.play().then(() => setAudioPlaying(true)).catch(() => setAudioPlaying(false));
    } else {
      audio.pause();
      setAudioPlaying(false);
    }
  }, [tweaks.ambientSound]);

  const toggleAudio = () => setTweak('ambientSound', !tweaks.ambientSound);

  // .reveal 出現監視
  React.useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add('in');
      });
    }, { threshold: 0.15 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <Spots />
      <TennoikeMap />
      <Gallery />
      <Organization />
      <Access />
      <Contact />
      <Footer />

      {/* 環境音ボタン */}
      <button className={`audio-btn ${audioPlaying ? 'playing' : ''}`} onClick={toggleAudio} aria-label="環境音 on/off">
        {audioPlaying ? (
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <path d="M15.5 8.5a5 5 0 010 7"/>
            <path d="M19 5a9 9 0 010 14"/>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 5L6 9H2v6h4l5 4V5z"/>
            <line x1="22" y1="9" x2="16" y2="15"/>
            <line x1="16" y1="9" x2="22" y2="15"/>
          </svg>
        )}
      </button>

      {/* Tweaksパネル */}
      <TweaksPanel title="Tweaks">
        <TweakSection label="配色">
          <TweakRadio
            label="時間帯"
            value={tweaks.theme}
            onChange={(v) => setTweak('theme', v)}
            options={[
              { value: 'mist', label: '朝霧' },
              { value: 'day', label: '昼' },
              { value: 'dusk', label: '夕暮れ' },
              { value: 'night', label: '夜' },
            ]}
          />
        </TweakSection>

        <TweakSection label="アニメーション">
          <TweakRadio
            label="強度"
            value={tweaks.anim}
            onChange={(v) => setTweak('anim', v)}
            options={[
              { value: 'off', label: 'OFF' },
              { value: 'normal', label: '標準' },
              { value: 'strong', label: '強め' },
            ]}
          />
        </TweakSection>

        <TweakSection label="文字組み">
          <TweakRadio
            label="書字方向"
            value={tweaks.writing}
            onChange={(v) => setTweak('writing', v)}
            options={[
              { value: 'horizontal', label: '横書き' },
              { value: 'vertical', label: '縦書き' },
            ]}
          />
        </TweakSection>

        <TweakSection label="環境音">
          <TweakToggle
            label="竹林の音"
            value={tweaks.ambientSound}
            onChange={(v) => setTweak('ambientSound', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
