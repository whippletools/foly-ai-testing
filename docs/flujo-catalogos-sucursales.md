# Flujo: Catálogos - Sucursales

## Fecha: 2026-08-10
## Módulo: Catálogos > Sucursales
## URL: /catalogos/sucursales
## Estado: Documentado

---

## 1. Descripción General

El submódulo **Sucursales** permite gestionar las ubicaciones físicas del negocio. Cada sucursal registra su nombre, zona asignada, domicilio completo, estatus y fechas de registro y última actualización. Se utiliza para asociar operaciones, inventarios, ventas y promociones a ubicaciones específicas.

---

## 2. Acceso al Módulo

### Navegación por sidebar:
1. Iniciar sesión como Administrador
2. En el menú lateral, hacer clic en **Catálogos** (se expande)
3. Hacer clic en **Sucursales**
4. URL resultante: `/catalogos/sucursales`

### Nota importante:
- El acceso requiere navegación por sidebar con sesión activa.
- El usuario debe contar con permisos de Administrador para visualizar y gestionar sucursales.

---

## 3. Elementos de la UI Identificados

### Header
- **Título**: "Sucursales" (h1)
- **Tabs**:
  - **Todos**: Muestra todas las sucursales
  - **Activas**: Muestra solo sucursales activas
  - **Inactivas**: Muestra solo sucursales inactivas
- **Buscador**: Campo de texto con placeholder "Buscar"
- **Botón "Nuevo"**: Azul, arriba a la derecha. Crea una nueva sucursal.

### Tabla de Sucursales
| Columna | Descripción |
|---------|-------------|
| **ID** | Código numérico de la sucursal (ej. 01, 03, 05) |
| **Nombre** | Nombre comercial de la sucursal |
| **Zona** | Zona a la que pertenece la sucursal (Zona 1, Zona 2 o Sin zona) |
| **Domicilio** | Dirección completa de la sucursal |
| **Estado** | Estado de la sucursal (Activo/Inactivo) |
| **Fecha registro** | Fecha en que se registró la sucursal |
| **Últ. actualización** | Fecha de la última actualización de la sucursal |

### Sucursales de ejemplo (datos reales):

| ID | Nombre | Zona | Domicilio | Estado | Fecha registro | Últ. actualización |
|----|--------|------|-----------|--------|----------------|--------------------|
| 05 | Foly Muebles Altamira | Zona 1 | Calle Francisco Javier Mina 301, ALTAMIRA CENTRO, Altamira, Tamaulipas, 89600 | Activo | 29/07/2026 | 06/08/2026 |
| 03 | Foly Muebles Avenida Monterrey | Zona 2 | Avenida Monterrey 313, ENRIQUE CÁRDENAS GONZÁLEZ, Tampico, Tamaulipas, 89309 | Activo | 29/07/2026 | 06/08/2026 |
| 06 | Foly Muebles Bodega Tampico | Zona 1 | Carretera Tampico Mante Km 12.5 S/N, Tampico, Altamira, Tamaulipas, 89609 | Activo | 29/07/2026 | 06/08/2026 |
| 11 | Foly Muebles Coatzacoalcos | Zona 2 | Dr. José Lemarray Carrión S/N, PUERTO ESMERALDA, Coatzacoalcos, Veracruz, 96536 | Activo | 29/07/2026 | 06/08/2026 |
| 04 | Foly Muebles Ejército Mexicano | Zona 1 | Avenida Ejército Mexicano 306, ESFUERZO NACIONAL, Ciudad Madero, Tamaulipas, 89470 | Activo | 29/07/2026 | 06/08/2026 |
| 09 | Foly Muebles Pánuco | Zona 2 | Boulevard Díaz Mirón 701, PANUCO CENTRO, Pánuco, Veracruz, 93990 | Activo | 29/07/2026 | 06/08/2026 |
| 07 | Foly Muebles San Luis Potosí Carranza | Sin zona | Carranza S/N, TEQUIQUIAPAN, San Luis Potosí, San Luis Potosí, 78250 | Activo | 29/07/2026 | — |
| 08 | Foly Muebles San Luis Potosí Soledad | Sin zona | Carretera San Luis - Matehuala S/N, SOLEDAD DE GRACIANO SÁNCHEZ CENTRO, Soledad de Graciano Sánchez, San Luis Potosí, 78430 | Activo | 29/07/2026 | — |
| 02 | Foly Muebles Tampico Aeropuerto | Sin zona | Carretera Tampico - Mante 6904-B, MÉXICO, Tampico, Tamaulipas, 89348 | Activo | 29/07/2026 | — |
| 01 | Foly Muebles Tampico Centro | Sin zona | Cristóbal Colón 103, TAMPICO CENTRO, Tampico, Tamaulipas, 89000 | Activo | 29/07/2026 | — |

---

## 4. Flujo Principal: Crear Nueva Sucursal

### Paso 1: Navegar a Catálogos > Sucursales
- Iniciar sesión como Administrador
- Clic en Catálogos en sidebar → Clic en Sucursales
- Verificar título "Sucursales" visible
- Verificar tabla con sucursales cargadas

### Paso 2: Clic en botón "Nuevo"
- Botón azul superior derecha
- Se abre el formulario de creación de sucursal

### Paso 3: Llenar formulario "Nueva sucursal"

El formulario se abre como un modal lateral con el título **"Nueva sucursal"** y el mensaje "Capture los datos de ubicación de la nueva sucursal.".

#### Botón del formulario:
- **Guardar**: Guarda la nueva sucursal

#### Campos del formulario:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| **Nombre de la sucursal** | Input | Sí | Ej. "Foly Muebles Centro" |
| **Zona** | Dropdown | Sí | Seleccionar zona |
| **Segmento de negocio** | Dropdown | Sí | Buscar segmento |
| **Calle** | Input | Sí | Ej. "Av. Revolución" |
| **Código postal** | Input | Sí | 5 dígitos |
| **Colonia** | Input | Sí | Se activa después de ingresar el código postal |
| **Estado** | Input | No | Deshabilitado, se obtiene del código postal |
| **Municipio** | Input | No | Deshabilitado, se obtiene del código postal |
| **Número exterior** | Input | Sí | Ej. "742" |
| **Número interior** | Input | No | Opcional |
| **Latitud** | Input | No | Deshabilitado, coordenada geográfica |
| **Longitud** | Input | No | Deshabilitado, coordenada geográfica |
| **Ubicación** | Mapa | No | Mapa interactivo para ubicar la sucursal |

### Paso 4: Guardar y verificar
- Clic en **Guardar**
- La sucursal aparece en la tabla con los datos correspondientes

---

## 5. Flujo Secundario: Filtrar Sucursales

### Paso 1: Navegar a Catálogos > Sucursales

### Paso 2: Usar tabs y búsqueda
- Seleccionar tab **Activas** o **Inactivas** según el filtro deseado
- Opcionalmente, escribir un nombre en el campo de búsqueda

### Paso 3: Verificar resultados
- Tabla filtrada con sucursales coincidentes

---

## 6. Consideraciones Importantes

- Cada sucursal pertenece a una **Zona** previamente configurada o puede estar **Sin zona**.
- La columna **Domicilio** incluye calle, colonia, ciudad, estado y código postal.
- El estatus **Activo** se visualiza con un badge verde.
- La pestaña **Inactivas** muestra el mensaje "No hay sucursales inactivas" cuando no hay registros inactivos.
- El formulario usa el **código postal** para completar automáticamente colonia, estado y municipio.
- El formulario incluye un **mapa de ubicación** para georreferenciar la sucursal.

---
