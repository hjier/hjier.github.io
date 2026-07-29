#!/usr/bin/env node
/**
 * 用法: SITE_URL=https://xxx.com node fetch-data.js
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = process.env.SITE_URL || '';
const DATA_DIR = path.join(__dirname, 'data');

if (!SITE_URL) {
    console.error('❌ 请设置环境变量 SITE_URL，例如: SITE_URL=https://xxx.com');
    process.exit(1);
}

const baseUrl = SITE_URL.replace(/\/+$/, '');

async function fetchJSON(endpoint) {
    const url = `${baseUrl}${endpoint}`;
    console.log(`📡 请求: ${url}`);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`请求失败: ${url} -> ${res.status} ${res.statusText}`);
    return res.json();
}

async function main() {
    console.log(`\n🚀 开始从 ${baseUrl} 抓取数据...\n`);

    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

    // 1. 站点配置
    console.log('📋 抓取站点配置...');
    const config = await fetchJSON('/api/shop/config');
    fs.writeFileSync(path.join(DATA_DIR, 'config.json'), JSON.stringify(config, null, 2));
    console.log(`   ✅ 站点名称: ${config.site_name || 'N/A'}`);

    // 2. 商品分类
    console.log('📂 抓取商品分类...');
    const categories = await fetchJSON('/api/shop/categories');
    fs.writeFileSync(path.join(DATA_DIR, 'categories.json'), JSON.stringify(categories, null, 2));
    console.log(`   ✅ 共 ${categories.length} 个分类`);

    // 3. 商品列表（含规格）
    console.log('🛍️  抓取商品列表...');
    const products = await fetchJSON('/api/shop/products');
    fs.writeFileSync(path.join(DATA_DIR, 'products.json'), JSON.stringify(products, null, 2));
    console.log(`   ✅ 共 ${products.length} 个商品`);

    // 4. 生成元数据
    const meta = {
        fetchedAt: new Date().toISOString(),
        siteUrl: baseUrl,
        siteName: config.site_name || '商品商城',
        siteLogo: config.site_logo || '',
        siteDescription: config.site_description || '',
        categoryCount: categories.length,
        productCount: products.length,
    };
    fs.writeFileSync(path.join(DATA_DIR, 'meta.json'), JSON.stringify(meta, null, 2));

    // 5. 统计摘要
    console.log('\n📊 抓取完成摘要:');
    console.log(`   站点: ${meta.siteName}`);
    console.log(`   分类: ${meta.categoryCount} 个`);
    console.log(`   商品: ${meta.productCount} 个`);
    products.forEach(p => {
        const variantCount = p.variants ? p.variants.length : 0;
        const minPrice = p.variants && p.variants.length > 0
            ? Math.min(...p.variants.map(v => v.price))
            : 0;
        console.log(`   - [${p.id}] ${p.name} (${variantCount}个规格, 最低¥${minPrice})`);
    });
    console.log(`\n✅ 数据已保存到 ${DATA_DIR}/\n`);
}

main().catch(err => {
    console.error('❌ 抓取失败:', err.message);
    process.exit(1);
});
