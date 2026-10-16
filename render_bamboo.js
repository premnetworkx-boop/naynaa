import { chromium } from 'playwright';

function createLeafPath(x1, y1, x2, y2, width, curveDir = 0) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  if (len === 0) return '';
  const nx = -dy / len;
  const ny = dx / len;

  const curve = len * 0.15 * curveDir;

  const cp1x = x1 + dx * 0.35 + nx * (width + curve);
  const cp1y = y1 + dy * 0.35 + ny * (width + curve);
  const cp2x = x1 + dx * 0.75 + nx * (width * 0.7 + curve * 0.8);
  const cp2y = y1 + dy * 0.75 + ny * (width * 0.7 + curve * 0.8);

  const cp3x = x1 + dx * 0.75 - nx * (width * 0.7 - curve * 0.8);
  const cp3y = y1 + dy * 0.75 - ny * (width * 0.7 - curve * 0.8);
  const cp4x = x1 + dx * 0.35 - nx * (width - curve);
  const cp4y = y1 + dy * 0.35 - ny * (width - curve);

  return `M ${x1} ${y1} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x2} ${y2} C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${x1} ${y1} Z`;
}

async function generateSpecimen(isThreeLayer, outputPng, outputJpg) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1000, height: 1400 } });

  const tiersCount = isThreeLayer ? 3 : 2;

  const svgContent = `
  <svg width="1000" height="1400" viewBox="0 0 1000 1400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="bg-glow" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="#ffffff"/>
        <stop offset="75%" stop-color="#ffffff"/>
        <stop offset="100%" stop-color="#f8fafc"/>
      </radialGradient>

      <!-- Glass Rim Gradient -->
      <linearGradient id="glass-rim" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9"/>
        <stop offset="25%" stop-color="#94a3b8" stop-opacity="0.35"/>
        <stop offset="50%" stop-color="#ffffff" stop-opacity="0.95"/>
        <stop offset="75%" stop-color="#94a3b8" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.9"/>
      </linearGradient>

      <linearGradient id="glass-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.5"/>
        <stop offset="25%" stop-color="#f8fafc" stop-opacity="0.15"/>
        <stop offset="70%" stop-color="#38bdf8" stop-opacity="0.08"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.3"/>
      </linearGradient>

      <!-- Warm Orange Roots -->
      <radialGradient id="root-amber-glow" cx="50%" cy="65%" r="55%">
        <stop offset="0%" stop-color="#fb923c" stop-opacity="0.95"/>
        <stop offset="45%" stop-color="#ea580c" stop-opacity="0.9"/>
        <stop offset="80%" stop-color="#c2410c" stop-opacity="0.85"/>
        <stop offset="100%" stop-color="#9a3412" stop-opacity="0.55"/>
      </radialGradient>

      <!-- 3D Cylindrical Bamboo Stalks -->
      <linearGradient id="stalk-cyl-main" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#285a2b"/>
        <stop offset="14%" stop-color="#3eb043"/>
        <stop offset="40%" stop-color="#7ee077"/>
        <stop offset="68%" stop-color="#52c54d"/>
        <stop offset="90%" stop-color="#2d7c2a"/>
        <stop offset="100%" stop-color="#194819"/>
      </linearGradient>

      <linearGradient id="stalk-cyl-shadow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#1e4620"/>
        <stop offset="25%" stop-color="#2f8034"/>
        <stop offset="60%" stop-color="#5bc554"/>
        <stop offset="100%" stop-color="#133615"/>
      </linearGradient>

      <linearGradient id="stalk-pith" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#ecfdf5"/>
        <stop offset="60%" stop-color="#a7f3d0"/>
        <stop offset="100%" stop-color="#34d399"/>
      </linearGradient>

      <!-- Metallic Red Ribbon -->
      <linearGradient id="red-ribbon" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#831818"/>
        <stop offset="12%" stop-color="#dc2626"/>
        <stop offset="30%" stop-color="#fca5a5"/>
        <stop offset="45%" stop-color="#ef4444"/>
        <stop offset="70%" stop-color="#dc2626"/>
        <stop offset="88%" stop-color="#991b1b"/>
        <stop offset="100%" stop-color="#450a0a"/>
      </linearGradient>

      <!-- Leaf Gradients -->
      <linearGradient id="leaf-bright" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#15803d"/>
        <stop offset="35%" stop-color="#22c55e"/>
        <stop offset="75%" stop-color="#86efac"/>
        <stop offset="100%" stop-color="#dcfce7"/>
      </linearGradient>

      <linearGradient id="leaf-mid" x1="10%" y1="100%" x2="90%" y2="0%">
        <stop offset="0%" stop-color="#166534"/>
        <stop offset="45%" stop-color="#15803d"/>
        <stop offset="80%" stop-color="#4ade80"/>
        <stop offset="100%" stop-color="#bbf7d0"/>
      </linearGradient>

      <linearGradient id="leaf-dark" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#14532d"/>
        <stop offset="40%" stop-color="#166534"/>
        <stop offset="80%" stop-color="#22c55e"/>
        <stop offset="100%" stop-color="#86efac"/>
      </linearGradient>

      <filter id="ribbon-shadow" x="-10%" y="-15%" width="120%" height="150%">
        <feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#000000" flood-opacity="0.38"/>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="1000" height="1400" fill="url(#bg-glow)" />

    <!-- Floor soft shadow -->
    <ellipse cx="500" cy="1285" rx="310" ry="32" fill="#000000" opacity="0.14" filter="blur(18px)" />
    <ellipse cx="500" cy="1280" rx="220" ry="18" fill="#000000" opacity="0.22" filter="blur(10px)" />
    <ellipse cx="500" cy="1276" rx="140" ry="10" fill="#000000" opacity="0.38" filter="blur(5px)" />

    <!-- Plant Composition -->
    <g id="plant-composition">
      <!-- Back foliage -->
      ${renderFoliage(tiersCount, 'back')}

      <!-- Bamboo Stalks -->
      ${renderBambooStalks(tiersCount)}

      <!-- Front foliage -->
      ${renderFoliage(tiersCount, 'front')}

      <!-- Glass Bowl and Roots -->
      ${renderGlassBowlAndRoots()}
    </g>
  </svg>
  `;

  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;overflow:hidden;background:#fff;">${svgContent}</body></html>`);
  await page.screenshot({ path: outputPng, type: 'png' });
  await page.screenshot({ path: outputJpg, type: 'jpeg', quality: 95 });
  await browser.close();
  console.log(`Rendered ${outputPng} and ${outputJpg}`);
}

