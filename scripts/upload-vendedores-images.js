const fs = require('fs');
const path = require('path');

const API_URL = 'https://folydocs.whipple.mx/api/image-gallery';
const AUTH_HEADER = 'Token XE2dmFvZIRaP9f3xmpmFcLMtffOAEFd3:U6xivewGIpgRQVEi7HMnodXFINqYToku';
const DIR = path.resolve(__dirname, '../manual-screenshots/vendedores');

async function uploadImage(filePath, fileName) {
  const blob = new Blob([fs.readFileSync(filePath)], { type: 'image/png' });
  const form = new FormData();
  form.append('image', blob, fileName);
  form.append('name', fileName);
  form.append('type', 'gallery');
  form.append('uploaded_to', '19'); // ID de la página de Vendedores

  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Authorization': AUTH_HEADER
    },
    body: form
  });

  const json = await res.json();
  if (json.url) {
    return json.url;
  }
  throw new Error('No URL in response: ' + JSON.stringify(json));
}

async function main() {
  const files = fs.readdirSync(DIR).filter(f => f.endsWith('.png'));
  const urls = {};

  for (const file of files) {
    console.log(`Subiendo ${file}...`);
    try {
      const url = await uploadImage(path.join(DIR, file), file);
      console.log(`✓ ${file} -> ${url}`);
      urls[file] = url;
    } catch (err) {
      console.error(`✗ Error al subir ${file}:`, err.message);
    }
  }

  fs.writeFileSync(path.join(DIR, 'urls.json'), JSON.stringify(urls, null, 2));
  console.log('urls.json generado exitosamente!');
}

main().catch(console.error);
