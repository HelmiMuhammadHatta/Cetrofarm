import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = path.resolve('.output/public');

if (!fs.existsSync(PUBLIC_DIR)) {
  console.error('❌ Error: Folder .output/public tidak ditemukan. Jalankan `npm run build` terlebih dahulu.');
  process.exit(1);
}

let errors = 0;

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}

console.log('🔍 Memulai verifikasi build di .output/public ...\n');

// 1. Cek Sitemap.xml
const sitemapPath = path.join(PUBLIC_DIR, 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
  if (sitemapContent.includes('vercel.app')) {
    console.error('❌ FAIL: sitemap.xml masih mengandung domain vercel.app!');
    errors++;
  } else {
    console.log('✅ PASS: sitemap.xml bebas dari domain vercel.app.');
  }
} else {
  console.error('❌ FAIL: sitemap.xml tidak ditemukan!');
  errors++;
}

// 2. Scan file HTML untuk link internal & metadata
const allFiles = getAllFiles(PUBLIC_DIR);
const htmlFiles = allFiles.filter(f => f.endsWith('.html'));

console.log(`📄 Memeriksa ${htmlFiles.length} file HTML ...`);

const internalLinkRegex = /href="(\/[^"#]*)"/g;
const vercelAppRegex = /https?:\/\/[a-zA-Z0-9-]+\.vercel\.app/g;

const checkedLinks = new Set();

htmlFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  const relativeFile = path.relative(PUBLIC_DIR, file);

  // Cek jika ada domain vercel.app di tag canonical / og:image
  if (content.match(vercelAppRegex)) {
    console.error(`❌ FAIL [${relativeFile}]: Mengandung URL hardcoded vercel.app!`);
    errors++;
  }

  // Cek tautan internal
  let match;
  while ((match = internalLinkRegex.exec(content)) !== null) {
    const link = match[1];
    if (checkedLinks.has(link) || link.startsWith('/assets') || link.startsWith('/docs') || link.startsWith('/mascot') || link.endsWith('.svg') || link.endsWith('.png') || link.endsWith('.jpg') || link.endsWith('.webp') || link.endsWith('.php')) {
      continue;
    }
    checkedLinks.add(link);

    // Verifikasi apakah file/folder rute ada
    const targetHtmlIndex = path.join(PUBLIC_DIR, link, 'index.html');
    const targetHtmlDirect = path.join(PUBLIC_DIR, `${link}.html`);

    if (!fs.existsSync(targetHtmlIndex) && !fs.existsSync(targetHtmlDirect)) {
      console.error(`❌ FAIL: Link internal "${link}" (ditemukan di ${relativeFile}) mengarah ke rute yang tidak prerender!`);
      errors++;
    }
  }
});

console.log('\n=============================================');
if (errors === 0) {
  console.log('🎉 VERIFIKASI BUILD SUKSES! Seluruh rute dan metadata valid.');
  process.exit(0);
} else {
  console.error(`💥 VERIFIKASI BUILD GAGAL! Ditemukan ${errors} kesalahan.`);
  process.exit(1);
}
