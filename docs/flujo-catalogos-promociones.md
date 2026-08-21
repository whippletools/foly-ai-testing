# Flujo: Catálogos - Promociones

## Fecha: 2026-08-10
## Módulo: Catálogos > Promociones
## URL: /catalogos/promociones
## Estado: Documentado

---

## 1. Descripción General

El submódulo **Promociones** permite gestionar las promociones y descuentos activos del catálogo de productos. Cada promoción define un margen de descuento, el tipo de pago al que aplica, un periodo de vigencia (fecha de inicio y fin), y puede estar asociada a sucursales y departamentos específicos.

---

## 2. Acceso al Módulo

### Navegación por sidebar:
1. Iniciar sesión como Administrador
2. En el menú lateral, hacer clic en **Catálogos** (se expande)
3. Hacer clic en **Promociones**
4. URL resultante: `/catalogos/promociones`

### Nota importante:
- El acceso requiere navegación por sidebar con sesión activa.
- El usuario debe contar con permisos de Administrador para visualizar y gestionar promociones.

---

## 3. Elementos de la UI Identificados

### Header
- **Título**: "Promociones" (h1)
- **Filtro "Todas las sucursales"**: Selecciona la sucursal para filtrar promociones
- **Filtro "Todos los departamentos"**: Selecciona el departamento para filtrar promociones
- **Buscador**: Campo de texto con placeholder "Buscar"
- **Botón "Nuevo"**: Azul, arriba a la derecha. Crea una nueva promoción.

### Tabla de Promociones
| Columna | Descripción |
|---------|-------------|
| **ID** | Código numérico de la promoción (ej. 03, 02, 05) |
| **Nombre** | Nombre descriptivo de la promoción |
| **Margen** | Porcentaje de descuento o margen de la promoción (ej. 8.00%) |
| **Tipo** | Tipo de pago al que aplica (ej. Contado) |
| **Inicio** | Fecha de inicio de la promoción (DD/MM/YYYY) |
| **Fin** | Fecha de término de la promoción (DD/MM/YYYY) |

### Promociones de ejemplo (datos reales):

| ID | Nombre | Margen | Tipo | Inicio | Fin |
|----|--------|--------|------|--------|-----|
| 03 | Descuento Recámaras Pacífico | 8.00% | Contado | 15/03/2026 | 15/09/2026 |
| 02 | Liquidación Sala Escandinava | 15.00% | Contado | 01/04/2026 | 30/06/2026 |
| 05 | Mes del Hogar - Línea Blanca | 7.00% | Contado | 15/05/2026 | 15/07/2026 |
| 04 | Promo Juegos de Comedor | 12.00% | Contado | 01/06/2026 | 31/10/2026 |
| 06 | Promo Lavado y Secado Arlix | 9.00% | Contado | 01/06/2026 | 31/08/2026 |
| 01 | Promo Verano Demo | 10.00% | Contado | 01/05/2026 | 31/08/2026 |
| 08 | Proyecto Cocina Berlin | 6.00% | Contado | 01/04/2026 | 30/09/2026 |
| 07 | Semana del Descanso Restonic | 10.00% | Contado | 20/05/2026 | 20/06/2026 |

---

## 4. Flujo Principal: Crear Nueva Promoción

### Paso 1: Navegar a Catálogos > Promociones
- Iniciar sesión como Administrador
- Clic en Catálogos en sidebar → Clic en Promociones
- Verificar título "Promociones" visible
- Verificar tabla con promociones cargadas

### Paso 2: Clic en botón "Nuevo"
- Botón azul superior derecha
- Se abre el formulario de creación de promoción

### Paso 3: Llenar formulario "Nueva promoción"

El formulario se divide en 4 tabs: **Configuración**, **Departamentos**, **Sucursales** y **proveedores**.

#### Botones del formulario:
- **Descartar cambios**: Cancela el registro y regresa al listado
- **Guardar**: Guarda la nueva promoción

---

#### 3.1 Tab "Configuración"

