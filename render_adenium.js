import { chromium } from 'playwright';

async function generateAdenium() {
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

      <!-- Continuous Sculpted Tree Wood (Mottled greenish grey bark) -->
      <linearGradient id="tree-wood" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#606652"/>
        <stop offset="15%" stop-color="#889079"/>
        <stop offset="45%" stop-color="#c5cbb7"/>
        <stop offset="75%" stop-color="#9ea68e"/>
        <stop offset="90%" stop-color="#727a64"/>
        <stop offset="100%" stop-color="#4a503d"/>
      </linearGradient>

      <!-- Glossy Deep Green Leathery Leaf Gradients -->
      <linearGradient id="leaf-gloss" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#144d24"/>
        <stop offset="30%" stop-color="#1b6330"/>
        <stop offset="65%" stop-color="#2fa84b"/>
        <stop offset="90%" stop-color="#5ce07b"/>
        <stop offset="100%" stop-color="#a7f3d0"/>
      </linearGradient>

      <linearGradient id="leaf-dark" x1="10%" y1="100%" x2="90%" y2="0%">
        <stop offset="0%" stop-color="#0d3819"/>
        <stop offset="45%" stop-color="#155728"/>
        <stop offset="85%" stop-color="#228b3e"/>
        <stop offset="100%" stop-color="#4ade80"/>
      </linearGradient>

      <linearGradient id="leaf-bright" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#15803d"/>
        <stop offset="50%" stop-color="#22c55e"/>
        <stop offset="85%" stop-color="#86efac"/>
        <stop offset="100%" stop-color="#ecfdf5"/>
      </linearGradient>

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
    <ellipse cx="500" cy="1300" rx="260" ry="26" fill="#4a3b2c" opacity="0.18" filter="blur(16px)" />
    <ellipse cx="500" cy="1295" rx="180" ry="16" fill="#36291c" opacity="0.28" filter="blur(8px)" />
    <ellipse cx="500" cy="1290" rx="130" ry="9" fill="#1f160e" opacity="0.45" filter="blur(4px)" />

    <!-- ADENIUM SPECIMEN -->
    <g id="adenium-composition">

      <!-- Back Foliage Layer -->
      ${renderCanopyRosettes(false)}

      <!-- Continuous Sculptural Caudex & Branching Tree -->
      <g id="sculptural-tree">
        <!-- Unified tree outline: caudex base + trunk fork + left branch + right branch -->
        <path d="
          M 370 940
          C 365 890, 395 810, 440 730
          C 415 670, 375 600, 350 510
          C 340 470, 320 410, 270 340
          L 295 330
          C 335 390, 355 450, 370 480
          C 375 440, 355 390, 330 330
          L 360 325
          C 385 390, 400 450, 405 520
          C 425 590, 455 640, 490 690
          C 505 630, 518 530, 535 440
          C 545 390, 555 350, 560 300
          L 595 305
          C 585 370, 575 430, 565 510
          C 555 600, 545 680, 560 740
          C 605 810, 635 880, 630 940
          Z
        " fill="url(#tree-wood)" />

        <!-- Caudex Swollen Belly (Extra 3D volume overlay) -->
        <path d="
          M 390 940
          C 375 870, 405 800, 455 745
          C 500 740, 545 745, 595 785
          C 630 840, 635 890, 615 940
          Z
        " fill="url(#tree-wood)" opacity="0.95" />

        <!-- Caudex Wrinkles, Bark Texture & Folds -->
        <path d="M 410 910 Q 505 945 595 900" stroke="#5a614d" stroke-width="3" fill="none" opacity="0.65" />
        <path d="M 425 860 Q 510 895 580 855" stroke="#5a614d" stroke-width="2.5" fill="none" opacity="0.6" />
        <path d="M 445 810 Q 505 840 560 805" stroke="#5a614d" stroke-width="2" fill="none" opacity="0.55" />
        <path d="M 465 760 Q 505 785 540 755" stroke="#5a614d" stroke-width="2" fill="none" opacity="0.5" />

        <!-- Bark Highlight Lines along trunk -->
        <path d="M 440 760 C 420 670, 385 590, 365 500" stroke="#e2e8d5" stroke-width="3" stroke-linecap="round" fill="none" opacity="0.6" filter="blur(1px)" />
        <path d="M 505 700 C 525 610, 540 520, 555 420" stroke="#e2e8d5" stroke-width="3.5" stroke-linecap="round" fill="none" opacity="0.6" filter="blur(1px)" />

        <!-- Exposed Root Flares Gripping Soil -->
        <path d="M 395 930 Q 375 960 410 975" stroke="#555c47" stroke-width="12" stroke-linecap="round" fill="none" />
        <path d="M 435 940 Q 425 970 445 980" stroke="#68705a" stroke-width="14" stroke-linecap="round" fill="none" />
        <path d="M 475 945 Q 490 975 515 975" stroke="#757e67" stroke-width="15" stroke-linecap="round" fill="none" />
        <path d="M 545 940 Q 575 970 595 965" stroke="#68705a" stroke-width="13" stroke-linecap="round" fill="none" />
        <path d="M 605 935 Q 630 960 620 975" stroke="#555c47" stroke-width="11" stroke-linecap="round" fill="none" />
      </g>

      <!-- Front Foliage Layer (Overlapping dense rosettes attached directly to branch tips) -->
      ${renderCanopyRosettes(true)}

      <!-- ================= TAPERED CERAMIC POT & SOIL ================= -->
      <g id="ceramic-pot" filter="url(#pot-shadow)">
        <!-- Rich Dark Soil Basin -->
        <ellipse cx="500" cy="940" rx="205" ry="32" fill="url(#soil-grad)" />

        <!-- Soil grain details -->
        <g fill="#8d6e63" opacity="0.6">
          <circle cx="420" cy="945" r="3" />
          <circle cx="480" cy="955" r="2.5" />
          <circle cx="560" cy="948" r="3.2" />
          <circle cx="620" cy="940" r="2.8" />
          <circle cx="380" cy="938" r="2.2" />
          <circle cx="520" cy="958" r="3.5" />
          <circle cx="450" cy="935" r="2.6" fill="#d7ccc8" />
          <circle cx="580" cy="942" r="2" fill="#d7ccc8" />
        </g>

        <!-- Tapered Matte Cream Ceramic Body -->
        <path d="M 295 940
                 C 300 1040, 335 1180, 345 1280
                 C 400 1298, 600 1298, 655 1280
                 C 665 1180, 700 1040, 705 940
                 Z"
              fill="url(#pot-grad)" />

        <!-- Crisp Upper Pot Rim -->
        <ellipse cx="500" cy="940" rx="206" ry="28" fill="none" stroke="url(#pot-rim-grad)" stroke-width="5" />
        <ellipse cx="500" cy="938" rx="203" ry="25" fill="none" stroke="#ffffff" stroke-width="2.5" opacity="0.85" />

        <!-- Pot Specular Highlight -->
        <path d="M 330 960 C 342 1050, 365 1170, 372 1260" stroke="#ffffff" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.75" filter="blur(1.5px)" />
        <path d="M 345 970 C 355 1050, 375 1160, 380 1250" stroke="#ffffff" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.9" />

        <!-- Soft Right Edge Shading -->
        <path d="M 695 960 C 685 1050, 660 1170, 650 1260" stroke="#b0a28f" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.5" filter="blur(2px)" />

        <!-- Pot Base Foot -->
        <ellipse cx="500" cy="1280" rx="156" ry="16" fill="none" stroke="#c2b49e" stroke-width="2.5" opacity="0.4" />

        <!-- ================= NAYNAA BRAND LOGO ================= -->
        <g id="pot-naynaa-logo" transform="translate(425, 1205)">
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
  await page.screenshot({ path: 'public/specimens/products/adenium_bonsai.png', type: 'png' });
  await page.screenshot({ path: 'public/specimens/products/adenium_bonsai.jpg', type: 'jpeg', quality: 95 });
  await browser.close();
  console.log('Finished rendering Adenium Bonsai with continuous trunk!');
}

function renderCanopyRosettes(isFront) {
  let s = '';

  // Branch tip anchor coordinates where leaves originate:
  // 1. Right Main Branch Apex: (575, 305)
  // 2. Left Main Branch Apex: (345, 325)
  // 3. Left Sub-branch Apex: (280, 335)
  // 4. Center Mid Branch Apex: (385, 480)

  const leafDefinitions = [
    // --- Right Main Branch Rosette (575, 305) ---
    // Back leaves
    { ox: 575, oy: 305, len: 160, w: 68, deg: -80, f: 'leaf-dark', l: 'back' },
    { ox: 575, oy: 305, len: 175, w: 72, deg: -55, f: 'leaf-gloss', l: 'back' },
    { ox: 575, oy: 305, len: 165, w: 70, deg: -110, f: 'leaf-dark', l: 'back' },
    { ox: 575, oy: 305, len: 155, w: 65, deg: -30, f: 'leaf-gloss', l: 'back' },
    { ox: 575, oy: 305, len: 145, w: 62, deg: -135, f: 'leaf-dark', l: 'back' },
    // Front leaves
    { ox: 575, oy: 305, len: 150, w: 66, deg: -68, f: 'leaf-bright', l: 'front' },
    { ox: 575, oy: 305, len: 155, w: 68, deg: -42, f: 'leaf-bright', l: 'front' },
    { ox: 575, oy: 305, len: 145, w: 64, deg: -95, f: 'leaf-gloss', l: 'front' },
    { ox: 575, oy: 305, len: 135, w: 60, deg: -15, f: 'leaf-bright', l: 'front' },
    { ox: 575, oy: 305, len: 130, w: 58, deg: 15, f: 'leaf-gloss', l: 'front' },
    { ox: 575, oy: 305, len: 125, w: 56, deg: 45, f: 'leaf-dark', l: 'front' },

    // --- Left Main Branch Rosette (345, 325) ---
    // Back leaves
    { ox: 345, oy: 325, len: 130, w: 56, deg: -115, f: 'leaf-dark', l: 'back' },
    { ox: 345, oy: 325, len: 135, w: 58, deg: -85, f: 'leaf-gloss', l: 'back' },
    { ox: 345, oy: 325, len: 125, w: 54, deg: -55, f: 'leaf-gloss', l: 'back' },
    { ox: 345, oy: 325, len: 120, w: 52, deg: -145, f: 'leaf-dark', l: 'back' },
    // Front leaves
    { ox: 345, oy: 325, len: 125, w: 56, deg: -100, f: 'leaf-bright', l: 'front' },
    { ox: 345, oy: 325, len: 120, w: 54, deg: -70, f: 'leaf-bright', l: 'front' },
    { ox: 345, oy: 325, len: 115, w: 50, deg: -35, f: 'leaf-gloss', l: 'front' },
    { ox: 345, oy: 325, len: 110, w: 48, deg: -170, f: 'leaf-dark', l: 'front' },
    { ox: 345, oy: 325, len: 105, w: 46, deg: 25, f: 'leaf-bright', l: 'front' },

    // --- Left Sub-branch Rosette (280, 335) ---
    // Back leaves
    { ox: 280, oy: 335, len: 115, w: 48, deg: -125, f: 'leaf-dark', l: 'back' },
    { ox: 280, oy: 335, len: 120, w: 50, deg: -90, f: 'leaf-gloss', l: 'back' },
    { ox: 280, oy: 335, len: 110, w: 46, deg: -160, f: 'leaf-dark', l: 'back' },
    // Front leaves
    { ox: 280, oy: 335, len: 110, w: 48, deg: -105, f: 'leaf-bright', l: 'front' },
    { ox: 280, oy: 335, len: 105, w: 46, deg: -70, f: 'leaf-bright', l: 'front' },
    { ox: 280, oy: 335, len: 100, w: 44, deg: -180, f: 'leaf-dark', l: 'front' },
    { ox: 280, oy: 335, len: 95, w: 42, deg: 40, f: 'leaf-gloss', l: 'front' },

    // --- Center Mid Branch Rosette (385, 480) ---
    // Back leaves
    { ox: 385, oy: 480, len: 100, w: 44, deg: -95, f: 'leaf-dark', l: 'back' },
    { ox: 385, oy: 480, len: 105, w: 46, deg: -60, f: 'leaf-gloss', l: 'back' },
    // Front leaves
    { ox: 385, oy: 480, len: 100, w: 44, deg: -78, f: 'leaf-bright', l: 'front' },
    { ox: 385, oy: 480, len: 95, w: 42, deg: -40, f: 'leaf-bright', l: 'front' },
    { ox: 385, oy: 480, len: 90, w: 40, deg: 20, f: 'leaf-gloss', l: 'front' }
  ];

  for (const l of leafDefinitions.filter(x => (isFront ? x.l === 'front' : x.l === 'back'))) {
    s += renderAdeniumLeaf(l.ox, l.oy, l.len, l.w, l.deg, l.f);
  }

  return s;
}

function renderAdeniumLeaf(cx, cy, length, width, angleDeg, fillGrad) {
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  const tx = cx + cos * length;
  const ty = cy + sin * length;

  const nx = -sin * (width / 2);
  const ny = cos * (width / 2);

  // Smooth obovate leaf shape (broadest at 65% of length)
  const cp1x = cx + cos * (length * 0.3) + nx * 0.85;
  const cp1y = cy + sin * (length * 0.3) + ny * 0.85;
  const cp2x = cx + cos * (length * 0.75) + nx * 1.05;
  const cp2y = cy + sin * (length * 0.75) + ny * 1.05;

  const cp3x = cx + cos * (length * 0.75) - nx * 1.05;
  const cp3y = cy + sin * (length * 0.75) - ny * 1.05;
  const cp4x = cx + cos * (length * 0.3) - nx * 0.85;
  const cp4y = cy + sin * (length * 0.3) - ny * 0.85;

  return `
    <g>
      <!-- Leaf Blade -->
      <path d="M ${cx} ${cy}
               C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${tx} ${ty}
               C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${cx} ${cy}
               Z"
            fill="url(#${fillGrad})"
            stroke="#0f3817"
            stroke-width="1.2" />

      <!-- Prominent Pale Central Vein -->
      <path d="M ${cx} ${cy} L ${tx} ${ty}"
            stroke="#dcfce7"
            stroke-width="2.2"
            stroke-linecap="round"
            opacity="0.85" />

      <!-- Pinnate Lateral Veins -->
      <g stroke="#bbf7d0" stroke-width="0.9" opacity="0.4">
        <line x1="${cx + cos*length*0.3}" y1="${cy + sin*length*0.3}" x2="${cx + cos*length*0.36 + nx*0.6}" y2="${cy + sin*length*0.36 + ny*0.6}" />
        <line x1="${cx + cos*length*0.3}" y1="${cy + sin*length*0.3}" x2="${cx + cos*length*0.36 - nx*0.6}" y2="${cy + sin*length*0.36 - ny*0.6}" />
        <line x1="${cx + cos*length*0.5}" y1="${cy + sin*length*0.5}" x2="${cx + cos*length*0.57 + nx*0.75}" y2="${cy + sin*length*0.57 + ny*0.75}" />
        <line x1="${cx + cos*length*0.5}" y1="${cy + sin*length*0.5}" x2="${cx + cos*length*0.57 - nx*0.75}" y2="${cy + sin*length*0.57 - ny*0.75}" />
        <line x1="${cx + cos*length*0.7}" y1="${cy + sin*length*0.7}" x2="${cx + cos*length*0.76 + nx*0.6}" y2="${cy + sin*length*0.76 + ny*0.6}" />
        <line x1="${cx + cos*length*0.7}" y1="${cy + sin*length*0.7}" x2="${cx + cos*length*0.76 - nx*0.6}" y2="${cy + sin*length*0.76 - ny*0.6}" />
      </g>
    </g>
  `;
}

generateAdenium().catch(console.error);
