# Flujo: Catálogos - Cajas

## Fecha: 2026-08-10
## Módulo: Catálogos > Cajas
## URL: /catalogos/cajas
## Estado: Documentado

---

## 1. Descripción General

El submódulo **Cajas** permite gestionar las cajas registradas del negocio y asociarlas a una sucursal, un cajero y un límite de operación. Cada caja puede estar activa o inactiva y se utiliza para controlar las operaciones de venta, cobros y arqueos por punto de atención.

---

## 2. Acceso al Módulo

### Navegación por sidebar:
1. Iniciar sesión como Administrador
2. En el menú lateral, hacer clic en **Catálogos** (se expande)
3. Hacer clic en **Cajas**
4. URL resultante: `/catalogos/cajas`

### Nota importante:
- El acceso requiere navegación por sidebar con sesión activa.
- El usuario debe contar con permisos de Administrador para visualizar y gestionar cajas.

---

## 3. Elementos de la UI Identificados

### Header
- **Título**: "Cajas" (h1)
- **Tabs**:
  - **Todos**: Muestra todas las cajas
  - **Activas**: Muestra solo cajas activas
  - **Inactivas**: Muestra solo cajas inactivas
- **Buscador**: Campo de texto con placeholder "Buscar"
- **Botón "Nuevo"**: Azul, arriba a la derecha. Crea una nueva caja.

### Tabla de Cajas
| Columna | Descripción |
|---------|-------------|
| **ID** | Código numérico de la caja (ej. 01, 02, 03) |
| **Nombre** | Nombre de la caja (ej. "Caja Demo Tampico Centro") |
| **Sucursal** | Sucursal a la que está asignada la caja |
| **Límite** | Monto límite asignado a la caja (ej. $20,000.00) |
| **Cajero** | Nombre del cajero asignado a la caja |
| **Estatus** | Estado de la caja (Activo/Inactivo) |

### Cajas de ejemplo (datos reales):

| ID | Nombre | Sucursal | Límite | Cajero | Estatus |
|----|--------|----------|--------|--------|---------|
| 03 | Caja Demo Altamira | Foly Muebles Altamira | $20,000.00 | Sofía Reyes | Activo |
| 02 | Caja Demo Tampico Aeropuerto | Foly Muebles Tampico Aeropuerto | $20,000.00 | Miguel Torres | Activo |
| 01 | Caja Demo Tampico Centro | Foly Muebles Tampico Centro | $20,000.00 | Laura Méndez | Activo |
| 04 | Caja prueba altamira | Foly Muebles Altamira | $20,000.00 | Bryan Cajero | Activo |

---

## 4. Flujo Principal: Crear Nueva Caja

### Paso 1: Navegar a Catálogos > Cajas
- Iniciar sesión como Administrador
- Clic en Catálogos en sidebar → Clic en Cajas
- Verificar título "Cajas" visible
- Verificar tabla con cajas cargadas

### Paso 2: Clic en botón "Nuevo"
- Botón azul superior derecha
- Se abre el formulario de creación de caja

### Paso 3: Llenar formulario "Nueva caja"

El formulario se abre como un modal lateral con el título **"Nueva caja"**.

#### Botón del formulario:
- **Crear**: Crea la nueva caja

#### Campos del formulario:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| **Nombre** | Input | Sí | Ej. "Caja principal" |
| **Sucursal** | Dropdown | Sí | Seleccionar la sucursal asignada |
| **Límite** | Input numérico | Sí | Monto máximo de efectivo. Ej. "$ 20,000" (hasta 10 dígitos enteros) |

#### Sucursales disponibles en el dropdown:
- Foly Muebles Altamira
- Foly Muebles Avenida Monterrey
- Foly Muebles Bodega Tampico
- Foly Muebles Coatzacoalcos
- Foly Muebles Ejército Mexicano
- Foly Muebles Pánuco
- Foly Muebles San Luis Potosí Carranza
- Foly Muebles San Luis Potosí Soledad
- Foly Muebles Tampico Aeropuerto
- Foly Muebles Tampico Centro
- Foly Muebles Veracruz Puerto

### Paso 4: Crear y verificar
- Clic en **Crear**
- La caja aparece en la tabla con los datos correspondientes

---

## 5. Flujo Secundario: Filtrar Cajas

### Paso 1: Navegar a Catálogos > Cajas

### Paso 2: Usar tabs y búsqueda
- Seleccionar tab **Activas** o **Inactivas** según el filtro deseado
- Opcionalmente, escribir un nombre en el campo de búsqueda

### Paso 3: Verificar resultados
- Tabla filtrada con cajas coincidentes

---

## 6. Consideraciones Importantes

- Cada caja debe estar asignada a una **Sucursal** previamente configurada.
- El campo **Límite** define el monto máximo de operación o efectivo de la caja.
- El **Cajero** es el usuario responsable de operar la caja.
- El estatus **Activo** se visualiza con un badge verde.
- Las cajas se visualizan como una tabla con filtros por estatus.

---