function renderBambooStalks(tiers) {
  let s = '';
  const botY = 1060;
  const stalkW = 26;

  if (tiers === 2) {
    const topStalks = [
      { x: 410, topY: 530, shadow: true },
      { x: 430, topY: 505, shadow: false },
      { x: 450, topY: 485, shadow: false },
      { x: 472, topY: 470, shadow: false },
      { x: 494, topY: 460, shadow: false },
      { x: 516, topY: 470, shadow: false },
      { x: 538, topY: 485, shadow: false },
      { x: 560, topY: 505, shadow: false },
      { x: 580, topY: 530, shadow: true }
    ];

    const botStalks = [
      { x: 345, topY: 720, shadow: true },
      { x: 365, topY: 705, shadow: false },
      { x: 385, topY: 690, shadow: false },
      { x: 405, topY: 678, shadow: false },
      { x: 425, topY: 670, shadow: false },
      { x: 445, topY: 665, shadow: false },
      { x: 465, topY: 660, shadow: false },
      { x: 485, topY: 658, shadow: false },
      { x: 505, topY: 658, shadow: false },
      { x: 525, topY: 660, shadow: false },
      { x: 545, topY: 665, shadow: false },
      { x: 565, topY: 670, shadow: false },
      { x: 585, topY: 678, shadow: false },
      { x: 605, topY: 690, shadow: false },
      { x: 625, topY: 705, shadow: false },
      { x: 645, topY: 720, shadow: true }
    ];

    s += `<g id="tier-top-stalks">`;
    for (const stk of topStalks) {
      s += renderStalk(stk.x, stk.topY, botY, stalkW, stk.shadow);
    }
    s += `</g>`;
    s += renderRibbon(400, 545, 215, 24);

    s += `<g id="tier-bot-stalks">`;
    for (const stk of botStalks) {
      s += renderStalk(stk.x, stk.topY, botY, stalkW, stk.shadow);
    }
    s += `</g>`;
    s += renderRibbon(338, 735, 338, 28);

  } else {
    // 3 TIERS
    const topStalks = [
      { x: 450, topY: 330, shadow: false },
      { x: 472, topY: 310, shadow: false },
      { x: 494, topY: 300, shadow: false },
      { x: 516, topY: 310, shadow: false },
      { x: 538, topY: 330, shadow: false }
    ];

    const midStalks = [
      { x: 410, topY: 530, shadow: true },
      { x: 430, topY: 510, shadow: false },
      { x: 450, topY: 495, shadow: false },
      { x: 472, topY: 485, shadow: false },
      { x: 494, topY: 480, shadow: false },
      { x: 516, topY: 485, shadow: false },
      { x: 538, topY: 495, shadow: false },
      { x: 560, topY: 510, shadow: false },
      { x: 580, topY: 530, shadow: true }
    ];

    const botStalks = [
      { x: 345, topY: 720, shadow: true },
      { x: 365, topY: 705, shadow: false },
      { x: 385, topY: 690, shadow: false },
      { x: 405, topY: 678, shadow: false },
      { x: 425, topY: 670, shadow: false },
      { x: 445, topY: 665, shadow: false },
      { x: 465, topY: 660, shadow: false },
      { x: 485, topY: 658, shadow: false },
      { x: 505, topY: 658, shadow: false },
      { x: 525, topY: 660, shadow: false },
      { x: 545, topY: 665, shadow: false },
      { x: 565, topY: 670, shadow: false },
      { x: 585, topY: 678, shadow: false },
      { x: 605, topY: 690, shadow: false },
      { x: 625, topY: 705, shadow: false },
      { x: 645, topY: 720, shadow: true }
    ];

    s += `<g id="tier-top-3">`;
    for (const stk of topStalks) {
      s += renderStalk(stk.x, stk.topY, botY, stalkW, stk.shadow);
    }
    s += `</g>`;
    s += renderRibbon(442, 355, 126, 22);

    s += `<g id="tier-mid-3">`;
    for (const stk of midStalks) {
      s += renderStalk(stk.x, stk.topY, botY, stalkW, stk.shadow);
    }
    s += `</g>`;
    s += renderRibbon(400, 545, 215, 24);

    s += `<g id="tier-bot-3">`;
    for (const stk of botStalks) {
      s += renderStalk(stk.x, stk.topY, botY, stalkW, stk.shadow);
    }
    s += `</g>`;
    s += renderRibbon(338, 735, 338, 28);
  }

  return s;
}

