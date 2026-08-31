#!/bin/bash
RESOLVE="--resolve folydocs.whipple.mx:443:159.223.139.181"
AUTH="Authorization: Token XE2dmFvZIRaP9f3xmpmFcLMtffOAEFd3:U6xivewGIpgRQVEi7HMnodXFINqYToku"
PAGE_ID=27
MD_FILE="docs/flujo-clientes.md"

echo "Leyendo $MD_FILE..."
MARKDOWN=$(cat "$MD_FILE")

PAYLOAD=$(jq -n \
  --arg name "Directorio y Gestión de Clientes" \
  --arg md "$MARKDOWN" \
  '{name: $name, markdown: $md}')

echo "Actualizando página $PAGE_ID en BookStack..."
RESP=$(curl -s $RESOLVE -X PUT \
  -H "$AUTH" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD" \
  https://folydocs.whipple.mx/api/pages/$PAGE_ID)

NAME=$(echo "$RESP" | grep -o '"name":"[^"]*"' | head -n 1 | cut -d'"' -f4)
SLUG=$(echo "$RESP" | grep -o '"slug":"[^"]*"' | head -n 1 | cut -d'"' -f4)
ID=$(echo "$RESP" | grep -o '"id":[0-9]*' | head -n 1 | cut -d':' -f2)

if [ "$ID" != "" ]; then
  echo "✓ Página \"$NAME\" (ID: $ID) actualizada con éxito!"
  echo "URL: https://folydocs.whipple.mx/books/clientes/page/$SLUG"
else
  echo "Error al actualizar BookStack: $RESP"
fi
