#!/bin/bash
RESOLVE="--resolve folydocs.whipple.mx:443:159.223.139.181"
AUTH="Authorization: Token XE2dmFvZIRaP9f3xmpmFcLMtffOAEFd3:U6xivewGIpgRQVEi7HMnodXFINqYToku"

# 1. Crear Libro de Clientes
echo "Creando Libro Clientes en BookStack..."
RESP_BOOK=$(curl -s $RESOLVE -X POST \
  -H "$AUTH" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Clientes",
    "description": "Manual de usuario para el directorio de clientes, estados de cuenta, historial crediticio, límites de crédito y seguimiento comercial en ERP Foly."
  }' \
  https://folydocs.whipple.mx/api/books)

BOOK_ID=$(echo "$RESP_BOOK" | grep -o '"id":[0-9]*' | head -n 1 | cut -d':' -f2)
echo "✓ Libro Clientes Creado! ID: $BOOK_ID"

# 2. Crear Página de Clientes
echo "Creando Página Directorio y Gestión de Clientes..."
RESP_PAGE=$(curl -s $RESOLVE -X POST \
  -H "$AUTH" \
  -H "Content-Type: application/json" \
  -d "{
    \"book_id\": $BOOK_ID,
    \"name\": \"Directorio y Gestión de Clientes\",
    \"markdown\": \"# Directorio y Gestión de Clientes\n\nEn construcción...\"
  }" \
  https://folydocs.whipple.mx/api/pages)

PAGE_ID=$(echo "$RESP_PAGE" | grep -o '"id":[0-9]*' | head -n 1 | cut -d':' -f2)
echo "✓ Página Creada! ID: $PAGE_ID"
echo "BOOK_ID=$BOOK_ID" > scripts/clientes-ids.env
echo "PAGE_ID=$PAGE_ID" >> scripts/clientes-ids.env

# 3. Subir Imágenes de Clientes
DIR="manual-screenshots/clientes"
echo "{" > "$DIR/urls.json"

FILES=(
  "01-listado-clientes.png"
  "02-tab-activos.png"
  "03-tab-inactivos.png"
  "04-tab-bloqueados.png"
  "05-busqueda-filtrada-cliente.png"
  "06-detalle-cliente.png"
)

TOTAL=${#FILES[@]}
COUNT=0

for FILE in "${FILES[@]}"; do
  COUNT=$((COUNT + 1))
  FULL_PATH="$DIR/$FILE"
  if [ -f "$FULL_PATH" ]; then
    echo "Subiendo $FILE ($COUNT de $TOTAL)..."
    RESP=$(curl -s $RESOLVE -H "$AUTH" -F "image=@$FULL_PATH" -F "name=$FILE" -F "type=gallery" -F "uploaded_to=$PAGE_ID" https://folydocs.whipple.mx/api/image-gallery)
    URL=$(echo "$RESP" | grep -o '"url":"[^"]*"' | head -n 1 | cut -d'"' -f4 | sed 's/\\//g')
    echo "✓ $FILE -> $URL"
    if [ $COUNT -eq $TOTAL ]; then
      echo "  \"$FILE\": \"$URL\"" >> "$DIR/urls.json"
    else
      echo "  \"$FILE\": \"$URL\"," >> "$DIR/urls.json"
    fi
  fi
done

echo "}" >> "$DIR/urls.json"
echo "urls.json de clientes generado exitosamente!"
