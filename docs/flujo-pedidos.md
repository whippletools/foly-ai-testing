# Flujo: Pedidos - Documentación para Automatización

## Fecha: 2026-08-07
## Módulo: Pedidos
## URL: /pedidos
## Estado: Funcional (listo para automatizar)

---

## 1. Descripción General

El módulo **Pedidos** permite visualizar, filtrar y crear pedidos de compra a proveedores. La interfaz muestra una lista de cards con la información de cada pedido.

## 2. Elementos de la UI Identificados

### 2.1 Header
- **Título**: "Pedidos" (h1)
- **Botón "Nuevo pedido"**: Azul, arriba a la derecha. Abre formulario de creación.
- **Botón "Nueva solicitud"**: Presente en sidebar (global, no específico de pedidos)

### 2.2 Tabs de Filtro (Estados)
- **Todos**: Muestra todos los pedidos
- **Solicitado**: Pedidos en estado "Solicitado"
- **En curso**: Pedidos en proceso
- **Recibidos**: Pedidos completados (badge verde)

### 2.3 Lista de Pedidos (Cards)
Cada card contiene:
- **Nombre del pedido**: Ej. "Mirage - Norage", "Proveedor prueba"
- **Fecha**: Ej. "5 de agosto de 2026"
- **Proveedor/Destino**: Ej. "Foly Muebles Bodega Tampico"
- **Cantidad de artículos**: Ej. "2 artículos"
- **Estado**: Badge de color (naranja = pendiente, verde = recibido)
- **Barra de progreso**: Verde (indica avance del pedido)

### 2.4 Panel Lateral Derecho
- **Sugerencias**: Productos próximos a agotarse con alta demanda
- Muestra inventario actual, último año, último mes, mes actual

## 3. Flujo Principal: Crear Nuevo Pedido

### Paso 1: Navegar a /pedidos
- URL directa: https://erpfoly.vercel.app/pedidos
- O clic en "Pedidos" en el menú lateral

### Paso 2: Verificar que la página cargó
- Título "Pedidos" visible
- Lista de cards visible (o mensaje "No hay pedidos")

### Paso 3: Clic en "Nuevo pedido"
- Botón azul superior derecho
- Se espera que abra un formulario o modal

### Paso 4: Llenar formulario (pendiente de explorar)
- Se requiere diagnóstico adicional del formulario

### Paso 5: Guardar y verificar
- El pedido aparece en la lista con estado "Solicitado"

## 4. Flujo Secundario: Filtrar por Estado

### Paso 1: Navegar a /pedidos

### Paso 2: Clic en tab "Recibidos"
- Solo muestra pedidos con badge verde

### Paso 3: Verificar que el contenido cambió
- Los pedidos mostrados tienen estado "Recibido"

## 5. Flujo Secundario: Ver Detalle de Pedido

### Paso 1: Navegar a /pedidos

### Paso 2: Clic en una card de pedido
- Se espera navegación a /pedidos/[id] o apertura de modal

### Paso 3: Verificar detalles
- Información completa del pedido
- Lista de artículos
- Historial de estados

## 6. Datos de Prueba

### Pedidos existentes (para verificación):
- **Mirage - Norage** | 5 ago 2026 | Foly Muebles Bodega Tampico | 2 artículos | Solicitado
- **Proveedor prueba** | 3 ago 2026 | Foly Muebles Bodega Tampico | 1 artículo | Recibido
- **Cocinas Integrales Berlin** | 5 jul 2026 | Foly Muebles Veracruz Puerto | 2 artículos | Solicitado

## 7. Notas para Automatización

- **No es una tabla HTML tradicional**: Usa cards/lista de MUI
- **Badge de estado**: Naranja = pendiente, Verde = recibido
- **Barra de progreso**: Indica avance del pedido
- **Tabs**: Pueden cambiar el contenido sin recargar la página
- **Sugerencias**: Panel lateral con datos de inventario (no crítico para el flujo principal)

## 8. Próximos Pasos

1. Explorar el formulario de "Nuevo pedido"
2. Verificar navegación al detalle de un pedido
3. Automatizar flujo completo de creación
4. Automatizar filtrado por estado