function renderStalk(x, topY, botY, width, isShadow) {
  const r = width / 2;
  const fill = isShadow ? 'url(#stalk-cyl-shadow)' : 'url(#stalk-cyl-main)';

  let ringsSvg = '';
  for (let y = topY + 55; y < botY - 90; y += 65) {
    ringsSvg += `
      <g>
        <ellipse cx="${x + r}" cy="${y}" rx="${r + 1.6}" ry="4.2" fill="none" stroke="#d97706" stroke-width="2.6" opacity="0.8" />
        <ellipse cx="${x + r}" cy="${y + 1}" rx="${r + 1.2}" ry="3.8" fill="none" stroke="#fef08a" stroke-width="1.2" opacity="0.65" />
      </g>
    `;
  }

  return `
    <g>
      <rect x="${x}" y="${topY}" width="${width}" height="${botY - topY}" fill="${fill}" rx="2.5" />
      <ellipse cx="${x + r}" cy="${topY}" rx="${r}" ry="5.8" fill="url(#stalk-pith)" stroke="#15803d" stroke-width="1.6" />
      <ellipse cx="${x + r}" cy="${topY}" rx="${r * 0.55}" ry="3.2" fill="#fef08a" opacity="0.75" />
      ${ringsSvg}
    </g>
  `;
}

