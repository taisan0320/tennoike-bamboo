// 竹のSVG生成ユーティリティ
const BambooSVG = ({ count = 8, className = "", color = "var(--bamboo-mid)", width = 1920, height = 1080, opacity = 1, xOffset = 0 }) => {
  const stalks = [];
  for (let i = 0; i < count; i++) {
    const x = (i / count) * width + (Math.sin(i * 1.7) * 60) + xOffset;
    const stalkWidth = 18 + (i % 3) * 6;
    const swayClass = `bamboo-sway bamboo-sway-${(i % 4) + 1}`;
    const segments = 7 + (i % 3);

    // 節
    const nodes = [];
    for (let s = 1; s < segments; s++) {
      const yPos = (s / segments) * height;
      nodes.push(
        <ellipse key={s} cx={x} cy={yPos} rx={stalkWidth / 2 + 1} ry={2.5} fill={color} opacity={0.7} />
      );
    }

    // 葉
    const leaves = [];
    const leafCount = 6 + (i % 4);
    for (let l = 0; l < leafCount; l++) {
      const ly = (l / leafCount) * height * 0.7 + height * 0.05;
      const lx = x + (Math.sin(l * 2.3 + i) * 80);
      const angle = Math.sin(l * 1.5 + i) * 60;
      const len = 30 + (l % 3) * 10;
      leaves.push(
        <path
          key={`l${l}`}
          d={`M ${lx} ${ly} Q ${lx + Math.cos(angle * Math.PI/180) * len * 0.5} ${ly + Math.sin(angle * Math.PI/180) * len * 0.5 - 4}, ${lx + Math.cos(angle * Math.PI/180) * len} ${ly + Math.sin(angle * Math.PI/180) * len}`}
          stroke={color}
          strokeWidth={3 + (l % 2)}
          fill="none"
          strokeLinecap="round"
          opacity={0.85}
        />
      );
    }

    stalks.push(
      <g key={i} className={swayClass} style={{ transformOrigin: `${x}px ${height}px` }}>
        {/* 幹 */}
        <rect x={x - stalkWidth / 2} y={0} width={stalkWidth} height={height} fill={color} rx={stalkWidth / 2} />
        {nodes}
        {leaves}
      </g>
    );
  }

  return (
    <svg
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', opacity }}
    >
      {stalks}
    </svg>
  );
};

// 漂う葉
const FloatingLeaves = ({ count = 12 }) => {
  const leaves = [];
  for (let i = 0; i < count; i++) {
    const left = Math.random() * 100;
    const xMove = (Math.random() - 0.5) * 200;
    const duration = 12 + Math.random() * 18;
    const delay = -Math.random() * duration;
    const size = 14 + Math.random() * 16;
    const rotate = Math.random() * 360;

    leaves.push(
      <div
        key={i}
        className="leaf"
        style={{
          left: `${left}%`,
          width: `${size}px`,
          height: `${size * 0.4}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          '--leaf-x': `${xMove}px`,
          transform: `rotate(${rotate}deg)`,
        }}
      >
        <svg viewBox="0 0 40 16" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <path d="M 0 8 Q 20 0, 40 8 Q 20 16, 0 8 Z" fill="var(--bamboo-near)" opacity="0.6" />
        </svg>
      </div>
    );
  }
  return <>{leaves}</>;
};

window.BambooSVG = BambooSVG;
window.FloatingLeaves = FloatingLeaves;
