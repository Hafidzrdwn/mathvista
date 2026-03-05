/**
 * i18n.js
 * Localization engine — Bahasa Indonesia (default) + English
 * Usage: data-i18n="key" on elements, data-i18n-placeholder="key" for inputs
 */

const I18n = (() => {
  const LANG_KEY   = 'vm_lang';
  const DEFAULT_LANG = 'id';

  const T = {
    id: {
      // NAV
      'nav.home': 'Beranda',
      'nav.tagline': 'Pembelajaran Interaktif',
      'nav.calculators':      'Kalkulator',
      'nav.func_graph':       'Grafik Fungsi',
      'nav.func_graph_desc':  'Plot semua f(x)',
      'nav.derivative':       'Turunan',
      'nav.derivative_desc':  "f'(x) dengan garis singgung",
      'nav.integral':         'Integral',
      'nav.integral_desc':    'Tentu & Tak-tentu',
      'nav.sigma':            'Sigma / Penjumlahan',
      'nav.sigma_desc':       'Komputasi deret',
      'nav.statistics':       'Statistika Deskriptif',
      'nav.statistics_desc':  'Analisis statistik lengkap',
      'nav.mmm':              'Rata-rata / Median / Modus',
      'nav.mmm_desc':         'Tendensi sentral',
      'nav.std_dev':          'Standar Deviasi',
      'nav.std_dev_desc':     'Sebaran data',
      'nav.variance':         'Varians',
      'nav.variance_desc':    'Deviasi kuadrat rata-rata',

      // HERO (index)
      'hero.badge':         '✦ Alat Matematika Interaktif Gratis untuk Pelajar',
      'hero.title_1':       'Pahami Matematika',
      'hero.title_2':       'Secara Visual, Bukan Sekadar Angka.',
      'hero.subtitle':      'Visualisasi interaktif untuk kalkulus, statistika, dan aljabar. Plot grafik, hitung turunan, visualisasikan integral, dan jelajahi konsep matematika secara real-time.',
      'hero.cta1':          'Mulai Jelajahi →',
      'hero.cta2':          'Coba Turunan',
      'hero.stat_tools': 'Alat Matematika',
      'hero.stat_free': 'Gratis',
      'hero.stat_fast': 'Cepat',
      'hero.stat_fast_sub': 'Tanpa instalasi',
      'hero.stat_vis_sub':  'Belajar sambil melihat',

      // TOOLS SECTION (index)
      'tools.tag':      'Semua Kalkulator',
      'tools.title':    'Pilih Alat Matematikamu',
      'tools.subtitle': 'Setiap alat menggabungkan komputasi dengan penjelasan visual untuk membantu kamu benar-benar memahami matematika.',
      'tools.open':     'Buka alat →',

      // FEATURE CARDS
      'card.fg.title':   'Kalkulator Grafik Fungsi',
      'card.fg.desc':    'Plot semua fungsi matematika f(x). Geser, zoom, dan hover untuk menjelajahi koordinat secara interaktif.',
      'card.dv.title':   'Kalkulator Turunan',
      'card.dv.desc':    "Hitung f'(x) secara simbolik. Visualisasikan garis singgung dan lihat perubahan kemiringan secara dinamis.",
      'card.in.title':   'Kalkulator Integral',
      'card.in.desc':    'Integral tentu dan tak-tentu dengan visualisasi luas di bawah kurva.',
      'card.sg.title':   'Kalkulator Sigma / Penjumlahan',
      'card.sg.desc':    'Evaluasi notasi sigma dengan diagram batang setiap suku dan jumlah kumulatif.',
      'card.st.title':   'Statistika Deskriptif',
      'card.st.desc':    'Analisis lengkap: mean, median, modus, varians, std dev, kuartil, kemiringan, dan histogram.',
      'card.mmm.title':  'Rata-rata, Median & Modus',
      'card.mmm.desc':   'Hitung ukuran tendensi sentral dengan penjelasan visual arti setiap nilai.',
      'card.sd.title':   'Kalkulator Standar Deviasi',
      'card.sd.desc':    'Pahami sebaran data dengan visualisasi histogram dan perhitungan langkah-demi-langkah.',
      'card.vr.title':   'Kalkulator Varians',
      'card.vr.desc':    'Hitung varians populasi dan sampel dengan rincian deviasi kuadrat individual.',

      // HOW IT WORKS
      'how.tag':         'Cara Kerja',
      'how.title':       'Belajar Lewat Interaksi',
      'how.subtitle':    'Tiga langkah sederhana untuk mengubah matematika abstrak menjadi sesuatu yang bisa kamu lihat dan rasakan.',
      'how.s1.title':    'Masukkan Ekspresi',
      'how.s1.desc':     'Ketik fungsi, dataset, atau batas dalam notasi matematika biasa. Tidak perlu sintaks khusus, tulis matematika secara alami.',
      'how.s2.title':    'Visualisasikan Seketika',
      'how.s2.desc':     'Lihat matematikamu menjadi hidup melalui grafik interaktif. Zoom, geser, dan hover untuk menjelajahi setiap detail.',
      'how.s3.title':    'Baca Penjelasannya',
      'how.s3.desc':     'Setiap hasil disertai penjelasan dalam bahasa sederhana sehingga kamu memahami alasannya, bukan hanya jawabannya.',

      // BANNER
      'banner.title':  'Siap Melihat Matematika dari Sudut Pandang Baru?',
      'banner.sub':    'Mulai dengan alat apa saja, 100% gratis, tanpa akun.',
      'banner.cta1':   'Plot Sebuah Fungsi',
      'banner.cta2':   'Hitung Turunan',

      // FOOTER
      'footer.desc': 'Platform belajar matematika interaktif gratis untuk pelajar SD, SMP, SMA, dan mahasiswa. Pahami matematika secara visual, bukan sekadar angka.',
      'footer.col1': 'Kalkulator',
      'footer.col2': 'Statistika',
      'footer.copy': '© 2025 MathVista. Dibuat untuk pelajar yang ingin memahami, bukan sekadar menghitung.',

      // PAGE HEROES
      'page.fg.title':   'Kalkulator Grafik Fungsi',
      'page.fg.sub':     'Plot semua fungsi matematika f(x) dan jelajahi secara visual dengan zoom, geser, dan koordinat hover interaktif.',
      'page.dv.title':   'Kalkulator Turunan',
      'page.dv.sub':     "Hitung turunan f'(x) dan visualisasikan garis singgung secara dinamis. Geser slider untuk melihat kemiringan berubah di titik mana pun.",
      'page.in.title':   'Kalkulator Integral',
      'page.in.sub':     'Hitung integral tentu dan visualisasikan luas di bawah kurva dengan arsiran region. Pahami integrasi secara visual.',
      'page.sg.title':   'Kalkulator Sigma / Penjumlahan',
      'page.sg.sub':     'Evaluasi notasi Σ (sigma) dan visualisasikan setiap suku serta jumlah kumulatif dengan diagram batang interaktif.',
      'page.st.title':   'Kalkulator Statistika Deskriptif',
      'page.st.sub':     'Masukkan dataset dan dapatkan analisis statistik lengkap dengan visualisasi histogram dan box plot.',
      'page.mmm.title':  'Kalkulator Rata-rata, Median & Modus',
      'page.mmm.sub':    'Hitung tiga ukuran tendensi sentral dan pahami posisi setiap nilai dalam dataset secara visual.',
      'page.sd.title':   'Kalkulator Standar Deviasi',
      'page.sd.sub':     'Hitung standar deviasi populasi dan sampel dengan rincian langkah-demi-langkah dan histogram yang menampilkan sebaran data.',
      'page.vr.title':   'Kalkulator Varians',
      'page.vr.sub':     'Hitung varians populasi atau sampel dan visualisasikan setiap deviasi kuadrat untuk memahami cara ukuran sebaran ini dihitung.',

      // BREADCRUMB
      'bc.home': 'Beranda',

      // PANEL TITLES
      'panel.fn':    'Masukkan Fungsi',
      'panel.dv':    'Input Turunan',
      'panel.in':    'Input Integral',
      'panel.sg':    'Input Sigma',
      'panel.data':  'Input Dataset',

      // FORM LABELS
      'lbl.fn':       'f(x) =',
      'lbl.xrange':   'Rentang X',
      'lbl.dataset':  'Dataset',
      'lbl.bounds':   'Batas Integrasi',
      'lbl.lower':    'a (batas bawah)',
      'lbl.upper':    'b (batas atas)',
      'lbl.start':    'i = (awal)',
      'lbl.end':      'n = (akhir)',
      'lbl.fi':       'f(i) =',
      'lbl.type':     'Tipe',

      // HINTS
      'hint.fn':      'Gunakan * untuk perkalian, ^ untuk eksponen',
      'hint.sep':     'Pisahkan dengan koma atau baris baru',
      'hint.i':       'Masukkan ekspresi dalam suku i. Contoh: i^2 untuk Σ i²',

      // SELECT OPTIONS
      'opt.sample':   'Sampel (÷ n-1)',
      'opt.pop':      'Populasi (÷ n)',
      'opt.sample_v': 'Varians Sampel (s²) — bagi n-1',
      'opt.pop_v':    'Varians Populasi (σ²) — bagi n',

      // TABS
      'tab.definite':   'Tentu',
      'tab.indefinite': 'Tak-tentu',

      // BUTTONS
      'btn.plot':       'Plot Grafik',
      'btn.clear':      'Hapus',
      'btn.compute_dv': 'Hitung Turunan',
      'btn.compute_in': 'Hitung Integral',
      'btn.antideriv':  'Cari Antiturunan',
      'btn.compute_sg': 'Hitung Σ',
      'btn.analyze':    'Analisis Data',
      'btn.calc_mmm':   'Hitung',
      'btn.calc_sd':    'Hitung Std Dev',
      'btn.calc_vr':    'Hitung Varians',
      'btn.histogram':  'Histogram',
      'btn.boxplot':    'Box Plot',

      // RESULT LABELS
      'res.fn':           'Fungsi',
      'res.orig':         'Fungsi Asli f(x)',
      'res.deriv':        "Turunan f'(x)",
      'res.defint':       'Integral Tentu',
      'res.numresult':    'Hasil Numerik',
      'res.sigma_expr':   'Ekspresi Sigma',
      'res.total_sum':    'Jumlah Total',

      // SLIDER
      'slider.tangent':   'Geser titik singgung: x =',

      // TANGENT INFO
      'tan.x':     'titik x',
      'tan.fx':    'f(x)',
      'tan.slope': "Kemiringan f'(x)",

      // GRAPH TITLES
      'graph.fn':   '📈 Grafik Fungsi',
      'graph.dv':   '∂ Grafik Turunan + Garis Singgung',
      'graph.in':   '∫ Luas di Bawah Kurva',
      'graph.sg':   'Σ Visualisasi Suku',
      'graph.hist': '📊 Visualisasi',
      'graph.sd':   'σ Visualisasi Distribusi & Sebaran',
      'graph.vr':   'σ² Deviasi Kuadrat dari Rata-Rata',
      'graph.mmm':  '〜 Distribusi dengan Ukuran Sentral',

      // PLACEHOLDER TEXTS
      'ph.fn':      'mis. x^2 + 3*x - 2',
      'ph.data':    'mis. 2, 5, 7, 10, 12',
      'ph.sigma':   'mis. i^2, 2*i+1, 1/i',

      // STEPS
      'steps.terms':  'Suku-Suku Langkah-Demi-Langkah',
      'steps.sq_dev': 'Rincian Deviasi Kuadrat',
      'steps.col_i':  'i',
      'steps.col_fi': 'f(i)',
      'steps.col_cum':'Jumlah Kumulatif',
      'steps.col_xi': 'xᵢ',
      'steps.col_dev':'xᵢ − μ',
      'steps.col_sq': '(xᵢ − μ)²',
      'steps.col_pct':'% total',

      // EXAMPLES
      'ex.try':     'Coba contoh ini',
      'ex.parabola':'Parabola',
      'ex.sine':    'Sinusoidal',
      'ex.cubic':   'Kubik',
      'ex.rational':'Rasional',
      'ex.arith':   'Aritmatika',
      'ex.squares': 'Jumlah Kuadrat',
      'ex.harmonic':'Harmonik',
      'ex.geom':    'Geometri',

      // SAMPLES
      'sample.small':  'Dataset kecil (10)',
      'sample.normal': 'Mendekati normal (15)',
      'sample.uniform':'Seragam 1–20',

      // FULL SUMMARY
      'summary.title':  'Ringkasan Lengkap',
      'sorted.title':   'Dataset Terurut',

      // TOASTS
      'toast.no_fn':    'Silakan masukkan fungsi.',
      'toast.no_expr':  'Silakan masukkan ekspresi.',
      'toast.no_data':  'Silakan masukkan dataset.',
      'toast.no_bounds':'Masukkan batas integrasi yang valid.',
      'toast.xmin_err': 'X min harus lebih kecil dari X max.',
      'toast.xend_err': 'Batas akhir harus ≥ batas awal.',
      'toast.too_large':'Rentang terlalu besar. Maksimal 500 suku.',
      'toast.copied':   'Tersalin ke clipboard!',
    },

    en: {
      // NAV
      'nav.home': 'Home',
      'nav.tagline': 'Interactive Learning',
      'nav.calculators':      'Calculators',
      'nav.func_graph':       'Function Graph',
      'nav.func_graph_desc':  'Plot any f(x)',
      'nav.derivative':       'Derivative',
      'nav.derivative_desc':  "f'(x) with tangent line",
      'nav.integral':         'Integral',
      'nav.integral_desc':    'Definite & indefinite',
      'nav.sigma':            'Sigma / Summation',
      'nav.sigma_desc':       'Series computation',
      'nav.statistics':       'Descriptive Statistics',
      'nav.statistics_desc':  'Full statistical analysis',
      'nav.mmm':              'Mean / Median / Mode',
      'nav.mmm_desc':         'Central tendency',
      'nav.std_dev':          'Standard Deviation',
      'nav.std_dev_desc':     'Spread of data',
      'nav.variance':         'Variance',
      'nav.variance_desc':    'Average squared deviation',

      // HERO
      'hero.badge':         '✦ Free Interactive Math Tools for Students',
      'hero.title_1':       'Understand Math',
      'hero.title_2':       'Visually, Not Just Numerically.',
      'hero.subtitle':      'Interactive visualizations for calculus, statistics, and algebra. Plot graphs, compute derivatives, visualize integrals, and explore math concepts in real time.',
      'hero.cta1':          'Start Exploring →',
      'hero.cta2':          'Try Derivatives',
      'hero.stat_tools': 'Math Tools',
      'hero.stat_free': 'Free',
      'hero.stat_fast': 'Fast',
      'hero.stat_fast_sub': 'No install needed',
      'hero.stat_vis_sub':  'Learn by seeing',

      // TOOLS SECTION
      'tools.tag':      'All Calculators',
      'tools.title':    'Choose Your Math Tool',
      'tools.subtitle': 'Each tool combines computation with visual explanation to help you truly understand the math.',
      'tools.open':     'Open tool →',

      // FEATURE CARDS
      'card.fg.title':   'Function Graph Calculator',
      'card.fg.desc':    'Plot any mathematical function f(x). Pan, zoom, and hover to explore coordinates interactively.',
      'card.dv.title':   'Derivative Calculator',
      'card.dv.desc':    "Compute f'(x) symbolically. Visualize the tangent line and watch the slope update dynamically.",
      'card.in.title':   'Integral Calculator',
      'card.in.desc':    'Definite and indefinite integrals with shaded area visualization under the curve.',
      'card.sg.title':   'Sigma / Summation Calculator',
      'card.sg.desc':    'Evaluate sigma notation with bar chart visualization showing each term and cumulative sum.',
      'card.st.title':   'Descriptive Statistics',
      'card.st.desc':    'Full analysis: mean, median, mode, variance, std dev, quartiles, skewness, and histogram.',
      'card.mmm.title':  'Mean, Median & Mode',
      'card.mmm.desc':   "Compute central tendency measures with a clear visual explanation of each value's significance.",
      'card.sd.title':   'Standard Deviation Calculator',
      'card.sd.desc':    'Understand data spread with histogram visualization and step-by-step calculation.',
      'card.vr.title':   'Variance Calculator',
      'card.vr.desc':    'Calculate population and sample variance with individual squared deviation breakdown.',

      // HOW IT WORKS
      'how.tag':         'How It Works',
      'how.title':       'Learn Through Interaction',
      'how.subtitle':    'Three simple steps to turn abstract math into something you can see and feel.',
      'how.s1.title':    'Enter Your Expression',
      'how.s1.desc':     'Type a function, dataset, or bounds in plain math notation. No special syntax needed, just write math naturally.',
      'how.s2.title':    'Visualize Instantly',
      'how.s2.desc':     'See your math come alive through interactive graphs. Zoom, pan, and hover to explore every detail of the result.',
      'how.s3.title':    'Read the Explanation',
      'how.s3.desc':     "Each result comes with a plain-English educational explanation so you understand the why, not just the answer.",

      // BANNER
      'banner.title':  'Ready to See Math Differently?',
      'banner.sub':    "Start with any tool, it's 100% free, no account required.",
      'banner.cta1':   'Graph a Function',
      'banner.cta2':   'Compute a Derivative',

      // FOOTER
      'footer.desc': 'A free interactive math learning platform for middle school, high school, and university students. Understand math visually, not just numerically.',
      'footer.col1': 'Calculators',
      'footer.col2': 'Statistics',
      'footer.copy': '© 2025 MathVista. Built for students who want to understand, not just compute.',

      // PAGE HEROES
      'page.fg.title':   'Function Graph Calculator',
      'page.fg.sub':     'Plot any mathematical function f(x) and explore it visually with interactive zoom, pan, and hover coordinates.',
      'page.dv.title':   'Derivative Calculator',
      'page.dv.sub':     "Compute the derivative f'(x) and visualize the tangent line dynamically. Move the slider to see how the slope changes at any point.",
      'page.in.title':   'Integral Calculator',
      'page.in.sub':     'Compute definite integrals and visualize the area under the curve with shaded regions. Understand integration visually.',
      'page.sg.title':   'Sigma / Summation Calculator',
      'page.sg.sub':     'Evaluate Σ (sigma) notation and visualize each term and the cumulative sum with an interactive bar chart.',
      'page.st.title':   'Descriptive Statistics Calculator',
      'page.st.sub':     'Paste your dataset and get a complete statistical analysis with histogram and box plot visualization.',
      'page.mmm.title':  'Mean, Median & Mode Calculator',
      'page.mmm.sub':    'Calculate all three measures of central tendency and understand where each value sits in your dataset visually.',
      'page.sd.title':   'Standard Deviation Calculator',
      'page.sd.sub':     'Calculate population and sample standard deviation with a step-by-step breakdown and histogram showing exactly how spread out your data is.',
      'page.vr.title':   'Variance Calculator',
      'page.vr.sub':     'Compute population or sample variance and visualize each squared deviation to understand exactly how this measure of spread is calculated.',

      // BREADCRUMB
      'bc.home': 'Home',

      // PANEL TITLES
      'panel.fn':    'Enter Function',
      'panel.dv':    'Derivative Input',
      'panel.in':    'Integral Input',
      'panel.sg':    'Sigma Input',
      'panel.data':  'Dataset Input',

      // FORM LABELS
      'lbl.fn':       'f(x) =',
      'lbl.xrange':   'X Range',
      'lbl.dataset':  'Dataset',
      'lbl.bounds':   'Integration Bounds',
      'lbl.lower':    'a (lower)',
      'lbl.upper':    'b (upper)',
      'lbl.start':    'i = (start)',
      'lbl.end':      'n = (end)',
      'lbl.fi':       'f(i) =',
      'lbl.type':     'Type',

      // HINTS
      'hint.fn':   'Use * for multiplication, ^ for exponents',
      'hint.sep':  'Comma or newline separated',
      'hint.i':    'Enter expression in terms of i. Example: i^2 for Σ i²',

      // SELECT OPTIONS
      'opt.sample':   'Sample (÷ n-1)',
      'opt.pop':      'Population (÷ n)',
      'opt.sample_v': 'Sample Variance (s²) — divide by n-1',
      'opt.pop_v':    'Population Variance (σ²) — divide by n',

      // TABS
      'tab.definite':   'Definite',
      'tab.indefinite': 'Indefinite',

      // BUTTONS
      'btn.plot':       'Plot Graph',
      'btn.clear':      'Clear',
      'btn.compute_dv': 'Compute Derivative',
      'btn.compute_in': 'Compute Integral',
      'btn.antideriv':  'Find Antiderivative',
      'btn.compute_sg': 'Compute Σ',
      'btn.analyze':    'Analyze Data',
      'btn.calc_mmm':   'Calculate',
      'btn.calc_sd':    'Calculate Std Dev',
      'btn.calc_vr':    'Calculate Variance',
      'btn.histogram':  'Histogram',
      'btn.boxplot':    'Box Plot',

      // RESULT LABELS
      'res.fn':           'Function',
      'res.orig':         'Original f(x)',
      'res.deriv':        "Derivative f'(x)",
      'res.defint':       'Definite Integral',
      'res.numresult':    'Numerical Result',
      'res.sigma_expr':   'Sigma Expression',
      'res.total_sum':    'Total Sum',

      // SLIDER
      'slider.tangent':   'Move tangent point: x =',

      // TANGENT INFO
      'tan.x':     'x point',
      'tan.fx':    'f(x)',
      'tan.slope': "Slope f'(x)",

      // GRAPH TITLES
      'graph.fn':   '📈 Function Graph',
      'graph.dv':   '∂ Derivative Graph + Tangent Line',
      'graph.in':   '∫ Area Under Curve',
      'graph.sg':   'Σ Term Visualization',
      'graph.hist': '📊 Visualization',
      'graph.sd':   'σ Distribution & Spread Visualization',
      'graph.vr':   'σ² Squared Deviations from Mean',
      'graph.mmm':  '〜 Distribution with Central Measures',

      // PLACEHOLDER
      'ph.fn':    'e.g. x^2 + 3*x - 2',
      'ph.data':  'e.g. 2, 5, 7, 10, 12',
      'ph.sigma': 'e.g. i^2, 2*i+1, 1/i',

      // STEPS
      'steps.terms':  'Step-by-Step Terms',
      'steps.sq_dev': 'Squared Deviations Breakdown',
      'steps.col_i':  'i',
      'steps.col_fi': 'f(i)',
      'steps.col_cum':'Cumulative Sum',
      'steps.col_xi': 'xᵢ',
      'steps.col_dev':'xᵢ − μ',
      'steps.col_sq': '(xᵢ − μ)²',
      'steps.col_pct':'% of total',

      // EXAMPLES
      'ex.try':     'Try these examples',
      'ex.parabola':'Parabola',
      'ex.sine':    'Sinusoidal',
      'ex.cubic':   'Cubic',
      'ex.rational':'Rational',
      'ex.arith':   'Arithmetic',
      'ex.squares': 'Sum of Squares',
      'ex.harmonic':'Harmonic',
      'ex.geom':    'Geometric',

      // SAMPLES
      'sample.small':  'Small dataset (10)',
      'sample.normal': 'Normal-ish (15)',
      'sample.uniform':'Uniform 1–20',

      // FULL SUMMARY
      'summary.title':  'Full Summary',
      'sorted.title':   'Sorted Dataset',

      // TOASTS
      'toast.no_fn':    'Please enter a function.',
      'toast.no_expr':  'Please enter an expression.',
      'toast.no_data':  'Please enter a dataset.',
      'toast.no_bounds':'Please enter valid bounds.',
      'toast.xmin_err': 'X min must be less than X max.',
      'toast.xend_err': 'End must be ≥ start.',
      'toast.too_large':'Range too large. Keep it under 500 terms.',
      'toast.copied':   'Copied to clipboard!',
    }
  };

  let lang = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;

  function t(key) {
    return (T[lang] && T[lang][key]) || (T['en'][key]) || key;
  }

  function apply() {
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });

    // Update select option text
    document.querySelectorAll('[data-i18n-option]').forEach(el => {
      el.textContent = t(el.dataset.i18nOption);
    });

    // Update toggle button label
    const btn = document.getElementById('langToggle');
    if (btn) btn.textContent = lang.toUpperCase();
  }

  function setLang(l) {
    lang = l;
    localStorage.setItem(LANG_KEY, lang);
    apply();
  }

  function toggle() {
    setLang(lang === 'id' ? 'en' : 'id');
  }

  function getLang() { return lang; }

  // Auto-apply
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }

  return { t, apply, setLang, toggle, getLang };
})();

window.I18n = I18n;
