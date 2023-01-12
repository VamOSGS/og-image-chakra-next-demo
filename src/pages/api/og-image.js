import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as playwright from 'playwright-aws-lambda';
import OgImage from '../../components/og-image';

const baseCSS = `*{box-sizing:border-box}body{margin:0;font-family:system-ui,sans-serif}`;

const getHtmlData = ({ body, baseCSS }) => {
  const html = `<!DOCTYPE html>
    <head>
    <meta charset="utf-8"><style>${baseCSS}</style>
    </head>
    <body style="display:inline-block">
    ${body}`;
  return html;
};

const handler = async (req, res) => {
  const {
    query: { title, slug, rt, progress, bg },
  } = req;

  const el = createElement(OgImage, {
    title,
    slug,
    rt,
    bg,
    progress: Number(progress),
  });
  const body = renderToStaticMarkup(el);

  const html = getHtmlData({
    body,
    baseCSS,
  });

  const width = 1200;
  const height = 630;

  const browser = await playwright.launchChromium({ headless: true });
  const page = await browser.newPage({
    viewport: {
      width,
      height,
    },
  });
  await page.setContent(html);

  const data = await page.screenshot({
    type: 'jpeg',
    clip: {
      x: 0,
      y: 0,
      width,
      height,
    },
    omitBackground: true,
  });

  await browser.close();

  res.setHeader('Cache-Control', 's-manage=31536000, stale-while-revalidate');
  res.setHeader('Content-Type', 'image/jpeg');

  res.end(data);
};

export default handler;
