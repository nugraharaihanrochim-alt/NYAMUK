/* =====================================================
   DAFTAR ISI
   1. Warna & gambar nyamuk      <- UBAH WARNA NYAMUK DI SINI
   2. Nyamuk hero mengejar kursor
   3. Kawanan nyamuk di latar
   4. Progress bar & animasi muncul
   5. Anatomi
   6. Jenis nyamuk
   7. Grafik batang
   8. Galeri foto & lightbox
   9. Checklist 3M Plus
  10. Mitos & fakta
   ===================================================== */


/* ========== 1. WARNA & GAMBAR NYAMUK ========== */
const WARNA_NYAMUK = {
  garis:   '#1b2a49',   // garis tepi, kaki, antena
  badan:   '#33415f',   // dada & kepala
  perut:   '#ee4b58',   // perut (bisa diganti per jenis)
  sayap:   '#8fd3ff',
  mata:    '#ffb703',
  belalai: '#ff7a00'
};

function mosquito(id, perut = WARNA_NYAMUK.perut) {
  const w = WARNA_NYAMUK;
  return `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" ${id ? `id="${id}"` : ''}>
  <g class="part" data-p="kaki" fill="none" stroke="${w.garis}" stroke-width="2.5" stroke-linecap="round">
    <path d="M92 78 70 108 52 126M98 80 92 116 88 134M104 80 120 112 132 130"/></g>
  <path class="wl part" data-p="sayap" d="M96 62C110 20 160 8 182 20 170 52 130 68 96 62Z" fill="${w.sayap}" fill-opacity=".6" stroke="${w.garis}"/>
  <path class="wr part" data-p="sayap" d="M96 62C84 24 50 12 28 26 40 54 72 68 96 62Z" fill="${w.sayap}" fill-opacity=".45" stroke="${w.garis}"/>
  <ellipse class="part" data-p="perut" cx="128" cy="80" rx="36" ry="13" transform="rotate(18 128 80)" fill="${perut}" stroke="${w.garis}" stroke-width="1.5"/>
  <path d="M104 80l40 18M112 74l40 22" stroke="#fff" stroke-width="1.5" opacity=".7"/>
  <ellipse class="part" data-p="dada" cx="92" cy="68" rx="17" ry="14" fill="${w.badan}" stroke="${w.garis}" stroke-width="1.5"/>
  <circle class="part" data-p="kepala" cx="68" cy="72" r="11" fill="${w.badan}" stroke="${w.garis}" stroke-width="1.5"/>
  <circle cx="64" cy="69" r="4" fill="${w.mata}"/>
  <path class="part" data-p="belalai" d="M58 76 24 98" stroke="${w.belalai}" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path class="part" data-p="antena" d="M66 62 52 40 44 36M70 61 62 40 58 32" stroke="${w.garis}" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`;
}

// Pasang nyamuk ke halaman
document.getElementById('hero-mosq').innerHTML = mosquito('hero-fly');
document.getElementById('anat-mosq').innerHTML = mosquito();
document.getElementById('mini-mosq').innerHTML = mosquito();


/* ========== 2. NYAMUK HERO MENGEJAR KURSOR ========== */
const hero = document.getElementById('hero-fly');
const box = hero.parentElement;
let tx = 0, ty = 0, x = 0, y = 0, t = 0;

window.addEventListener('mousemove', e => {
  const r = box.getBoundingClientRect();
  tx = e.clientX - r.left - 150 - r.width * 0.3;
  ty = e.clientY - r.top - 100 - r.height * 0.2;
});

(function loop() {
  t += 0.03;
  x += (tx - x) * 0.05;
  y += (ty - y) * 0.05;
  const flip = (tx - x) > 5 ? -1 : 1;
  hero.style.transform =
    `translate(${x + Math.sin(t * 2) * 14}px,${y + Math.cos(t * 3) * 12}px) rotate(${(tx - x) * 0.03}deg) scaleX(${flip})`;
  requestAnimationFrame(loop);
})();