function renderRibbon(x, y, width, height) {
  return `
    <g filter="url(#ribbon-shadow)">
      <path d="M ${x} ${y + 6}
               Q ${x + width/2} ${y + height + 3} ${x + width} ${y + 6}
               L ${x + width} ${y + height}
               Q ${x + width/2} ${y + height * 1.55} ${x} ${y + height}
               Z"
            fill="url(#red-ribbon)" />
      <path d="M ${x + 12} ${y + 8} Q ${x + width/2} ${y + height + 1} ${x + width - 12} ${y + 8}" stroke="#ffffff" stroke-width="2" opacity="0.8" fill="none" />
      <path d="M ${x + 18} ${y + 15} Q ${x + width/2} ${y + height + 6} ${x + width - 18} ${y + 15}" stroke="#fca5a5" stroke-width="1.4" opacity="0.65" fill="none" />

      <circle cx="${x + width - 3}" cy="${y + height/2 + 2}" r="${height * 0.45}" fill="#b91c1c" stroke="#fca5a5" stroke-width="1.8" />
      <ellipse cx="${x + width + 14}" cy="${y + height/2 - 5}" rx="16" ry="10" transform="rotate(-25, ${x + width + 14}, ${y + height/2 - 5})" fill="#dc2626" stroke="#fca5a5" stroke-width="1.2" />
      <ellipse cx="${x + width + 12}" cy="${y + height/2 + 12}" rx="14" ry="9" transform="rotate(25, ${x + width + 12}, ${y + height/2 + 12})" fill="#dc2626" stroke="#fca5a5" stroke-width="1.2" />
      <path d="M ${x + width} ${y + height/2 + 4} Q ${x + width + 18} ${y + height + 16} ${x + width + 26} ${y + height + 38}" stroke="#b91c1c" stroke-width="5" fill="none" stroke-linecap="round" />
      <path d="M ${x + width - 1} ${y + height/2 + 4} Q ${x + width + 10} ${y + height + 24} ${x + width + 14} ${y + height + 48}" stroke="#ef4444" stroke-width="4" fill="none" stroke-linecap="round" />
    </g>
  `;
}

