import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs/promises';
// Ferramenta de QA temporária; não é dependência do site.
const require = createRequire(path.join(os.tmpdir(), 'lume-site-qa', 'package.json'));
const { chromium } = require('playwright');
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const errors = [];
const results = [];
const page = await browser.newPage();
page.on('pageerror', error => errors.push(error.message));
const out = new URL('./qa/', import.meta.url);
await fs.mkdir(out, { recursive: true });
function luminance(hex) {
  const rgb=hex.replace('#','').match(/../g).map(n => parseInt(n,16)/255).map(n => n<=.04045?n/12.92:((n+.055)/1.055)**2.4);
  return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
}
function contrast(a,b) { const x=luminance(a),y=luminance(b); return (Math.max(x,y)+.05)/(Math.min(x,y)+.05); }
try {
  await page.goto('http://127.0.0.1:4173');
  const links = await page.locator('[data-contact]').evaluateAll(items => items.map(a => ({ href:a.href, target:a.target, rel:a.rel })));
  for (const link of links) {
    const url = new URL(link.href);
    assert.equal(url.hostname, 'wa.me');
    assert.equal(url.pathname, '/5575991117750');
    assert.ok(url.searchParams.get('text'));
    assert.equal(link.target, '_blank');
    assert.ok(link.rel.includes('noopener'));
  }
  assert.equal(await page.locator('#servicos h3').allTextContents().then(t => t.join('|')), 'Endereço fiscal e comercial|Gestão de correspondência');
  assert.equal(await page.locator('#espacos h3').allTextContents().then(t => t.includes('Salas privativas')), true);
  assert.equal(await page.locator('.hero-photo').textContent().then(t => t.includes('01 / 10')), false);
  const colors = await page.locator(':root').evaluate(el => Object.fromEntries(['accent','accent-hover','pink','bg','paper','ink','muted','wash','on-dark','muted-on-dark','accent-on-dark'].map(key => [key,getComputedStyle(el).getPropertyValue('--'+key).trim()])));
  const contrasts=[];
  for (const [a,b] of [['paper','accent'],['paper','accent-hover'],['accent','bg'],['accent','pink'],['muted','bg'],['muted','paper'],['muted','pink'],['muted','wash'],['ink','bg'],['muted-on-dark','ink'],['on-dark','ink'],['accent-on-dark','ink']]) {
    const ratio=contrast(colors[a],colors[b]);
    assert.ok(ratio>=4.5, `${a}/${b}: ${ratio.toFixed(2)}`);
    contrasts.push({pair:`${a}/${b}`,ratio:Number(ratio.toFixed(2))});
  }
  // Confirmar o clique e a mensagem em uma nova aba, sem acessar o WhatsApp real.
  await page.context().route('https://wa.me/**', route => route.fulfill({status:200,body:'Consulta de teste interceptada localmente.'}));
  const popupPromise=page.waitForEvent('popup');
  await page.locator('.nav-cta').click();
  const popup=await popupPromise;
  await popup.waitForLoadState();
  assert.equal(new URL(popup.url()).pathname,'/5575991117750');
  assert.ok(new URL(popup.url()).searchParams.get('text').includes('horários estão disponíveis'));
  await popup.close();
  for (const width of [360,390,768,1024,1440]) {
    await page.setViewportSize({ width, height:900 });
    await page.goto('http://127.0.0.1:4173');
    await page.evaluate(async () => {
      document.querySelectorAll('img[loading="lazy"]').forEach(img => { img.loading = 'eager'; });
      await Promise.all(Array.from(document.images).map(img => img.decode().catch(() => {})));
      document.querySelectorAll('.pending-reveal').forEach(el => el.classList.remove('pending-reveal'));
    });
    const layout = await page.evaluate(() => {
      const box = selector => { const r=document.querySelector(selector).getBoundingClientRect(); return {x:r.x,y:r.y,width:r.width,height:r.height}; };
      const smallTargets = Array.from(document.querySelectorAll('a,button')).filter(el => el.getClientRects().length && !el.classList.contains('skip')).filter(el => { const r=el.getBoundingClientRect(); return r.width < 43.9 || r.height < 43.9; }).map(el => el.textContent.trim());
      return { viewport:innerWidth, scroll:document.documentElement.scrollWidth, text:box('.hero-copy'), photo:box('.hero-photo'), smallTargets };
    });
    assert.ok(layout.scroll <= width, `Rolagem horizontal em ${width}: ${layout.scroll}`);
    assert.deepEqual(layout.smallTargets, [], `Alvos menores que 44px em ${width}`);
    if (width >= 1024) assert.ok(layout.photo.x > layout.text.x + layout.text.width);
    if (width <= 390) assert.ok(layout.photo.y >= layout.text.y + layout.text.height);
    await page.screenshot({ path:path.join(out.pathname.replace(/^\/(\w:)/, '$1'), `hero-${width}.png`) });
    await page.screenshot({ path:path.join(out.pathname.replace(/^\/(\w:)/, '$1'), `page-${width}.png`), fullPage:true });
    if (width <= 768) {
      await page.locator('.menu-toggle').click();
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'true');
      await page.locator('#menu a[href="#servicos"]').click();
      assert.equal(await page.locator('.menu-toggle').getAttribute('aria-expanded'), 'false');
      assert.equal(await page.evaluate(() => document.activeElement.id), 'servicos');
    }
    await page.locator('[data-gallery]').first().click();
    assert.ok(await page.locator('#lightbox-image').evaluate(async img => { await img.decode(); return img.naturalWidth>0; }));
    assert.equal(await page.locator('#lightbox-count').textContent(), '01 / 06');
    await page.locator('#lightbox-next').click();
    assert.equal(await page.locator('#lightbox-count').textContent(), '02 / 06');
    await page.keyboard.press('ArrowLeft');
    assert.equal(await page.locator('#lightbox-count').textContent(), '01 / 06');
    await page.keyboard.press('ArrowLeft');
    assert.equal(await page.locator('#lightbox-count').textContent(), '06 / 06');
    await page.locator('#lightbox-prev').click();
    assert.equal(await page.locator('#lightbox-count').textContent(), '05 / 06');
    await page.keyboard.press('Escape');
    assert.equal(await page.locator('#lightbox').evaluate(el => el.open), false);
    assert.equal(await page.evaluate(() => document.activeElement.dataset.gallery), '0');
    results.push({width, horizontalOverflow:false, touchTargets:true, gallery:true, menu:width<=768});
  }
  await page.emulateMedia({ reducedMotion:'reduce' });
  assert.equal(await page.locator('html').evaluate(el => getComputedStyle(el).scrollBehavior), 'auto');
  assert.equal(await page.locator('.button').first().evaluate(el => getComputedStyle(el).transitionDuration), '0s');
  await page.goto('http://127.0.0.1:4173');
  await page.keyboard.press('Tab');
  assert.equal(await page.evaluate(() => document.activeElement.className), 'skip');
  assert.equal(await page.locator('.skip').evaluate(el => getComputedStyle(el).outlineStyle), 'solid');
  const broken = await page.evaluate(async () => {
    const references = new Set(Array.from(document.querySelectorAll('[src],link[href]')).map(el => el.getAttribute('src')||el.getAttribute('href')).filter(url => !url.startsWith('http')));
    return (await Promise.all(Array.from(references).map(async url => ({url,status:(await fetch(url)).status})))).filter(item => item.status!==200);
  });
  assert.deepEqual(broken,[]);
  assert.deepEqual(errors, []);
  const report={contactLinks:links.length,contactClickIntercepted:true,results,contrasts,reducedMotion:true,keyboardFocus:true,broken,errors};
  await fs.writeFile(new URL('results.json',out),JSON.stringify(report,null,2)+'\n');
  console.log(JSON.stringify(report,null,2));
} finally { await browser.close(); }
