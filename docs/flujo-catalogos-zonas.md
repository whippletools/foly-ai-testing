# Flujo: Catálogos - Zonas

## Fecha: 2026-08-10
## Módulo: Catálogos > Zonas
## URL: /catalogos/zonas
## Estado: Documentado

---

## 1. Descripción General

El submódulo **Zonas** permite gestionar las zonas geográficas o de cobertura del negocio. Cada zona puede estar activa o inactiva y se utiliza para clasificar ubicaciones, sucursales, clientes o áreas de servicio según corresponda.

---

## 2. Acceso al Módulo

### Navegación por sidebar:
1. Iniciar sesión como Administrador
2. En el menú lateral, hacer clic en **Catálogos** (se expande)
3. Hacer clic en **Zonas**
4. URL resultante: `/catalogos/zonas`

### Nota importante:
- El acceso requiere navegación por sidebar con sesión activa.
- El usuario debe contar con permisos de Administrador para visualizar y gestionar zonas.

---

## 3. Elementos de la UI Identificados

### Header
- **Título**: "Zonas" (h1)
- **Tabs**:
  - **Todos**: Muestra todas las zonas
  - **Activas**: Muestra solo zonas activas
  - **Inactivas**: Muestra solo zonas inactivas
- **Buscador**: Campo de texto con placeholder "Buscar"
- **Botón "Nuevo"**: Azul, arriba a la derecha. Crea una nueva zona.

### Tabla de Zonas
| Columna | Descripción |
|---------|-------------|
| **ID** | Código numérico de la zona (ej. 01, 02) |
| **Nombre** | Nombre de la zona (ej. Zona 1, Zona 2) |
| **Estatus** | Estado de la zona (Activo/Inactivo) |

### Zonas de ejemplo (datos reales):

| ID | Nombre | Estatus |
|----|--------|---------|
| 01 | Zona 1 | Activo |
| 02 | Zona 2 | Activo |

---

## 4. Flujo Principal: Crear Nueva Zona

### Paso 1: Navegar a Catálogos > Zonas
- Iniciar sesión como Administrador
- Clic en Catálogos en sidebar → Clic en Zonas
- Verificar título "Zonas" visible
- Verificar tabla con zonas cargadas

### Paso 2: Clic en botón "Nuevo"
- Botón azul superior derecha
- Se abre el formulario de creación de zona

### Paso 3: Llenar formulario "Nueva zona"

El formulario se abre como un modal lateral con el título **"Nueva zona"**.

#### Botón del formulario:
- **Crear**: Crea la nueva zona

#### Campo del formulario:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| **Nombre** | Input | Sí | Nombre de la zona. Ej. "Zona Centro" |

### Paso 4: Guardar y verificar
- Clic en **Crear**
- La zona aparece en la tabla con el estatus correspondiente

---

## 5. Flujo Secundario: Filtrar Zonas

### Paso 1: Navegar a Catálogos > Zonas

### Paso 2: Usar tabs y búsqueda
- Seleccionar tab **Activas** o **Inactivas** según el filtro deseado
- Opcionalmente, escribir un nombre en el campo de búsqueda

### Paso 3: Verificar resultados
- Tabla filtrada con zonas coincidentes

---

## 6. Consideraciones Importantes

- El módulo permite gestionar zonas con un **estatus activo/inactivo**.
- El filtrado por tabs facilita la consulta de zonas según su estado.
- El estatus **Activo** se visualiza con un badge verde.
- Las zonas se utilizan para categorizar o delimitar áreas de operación del negocio.

---
