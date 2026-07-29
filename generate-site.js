#!/usr/bin/env node
/**
 * 精选账号商城 · 极简现代站生成器
 * 风格：白底 · 干净排版 · 灵感来自 reallygoodemails.com
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
function loadRootJSON(name) {
    const fp = path.join(__dirname, name);
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

const CSS = `
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }

:root {
  --white: #ffffff;
  --gray-50: #fafafa; --gray-100: #f5f5f5; --gray-200: #e5e5e5;
  --gray-300: #d4d4d4; --gray-400: #a3a3a3; --gray-500: #737373;
  --gray-600: #525252; --gray-700: #404040; --gray-800: #262626;
  --gray-900: #171717; --black: #0a0a0a;
  --blue-50: #eff6ff; --blue-100: #dbeafe; --blue-500: #3b82f6;
  --blue-600: #2563eb; --blue-700: #1d4ed8;
  --indigo-500: #6366f1; --indigo-600: #4f46e5;
  --green-50: #f0fdf4; --green-500: #22c55e; --green-600: #16a34a;
  --radius-sm: 8px; --radius: 12px; --radius-lg: 16px;
  --radius-xl: 20px; --radius-full: 9999px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  --shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.07), 0 2px 4px -2px rgba(0,0,0,0.05);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.08), 0 4px 6px -4px rgba(0,0,0,0.04);
  --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.04);
  --max-w: 1200px; --ease: cubic-bezier(0.16, 1, 0.3, 1);
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: var(--white); color: var(--gray-800); line-height: 1.6;
  min-height: 100vh; overflow-x: hidden; -webkit-font-smoothing: antialiased;
}
.container { max-width: var(--max-w); margin: 0 auto; padding: 0 24px; }

.header {
  position: sticky; top: 0; z-index: 100;
  background: rgba(255,255,255,0.85); backdrop-filter: blur(16px) saturate(1.8);
  -webkit-backdrop-filter: blur(16px) saturate(1.8); border-bottom: 1px solid var(--gray-200);
}
.header-inner { max-width: var(--max-w); margin: 0 auto; padding: 0 24px; height: 64px; display: flex; align-items: center; justify-content: space-between; }
.logo-area { display: flex; align-items: center; gap: 12px; }
.logo-mark { height: 36px; border-radius: var(--radius); overflow: hidden; flex-shrink: 0; box-shadow: var(--shadow); }
.logo-mark img { height: 100%; width: auto; display: block; }
.logo-text { font-size: 1.05rem; font-weight: 700; color: var(--gray-900); letter-spacing: -0.02em; }
.logo-sub { font-size: .72rem; color: var(--gray-400); margin-top: 1px; }
.logo-sub a { color: var(--blue-600); text-decoration: none; }
.logo-sub a:hover { text-decoration: underline; }
.header-actions { display: flex; align-items: center; gap: 10px; }
.header-badge { display: flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: var(--radius-full); background: var(--green-50); border: 1px solid #bbf7d0; font-size: .75rem; color: var(--green-600); font-weight: 600; }
.pulse-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--green-500); animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.4)} }
.header-cta { padding: 8px 20px; border-radius: var(--radius-full); font-size: .82rem; font-weight: 600; color: var(--white); background: var(--gray-900); border: none; cursor: pointer; transition: all .2s var(--ease); text-decoration: none; display: inline-flex; align-items: center; }
.header-cta:hover { background: var(--gray-700); color: var(--white); transform: translateY(-1px); box-shadow: var(--shadow-md); }

.hero { padding: 80px 24px 60px; text-align: center; background: var(--gray-50); border-bottom: 1px solid var(--gray-200); }
.hero-inner { max-width: 720px; margin: 0 auto; }
.hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 16px; border-radius: var(--radius-full); background: var(--blue-50); border: 1px solid var(--blue-100); font-size: .78rem; color: var(--blue-600); font-weight: 600; margin-bottom: 24px; }
.hero h1 { font-size: clamp(2.2rem, 5vw, 3.5rem); font-weight: 800; letter-spacing: -0.035em; line-height: 1.1; margin-bottom: 16px; color: var(--gray-900); }
.hero h1 .highlight { background: linear-gradient(135deg, var(--indigo-600), var(--blue-600)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero-desc { font-size: 1.1rem; color: var(--gray-500); max-width: 520px; margin: 0 auto 40px; line-height: 1.7; font-weight: 400; }
.hero-stats { display: flex; justify-content: center; gap: 32px; flex-wrap: wrap; }
.hero-stat { text-align: center; }
.hero-stat-num { font-size: 2rem; font-weight: 800; color: var(--gray-900); letter-spacing: -0.03em; line-height: 1.2; }
.hero-stat-label { font-size: .78rem; color: var(--gray-400); font-weight: 500; text-transform: uppercase; letter-spacing: .5px; margin-top: 2px; }

.trust-bar { padding: 20px 0; border-bottom: 1px solid var(--gray-200); background: var(--white); }
.trust-inner { max-width: var(--max-w); margin: 0 auto; padding: 0 24px; display: flex; align-items: center; justify-content: center; gap: 32px; flex-wrap: wrap; }
.trust-item { display: flex; align-items: center; gap: 8px; font-size: .82rem; color: var(--gray-500); font-weight: 500; }
.trust-icon { font-size: 1.1rem; }

.filter-section { padding: 40px 0 0; }
.section-header { text-align: center; margin-bottom: 32px; }
.section-header h2 { font-size: 1.6rem; font-weight: 700; color: var(--gray-900); letter-spacing: -0.02em; margin-bottom: 8px; }
.section-header p { font-size: .95rem; color: var(--gray-400); }
.filter-bar { display: flex; justify-content: center; gap: 6px; flex-wrap: wrap; margin-bottom: 32px; }
.filter-btn { padding: 8px 20px; border-radius: var(--radius-full); cursor: pointer; font-size: .82rem; font-weight: 600; transition: all .2s var(--ease); background: var(--gray-100); color: var(--gray-600); border: 1px solid transparent; user-select: none; }
.filter-btn:hover { background: var(--gray-200); color: var(--gray-800); }
.filter-btn.active { background: var(--gray-900); color: var(--white); border-color: var(--gray-900); }

.products-section { padding: 0 0 60px; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; }
.product-card { display: block; background: var(--white); border: 1px solid var(--gray-200); border-radius: var(--radius-lg); overflow: hidden; transition: all .3s var(--ease); cursor: pointer; text-decoration: none; color: inherit; }
.product-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-xl); border-color: var(--gray-300); }
.card-img-wrap { position: relative; overflow: hidden; height: 180px; background: var(--gray-100); }
.card-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform .5s var(--ease); }
.product-card:hover .card-img-wrap img { transform: scale(1.05); }
.card-tag { position: absolute; top: 12px; left: 12px; z-index: 2; padding: 4px 12px; border-radius: var(--radius-sm); font-size: .7rem; font-weight: 700; color: var(--white); background: var(--gray-900); backdrop-filter: blur(8px); letter-spacing: .3px; }
.card-body { padding: 16px 18px 18px; }
.card-cat { font-size: .68rem; color: var(--blue-600); font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 6px; }
.card-title { font-size: .88rem; font-weight: 600; line-height: 1.5; margin-bottom: 14px; color: var(--gray-800); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; min-height: 2.6em; }
.card-footer { display: flex; align-items: center; justify-content: space-between; }
.card-price { font-size: 1.15rem; font-weight: 700; color: var(--gray-900); letter-spacing: -0.01em; }
.card-price .from { font-size: .65rem; font-weight: 400; color: var(--gray-400); margin-right: 2px; }
.card-cta-btn { display: inline-flex; align-items: center; gap: 4px; padding: 6px 14px; border-radius: var(--radius-full); font-size: .75rem; font-weight: 600; color: var(--gray-600); background: var(--gray-100); border: 1px solid var(--gray-200); transition: all .2s var(--ease); }
.product-card:hover .card-cta-btn { background: var(--gray-900); color: var(--white); border-color: var(--gray-900); }

.features-section { padding: 60px 0; background: var(--gray-50); border-top: 1px solid var(--gray-200); border-bottom: 1px solid var(--gray-200); }
.features-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
.feature-card { text-align: center; padding: 28px 20px; background: var(--white); border: 1px solid var(--gray-200); border-radius: var(--radius-lg); transition: all .3s var(--ease); }
.feature-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-lg); border-color: var(--gray-300); }
.feature-icon { width: 48px; height: 48px; border-radius: var(--radius); margin: 0 auto 16px; background: var(--gray-50); border: 1px solid var(--gray-200); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; }
.feature-card h3 { font-size: .9rem; font-weight: 700; margin-bottom: 6px; color: var(--gray-900); letter-spacing: -.01em; }
.feature-card p { font-size: .78rem; color: var(--gray-500); line-height: 1.6; }

.cta-section { padding: 60px 0 80px; }
.cta-banner { position: relative; overflow: hidden; border-radius: var(--radius-xl); padding: 56px 40px; background: var(--gray-900); text-align: center; }
.cta-banner::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 30% 0%, rgba(99,102,241,0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 100%, rgba(59,130,246,0.1) 0%, transparent 60%); pointer-events: none; }
.cta-banner h2 { font-size: clamp(1.4rem, 3vw, 1.9rem); font-weight: 700; margin-bottom: 10px; position: relative; color: var(--white); letter-spacing: -0.02em; }
.cta-banner p { color: var(--gray-400); font-size: .95rem; margin-bottom: 28px; position: relative; }
.cta-btn { display: inline-flex; align-items: center; gap: 8px; padding: 13px 32px; border-radius: var(--radius-full); background: var(--white); color: var(--gray-900); font-size: .9rem; font-weight: 700; letter-spacing: .2px; transition: all .3s var(--ease); position: relative; box-shadow: 0 2px 8px rgba(0,0,0,0.15); text-decoration: none; }
.cta-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.25); color: var(--gray-900); }

.footer { text-align: center; padding: 40px 24px 36px; border-top: 1px solid var(--gray-200); background: var(--gray-50); }
.footer-inner { max-width: var(--max-w); margin: 0 auto; }
.footer-links { margin-bottom: 14px; display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; }
.footer-links a { display: inline-flex; align-items: center; gap: 5px; padding: 7px 16px; border-radius: var(--radius-full); background: var(--white); border: 1px solid var(--gray-200); color: var(--gray-600); font-size: .8rem; font-weight: 500; transition: all .2s; text-decoration: none; }
.footer-links a:hover { border-color: var(--gray-400); color: var(--gray-900); transform: translateY(-1px); }
.footer p { color: var(--gray-400); font-size: .75rem; line-height: 1.8; }
.footer a { color: var(--gray-500); text-decoration: none; transition: color .2s; }
.footer a:hover { color: var(--gray-800); }

.reveal { opacity: 0; transform: translateY(20px); transition: all .5s var(--ease); }
.reveal.visible { opacity: 1; transform: translateY(0); }

@media (max-width: 768px) {
  .hero { padding: 50px 16px 40px; } .hero h1 { font-size: 1.9rem; }
  .hero-desc { font-size: .95rem; margin-bottom: 32px; }
  .hero-stats { gap: 20px; } .hero-stat-num { font-size: 1.5rem; }
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
  .card-img-wrap { height: 140px; } .card-body { padding: 12px 14px 14px; }
  .card-title { font-size: .8rem; min-height: auto; } .card-price { font-size: 1rem; }
  .features-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } .feature-card { padding: 20px 16px; }
  .cta-banner { padding: 40px 24px; }
  .filter-bar { gap: 4px; } .filter-btn { padding: 7px 14px; font-size: .75rem; }
  .header-badge { display: none; } .trust-inner { gap: 20px; } .trust-item { font-size: .75rem; }
  .container { padding: 0 16px; } .header-inner { padding: 0 16px; }
}
@media (max-width: 480px) {
  .products-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .card-img-wrap { height: 120px; } .card-body { padding: 10px; }
  .card-tag { font-size: .6rem; padding: 3px 8px; top: 8px; left: 8px; }
  .card-cta-btn { padding: 4px 10px; font-size: .68rem; }
  .hero-stat-num { font-size: 1.3rem; } .hero-stat-label { font-size: .68rem; }
}
`;

const JS = `
function filterCategory(id, el) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');
  document.querySelectorAll('.product-card').forEach((c, i) => {
    if (id === 'all' || c.dataset.cat == id) {
      c.style.display = '';
      c.style.opacity = '0'; c.style.transform = 'translateY(16px)';
      setTimeout(() => { c.style.transition = 'all .35s cubic-bezier(0.16,1,0.3,1)'; c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }, i * 35);
    } else { c.style.display = 'none'; }
  });
}
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => { if (entry.isIntersecting) { setTimeout(() => entry.target.classList.add('visible'), 50); observer.unobserve(entry.target); } });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
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
    const GITHUB_PAGES_URL = SEO.canonical || process.env.GITHUB_PAGES_URL || '';

    if (!fs.existsSync(DIST_DIR)) fs.mkdirSync(DIST_DIR, { recursive: true });

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
                        <div class="card-price"><span class="from">起</span>¥${minPrice.toFixed(2)}</div>
                        <div class="card-cta-btn">查看详情 →</div>
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
    <meta property="og:title" content="${esc(siteName)} - 高品质数字账号一站式采购">
    <meta property="og:description" content="${esc(SEO_DESC)}">
    ${ogImage ? `<meta property="og:image" content="${esc(ogImage)}">` : ''}
    <meta property="og:locale" content="${esc(SEO_OG.locale || 'zh_CN')}">
    <meta property="og:site_name" content="${esc(SEO_OG.siteName || siteName)}">
    <meta name="twitter:card" content="${esc(SEO_TWITTER.card || 'summary_large_image')}">
    <meta name="twitter:title" content="${esc(siteName)} - 高品质数字账号一站式采购">
    <meta name="twitter:description" content="${esc(SEO_DESC)}">
    ${ogImage ? `<meta name="twitter:image" content="${esc(ogImage)}">` : ''}
    <script type="application/ld+json">${JSON.stringify({...SEO_JSON_LD, ...jsonLd})}</script>
    <script type="application/ld+json">${JSON.stringify(itemListLd)}</script>
    ${SEO_FAVICON ? `<link rel="icon" href="${esc(SEO_FAVICON)}">` : ''}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>${CSS}</style>
</head>
<body>

<header class="header">
    <div class="header-inner">
        <div class="logo-area">
            <div class="logo-mark">
                <img src="${esc(fixImg(meta.siteLogo || '', siteUrl))}" alt="${esc(siteName)}">
            </div>
            <div>
                <div class="logo-text">${esc(siteName)}</div>
                <div class="logo-sub">新商城网址：<a href="https://hltx.eu.cc" target="_blank" rel="noopener">https://hltx.eu.cc</a></div>
            </div>
        </div>
        <div class="header-actions">
            <div class="header-badge"><div class="pulse-dot"></div>自动发货中</div>
            <a href="${siteUrl}" target="_blank" rel="noopener" class="header-cta">进入商城 →</a>
        </div>
    </div>
</header>

<section class="hero">
    <div class="hero-inner">
        <div class="hero-badge">🚀 全场自动发货 · 质保无忧</div>
        <h1>高品质<span class="highlight">数字账号</span><br>一站式采购平台</h1>
        <p class="hero-desc">Gmail邮箱、Google Voice靓号、各国Apple ID——源头直供，自动发货，数万用户信赖之选</p>
        <div class="hero-stats">
            <div class="hero-stat"><div class="hero-stat-num">${categories.length}</div><div class="hero-stat-label">账号分类</div></div>
            <div class="hero-stat"><div class="hero-stat-num">${products.filter(p=>p.active!==0).length}+</div><div class="hero-stat-label">精选商品</div></div>
            <div class="hero-stat"><div class="hero-stat-num">${products.reduce((s,p) => s + (p.variants?.length||0), 0)}</div><div class="hero-stat-label">可选规格</div></div>
            <div class="hero-stat"><div class="hero-stat-num">24h</div><div class="hero-stat-label">自动发货</div></div>
        </div>
    </div>
</section>

<div class="trust-bar">
    <div class="trust-inner">
        <div class="trust-item"><span class="trust-icon">⚡</span> 付款即发，秒级到账</div>
        <div class="trust-item"><span class="trust-icon">🛡️</span> 质保期内免费更换</div>
        <div class="trust-item"><span class="trust-icon">💎</span> 一手源头，拒绝差价</div>
        <div class="trust-item"><span class="trust-icon">🎯</span> 支持自选靓号</div>
    </div>
</div>

<div class="container filter-section">
    <div class="section-header">
        <h2>精选商品</h2>
        <p>所有商品均为虚拟数字商品，付款后自动发货</p>
    </div>
    <div class="filter-bar">
        <div class="filter-btn active" onclick="filterCategory('all', this)">全部</div>
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
        <div class="section-header">
            <h2>为什么选择我们</h2>
            <p>专注数字账号服务，让采购更简单</p>
        </div>
        <div class="features-grid">
            <div class="feature-card reveal"><div class="feature-icon">⚡</div><h3>即时发货</h3><p>付款后系统自动发货，无需等待人工处理，24小时全天候服务</p></div>
            <div class="feature-card reveal"><div class="feature-icon">🛡️</div><h3>品质保障</h3><p>质保期内首登异常免费更换，售后无忧</p></div>
            <div class="feature-card reveal"><div class="feature-icon">💎</div><h3>源头价格</h3><p>一手资源直供，无中间商差价，性价比之选</p></div>
            <div class="feature-card reveal"><div class="feature-icon">🎯</div><h3>可选靓号</h3><p>支持自选号码，按需匹配，找到你心仪的那个号</p></div>
        </div>
    </div>
</section>

<section class="cta-section">
    <div class="container">
        <div class="cta-banner reveal">
            <h2>准备好挑选你的账号了吗？</h2>
            <p>全场自动发货，安全可靠，质保无忧</p>
            <a href="${siteUrl}" target="_blank" rel="noopener" class="cta-btn">前往商城选购 →</a>
        </div>
    </div>
</section>

<footer class="footer">
    <div class="footer-inner">
        <div class="footer-links"><a href="${siteUrl}" target="_blank" rel="noopener">🏪 进入商城</a></div>
        <p style="margin-bottom:4px">© ${new Date().getFullYear()} ${esc(siteName)} · 所有商品均为虚拟数字商品</p>
        <p>商城地址：<a href="${siteUrl}" target="_blank" rel="noopener">${esc(siteUrl)}</a></p>
    </div>
</footer>

<script>${JS}</script>
</body>
</html>`;

    fs.writeFileSync(path.join(DIST_DIR, 'index.html'), html);
    console.log(`✅ dist/index.html (${(Buffer.byteLength(html)/1024).toFixed(1)}KB)`);
    console.log(`   商品: ${products.filter(p=>p.active!==0).length} 个`);
    console.log(`   分类: ${activeCats.length} 个`);
    console.log(`   风格: 极简现代 · 白底 · Inter字体`);
    console.log(`   链接: 全部指向 ${siteUrl}/product?id=xxx`);
}

main();
