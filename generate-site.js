#!/usr/bin/env node
/**
 * 精选账号商城 · 现代科技感独立站生成器
 * 风格：深色主题 · 流光渐变 · 玻璃拟态
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
const DIST_DIR = path.join(__dirname, 'dist');

function loadJSON(name) {
    const fp = path.join(DATA_DIR, name);
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
}

function esc(s) { return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function fixImg(url, base) {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return base + url;
    return url;
}

// ── SEO 配置 ──
function loadRootJSON(name) {
    const fp = path.join(__dirname, name);
    if (!fs.existsSync(fp)) return null;
    return JSON.parse(fs.readFileSync(fp, 'utf8'));
}
const SEO = loadRootJSON('seo.json') || {};
const SEO_KEYWORDS = SEO.keywords || '';
const SEO_DESC = SEO.description || '';
const SITE_TITLE = SEO.title || '精选账号商城';
const SEO_TITLE_SUFFIX = SEO.titleSuffix || '';
const SEO_AUTHOR = SEO.author || SITE_TITLE;
const SEO_ROBOTS = SEO.robots || 'index, follow';
const SEO_CANONICAL = SEO.canonical || '';
const SEO_OG = SEO.og || {};
const SEO_TWITTER = SEO.twitter || {};
const SEO_JSON_LD = SEO.jsonLd || {};
const SEO_FAVICON = SEO.favicon || '';

// ── CSS ──
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap');

:root {
  --bg-deep: #0a0a0f;
  --bg-main: #0f0f18;
  --bg-card: rgba(18, 18, 30, 0.7);
  --bg-card-hover: rgba(24, 24, 42, 0.85);
  --bg-glass: rgba(255, 255, 255, 0.03);
  --surface-1: #16162a;
  --accent-1: #6c5ce7;
  --accent-2: #a29bfe;
  --accent-3: #00cec9;
  --gradient-primary: linear-gradient(135deg, #6c5ce7 0%, #a29bfe 50%, #74b9ff 100%);
  --gradient-card: linear-gradient(145deg, rgba(108,92,231,0.08), rgba(0,206,201,0.04));
  --gradient-hero: linear-gradient(135deg, #6c5ce7 0%, #00cec9 50%, #a29bfe 100%);
  --gradient-price: linear-gradient(135deg, #fd79a8 0%, #e17055 100%);
  --text-primary: #f0f0f8;
  --text-secondary: #a0a0c0;
  --text-muted: #606080;
  --border: rgba(108, 92, 231, 0.12);
  --border-hover: rgba(108, 92, 231, 0.3);
  --border-subtle: rgba(255, 255, 255, 0.04);
  --radius: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --max-w: 1280px;
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(108, 92, 231, 0.06);
  --shadow-card-hover: 0 8px 48px rgba(108, 92, 231, 0.2), 0 0 0 1px rgba(108, 92, 231, 0.15);
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

body {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--bg-deep); color: var(--text-primary); line-height: 1.7;
  min-height: 100vh; overflow-x: hidden; -webkit-font-smoothing: antialiased;
}

.bg-effects { position: fixed; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.bg-effects .orb { position: absolute; border-radius: 50%; filter: blur(120px); opacity: 0.4; animation: orbFloat 20s ease-in-out infinite alternate; }
.bg-effects .orb-1 { width: 600px; height: 600px; top: -200px; left: -100px; background: radial-gradient(circle, rgba(108,92,231,0.3), transparent 70%); }
.bg-effects .orb-2 { width: 500px; height: 500px; bottom: -150px; right: -100px; background: radial-gradient(circle, rgba(0,206,201,0.2), transparent 70%); animation-delay: -10s; }
.bg-effects .orb-3 { width: 400px; height: 400px; top: 40%; left: 50%; background: radial-gradient(circle, rgba(162,155,254,0.15), transparent 70%); animation-delay: -5s; }
@keyframes orbFloat { 0% { transform: translate(0, 0) scale(1); } 50% { transform: translate(40px, -30px) scale(1.1); } 100% { transform: translate(-20px, 20px) scale(0.95); } }

.bg-grid { position: fixed; inset: 0; pointer-events: none; z-index: 0; background-image: linear-gradient(rgba(108,92,231,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(108,92,231,0.03) 1px, transparent 1px); background-size: 60px 60px; mask-image: radial-gradient(ellipse at 50% 30%, black 0%, transparent 70%); -webkit-mask-image: radial-gradient(ellipse at 50% 30%, black 0%, transparent 70%); }

a { color: var(--accent-2); text-decoration: none; transition: color .3s var(--ease-out); }
a:hover { color: var(--accent-3); }
img { max-width: 100%; height: auto; display: block; }
.container { max-width: var(--max-w); margin: 0 auto; padding: 0 24px; position: relative; z-index: 1; }

.header { position: sticky; top: 0; z-index: 1000; height: 72px; background: rgba(10, 10, 15, 0.8); backdrop-filter: blur(20px) saturate(1.4); -webkit-backdrop-filter: blur(20px) saturate(1.4); border-bottom: 1px solid var(--border-subtle); transition: background .4s; }
.header.scrolled { background: rgba(10, 10, 15, 0.95); }
.header-inner { max-width: var(--max-w); margin: 0 auto; padding: 0 24px; height: 100%; display: flex; align-items: center; justify-content: space-between; }
.logo-area { display: flex; align-items: center; gap: 14px; }
.logo-mark { height: 42px; border-radius: 12px; overflow: hidden; background: var(--gradient-primary); padding: 2px; box-shadow: 0 0 20px rgba(108, 92, 231, 0.3); flex-shrink: 0; }
.logo-mark img { height: 100%; width: auto; border-radius: 10px; display: block; }
.logo-text-group { display: flex; flex-direction: column; gap: 1px; }
.logo-text { font-family: 'Space Grotesk', sans-serif; font-size: 1.15rem; font-weight: 700; letter-spacing: -0.02em; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.logo-sub { font-size: .7rem; color: var(--text-muted); letter-spacing: .3px; }
.logo-sub a { color: var(--text-muted); } .logo-sub a:hover { color: var(--accent-2); }
.header-actions { display: flex; align-items: center; gap: 12px; }
.header-pill { padding: 8px 20px; border-radius: 100px; font-size: .78rem; font-weight: 600; background: var(--gradient-primary); color: #fff; box-shadow: 0 0 20px rgba(108, 92, 231, 0.25); letter-spacing: .3px; transition: all .3s var(--ease-out); }
.header-pill:hover { transform: translateY(-1px); box-shadow: 0 0 30px rgba(108, 92, 231, 0.4); color: #fff; }
.header-badge-sm { display: flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 100px; background: rgba(0, 206, 201, 0.08); border: 1px solid rgba(0, 206, 201, 0.15); font-size: .72rem; color: var(--accent-3); font-weight: 500; }
.pulse-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent-3); animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: .5; transform: scale(1.3); } }

.hero { position: relative; padding: 80px 24px 40px; text-align: center; overflow: hidden; }
.hero-glow { position: absolute; top: -60px; left: 50%; transform: translateX(-50%); width: 800px; height: 400px; pointer-events: none; background: radial-gradient(ellipse, rgba(108,92,231,0.12) 0%, transparent 70%); }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 8px 20px; border-radius: 100px; margin-bottom: 28px; background: var(--bg-glass); border: 1px solid var(--border); font-size: .8rem; color: var(--text-secondary); font-weight: 500; backdrop-filter: blur(10px); }
.hero-badge .badge-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--accent-3); box-shadow: 0 0 12px rgba(0, 206, 201, 0.5); }
.hero h1 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(2rem, 5.5vw, 3.8rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.15; margin-bottom: 20px; }
.hero h1 .gradient-text { background: var(--gradient-hero); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero-desc { font-size: 1.05rem; color: var(--text-secondary); max-width: 540px; margin: 0 auto 48px; font-weight: 400; line-height: 1.8; }

.stats-row { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; max-width: 700px; margin: 0 auto; }
.stat-chip { display: flex; align-items: center; gap: 10px; padding: 14px 24px; border-radius: var(--radius); background: var(--bg-card); border: 1px solid var(--border); backdrop-filter: blur(10px); transition: all .3s var(--ease-out); }
.stat-chip:hover { border-color: var(--border-hover); background: var(--bg-card-hover); transform: translateY(-2px); }
.stat-chip .stat-num { font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; font-weight: 700; background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.stat-chip .stat-label { font-size: .75rem; color: var(--text-muted); font-weight: 500; letter-spacing: .5px; text-transform: uppercase; }

.filter-section { padding: 0 0 16px; }
.filter-bar { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.filter-btn { padding: 10px 22px; border-radius: 100px; cursor: pointer; font-size: .82rem; font-weight: 600; transition: all .3s var(--ease-out); background: var(--bg-card); color: var(--text-secondary); border: 1px solid var(--border-subtle); letter-spacing: .2px; user-select: none; backdrop-filter: blur(10px); }
.filter-btn:hover { background: var(--bg-card-hover); color: var(--text-primary); border-color: var(--border); }
.filter-btn.active { background: var(--gradient-primary); color: #fff; border-color: transparent; box-shadow: 0 0 24px rgba(108, 92, 231, 0.3); }

.products-section { padding: 24px 0 80px; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }

.product-card { position: relative; display: block; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); overflow: hidden; transition: all .45s var(--ease-out); cursor: pointer; text-decoration: none; color: inherit; backdrop-filter: blur(10px); }
.product-card::before { content: ''; position: absolute; inset: 0; border-radius: var(--radius-lg); background: var(--gradient-card); opacity: 0; transition: opacity .4s; z-index: 0; pointer-events: none; }
.product-card:hover { transform: translateY(-8px); border-color: var(--border-hover); box-shadow: var(--shadow-card-hover); }
.product-card:hover::before { opacity: 1; }

.card-img-wrap { position: relative; overflow: hidden; height: 200px; background: var(--surface-1); }
.card-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s var(--ease-out); }
.product-card:hover .card-img-wrap img { transform: scale(1.08); }
.card-img-wrap::after { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, transparent 50%, rgba(10,10,15,0.6) 100%); }

.card-tag { position: absolute; top: 14px; left: 14px; z-index: 2; padding: 5px 14px; border-radius: 8px; font-size: .7rem; font-weight: 700; background: rgba(108, 92, 231, 0.85); color: #fff; backdrop-filter: blur(8px); letter-spacing: .5px; box-shadow: 0 2px 12px rgba(108, 92, 231, 0.3); }

.card-body { position: relative; padding: 20px; z-index: 1; }
.card-cat { font-size: .68rem; color: var(--accent-2); font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; }
.card-title { font-size: .92rem; font-weight: 600; line-height: 1.6; margin-bottom: 16px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-primary); min-height: 2.9em; }
.card-footer { display: flex; align-items: center; justify-content: space-between; }
.card-price { font-family: 'Space Grotesk', sans-serif; font-size: 1.25rem; font-weight: 700; }
.card-price .from { font-size: .68rem; font-weight: 400; color: var(--text-muted); margin-right: 2px; font-family: 'Plus Jakarta Sans', sans-serif; }
.card-price .amount { background: var(--gradient-price); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.card-cta { width: 38px; height: 38px; border-radius: 12px; background: rgba(108, 92, 231, 0.08); display: flex; align-items: center; justify-content: center; color: var(--accent-2); font-size: 1rem; transition: all .3s var(--ease-out); border: 1px solid rgba(108, 92, 231, 0.1); }
.product-card:hover .card-cta { background: var(--gradient-primary); color: #fff; border-color: transparent; box-shadow: 0 0 16px rgba(108, 92, 231, 0.3); transform: translateX(4px); }

.features-section { padding: 40px 0 80px; }
.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
.feature-card { background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: 32px 24px; text-align: center; transition: all .4s var(--ease-out); backdrop-filter: blur(10px); }
.feature-card:hover { border-color: var(--border); transform: translateY(-4px); box-shadow: var(--shadow-card); }
.feature-icon { width: 56px; height: 56px; border-radius: 16px; margin: 0 auto 18px; background: var(--gradient-card); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; transition: all .3s; }
.feature-card:hover .feature-icon { box-shadow: 0 0 20px rgba(108, 92, 231, 0.2); border-color: var(--border-hover); }
.feature-card h3 { font-family: 'Space Grotesk', sans-serif; font-size: .95rem; font-weight: 700; margin-bottom: 8px; color: var(--text-primary); letter-spacing: -.01em; }
.feature-card p { font-size: .8rem; color: var(--text-secondary); font-weight: 400; line-height: 1.6; }

.cta-section { padding: 0 0 80px; }
.cta-banner { position: relative; overflow: hidden; border-radius: var(--radius-xl); padding: 60px 40px; background: linear-gradient(135deg, rgba(108,92,231,0.15), rgba(0,206,201,0.08)); border: 1px solid var(--border); text-align: center; backdrop-filter: blur(10px); }
.cta-banner::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle at 30% 30%, rgba(108,92,231,0.08), transparent 50%), radial-gradient(circle at 70% 70%, rgba(0,206,201,0.06), transparent 50%); animation: rotateBg 30s linear infinite; }
@keyframes rotateBg { to { transform: rotate(360deg); } }
.cta-banner h2 { font-family: 'Space Grotesk', sans-serif; font-size: clamp(1.4rem, 3vw, 2rem); font-weight: 700; margin-bottom: 12px; position: relative; letter-spacing: -.02em; }
.cta-banner p { color: var(--text-secondary); font-size: .95rem; margin-bottom: 28px; position: relative; }
.cta-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 36px; border-radius: 100px; background: var(--gradient-primary); color: #fff; font-size: .9rem; font-weight: 700; letter-spacing: .3px; transition: all .3s var(--ease-out); box-shadow: 0 0 30px rgba(108, 92, 231, 0.3); position: relative; }
.cta-btn:hover { transform: translateY(-2px); box-shadow: 0 0 50px rgba(108, 92, 231, 0.5); color: #fff; }

.footer { position: relative; text-align: center; padding: 48px 24px 40px; border-top: 1px solid var(--border-subtle); }
.footer-line { width: 40px; height: 2px; margin: 0 auto 24px; background: var(--gradient-primary); border-radius: 2px; }
.footer p { color: var(--text-muted); font-size: .78rem; line-height: 1.8; }
.footer a { color: var(--text-muted); transition: color .3s; } .footer a:hover { color: var(--accent-2); }
.footer-links { margin-bottom: 12px; }
.footer-links a { display: inline-flex; align-items: center; gap: 6px; padding: 8px 20px; border-radius: 100px; background: var(--bg-card); border: 1px solid var(--border-subtle); color: var(--text-secondary); font-size: .82rem; font-weight: 500; transition: all .3s; }
.footer-links a:hover { border-color: var(--border-hover); color: var(--accent-2); transform: translateY(-1px); }

@keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
.anim { opacity: 0; animation: fadeUp .6s var(--ease-out) forwards; }
.anim-d1 { animation-delay: .05s; } .anim-d2 { animation-delay: .1s; } .anim-d3 { animation-delay: .15s; }
.anim-d4 { animation-delay: .2s; } .anim-d5 { animation-delay: .25s; } .anim-d6 { animation-delay: .3s; }
.reveal { opacity: 0; transform: translateY(24px); transition: all .6s var(--ease-out); }
.reveal.visible { opacity: 1; transform: translateY(0); }

@media (max-width: 768px) {
  .hero { padding: 50px 16px 30px; } .hero h1 { font-size: 1.8rem; }
  .hero-desc { font-size: .92rem; margin-bottom: 32px; }
  .stats-row { gap: 6px; } .stat-chip { padding: 10px 16px; } .stat-chip .stat-num { font-size: 1.2rem; }
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .card-img-wrap { height: 150px; } .card-body { padding: 14px; } .card-title { font-size: .82rem; min-height: auto; }
  .card-price { font-size: 1.05rem; } .header-badge-sm { display: none; } .container { padding: 0 16px; }
  .features-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } .feature-card { padding: 24px 16px; }
  .cta-banner { padding: 40px 24px; } .filter-bar { gap: 6px; } .filter-btn { padding: 8px 16px; font-size: .75rem; }
}
@media (max-width: 480px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .card-img-wrap { height: 130px; } .card-body { padding: 10px; }
  .card-tag { font-size: .6rem; padding: 4px 10px; top: 8px; left: 8px; }
  .card-cta { width: 30px; height: 30px; border-radius: 8px; font-size: .8rem; }
  .stat-chip { padding: 8px 12px; } .stat-chip .stat-num { font-size: 1rem; } .stat-chip .stat-label { font-size: .65rem; }
  .logo-sub { display: none; }
}
`;

const JS = `
function filterCategory(id, el) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  document.querySelectorAll('.product-card').forEach((c, i) => {
    if (id === 'all' || c.dataset.cat == id) {
      c.style.display = '';
      c.style.opacity = '0'; c.style.transform = 'translateY(20px)';
      setTimeout(() => { c.style.transition = 'all .4s cubic-bezier(0.16,1,0.3,1)'; c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }, i * 40);
    } else { c.style.display = 'none'; }
  });
}
window.addEventListener('scroll', () => { document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20); });
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => { if (entry.isIntersecting) { setTimeout(() => entry.target.classList.add('visible'), i * 60); observer.unobserve(entry.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
`;

function main() {
    const config = loadJSON('config.json') || {};
    const categories = loadJSON('categories.json') || [];
    const products = loadJSON('products.json') || [];
    const meta = loadJSON('meta.json') || {};

    if (!products.length) { console.error('❌ 没有商品数据'); process.exit(1); }

    const siteUrl = meta.siteUrl || process.env.SITE_URL;
    const siteName = SITE_TITLE;
    const GITHUB_PAGES_URL = process.env.GITHUB_PAGES_URL;

    if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

    // 简化分类名用于 filter 按钮
    function shortCatName(name) {
        return name
            .replace(/谷歌美国电话\/?/i, '')
            .replace(/GoogleVoice\s*\/?\s*GV靓号/i, 'GV靓号')
            .replace(/谷歌邮箱\s*\/?\s*油管\s*\/?\s*Google\s*\/?\s*Gmail/i, '谷歌邮箱')
            .replace(/苹果id\s*\/?\s*Apple\s*id\s*\/?\s*AppStore/i, '苹果ID')
            .replace(/服务类/i, '服务类')
            .trim() || name;
    }

    const activeCats = categories.filter(c => products.some(p => p.category_id === c.id));
    const catBtns = activeCats
        .sort((a, b) => (b.sort || 0) - (a.sort || 0))
        .map(c => `<div class="filter-btn" onclick="filterCategory(${c.id}, this)">${esc(shortCatName(c.name))}</div>`)
        .join('\n            ');

    const cards = products.filter(p => p.active !== 0).sort((a, b) => (b.sort||0) - (a.sort||0)).map((p, i) => {
        const cat = categories.find(c => c.id === p.category_id);
        const catName = cat ? shortCatName(cat.name) : '';
        const img = p.image_url ? fixImg(p.image_url, siteUrl) : '';
        const variants = p.variants || [];
        const minPrice = variants.length ? Math.min(...variants.map(v => v.price)) : 0;
        const tags = (p.tags || '').split(',').map(t => t.trim()).filter(Boolean);
        const cleanTag = t => t.replace(/b[12]#[0-9a-fA-F]{3,6}/g, '').replace(/#[0-9a-fA-F]{3,6}$/g, '').replace(/\s+/g, ' ').trim();
        const tagLabel = cleanTag(tags[0] || '');

        return `
            <a class="product-card reveal" href="${siteUrl}/product?id=${p.id}" target="_blank" rel="noopener" data-cat="${p.category_id}">
                <div class="card-img-wrap">
                    ${img ? `<img src="${esc(img)}" alt="${esc(p.name)}" loading="lazy">` : ''}
                    ${tagLabel ? `<div class="card-tag">${esc(tagLabel)}</div>` : ''}
                </div>
                <div class="card-body">
                    <div class="card-cat">${esc(catName)}</div>
                    <div class="card-title">${esc(p.name)}</div>
                    <div class="card-footer">
                        <div class="card-price"><span class="from">起</span><span class="amount">¥${minPrice.toFixed(2)}</span></div>
                        <div class="card-cta">→</div>
                    </div>
                </div>
            </a>`;
    }).join('\n');

    const ogImage = products[0]?.image_url ? fixImg(products[0].image_url, siteUrl) : (meta.siteLogo ? fixImg(meta.siteLogo, siteUrl) : '');

    const jsonLd = { "@context": "https://schema.org", "@type": "WebSite", "name": siteName, "description": SEO_DESC, "url": GITHUB_PAGES_URL, "potentialAction": { "@type": "SearchAction", "target": `${siteUrl}/product?id={search_term_string}`, "query-input": "required name=search_term_string" } };
    const itemListLd = { "@context": "https://schema.org", "@type": "ItemList", "itemListElement": products.filter(p => p.active !== 0).map((p, i) => ({ "@type": "ListItem", "position": i + 1, "item": { "@type": "Product", "name": p.name, "url": `${siteUrl}/product?id=${p.id}`, "image": p.image_url ? fixImg(p.image_url, siteUrl) : '', "offers": { "@type": "Offer", "price": p.variants?.length ? Math.min(...p.variants.map(v => v.price)) : 0, "priceCurrency": "CNY" } } })) };

    const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(siteName)}${SEO_TITLE_SUFFIX ? ' - ' + esc(SEO_TITLE_SUFFIX) : ''}</title>
    <meta name="description" content="${esc(SEO_DESC)}">
    <meta name="keywords" content="${esc(SEO_KEYWORDS)}">
    <meta name="author" content="${esc(SEO_AUTHOR)}">
    <meta name="robots" content="${esc(SEO_ROBOTS)}">
    <meta name="googlebot" content="${esc(SEO_ROBOTS)}">
    ${SEO_CANONICAL ? `<link rel="canonical" href="${esc(SEO_CANONICAL)}">` : ''}
    <meta property="og:type" content="${esc(SEO_OG.type || 'website')}">
    <meta property="og:url" content="${esc(SEO_OG.url || GITHUB_PAGES_URL)}">
    <meta property="og:title" content="${esc(siteName)}">
    <meta property="og:description" content="${esc(SEO_DESC)}">
    ${ogImage ? `<meta property="og:image" content="${esc(ogImage)}">` : ''}
    <meta property="og:locale" content="${esc(SEO_OG.locale || 'zh_CN')}">
    <meta property="og:site_name" content="${esc(SEO_OG.siteName || siteName)}">
    <meta name="twitter:card" content="${esc(SEO_TWITTER.card || 'summary_large_image')}">
    <meta name="twitter:title" content="${esc(siteName)}">
    <meta name="twitter:description" content="${esc(SEO_DESC)}">
    ${ogImage ? `<meta name="twitter:image" content="${esc(ogImage)}">` : ''}
    <script type="application/ld+json">${JSON.stringify({...SEO_JSON_LD, ...jsonLd})}</script>
    <script type="application/ld+json">${JSON.stringify(itemListLd)}</script>
    ${SEO_FAVICON ? `<link rel="icon" href="${esc(SEO_FAVICON)}">` : ''}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>${CSS}</style>
</head>
<body>
<div class="bg-effects"><div class="orb orb-1"></div><div class="orb orb-2"></div><div class="orb orb-3"></div></div>
<div class="bg-grid"></div>

<header class="header" id="header">
    <div class="header-inner">
        <div class="logo-area">
            <div class="logo-mark">
                <img src="${esc(fixImg(meta.siteLogo || '', siteUrl))}" alt="${esc(siteName)}">
            </div>
            <div class="logo-text-group">
                <div class="logo-text">${esc(siteName)}</div>
                <div class="logo-sub">商城原址：<a href="${siteUrl}" target="_blank" rel="noopener">${esc(siteUrl)}</a></div>
            </div>
        </div>
        <div class="header-actions">
            <div class="header-badge-sm"><div class="pulse-dot"></div>自动发货中</div>
            <a href="${siteUrl}" target="_blank" rel="noopener" class="header-pill">进入商城 →</a>
        </div>
    </div>
</header>

<section class="hero">
    <div class="hero-glow"></div>
    <div class="container">
        <div class="hero-badge anim"><div class="badge-dot"></div>全场自动发货 · 安全可靠</div>
        <h1 class="anim anim-d1">精选优质<br><span class="gradient-text">数字账号资源</span></h1>
        <p class="hero-desc anim anim-d2">一站式解决账号与网站需求，稳定可靠，支持长期使用</p>
        <div class="stats-row">
            <div class="stat-chip anim anim-d3"><span class="stat-num">${categories.length}</span><span class="stat-label">分类</span></div>
            <div class="stat-chip anim anim-d4"><span class="stat-num">${products.filter(p=>p.active!==0).length}</span><span class="stat-label">商品</span></div>
            <div class="stat-chip anim anim-d5"><span class="stat-num">${products.reduce((s,p) => s + (p.variants?.length||0), 0)}</span><span class="stat-label">规格</span></div>
            <div class="stat-chip anim anim-d6"><span class="stat-num">24h</span><span class="stat-label">发货</span></div>
        </div>
    </div>
</section>

<div class="container filter-section">
    <div class="filter-bar">
        <div class="filter-btn active" onclick="filterCategory('all', this)">全部商品</div>
        ${catBtns}
    </div>
</div>

<section class="products-section">
    <div class="container">
        <div class="products-grid">
            ${cards}
        </div>
    </div>
</section>

<section class="features-section">
    <div class="container">
        <div class="features-grid">
            <div class="feature-card reveal"><div class="feature-icon">⚡</div><h3>即时发货</h3><p>付款后自动发货，无需等待人工处理</p></div>
            <div class="feature-card reveal"><div class="feature-icon">🛡️</div><h3>品质保障</h3><p>质保期内首登有问题免费更换</p></div>
            <div class="feature-card reveal"><div class="feature-icon">💎</div><h3>源头价格</h3><p>一手资源，拒绝中间商差价</p></div>
            <div class="feature-card reveal"><div class="feature-icon">🎯</div><h3>可选靓号</h3><p>支持自选号码，精准匹配需求</p></div>
        </div>
    </div>
</section>

<section class="cta-section">
    <div class="container">
        <div class="cta-banner reveal">
            <h2>找到你需要的账号了吗？</h2>
            <p>全场自动发货，安全可靠，支持长期使用</p>
            <a href="${siteUrl}" target="_blank" rel="noopener" class="cta-btn">立即前往商城 →</a>
        </div>
    </div>
</section>

<footer class="footer">
    <div class="container">
        <div class="footer-line"></div>
        <div class="footer-links"><a href="${siteUrl}" target="_blank" rel="noopener">🏪 进入商城</a></div>
        <p style="margin-bottom:6px">© ${new Date().getFullYear()} ${esc(siteName)} · 所有商品均为虚拟数字商品</p>
        <p>商城原址：<a href="${siteUrl}" target="_blank" rel="noopener">${esc(siteUrl)}</a></p>
    </div>
</footer>

<script>${JS}</script>
</body>
</html>`;

    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
    console.log(`✅ dist/index.html (${(Buffer.byteLength(html)/1024).toFixed(1)}KB)`);
    console.log(`   商品: ${products.filter(p=>p.active!==0).length} 个`);
    console.log(`   分类: ${activeCats.length} 个`);
    console.log(`   风格: 现代科技感 · 深色主题 · 流光渐变`);
    console.log(`   链接: 全部指向 ${siteUrl}/product?id=xxx`);
}

main();
