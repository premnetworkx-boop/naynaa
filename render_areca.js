import { chromium } from 'playwright';

function createArchingFrond(x1, y1, ax, ay, tx, ty, width) {
  // Cubic Bezier curve that goes up to apex (ax, ay) and gracefully arches down to (tx, ty)
  // Normal offsets for leaf width tapering to point
  const dx1 = ax - x1;
  const dy1 = ay - y1;
  const len1 = Math.hypot(dx1, dy1) || 1;
  const nx1 = -dy1 / len1 * (width * 0.5);
  const ny1 = dx1 / len1 * (width * 0.5);

  const dx2 = tx - ax;
  const dy2 = ty - ay;
  const len2 = Math.hypot(dx2, dy2) || 1;
  const nx2 = -dy2 / len2 * (width * 0.8);
  const ny2 = dx2 / len2 * (width * 0.8);

  // Outline
  return `
    M ${x1} ${y1}
    C ${x1 + nx1} ${y1 + ny1}, ${ax + nx2} ${ay + ny2}, ${tx} ${ty}
    C ${ax - nx2} ${ay - ny2}, ${x1 - nx1} ${y1 - ny1}, ${x1} ${y1}
    Z
  `;
}

async function generateArecaPalm() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1000, height: 1400 } });

  const svgContent = `
  <svg width="1000" height="1400" viewBox="0 0 1000 1400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Warm Studio Backdrop -->
      <radialGradient id="sand-backdrop" cx="50%" cy="45%" r="65%">
        <stop offset="0%" stop-color="#f8f2eb"/>
        <stop offset="60%" stop-color="#eedfcb"/>
        <stop offset="100%" stop-color="#dfceb7"/>
      </radialGradient>

      <!-- Tapered Ceramic Pot -->
      <linearGradient id="pot-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ded4c3"/>
        <stop offset="18%" stop-color="#fcf9f2"/>
        <stop offset="50%" stop-color="#fffefa"/>
        <stop offset="80%" stop-color="#f4ebe0"/>
        <stop offset="100%" stop-color="#cfc3af"/>
      </linearGradient>

      <linearGradient id="pot-rim-grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#d4c8b6"/>
        <stop offset="50%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#cbbfa9"/>
      </linearGradient>

      <!-- Soil Gradient -->
      <radialGradient id="soil-grad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#3e2723"/>
        <stop offset="65%" stop-color="#271810"/>
        <stop offset="100%" stop-color="#1b0f0a"/>
      </radialGradient>

      <!-- Areca Cane Gradients -->
      <linearGradient id="cane-green" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#2d6a2f"/>
        <stop offset="25%" stop-color="#52c54d"/>
        <stop offset="60%" stop-color="#86efac"/>
        <stop offset="85%" stop-color="#3eb043"/>
        <stop offset="100%" stop-color="#166534"/>
      </linearGradient>

      <linearGradient id="cane-base-gold" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#b45309"/>
        <stop offset="35%" stop-color="#d97706"/>
        <stop offset="70%" stop-color="#f59e0b"/>
        <stop offset="100%" stop-color="#84cc16"/>
      </linearGradient>

      <!-- Feather Frond Foliage Gradients -->
      <linearGradient id="frond-gloss" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#15803d"/>
        <stop offset="35%" stop-color="#22c55e"/>
        <stop offset="75%" stop-color="#86efac"/>
        <stop offset="100%" stop-color="#dcfce7"/>
      </linearGradient>

      <linearGradient id="frond-dark" x1="10%" y1="100%" x2="90%" y2="0%">
        <stop offset="0%" stop-color="#0f451e"/>
        <stop offset="40%" stop-color="#156e2f"/>
        <stop offset="80%" stop-color="#22c55e"/>
        <stop offset="100%" stop-color="#4ade80"/>
      </linearGradient>

      <linearGradient id="frond-bright" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#16a34a"/>
        <stop offset="45%" stop-color="#4ade80"/>
        <stop offset="85%" stop-color="#bbf7d0"/>
        <stop offset="100%" stop-color="#f0fdf4"/>
      </linearGradient>

      <!-- Pot Base Drop Shadow -->
      <filter id="pot-shadow" x="-20%" y="-20%" width="140%" height="160%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="16"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.16  0 0 0 0 0.12  0 0 0 0.35 0"/>
        <feOffset dx="0" dy="16"/>
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal"/>
      </filter>
    </defs>

    <!-- Warm Minimalist Background -->
    <rect width="1000" height="1400" fill="url(#sand-backdrop)" />

    <!-- Floor Natural Ambient Shadow -->
    <ellipse cx="500" cy="1305" rx="250" ry="25" fill="#4a3b2c" opacity="0.18" filter="blur(16px)" />
    <ellipse cx="500" cy="1300" rx="175" ry="15" fill="#36291c" opacity="0.28" filter="blur(8px)" />
    <ellipse cx="500" cy="1295" rx="125" ry="8" fill="#1f160e" opacity="0.45" filter="blur(4px)" />

    <!-- ARECA PALM SPECIMEN -->
    <g id="areca-composition">

      <!-- ================= BACK LAYER FRONDS ================= -->
      ${renderArchingFronds('back')}

      <!-- ================= CLUSTERED PALM CANES ================= -->
      <g id="palm-canes">
        ${renderCanes()}
      </g>

      <!-- ================= MID LAYER FRONDS ================= -->
      ${renderArchingFronds('mid')}

      <!-- ================= FRONT LAYER FRONDS ================= -->
      ${renderArchingFronds('front')}

      <!-- ================= TAPERED CERAMIC POT & SOIL ================= -->
      <g id="ceramic-pot" filter="url(#pot-shadow)">
        <!-- Rich Dark Soil Basin -->
        <ellipse cx="500" cy="980" rx="200" ry="28" fill="url(#soil-grad)" />

        <!-- Soil details -->
        <g fill="#8d6e63" opacity="0.6">
          <circle cx="430" cy="985" r="3" />
          <circle cx="490" cy="992" r="2.5" />
          <circle cx="550" cy="988" r="3.2" />
          <circle cx="610" cy="980" r="2.8" />
          <circle cx="390" cy="978" r="2.2" />
          <circle cx="510" cy="995" r="3.5" />
          <circle cx="460" cy="975" r="2.6" fill="#d7ccc8" />
          <circle cx="570" cy="982" r="2" fill="#d7ccc8" />
        </g>

        <!-- Tapered Planter Body -->
        <path d="M 300 980
                 C 305 1070, 335 1190, 345 1285
                 C 400 1302, 600 1302, 655 1285
                 C 665 1190, 695 1070, 700 980
                 Z"
              fill="url(#pot-grad)" />

        <!-- Crisp Upper Pot Rim -->
        <ellipse cx="500" cy="980" rx="201" ry="25" fill="none" stroke="url(#pot-rim-grad)" stroke-width="5" />
        <ellipse cx="500" cy="978" rx="198" ry="22" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.85" />

        <!-- Pot Specular Highlight -->
        <path d="M 335 1000 C 345 1080, 368 1190, 374 1270" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.75" filter="blur(1.5px)" />
        <path d="M 350 1010 C 358 1080, 378 1180, 382 1260" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.9" />

        <!-- Soft Right Edge Shading -->
        <path d="M 690 1000 C 680 1080, 658 1190, 648 1270" stroke="#b0a28f" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.5" filter="blur(2px)" />

        <!-- Pot Base Foot -->
        <ellipse cx="500" cy="1285" rx="155" ry="16" fill="none" stroke="#c2b49e" stroke-width="2.5" opacity="0.4" />

        <!-- ================= NAYNAA BRAND LOGO ================= -->
        <g id="pot-naynaa-logo" transform="translate(425, 1210)">
          <g transform="translate(75, 0) scale(0.72)">
            <path d="M 0 0 C -26 -5, -46 -35, -36 -62 C -15 -57, 0 -35, 0 0 Z" fill="#1b4d20" />
            <path d="M 0 0 C 10 -35, 36 -67, 57 -56 C 52 -25, 26 -5, 0 0 Z" fill="#66ab32" />
          </g>
          <text x="75" y="32"
                text-anchor="middle"
                font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
                font-size="34"
                font-weight="600"
                letter-spacing="0.5"
                fill="#183d1c">naynaa</text>
        </g>
      </g>
    </g>
  </svg>
  `;

  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;overflow:hidden;background:#fff;">${svgContent}</body></html>`);
  await page.screenshot({ path: 'public/specimens/products/areca_palm.png', type: 'png' });
  await page.screenshot({ path: 'public/specimens/products/areca_palm.jpg', type: 'jpeg', quality: 95 });
  await browser.close();
  console.log('Finished rendering Areca Palm with graceful arching fronds!');
}

