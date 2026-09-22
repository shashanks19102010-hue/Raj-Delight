'use client';

import { useEffect } from 'react';
import { getMenuPrice } from '@/lib/menu-prices';

function enhanceMenuPrices() {
  const root = document.getElementById('menu');
  if (!root) return;

  root.querySelectorAll<HTMLElement>('.chapter').forEach((chapter) => {
    const category = chapter.querySelector<HTMLElement>('.chapterHead strong')?.textContent?.trim();
    if (!category) return;

    chapter.querySelectorAll<HTMLElement>('.menuItem').forEach((row) => {
      const item = row.querySelector<HTMLElement>('span')?.textContent?.trim();
      if (!item) return;

      const price = getMenuPrice(category, item);
      let priceNode = row.querySelector<HTMLElement>('.menuPrice, .menuPriceMissing');

      if (!priceNode) {
        priceNode = document.createElement(price === null ? 'span' : 'strong');
        priceNode.className = price === null ? 'menuPriceMissing' : 'menuPrice';
        row.appendChild(priceNode);
      }

      priceNode.textContent = price === null ? 'Ask' : `₹${price}`;
      priceNode.setAttribute('aria-label', price === null ? `${item}: price at restaurant` : `${item}: ₹${price}`);
    });
  });

  const summary = root.querySelector<HTMLElement>('.menuSummary');
  if (summary && !root.querySelector('.priceNote')) {
    const note = document.createElement('div');
    note.className = 'priceNote';
    note.textContent = 'Prices shown as listed in the supplied Raj Delight Menu 2024 PDF · GST as applicable';
    summary.insertAdjacentElement('afterend', note);
  }
}

export function MenuPriceEnhancer() {
  useEffect(() => {
    enhanceMenuPrices();
    const root = document.getElementById('menu');
    if (!root) return;

    const observer = new MutationObserver(() => enhanceMenuPrices());
    observer.observe(root, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