Sección: **Configuraciones de la promoción**
Ingresa un nombre y porcentaje para tu nueva promoción.

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| **Nombre** | Input | Sí | Ej. "Buen fin" |
| **Porcentaje** | Input numérico | Sí | Valor numérico, acompañado del símbolo % (ej. 15) |

Sección: **Aplicación**
Selecciona qué tipo de venta se aplicará a la Promoción.

| Campo | Tipo | Requerido | Opciones |
|-------|------|-----------|----------|
| **Aplicación** | Radio button | Sí | Crédito, Contado, Apartado |

Sección: **Periodo de vigencia**
Define el periodo de vigencia para la promoción.

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| **Fecha de inicio** | Fecha | Sí | Formato dd/mm/aaaa. Tiene un switch de activación. |
| **Fecha de fin** | Fecha | Sí | Formato dd/mm/aaaa |

---

#### 3.2 Tab "Departamentos"

Sección: **Departamentos donde se aplicará la promoción**

- **Seleccionar todas**: Link para seleccionar todos los departamentos.
- **Buscar departamento**: Campo de búsqueda para filtrar departamentos.
- Lista de departamentos disponibles como chips seleccionables:
  - COC — Cocinas
  - COL — Colchones
  - CMD — Comedor
  - ELE — Electrodomésticos
  - MUEBLES — Muebles
  - MUE — Muebles
  - OFI — Oficina
  - REC — Recámaras
  - SAL — Sala
  - SIL — Sillas
  - SOF — Sofás

Sección: **Productos**
- Tabla con columnas: Código, Estado, Nombre, Departamento, Línea, Proveedor
- Mensaje inicial: "Selecciona líneas para ver productos"
- Permite visualizar los productos que se verán afectados por la promoción una vez seleccionados departamentos/líneas.

---

#### 3.3 Tab "Sucursales"

Sección: **Sucursales**
Configura las sucursales donde aplicará esta Promoción.

- **Seleccionar todas**: Link para seleccionar todas las sucursales.
- Lista de sucursales disponibles como chips seleccionables:
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

---

#### 3.4 Tab "proveedores"

Sección: **proveedores**
Configura los proveedores que aplicarán con esta Promoción.

- **Buscar proveedores**: Campo de búsqueda.
- **+ Agregar**: Abre un modal para seleccionar proveedores.
- Mensaje inicial: "No hay proveedores agregados"

##### Modal "Agregar proveedor"
- Selecciona un proveedor para agregar a este artículo.
- Tabla con columnas: **Identificación**, **Proveedor**
- Botón **Agregar** por cada proveedor

Proveedores disponibles:

| ID | Proveedor |
|----|-----------|
| 3 | Arlix Muebles y Electrodomésticos SA de CV |
| 5 | Cocinas Integrales Berlín SA de CV |
| 2 | Colchones Restonic del Pacífico SA de CV |
| 4 | Mirage - Norage SA de CV |
| 1 | Muebles del Pacífico SA de CV |
| 6 | proveedor prueba |

---

### Paso 4: Guardar y verificar
- Clic en **Guardar**
- La promoción aparece en la tabla con el periodo de vigencia y datos correspondientes

---

## 5. Flujo Secundario: Filtrar Promociones

### Paso 1: Navegar a Catálogos > Promociones

### Paso 2: Usar filtros
- Seleccionar una **sucursal** específica en el filtro "Todas las sucursales"
- Seleccionar un **departamento** específico en el filtro "Todos los departamentos"
- Opcionalmente, escribir un nombre en el campo de búsqueda

### Paso 3: Verificar resultados
- Tabla filtrada con promociones coincidentes

---

## 6. Consideraciones Importantes

- Todas las promociones del ejemplo aplican al tipo de pago **Contado**.
- Las promociones tienen un periodo de vigencia definido por **Inicio** y **Fin**.
- Es posible filtrar por sucursal y departamento para ver promociones locales o específicas.
- El margen indica el porcentaje de descuento aplicado en la promoción.

---
