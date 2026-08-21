# Flujo: Catálogos - Departamentos

## Fecha: 2026-08-10
## Módulo: Catálogos > Departamentos
## URL: /catalogos/departamentos
## Estado: Documentado

---

## 1. Descripción General

El submódulo **Departamentos** permite gestionar las categorías principales de productos del inventario. Cada departamento representa una familia de artículos y agrupa líneas o subcategorías relacionadas. También define el margen de utilidad esperado y las cuentas contables asociadas.

---

## 2. Acceso al Módulo

### Navegación por sidebar:
1. Iniciar sesión como Administrador
2. En el menú lateral, hacer clic en **Catálogos** (se expande)
3. Hacer clic en **Departamentos**
4. URL resultante: `/catalogos/departamentos`

### Nota importante:
- El acceso requiere navegación por sidebar con sesión activa.
- El usuario debe contar con permisos de Administrador para visualizar y gestionar departamentos.

---

## 3. Elementos de la UI Identificados

### Header
- **Título**: "Departamentos" (h1)
- **Buscador**: Campo de texto con placeholder "Buscar"
- **Botón "Nuevo"**: Azul, arriba a la derecha. Crea un nuevo departamento.

### Tabla de Departamentos
| Columna | Descripción |
|---------|-------------|
| **ID** | Código numérico del departamento (ej. 04, 06, 08) |
| **Nombre** | Nombre del departamento (ej. Cocinas, Colchones, Comedor) |
| **Margen** | Porcentaje de margen de utilidad esperado (ej. 25.00%) |
| **Cuenta Inventario** | Cuenta contable asignada al inventario del departamento |
| **Cuenta Resultados** | Cuenta contable de resultados asignada |
| **Líneas** | Subcategorías o líneas asociadas al departamento |

### Departamentos de ejemplo (datos reales):

| ID | Nombre | Margen | Cuenta Inventario | Cuenta Resultados | Líneas |
|----|--------|--------|-------------------|-------------------|--------|
| 04 | Cocinas | 25.00% | Sin asignar | Sin asignar | Cocinas integrales, Islas y barras, Alacenas y despenseros, Repisas y backsplash |
| 06 | Colchones | 32.00% | Sin asignar | Sin asignar | Colchones matrimoniales, Colchones individuales, Bases y cabeceras |
| 08 | Comedor | 28.00% | Sin asignar | Sin asignar | Mesas de comedor, Juegos de comedor |
| 07 | Electrodomésticos | 18.00% | Sin asignar | Sin asignar | Línea blanca, Pequeños electrodomésticos, Climatización |
| 01 | Muebles | 32.00% | Sin asignar | Sin asignar | Salas, Recámaras |

---

## 4. Flujo Principal: Crear Nuevo Departamento

### Paso 1: Navegar a Catálogos > Departamentos
- Iniciar sesión como Administrador
- Clic en Catálogos en sidebar → Clic en Departamentos
- Verificar título "Departamentos" visible
- Verificar tabla con departamentos cargados

### Paso 2: Clic en botón "Nuevo"
- Botón azul superior derecha
- Se abre el formulario de creación de departamento

### Paso 3: Llenar formulario
Campos esperados en el formulario:
- **Nombre** del departamento (obligatorio)
- **Margen** de utilidad (obligatorio)
- **Cuenta Inventario** (opcional)
- **Cuenta Resultados** (opcional)

### Paso 4: Guardar y verificar
- El departamento aparece en la tabla con el estatus y datos correspondientes

---

## 5. Flujo Secundario: Buscar Departamento

### Paso 1: Navegar a Catálogos > Departamentos

### Paso 2: Usar campo de búsqueda
- Escribir nombre o ID del departamento
- Presionar Enter o esperar resultados

### Paso 3: Verificar resultados
- Tabla filtrada con departamentos coincidentes

---

## 6. Consideraciones Importantes

- Cada departamento agrupa múltiples **líneas** que luego se asocian a los artículos.
- El **margen** es un porcentaje clave para el cálculo de utilidades.
- Las **cuentas contables** (Inventario y Resultados) aún no están asignadas en los datos de ejemplo.
- Las líneas se visualizan como badges o etiquetas dentro de la fila del departamento.

---