function renderCanes() {
  let s = '';
  const canePositions = [
    { x: 435, w: 9, h: 280, lean: -4 },
    { x: 450, w: 10, h: 350, lean: -5 },
    { x: 465, w: 11, h: 420, lean: -3 },
    { x: 480, w: 12, h: 480, lean: -1 },
    { x: 495, w: 13, h: 510, lean: 0 },
    { x: 510, w: 13, h: 510, lean: 1 },
    { x: 525, w: 12, h: 470, lean: 2 },
    { x: 540, w: 11, h: 410, lean: 3 },
    { x: 555, w: 10, h: 340, lean: 4 },
    { x: 570, w: 9, h: 280, lean: 5 },
    // Inner overlap canes
    { x: 458, w: 9, h: 320, lean: -2 },
    { x: 488, w: 11, h: 440, lean: 1 },
    { x: 518, w: 11, h: 460, lean: -1 },
    { x: 548, w: 10, h: 370, lean: 3 }
  ];

  for (const c of canePositions) {
    const topY = 980 - c.h;
    const topX = c.x + c.lean * 14;
    s += `
      <g>
        <path d="M ${c.x} 980 Q ${(c.x + topX)/2} ${(980 + topY)/2} ${topX} ${topY}"
              stroke="url(#cane-green)" stroke-width="${c.w}" stroke-linecap="round" fill="none" />
        <path d="M ${c.x} 980 Q ${(c.x * 2 + topX)/3} ${(980 * 2 + topY)/3} ${(c.x + topX)/2} 870"
              stroke="url(#cane-base-gold)" stroke-width="${c.w + 1.5}" stroke-linecap="round" fill="none" opacity="0.9" />
      </g>
    `;
  }
  return s;
}

