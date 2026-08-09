# Módulo: Pedidos

## Información General

| Campo | Valor |
|-------|-------|
| **Módulo** | Pedidos |
| **URL** | `/pedidos` |
| **Estado** | ✅ Documentado y Automatizado |
| **Fecha** | 2026-08-07 |

## Descripción

El módulo **Pedidos** permite visualizar, filtrar y crear pedidos de compra a proveedores. La interfaz muestra una lista de cards con la información de cada pedido, organizados por estados.

## Elementos de la UI

### Header

- **Título**: "Pedidos"
- **Botón "Nuevo pedido"**: Azul, ubicado arriba a la derecha. Abre formulario de creación.

### Tabs de Filtro (Estados)

| Tab | Descripción |
|-----|-------------|
| **Todos** | Muestra todos los pedidos |
| **Solicitado** | Pedidos en estado "Solicitado" |
| **En curso** | Pedidos en proceso |
| **Recibidos** | Pedidos completados (badge verde) |

### Lista de Pedidos (Cards)

Cada card contiene:
- **Nombre del pedido**: Ej. "Mirage - Norage"
- **Fecha**: Ej. "5 de agosto de 2026"
- **Proveedor/Destino**: Ej. "Foly Muebles Bodega Tampico"
- **Cantidad de artículos**: Ej. "2 artículos"
- **Estado**: Badge de color (naranja = pendiente, verde = recibido)
- **Barra de progreso**: Indica avance del pedido

### Panel Lateral Derecho

- **Sugerencias**: Productos próximos a agotarse con alta demanda
- Muestra inventario actual, último año, último mes, mes actual

## Flujo Principal: Crear Nuevo Pedido

### Paso 1: Navegar a /pedidos

- URL directa: `https://erpfoly.vercel.app/pedidos`
- O clic en "Pedidos" en el menú lateral

### Paso 2: Verificar carga

- Título "Pedidos" visible
- Lista de cards visible (o mensaje "No hay pedidos")

### Paso 3: Clic en "Nuevo pedido"

- Botón azul superior derecho
- Se abre formulario o modal de creación

### Paso 4: Llenar formulario

*(Pendiente de documentación detallada)*

### Paso 5: Guardar y verificar

- El pedido aparece en la lista con estado "Solicitado"

## Flujo Secundario: Filtrar por Estado

### Paso 1: Navegar a /pedidos

### Paso 2: Clic en tab deseado

- Ejemplo: "Recibidos"

### Paso 3: Verificar contenido filtrado

- Solo se muestran pedidos con estado seleccionado
- Badge de estado verde para "Recibidos"

## Flujo Secundario: Ver Detalle de Pedido

### Paso 1: Navegar a /pedidos

### Paso 2: Clic en una card de pedido

- Se abre detalle del pedido
- URL: `/solicitudes-credito` (basado en pruebas automatizadas)

### Paso 3: Verificar detalles

- Información completa del pedido
- Lista de artículos
- Historial de estados

## Datos de Prueba

| Pedido | Fecha | Destino | Artículos | Estado |
|--------|-------|---------|-----------|--------|
| Mirage - Norage | 5 ago 2026 | Foly Muebles Bodega Tampico | 2 | Solicitado |
| Proveedor prueba | 3 ago 2026 | Foly Muebles Bodega Tampico | 1 | Recibido |
| Cocinas Integrales Berlin | 5 jul 2026 | Foly Muebles Veracruz Puerto | 2 | Solicitado |

## Pruebas Automatizadas

| # | Test | Descripción |
|---|------|-------------|
| 1 | Carga del módulo | Verifica título, botón Nuevo pedido, lista visible |
| 2 | Filtrar Recibidos | Clic en tab Recibidos, verifica contenido |
| 3 | Filtrar Solicitado | Clic en tab Solicitado, verifica contenido |
| 4 | Ver detalle | Clic en primer pedido, navega a detalle |
| 5 | Abrir Nuevo pedido | Clic en botón, abre formulario |

**Estado:** ✅ 5/5 tests pasando en Chromium

## Notas para Automatización

- **No es tabla HTML tradicional**: Usa cards/lista de MUI
- **Badge de estado**: Naranja = pendiente, Verde = recibido
- **Barra de progreso**: Indica avance del pedido
- **Tabs**: Cambian contenido sin recargar página
