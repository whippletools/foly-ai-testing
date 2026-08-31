const fs = require('fs');
const path = require('path');

const API_URL = 'https://folydocs.whipple.mx/api/pages/18';
const AUTH_HEADER = 'Token XE2dmFvZIRaP9f3xmpmFcLMtffOAEFd3:U6xivewGIpgRQVEi7HMnodXFINqYToku';
const MD_PATH = path.resolve(__dirname, '../docs/flujo-catalogos-usuarios.md');

async function main() {
  const markdown = fs.readFileSync(MD_PATH, 'utf-8');

  console.log('Actualizando página 18 en BookStack...');
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: {
      'Authorization': AUTH_HEADER,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'Usuarios',
      markdown: markdown
    })
  });

  const json = await res.json();
  if (json.id) {
    console.log(`✓ Página "${json.name}" (ID: ${json.id}) actualizada con éxito en BookStack!`);
    console.log(`URL: https://folydocs.whipple.mx/books/catalogos/page/${json.slug}`);
  } else {
    console.error('Error al actualizar BookStack:', JSON.stringify(json));
  }
}

main().catch(console.error);
