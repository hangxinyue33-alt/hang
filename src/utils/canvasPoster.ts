import { PersonalityResult } from '../types';

/**
 * 渲染真正可下载的高清分享海报 PNG 数据 URL
 */
export async function generatePosterDataUrl(result: PersonalityResult): Promise<string> {
  const canvas = document.createElement('canvas');
  const width = 750; // 2x high resolution for retina
  const height = 1334;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';

  // 1. 背景 #FFF9F2 (var(--bg))
  ctx.fillStyle = '#FFF9F2';
  ctx.fillRect(0, 0, width, height);

  // 顶部装饰彩条
  ctx.fillStyle = '#FF6321';
  ctx.fillRect(0, 0, width, 16);

  // 2. 食物IP卡片区域占位 (白色背板 + 边框)
  const cardX = 80;
  const cardY = 100;
  const cardW = width - 160;
  const cardH = 420;
  
  // 圆角矩形背景
  drawRoundedRect(ctx, cardX, cardY, cardW, cardH, 48);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#F2F2F2';
  ctx.stroke();

  // 中心的大 Emoji
  ctx.font = '180px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(result.emoji, width / 2, cardY + cardH / 2 - 10);

  // 3. 人格名称
  ctx.font = 'bold 64px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#2D2D2D';
  ctx.fillText(result.title, width / 2, 600);

  // 4. 一句话反差标签
  ctx.font = 'bold 34px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
  ctx.fillStyle = '#FF6321';
  ctx.fillText(result.tagline, width / 2, 680);

  // 5. 反差描述卡片
  const descBoxX = 70;
  const descBoxY = 740;
  const descBoxW = width - 140;
  const descBoxH = 360;
  drawRoundedRect(ctx, descBoxX, descBoxY, descBoxW, descBoxH, 32);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  // “恋爱人格” badge
  const badgeW = 160;
  const badgeH = 54;
  drawRoundedRect(ctx, descBoxX + 40, descBoxY + 36, badgeW, badgeH, 27);
  ctx.fillStyle = '#FFD54F';
  ctx.fill();
  ctx.font = 'bold 26px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#2D2D2D';
  ctx.fillText('恋爱人格', descBoxX + 40 + badgeW / 2, descBoxY + 36 + badgeH / 2 + 2);

  // 正文描述，分行渲染
  ctx.font = '28px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#444444';
  ctx.textAlign = 'left';
  const lines = result.description.split('\n');
  let currentY = descBoxY + 130;
  lines.forEach((line) => {
    if (line.trim() === '') {
      currentY += 16;
      return;
    }
    ctx.fillText(line, descBoxX + 40, currentY);
    currentY += 42;
  });

  // 6. 底部一条虚线和分享引导语
  ctx.strokeStyle = '#E0DCD8';
  ctx.lineWidth = 2;
  ctx.setLineDash([10, 10]);
  ctx.beginPath();
  ctx.moveTo(80, 1150);
  ctx.lineTo(width - 80, 1150);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.font = 'bold 30px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#FF6321';
  ctx.textAlign = 'center';
  ctx.fillText('看看你的恋爱饭搭子人格是什么？', width / 2, 1220);

  ctx.font = '24px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.fillStyle = '#999999';
  ctx.fillText('长按保存或截屏 · 《恋爱饭搭子人格测试》', width / 2, 1270);

  return canvas.toDataURL('image/png');
}

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * 下载海报图片文件
 */
export function downloadPosterImage(dataUrl: string, fileName: string = '我的恋爱饭搭子人格卡.png') {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