/* ========== 3. KAWANAN NYAMUK DI LATAR ========== */
const swarm = document.getElementById('swarm');

for (let i = 0; i < 7; i++) {
  const d = document.createElement('div');
  d.className = 'fly';
  d.innerHTML = mosquito();
  d.dataset.s = Math.random() * 5 + 3;   // kecepatan
  d.dataset.p = Math.random() * 6;       // posisi awal
  swarm.appendChild(d);
}

(function swarmLoop() {
  const n = performance.now() / 1000;
  swarm.querySelectorAll('.fly').forEach(f => {
    const s = +f.dataset.s, p = +f.dataset.p;
    const X = (Math.sin(n / s + p) * 0.5 + 0.5) * (innerWidth - 60);
    const Y = (Math.cos(n / (s * 1.3) + p) * 0.5 + 0.5) * (innerHeight - 60);
    f.style.transform = `translate(${X}px,${Y}px) scaleX(${Math.cos(n / s + p) > 0 ? 1 : -1})`;
  });
  requestAnimationFrame(swarmLoop);
})();


/* ========== 4. PROGRESS BAR & ANIMASI MUNCUL ========== */
addEventListener('scroll', () => {
  document.getElementById('bar').style.width =
    scrollY / (document.body.scrollHeight - innerHeight) * 100 + '%';
});

const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('on');
    e.target.querySelectorAll('[data-to]').forEach(count);
  }
}), { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));
document.querySelectorAll('.stat').forEach(s => io.observe(s));

// Angka menghitung naik
function count(el) {
  if (el.done) return;
  el.done = 1;
  const to = +el.dataset.to, suf = el.dataset.suf || '';
  let n = 0;
  const step = () => {
    n += to / 60;
    if (n >= to) {
      el.textContent = to.toLocaleString('id-ID') + suf;
    } else {
      el.textContent = Math.floor(n).toLocaleString('id-ID') + suf;
      requestAnimationFrame(step);
    }
  };
  step();
}


/* ========== 5. ANATOMI ========== */
const parts = {
  belalai: ['Belalai (proboscis)', 'Mulut panjang seperti jarum. Betina menusuk kulit dan mengisap darah; jantan hanya mengisap nektar.'],
  antena:  ['Antena', 'Penciuman utama. Mendeteksi karbon dioksida dan bau tubuh. Pada jantan lebih berbulu untuk menangkap suara sayap betina.'],
  kepala:  ['Kepala & mata', 'Mata majemuk menangkap gerak dan kontras. Di sini juga terdapat palpus yang peka terhadap CO₂.'],
  dada:    ['Dada (toraks)', 'Pusat otot penggerak sayap dan kaki, sehingga nyamuk bisa mengepak ratusan kali per detik.'],
  sayap:   ['Sayap', 'Satu pasang sayap sejati. Dengung khas nyamuk berasal dari kepakannya. Nyamuk terbang sekitar 1–1,5 km/jam.'],
  perut:   ['Perut (abdomen)', 'Menyimpan darah hasil isapan dan menumbuhkan telur. Bisa membengkak sampai tiga kali ukuran semula.'],
  kaki:    ['Enam kaki', 'Panjang dan ringan; ada sensor rasa dan sentuh di ujungnya sehingga nyamuk mendarat nyaris tanpa terasa.']
};

const chips = document.getElementById('chips');
const info = document.getElementById('anat-info');

Object.keys(parts).forEach(k => {
  const b = document.createElement('button');
  b.textContent = parts[k][0].split(' (')[0].split(' &')[0];
  b.onclick = () => {
    document.querySelectorAll('#chips button').forEach(c => c.classList.remove('on'));
    b.classList.add('on');
    document.querySelectorAll('#anat-mosq .part').forEach(p =>
      p.classList.toggle('glow', p.dataset.p === k));
    info.innerHTML = `<h3>${parts[k][0]}</h3><p>${parts[k][1]}</p>`;
  };
  chips.appendChild(b);
});