function renderArchingFronds(layer) {
  let s = '';

  // Realistic fountain-like arching fronds:
  // Each frond starts at (x1, y1), arches up to apex (ax, ay), then droops outward and down to (tx, ty)
  const frondConfigs = [
    // --- BACK LAYER ---
    // Tall central fronds
    { x1: 500, y1: 520, ax: 490, ay: 120, tx: 460, ty: 40, w: 28, g: 'frond-gloss', l: 'back' },
    { x1: 480, y1: 540, ax: 420, ay: 160, tx: 350, ty: 95, w: 30, g: 'frond-dark', l: 'back' },
    { x1: 520, y1: 540, ax: 580, ay: 160, tx: 650, ty: 95, w: 30, g: 'frond-gloss', l: 'back' },
    // Wide high arches
    { x1: 460, y1: 580, ax: 340, ay: 200, tx: 220, ty: 150, w: 32, g: 'frond-dark', l: 'back' },
    { x1: 540, y1: 580, ax: 660, ay: 200, tx: 780, ty: 150, w: 32, g: 'frond-gloss', l: 'back' },
    // Outer drooping fronds
    { x1: 440, y1: 640, ax: 260, ay: 260, tx: 100, ty: 240, w: 30, g: 'frond-dark', l: 'back' },
    { x1: 560, y1: 640, ax: 740, ay: 260, tx: 900, ty: 240, w: 30, g: 'frond-gloss', l: 'back' },
    { x1: 430, y1: 700, ax: 200, ay: 340, tx: 50, ty: 380, w: 26, g: 'frond-dark', l: 'back' },
    { x1: 570, y1: 700, ax: 800, ay: 340, tx: 950, ty: 380, w: 26, g: 'frond-dark', l: 'back' },

    // --- MID LAYER ---
    { x1: 495, y1: 560, ax: 480, ay: 150, tx: 450, ty: 60, w: 32, g: 'frond-bright', l: 'mid' },
    { x1: 505, y1: 560, ax: 520, ay: 150, tx: 550, ty: 60, w: 32, g: 'frond-bright', l: 'mid' },
    { x1: 470, y1: 610, ax: 380, ay: 210, tx: 280, ty: 140, w: 34, g: 'frond-gloss', l: 'mid' },
    { x1: 530, y1: 610, ax: 620, ay: 210, tx: 720, ty: 140, w: 34, g: 'frond-bright', l: 'mid' },
    { x1: 450, y1: 660, ax: 310, ay: 280, tx: 170, ty: 250, w: 30, g: 'frond-dark', l: 'mid' },
    { x1: 550, y1: 660, ax: 690, ay: 280, tx: 830, ty: 250, w: 30, g: 'frond-bright', l: 'mid' },
    { x1: 440, y1: 720, ax: 230, ay: 360, tx: 90, ty: 390, w: 28, g: 'frond-gloss', l: 'mid' },
    { x1: 560, y1: 720, ax: 770, ay: 360, tx: 910, ty: 390, w: 28, g: 'frond-gloss', l: 'mid' },
    { x1: 430, y1: 780, ax: 180, ay: 460, tx: 75, ty: 520, w: 24, g: 'frond-dark', l: 'mid' },
    { x1: 570, y1: 780, ax: 820, ay: 460, tx: 925, ty: 520, w: 24, g: 'frond-dark', l: 'mid' },

    // --- FRONT LAYER ---
    // Prominent arching foreground fronds curving downwards
    { x1: 485, y1: 620, ax: 440, ay: 220, tx: 360, ty: 160, w: 34, g: 'frond-bright', l: 'front' },
    { x1: 515, y1: 620, ax: 560, ay: 220, tx: 640, ty: 160, w: 34, g: 'frond-bright', l: 'front' },
    { x1: 465, y1: 680, ax: 350, ay: 320, tx: 230, ty: 300, w: 32, g: 'frond-bright', l: 'front' },
    { x1: 535, y1: 680, ax: 650, ay: 320, tx: 770, ty: 300, w: 32, g: 'frond-bright', l: 'front' },
    { x1: 450, y1: 740, ax: 270, ay: 410, tx: 130, ty: 440, w: 28, g: 'frond-gloss', l: 'front' },
    { x1: 550, y1: 740, ax: 730, ay: 410, tx: 870, ty: 440, w: 28, g: 'frond-bright', l: 'front' },
    { x1: 440, y1: 820, ax: 210, ay: 530, tx: 100, ty: 610, w: 24, g: 'frond-gloss', l: 'front' },
    { x1: 560, y1: 820, ax: 790, ay: 530, tx: 900, ty: 610, w: 24, g: 'frond-bright', l: 'front' },
    { x1: 435, y1: 890, ax: 180, ay: 630, tx: 110, ty: 730, w: 22, g: 'frond-dark', l: 'front' },
    { x1: 565, y1: 890, ax: 820, ay: 630, tx: 890, ty: 730, w: 22, g: 'frond-gloss', l: 'front' }
  ];

  for (const item of frondConfigs.filter(x => x.l === layer)) {
    const d = createArchingFrond(item.x1, item.y1, item.ax, item.ay, item.tx, item.ty, item.w);
    s += `
      <g>
        <path d="${d}" fill="url(#${item.g})" opacity="${layer === 'front' ? '0.97' : '0.88'}" />
        <!-- Arching Midrib -->
        <path d="M ${item.x1} ${item.y1} Q ${item.ax} ${item.ay} ${item.tx} ${item.ty}"
              stroke="#dcfce7" stroke-width="1.8" fill="none" opacity="0.8" />
      </g>
    `;
  }

  return s;
}

generateArecaPalm().catch(console.error);