function renderFoliage(tiers, layer) {
  let leaves = '';
  const leafList = [];

  if (tiers === 2) {
    const centerY = 470;
    const items = [
      // Back layer
      { x1: 500, y1: centerY, x2: 500, y2: 40, w: 28, c: 0.1, g: 'leaf-bright', l: 'back' },
      { x1: 485, y1: centerY, x2: 410, y2: 70, w: 26, c: -0.3, g: 'leaf-mid', l: 'back' },
      { x1: 515, y1: centerY, x2: 590, y2: 70, w: 26, c: 0.3, g: 'leaf-bright', l: 'back' },
      { x1: 470, y1: centerY + 20, x2: 320, y2: 120, w: 25, c: -0.4, g: 'leaf-dark', l: 'back' },
      { x1: 530, y1: centerY + 20, x2: 680, y2: 120, w: 25, c: 0.4, g: 'leaf-mid', l: 'back' },
      { x1: 450, y1: centerY + 40, x2: 240, y2: 200, w: 24, c: -0.5, g: 'leaf-dark', l: 'back' },
      { x1: 550, y1: centerY + 40, x2: 760, y2: 200, w: 24, c: 0.5, g: 'leaf-bright', l: 'back' },
      { x1: 430, y1: centerY + 60, x2: 150, y2: 300, w: 22, c: -0.6, g: 'leaf-dark', l: 'back' },
      { x1: 570, y1: centerY + 60, x2: 850, y2: 300, w: 22, c: 0.6, g: 'leaf-mid', l: 'back' },

      // Lower tier side shoots (back)
      { x1: 380, y1: 670, x2: 90, y2: 400, w: 22, c: -0.6, g: 'leaf-dark', l: 'back' },
      { x1: 620, y1: 670, x2: 910, y2: 400, w: 22, c: 0.6, g: 'leaf-dark', l: 'back' },
      { x1: 360, y1: 700, x2: 60, y2: 510, w: 20, c: -0.5, g: 'leaf-mid', l: 'back' },
      { x1: 640, y1: 700, x2: 940, y2: 510, w: 20, c: 0.5, g: 'leaf-mid', l: 'back' },

      // Front layer
      { x1: 492, y1: centerY + 20, x2: 450, y2: 80, w: 30, c: -0.2, g: 'leaf-bright', l: 'front' },
      { x1: 508, y1: centerY + 20, x2: 550, y2: 80, w: 30, c: 0.2, g: 'leaf-bright', l: 'front' },
      { x1: 475, y1: centerY + 35, x2: 370, y2: 160, w: 28, c: -0.35, g: 'leaf-mid', l: 'front' },
      { x1: 525, y1: centerY + 35, x2: 630, y2: 160, w: 28, c: 0.35, g: 'leaf-bright', l: 'front' },
      { x1: 460, y1: centerY + 50, x2: 290, y2: 240, w: 26, c: -0.45, g: 'leaf-mid', l: 'front' },
      { x1: 540, y1: centerY + 50, x2: 710, y2: 240, w: 26, c: 0.45, g: 'leaf-bright', l: 'front' },
      { x1: 440, y1: centerY + 65, x2: 190, y2: 340, w: 24, c: -0.55, g: 'leaf-dark', l: 'front' },
      { x1: 560, y1: centerY + 65, x2: 810, y2: 340, w: 24, c: 0.55, g: 'leaf-mid', l: 'front' },

      // Lower tier front shoots
      { x1: 395, y1: 675, x2: 130, y2: 450, w: 22, c: -0.5, g: 'leaf-bright', l: 'front' },
      { x1: 605, y1: 675, x2: 870, y2: 450, w: 22, c: 0.5, g: 'leaf-bright', l: 'front' },
      { x1: 375, y1: 705, x2: 100, y2: 560, w: 20, c: -0.4, g: 'leaf-mid', l: 'front' },
      { x1: 625, y1: 705, x2: 900, y2: 560, w: 20, c: 0.4, g: 'leaf-mid', l: 'front' }
    ];
    leafList.push(...items);
  } else {
    // 3-TIER: Taller tiered pyramid
    const topY = 310;
    const midY = 490;
    const botY = 670;

    const items = [
      // Top tier (back)
      { x1: 500, y1: topY, x2: 500, y2: 25, w: 28, c: 0.1, g: 'leaf-bright', l: 'back' },
      { x1: 485, y1: topY, x2: 410, y2: 50, w: 26, c: -0.25, g: 'leaf-mid', l: 'back' },
      { x1: 515, y1: topY, x2: 590, y2: 50, w: 26, c: 0.25, g: 'leaf-bright', l: 'back' },
      { x1: 470, y1: topY + 20, x2: 330, y2: 105, w: 25, c: -0.35, g: 'leaf-dark', l: 'back' },
      { x1: 530, y1: topY + 20, x2: 670, y2: 105, w: 25, c: 0.35, g: 'leaf-mid', l: 'back' },

      // Mid tier (back)
      { x1: 440, y1: midY, x2: 230, y2: 190, w: 26, c: -0.45, g: 'leaf-dark', l: 'back' },
      { x1: 560, y1: midY, x2: 770, y2: 190, w: 26, c: 0.45, g: 'leaf-mid', l: 'back' },
      { x1: 420, y1: midY + 25, x2: 150, y2: 280, w: 24, c: -0.55, g: 'leaf-dark', l: 'back' },
      { x1: 580, y1: midY + 25, x2: 850, y2: 280, w: 24, c: 0.55, g: 'leaf-bright', l: 'back' },

      // Bot tier (back)
      { x1: 380, y1: botY, x2: 90, y2: 400, w: 22, c: -0.6, g: 'leaf-dark', l: 'back' },
      { x1: 620, y1: botY, x2: 910, y2: 400, w: 22, c: 0.6, g: 'leaf-dark', l: 'back' },
      { x1: 360, y1: botY + 30, x2: 60, y2: 510, w: 20, c: -0.5, g: 'leaf-mid', l: 'back' },
      { x1: 640, y1: botY + 30, x2: 940, y2: 510, w: 20, c: 0.5, g: 'leaf-mid', l: 'back' },

      // Top tier (front)
      { x1: 492, y1: topY + 15, x2: 450, y2: 65, w: 30, c: -0.2, g: 'leaf-bright', l: 'front' },
      { x1: 508, y1: topY + 15, x2: 550, y2: 65, w: 30, c: 0.2, g: 'leaf-bright', l: 'front' },
      { x1: 475, y1: topY + 30, x2: 370, y2: 140, w: 28, c: -0.3, g: 'leaf-mid', l: 'front' },
      { x1: 525, y1: topY + 30, x2: 630, y2: 140, w: 28, c: 0.3, g: 'leaf-bright', l: 'front' },

      // Mid tier (front)
      { x1: 450, y1: midY + 15, x2: 280, y2: 230, w: 26, c: -0.4, g: 'leaf-bright', l: 'front' },
      { x1: 550, y1: midY + 15, x2: 720, y2: 230, w: 26, c: 0.4, g: 'leaf-bright', l: 'front' },
      { x1: 430, y1: midY + 35, x2: 200, y2: 320, w: 24, c: -0.5, g: 'leaf-mid', l: 'front' },
      { x1: 570, y1: midY + 35, x2: 800, y2: 320, w: 24, c: 0.5, g: 'leaf-bright', l: 'front' },

      // Bot tier (front)
      { x1: 395, y1: botY + 15, x2: 140, y2: 450, w: 22, c: -0.5, g: 'leaf-bright', l: 'front' },
      { x1: 605, y1: botY + 15, x2: 860, y2: 450, w: 22, c: 0.5, g: 'leaf-bright', l: 'front' },
      { x1: 370, y1: botY + 35, x2: 100, y2: 560, w: 20, c: -0.4, g: 'leaf-mid', l: 'front' },
      { x1: 630, y1: botY + 35, x2: 900, y2: 560, w: 20, c: 0.4, g: 'leaf-mid', l: 'front' }
    ];
    leafList.push(...items);
  }

  for (const item of leafList.filter(x => x.l === layer)) {
    const d = createLeafPath(item.x1, item.y1, item.x2, item.y2, item.w, item.c);
    leaves += `
      <g>
        <path d="${d}" fill="url(#${item.g})" opacity="${layer === 'front' ? '0.96' : '0.88'}" />
        <path d="M ${item.x1} ${item.y1} Q ${(item.x1+item.x2)/2} ${(item.y1+item.y2)/2} ${item.x2} ${item.y2}"
              stroke="#bbf7d0" stroke-width="1.8" fill="none" opacity="0.75" />
      </g>
    `;
  }

  return leaves;
}