/* ========== 6. JENIS NYAMUK ========== */
const jenis = [
  { n: 'Aedes aegypti', c: 'Nyamuk demam berdarah', col: '#ee4b58',
    l: ['Penyebar dengue, chikungunya, Zika, dan demam kuning',
        'Tubuh hitam dengan belang putih di kaki',
        'Menggigit siang hari, terutama pagi dan sore',
        'Bertelur di air jernih tergenang di dalam dan sekitar rumah'] },
  { n: 'Anopheles', c: 'Nyamuk malaria', col: '#ffb703',
    l: ['Hanya betina Anopheles yang menularkan malaria (Plasmodium)',
        'Posisi hinggap menungging, perut menghadap atas',
        'Menggigit malam hari, dari senja sampai fajar',
        'Bertelur di air payau, sawah, dan rawa'] },
  { n: 'Culex', c: 'Nyamuk rumah', col: '#14b8a6',
    l: ['Penular filariasis (kaki gajah) dan virus Japanese encephalitis',
        'Berwarna cokelat polos, hinggap sejajar permukaan',
        'Aktif malam hari, sering di dalam rumah',
        'Bertelur di air kotor: selokan dan got'] }
];

const tabs = document.getElementById('tabs');
const sp = document.getElementById('species');

function show(i) {
  const j = jenis[i];
  [...tabs.children].forEach((b, k) => b.classList.toggle('on', k === i));
  sp.innerHTML = `
    <div>${mosquito(null, j.col)}</div>
    <div>
      <h3>${j.n}</h3>
      <p class="lat">${j.c}</p>
      <ul>${j.l.map(x => `<li>${x}</li>`).join('')}</ul>
    </div>`;
}

jenis.forEach((j, i) => {
  const b = document.createElement('button');
  b.textContent = j.n;
  b.onclick = () => show(i);
  tabs.appendChild(b);
});
show(0);


/* ========== 7. GRAFIK BATANG ========== */
// Fungsi umum untuk membuat grafik batang
function buatGrafik(idElemen, daftar, skala) {
  const el = document.getElementById(idElemen);
  daftar.forEach((d, i) => {
    const r = document.createElement('div');
    if (i === 0) r.className = 'top';   // batang pertama = tertinggi (merah)
    r.innerHTML = `<span>${d[0]}</span><i data-w="${Math.max(d[1] / skala, 0.4)}"></i><span>${d[1].toLocaleString('id-ID')}</span>`;
    el.appendChild(r);
  });
  new IntersectionObserver((es, o) => {
    if (es[0].isIntersecting) {
      el.querySelectorAll('i').forEach(i => i.style.width = i.dataset.w + '%');
      o.disconnect();
    }
  }).observe(el);
}

// Kematian per tahun akibat hewan (ribu orang, perkiraan)
buatGrafik('bars', [
  ['Nyamuk', 700], ['Manusia', 400], ['Ular', 100],
  ['Anjing', 59], ['Lalat tsetse', 10], ['Hiu', 0.01]
], 7);

// Kasus DBD tertinggi, minggu ke-17 2024 (Kemenkes RI)
buatGrafik('bars2', [
  ['Kota Bandung', 3468], ['Kab. Tangerang', 2540], ['Kota Bogor', 1944],
  ['Kota Kendari', 1659], ['Kab. Bandung Barat', 1576]
], 3468 / 88);


/* ========== 8. GALERI FOTO & LIGHTBOX ========== */
const W = 'https://commons.wikimedia.org/wiki/Special:FilePath/';

