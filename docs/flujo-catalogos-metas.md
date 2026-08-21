# Flujo: Catálogos - Metas

## Fecha: 2026-08-10
## Módulo: Catálogos > Metas
## URL: /catalogos/metas
## Estado: Documentado

---

## 1. Descripción General

El submódulo **Metas** permite visualizar y configurar las metas de ventas por sucursal. Muestra un historial de ventas en gráfico comparativo (metas vs ventas reales) y permite consultar la meta mensual configurada para cada sucursal. El monto total de la meta mensual está conformado por la meta individual de cada vendedor asignado.

---

## 2. Acceso al Módulo

### Navegación por sidebar:
1. Iniciar sesión como Administrador
2. En el menú lateral, hacer clic en **Catálogos** (se expande)
3. Hacer clic en **Metas**
4. URL resultante: `/catalogos/metas`

### Nota importante:
- El acceso requiere navegación por sidebar con sesión activa.
- El usuario debe contar con permisos de Administrador para visualizar y gestionar metas.

---

## 3. Elementos de la UI Identificados

### Header
- **Título**: "Metas" (h1)
- **Subtítulo**: "Configura las metas por sucursal"

### Gráfico: Historial de ventas
- **Tab activo**: **Ventas** (botón azul)
- **Tipo de gráfico**: Gráfico de líneas comparativo
- **Eje X**: Meses (Feb, Abr, Jun, Ago, Oct, Dic, Feb, Abr, Jun, Ago) con año correspondiente
- **Eje Y**: Monto de ventas (escala de 0 a 4)
- **Leyenda**:
  - **Metas** (línea roja)
  - **Ventas** (línea azul)
- Los montos mensuales se muestran como `$0.00` en todos los periodos visibles

### Sección de Meta Mensual
- **Selector de mes**: Muestra el mes actual con flechas **< >** para navegar entre meses
- Ejemplo visible: **Agosto 2026**
- **Descripción**: "El monto total de la meta mensual para esta sucursal está conformado por la meta individual de cada vendedor asignado."
- **Monto total**: `$0.00`

---

## 4. Flujo Principal: Consultar Metas por Sucursal

### Paso 1: Navegar a Catálogos > Metas
- Iniciar sesión como Administrador
- Clic en Catálogos en sidebar → Clic en Metas
- Verificar título "Metas" visible

### Paso 2: Visualizar el historial de ventas
- El gráfico muestra automáticamente el historial comparativo de metas vs ventas
- Usar el tab **Ventas** para ver el gráfico correspondiente

### Paso 3: Consultar meta del mes actual
- La sección inferior muestra la meta configurada para el mes en curso
- Ejemplo: "Agosto 2026" con monto total `$0.00`

### Paso 4: Navegar entre meses
- Usar las flechas **< >** para cambiar al mes anterior o siguiente
- El monto de la meta se actualiza según el mes seleccionado

---

## 5. Flujo Secundario: Cambiar de Sucursal

### Paso 1: Navegar a Catálogos > Metas

### Paso 2: Seleccionar otra sucursal
- (Dependiendo de la configuración del sistema, puede haber un selector de sucursal)
- El gráfico y la meta mensual se actualizan para la sucursal seleccionada

---

## 6. Consideraciones Importantes

- El módulo **Metas** no utiliza un botón "Nuevo" tradicional; la configuración de metas puede realizarse desde otro flujo o estar integrada con la gestión de vendedores.
- La meta mensual total se calcula automáticamente como la **suma de las metas individuales de cada vendedor asignado** a la sucursal.
- El gráfico permite comparar visualmente el desempeño de ventas contra las metas establecidas.
- Los montos se expresan en la moneda configurada del sistema (pesos mexicanos).
- Si no hay metas configuradas, el monto mostrado será `$0.00`.

---