function renderGlassBowlAndRoots() {
  return `
    <g id="glass-bowl-group">
      <!-- Water Fill -->
      <path d="M 230 830 Q 500 870 770 830 L 660 1230 Q 500 1260 340 1230 Z" fill="#38bdf8" opacity="0.12" />

      <!-- Orange Root Medium -->
      <path d="M 245 865 Q 500 895 755 865 L 655 1225 Q 500 1255 345 1225 Z" fill="url(#root-amber-glow)" opacity="0.9" />

      <!-- Orange root fibers / gel beads -->
      <g stroke="#fde047" stroke-width="1.8" fill="none" opacity="0.75">
        <path d="M 270 885 Q 310 950 350 1020 T 330 1120 T 380 1215" />
        <path d="M 320 885 Q 365 980 410 1050 T 450 1160 T 420 1225" />
        <path d="M 390 895 Q 415 960 390 1040 T 435 1140 T 470 1230" />
        <path d="M 450 885 Q 485 980 480 1060 T 520 1150 T 500 1235" />
        <path d="M 520 885 Q 550 970 535 1050 T 565 1160 T 540 1235" />
        <path d="M 580 895 Q 615 980 595 1060 T 635 1150 T 605 1230" />
        <path d="M 645 885 Q 675 960 655 1040 T 685 1140 T 655 1225" />
        <path d="M 705 885 Q 725 950 695 1030 T 715 1130 T 665 1215" />
        <path d="M 255 950 Q 400 980 540 945 T 745 965" stroke="#f97316" stroke-width="2" />
        <path d="M 265 1020 Q 420 1045 560 1015 T 725 1035" stroke="#fed7aa" stroke-width="1.6" />
        <path d="M 295 1100 Q 440 1130 570 1095 T 705 1115" stroke="#ea580c" stroke-width="2.2" />
        <path d="M 315 1165 Q 470 1185 580 1155 T 675 1175" stroke="#fef08a" stroke-width="1.4" />
      </g>

      <!-- Glass Shell Body -->
      <path d="M 205 780
               C 215 880, 240 1010, 330 1230
               C 340 1255, 660 1255, 670 1230
               C 760 1010, 785 880, 795 780
               C 720 810, 280 810, 205 780 Z"
            fill="url(#glass-sheen)"
            stroke="url(#glass-rim)"
            stroke-width="4.5" />

      <!-- Thick Flared Glass Rim -->
      <ellipse cx="500" cy="780" rx="295" ry="32" fill="none" stroke="url(#glass-rim)" stroke-width="7" />
      <ellipse cx="500" cy="782" rx="290" ry="29" fill="none" stroke="#ffffff" stroke-width="2.2" opacity="0.95" />

      <!-- Highlights -->
      <path d="M 225 810 C 240 920, 270 1050, 350 1210" stroke="#ffffff" stroke-width="6" stroke-linecap="round" fill="none" opacity="0.8" filter="blur(2px)" />
      <path d="M 238 825 C 252 920, 278 1040, 358 1190" stroke="#ffffff" stroke-width="2.2" stroke-linecap="round" fill="none" opacity="0.95" />

      <path d="M 775 810 C 760 920, 730 1050, 650 1210" stroke="#ffffff" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.55" filter="blur(2px)" />

      <!-- Glass Base Foot -->
      <ellipse cx="500" cy="1242" rx="172" ry="17" fill="none" stroke="#94a3b8" stroke-width="3" opacity="0.4" />
      <ellipse cx="500" cy="1240" rx="166" ry="14" fill="#ffffff" opacity="0.45" />

      <!-- NAYNAA BRAND LOGO Centered on Front of Glass -->
      <g id="glass-naynaa-logo" transform="translate(425, 1145)">
        <g transform="translate(75, 0) scale(0.68)">
          <path d="M 0 0 C -25 -5, -45 -35, -35 -60 C -15 -55, 0 -35, 0 0 Z" fill="#1b4d20" />
          <path d="M 0 0 C 10 -35, 35 -65, 55 -55 C 50 -25, 25 -5, 0 0 Z" fill="#74b83a" />
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
  `;
}

async function main() {
  await generateSpecimen(false, 'public/specimens/products/2_layer_lucky_bamboo.png', 'public/specimens/products/2_layer_lucky_bamboo.jpg');
  await generateSpecimen(true, 'public/specimens/products/3_layer_lucky_bamboo.png', 'public/specimens/products/3_layer_lucky_bamboo.jpg');
  console.log('Finished rendering both specimens!');
}

main().catch(console.error);