// [nama file di Wikimedia, keterangan, nomor warna pengganti]
const foto = [
  ['Aedes_aegypti.jpg', 'Aedes aegypti, penular dengue', 0],
  ['Anopheles_albimanus_mosquito.jpg', 'Anopheles, penular malaria', 1],
  ['Culex_quinquefasciatus_Mosquito.jpg', 'Culex, nyamuk rumah', 2],
  ['Mosquito_larvae.jpg', 'Jentik nyamuk di bawah permukaan air', 0],
  ['Aedes_aegypti_biting_human.jpg', 'Aedes betina sedang mengisap darah', 1],
  ['Mosquito_eggs.jpg', 'Telur nyamuk', 2]
];
const warna = ['#ee4b58', '#ffb703', '#14b8a6'];   // warna nyamuk pengganti

const gal = document.getElementById('gallery');
const lb = document.getElementById('lightbox');
const lbBox = document.getElementById('lb-box');

foto.forEach(f => {
  const fig = document.createElement('figure');
  const fallback = () => mosquito(null, warna[f[2]]);

  const img = new Image();
  img.alt = f[1];
  img.loading = 'lazy';
  img.src = W + f[0] + '?width=700';
  // Bila foto gagal dimuat, ganti dengan ilustrasi
  img.onerror = () => {
    fig.querySelector('img')?.remove();
    const d = document.createElement('div');
    d.className = 'fb';
    d.innerHTML = fallback();
    fig.prepend(d);
    fig.dataset.fb = 1;
  };

  fig.appendChild(img);
  fig.insertAdjacentHTML('beforeend', `<figcaption>${f[1]}</figcaption>`);
  fig.onclick = () => {
    lbBox.innerHTML = fig.dataset.fb
      ? fallback()
      : `<img src="${W + f[0]}?width=1200" alt="${f[1]}">`;
    document.getElementById('lb-cap').textContent = f[1];
    lb.classList.add('on');
  };
  gal.appendChild(fig);
});

lb.onclick = () => lb.classList.remove('on');
addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('on'); });


/* ========== 9. CHECKLIST 3M PLUS ========== */
const steps = [
  'Menguras bak mandi dan tempat penampungan air seminggu sekali',
  'Menutup rapat tempat penampungan air',
  'Mendaur ulang atau mengubur barang bekas yang menampung air',
  'Memakai lotion atau repelan anti nyamuk',
  'Memasang kasa pada ventilasi dan jendela',
  'Menanam tanaman pengusir nyamuk (sereh, lavender)',
  'Tidur memakai kelambu',
  'Menaburkan larvasida atau memelihara ikan pemakan jentik'
];

const ck = document.getElementById('check');

steps.forEach(s => {
  const l = document.createElement('label');
  l.innerHTML = `<input type="checkbox"><span>${s}</span>`;
  ck.appendChild(l);
});

ck.addEventListener('change', () => {
  const n = ck.querySelectorAll(':checked').length;
  const p = Math.round(n / steps.length * 100);
  document.querySelector('#meter i').style.width = p + '%';
  document.getElementById('score-text').textContent =
    p === 100 ? '100% — rumah Anda siaga penuh!'
    : p >= 50 ? `Perlindungan ${p}%. Sedikit lagi!`
    : `Perlindungan ${p}%. Masih banyak celah untuk ditutup.`;
});


/* ========== 10. MITOS & FAKTA ========== */
const myths = [
  ['Nyamuk hanya menggigit orang yang bersih darahnya manis.',
   'MITOS. Nyamuk memilih berdasarkan CO₂, bau kulit, dan panas tubuh, bukan "manis".'],
  ['Genangan air sebesar tutup botol bisa jadi sarang jentik.',
   'FAKTA. Aedes bisa bertelur di air sedikit, jadi tutup botol pun cukup.'],
  ['Lampu atau alat sonik pengusir nyamuk terbukti efektif.',
   'MITOS. Studi menunjukkan alat sonik tidak mengurangi gigitan secara berarti.']
];

const m = document.getElementById('myths');

myths.forEach(x => {
  const d = document.createElement('div');
  d.className = 'myth';
  d.innerHTML = `<div><p>${x[0]}</p><p>${x[1]}</p></div>`;
  d.onclick = () => d.classList.toggle('flip');
  m.appendChild(d);
});