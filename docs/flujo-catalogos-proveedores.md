# Flujo: Catálogos - Proveedores

## Fecha: 2026-08-10
## Módulo: Catálogos > Proveedores
## URL: /catalogos/proveedores
## Estado: Documentado

---

## 1. Descripción General

El submódulo **Proveedores** permite gestionar el catálogo de proveedores del negocio. Cada proveedor registra su nombre, RFC, email, tipo y cuenta contable. Se utiliza para identificar a los proveedores en compras, pagos y operaciones relacionadas con inventario.

---

## 2. Acceso al Módulo

### Navegación por sidebar:
1. Iniciar sesión como Administrador
2. En el menú lateral, hacer clic en **Catálogos** (se expande)
3. Hacer clic en **Proveedores**
4. URL resultante: `/catalogos/proveedores`

### Nota importante:
- El acceso requiere navegación por sidebar con sesión activa.
- El usuario debe contar con permisos de Administrador para visualizar y gestionar proveedores.

---

## 3. Elementos de la UI Identificados

### Header
- **Título**: "Proveedores" (h1)
- **Buscador**: Campo de texto con placeholder "Buscar"
- **Botón "Nuevo"**: Azul, arriba a la derecha. Crea un nuevo proveedor.

### Tabla de Proveedores
| Columna | Descripción |
|---------|-------------|
| **ID** | Código del proveedor (ej. 0001, 0002) |
| **Nombre** | Razón social o nombre comercial del proveedor |
| **RFC** | Registro Federal de Contribuyentes del proveedor |
| **Email** | Correo electrónico de contacto del proveedor |
| **Tipo** | Tipo de proveedor (ej. Nacional) |
| **Cuenta** | Cuenta contable asignada al proveedor |

### Proveedores de ejemplo (datos reales):

| ID | Nombre | RFC | Email | Tipo | Cuenta |
|----|--------|-----|-------|------|--------|
| 0003 | Arlix Muebles y Electrodomésticos | AME850101ABC | contacto@arlix.com.mx | Nacional | Sin cuenta |
| 0005 | Cocinas Integrales Berlín | CIB870225PL8 | proyectos@cocinasberlin.mx | Nacional | Sin cuenta |
| 0002 | Colchones Restonic del Pacífico | CRP910608MN3 | ventas@restonic-pacifico.mx | Nacional | Sin cuenta |
| 0004 | Mirage - Norage | MNO900201XYZ | ventas@miragenorage.mx | Nacional | Sin cuenta |
| 0001 | Muebles del Pacífico | MPA920315KL9 | ventas@mueblesdelpacifico.mx | Nacional | Sin cuenta |
| 0006 | Proveedor prueba | XAXX010101000 | b.lopez@whipple.cmx | Nacional | Sin cuenta |

---

## 4. Flujo Principal: Crear Nuevo Proveedor

### Paso 1: Navegar a Catálogos > Proveedores
- Iniciar sesión como Administrador
- Clic en Catálogos en sidebar → Clic en Proveedores
- Verificar título "Proveedores" visible
- Verificar tabla con proveedores cargados

### Paso 2: Clic en botón "Nuevo"
- Botón azul superior derecha
- Se abre el formulario de creación de proveedor

### Paso 3: Llenar formulario "Nuevo proveedor"

El formulario se abre en una pantalla con el título **"Nuevo proveedor"** y breadcrumb `proveedores > Nuevo`.

#### Botones del formulario:
- **Guardar**: Guarda el nuevo proveedor
- **Editar**: Edita la información
- **Enviar invitación**: Envía una invitación al proveedor

#### Tabs del formulario:
- **Datos generales**
- **Contactos**
- **Datos crediticios**

#### Tab "Datos generales"

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| **Nombre** | Input | Sí | Nombre del proveedor |
| **Razón social** | Input | Sí | Razón social del proveedor |
| **RFC** | Input | Sí | Registro Federal de Contribuyentes |
| **Página web** | Input | No | URL de la página web (placeholder `https://...`) |
| **Email** | Input | Sí | Email de contacto del proveedor |
| **Tipo** | Radio | Sí | Nacional o Extranjera. Por defecto: Nacional |
| **Plazo de pagos (días)** | Input | Sí | Días de plazo para pagos. Ej. "60" |
| **Flete** | Radio | Sí | Pagado o Cobra. Por defecto: Pagado |
| **Cuenta contable** | Dropdown | No | Buscar cuenta contable (contabilidad.cuentas) |
| **Observaciones** | Textarea | No | Notas adicionales del proveedor |

#### Tab "Contactos"

Permite agregar contactos del proveedor con los siguientes campos:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| **Cargo** | Dropdown | Sí | Seleccionar el cargo del contacto |
| **Nombre** | Input | Sí | Nombre del contacto |
| **Número** | Input | Sí | Teléfono del contacto |

- Botón **+ Agregar otro**: Añade más contactos

#### Tab "Datos crediticios"

Se divide en dos secciones:

**Crédito y cobranza**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| **Atención** | Input | Sí | Persona de atención |
| **Puesto** | Dropdown | Sí | Puesto del contacto de atención |
| **Número** | Input | Sí | Teléfono de atención |

**Cuentas bancarias**

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| **Banco** | Input | No | Nombre del banco |
| **Plaza** | Input | No | Plaza o ciudad de la sucursal bancaria |
| **Sucursal** | Input | No | Sucursal bancaria |
| **Cuenta** | Input | No | Número de cuenta bancaria |

- Botón **+ Agregar otra**: Añade más cuentas bancarias

### Paso 4: Guardar y verificar
- Clic en **Guardar**
- El proveedor aparece en la tabla con los datos correspondientes

---

## 5. Flujo Secundario: Buscar Proveedor

### Paso 1: Navegar a Catálogos > Proveedores

### Paso 2: Usar el buscador
- Escribir el nombre, RFC o email del proveedor en el campo de búsqueda

### Paso 3: Verificar resultados
- Tabla filtrada con proveedores coincidentes

---

## 6. Consideraciones Importantes

- El proveedor requiere **RFC** válido para su registro.
- El **email** se utiliza como medio de contacto.
- El **Tipo** de proveedor indica si es Nacional o Extranjero.
- La **Cuenta** contable permite vincular al proveedor con la contabilidad.
- Los proveedores se visualizan como una tabla paginada.

---
