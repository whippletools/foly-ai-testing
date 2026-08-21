# Flujo: Catálogos - Proveedores de reparaciones

## Fecha: 2026-08-10
## Módulo: Catálogos > Proveedores de reparaciones
## URL: /catalogos/proveedores-reparaciones
## Estado: Documentado

---

## 1. Descripción General

El submódulo **Proveedores de reparaciones** permite gestionar a los proveedores externos encargados de realizar reparaciones y servicios técnicos sobre productos del inventario. Cada proveedor puede estar asociado a uno o más departamentos, lo que facilita su asignación según el tipo de artículo que requiera reparación.

---

## 2. Acceso al Módulo

### Navegación por sidebar:
1. Iniciar sesión como Administrador
2. En el menú lateral, hacer clic en **Catálogos** (se expande)
3. Hacer clic en **Proveedores de reparaciones**
4. URL resultante: `/catalogos/proveedores-reparaciones`

### Nota importante:
- El acceso requiere navegación por sidebar con sesión activa.
- El usuario debe contar con permisos de Administrador para visualizar y gestionar proveedores de reparaciones.

---

## 3. Elementos de la UI Identificados

### Header
- **Título**: "Proveedores de reparaciones" (h1)
- **Tabs**:
  - **Proveedores (3)**: Listado de proveedores
  - **Ajustes**: Configuración adicional del módulo
- **Buscador**: Campo de texto con placeholder "Buscar"
- **Botón "+ Nuevo"**: Azul, arriba a la derecha. Crea un nuevo proveedor de reparaciones.

### Tabla de Proveedores de reparaciones
| Columna | Descripción |
|---------|-------------|
| **ID** | Código numérico del proveedor (ej. 0001, 0002, 0003) |
| **Nombre** | Nombre del proveedor o taller de reparación |
| **Horas este mes** | Total de horas registradas en el mes actual |
| **Departamentos** | Departamentos a los que está asignado el proveedor |

### Proveedores de ejemplo (datos reales):

| ID | Nombre | Horas este mes | Departamentos |
|----|--------|----------------|---------------|
| 0001 | Ebanista Armendariz | 0 | Muebles, Sofás, Recámaras, Sala (+2) |
| 0003 | Servicio Técnico Hogar | 0 | Electrodomésticos, Colchones |
| 0002 | Tapicería Juventud | 0 | Sofás, Muebles, Sillas |

---

## 4. Flujo Principal: Crear Nuevo Proveedor de Reparaciones

### Paso 1: Navegar a Catálogos > Proveedores de reparaciones
- Iniciar sesión como Administrador
- Clic en Catálogos en sidebar → Clic en Proveedores de reparaciones
- Verificar título "Proveedores de reparaciones" visible
- Verificar tabla con proveedores cargados

### Paso 2: Clic en botón "+ Nuevo"
- Botón azul superior derecha
- Se abre el formulario de creación de proveedor de reparaciones

### Paso 3: Llenar formulario "Nuevo proveedor de reparaciones"

El formulario se abre como un modal lateral con el título **"Nuevo proveedor de reparaciones"**.

#### Botón del formulario:
- **Guardar cambios**: Guarda el nuevo proveedor de reparaciones

#### Campos del formulario:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| **Nombre del proveedor** | Input | Sí | Nombre del taller o proveedor de reparaciones |
| **Persona de contacto** | Input | No | Nombre de la persona de contacto |
| **Número de teléfono** | Input | No | Teléfono del proveedor |
| **Correo electrónico** | Input | No | Correo electrónico del proveedor |
| **Departamentos que pueden atender** | Dropdown + Buscador | Sí | Selección de uno o varios departamentos |

#### Departamentos disponibles para asignar:
- Cocinas
- Colchones
- Comedor
- Electrodomésticos
- Muebles
- Muebles
- Oficina
- Recámaras
- Sala
- Sillas
- Sofás

### Paso 4: Guardar y verificar
- Clic en **Guardar cambios**
- El proveedor aparece en la tabla con los datos correspondientes

---

## 5. Flujo Secundario: Buscar Proveedor de Reparaciones

### Paso 1: Navegar a Catálogos > Proveedores de reparaciones

### Paso 2: Usar campo de búsqueda
- Escribir nombre o ID del proveedor
- Presionar Enter o esperar resultados

### Paso 3: Verificar resultados
- Tabla filtrada con proveedores coincidentes

---

## 6. Consideraciones Importantes

- Cada proveedor de reparaciones puede estar asignado a **varios departamentos**, visualizados como chips o badges.
- La columna **Horas este mes** permite controlar la carga de trabajo mensual de cada proveedor.
- El módulo cuenta con una pestaña de **Ajustes** para configurar parámetros adicionales.
- Los proveedores de reparaciones son distintos a los proveedores de productos; este módulo es específico para servicios de reparación y mantenimiento.

---
