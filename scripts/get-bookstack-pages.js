const API_URL = 'https://folydocs.whipple.mx/api/pages?count=50';
const AUTH_HEADER = 'Token XE2dmFvZIRaP9f3xmpmFcLMtffOAEFd3:U6xivewGIpgRQVEi7HMnodXFINqYToku';

async function main() {
  const res = await fetch(API_URL, {
    headers: {
      'Authorization': AUTH_HEADER
    }
  });
  const data = await res.json();
  console.log('Total páginas:', data.total);
  console.log('Páginas:', JSON.stringify(data.data.map(p => ({ id: p.id, name: p.name, slug: p.slug, book_id: p.book_id })), null, 2));
}

main().catch(console.error);
