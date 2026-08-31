# Manual de Usuario: Clientes

**Módulo:** Clientes  
**Acceso en ERP:** Menú lateral > Clientes (`/clientes`)  
**Dirigido a:** Asesores Comerciales, Analistas de Crédito, Cajeros y Cobranza  

---

## 1. ¿Para qué sirve este módulo?

El módulo de **Clientes** es el repositorio central de expedientes comerciales y perfiles de los compradores de **Foly Muebles**. Permite consultar el directorio de clientes, verificar sus datos de contacto y domicilio, supervisar su estatus operativo (*Activo, Inactivo o Bloqueado*) y acceder a su historial de compras y cuentas de crédito.

A través de este módulo se gestionan:
- **Directorio Centralizado:** Búsqueda rápida de clientes por nombre, teléfono, RFC o correo electrónico.
- **Segmentación por Estatus:** Filtrado por clientes activos, inactivos y bloqueados para control de riesgos y cobranza.
- **Ficha y Expediente 360°:** Consulta del perfil detallado, dirección de entrega, teléfonos verificados y referencias.
- **Historial de Operaciones:** Trazabilidad de ventas vinculadas, pedidos en proceso y líneas de crédito vigentes.

---

## 2. Pantalla Principal y Directorio de Clientes

Al ingresar a **Clientes**, se despliega la tabla maestra con el padrón de compradores registrados en el ERP:

![Pantalla Principal - Directorio de Clientes](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/01-listado-clientes.png)

### Columnas de la Tabla:
| Columna | Descripción | Ejemplo Real en Sistema |
|---------|-------------|-------------------------|
| **ID** | Número identificador único de cliente en el sistema. | `1`, `2`, `3`, `4`, `5` |
| **Nombre** | Nombre completo o razón social del cliente. | `BRYAN EDUARDO LOPEZ SALAZAR`, `María García López` |
| **Teléfono** | Número celular principal a 10 dígitos. | `6666666666`, `6671002002` |
| **Correo electrónico** | Dirección de correo para envío de notas, CFDI y estados de cuenta. | `bryan@gmail.com`, `maria@gmail.com` |
| **Estatus** | Estado operativo y comercial del cliente. | `Activo` (badge verde), `Inactivo` (gris), `Bloqueado` (rojo) |
| **Domicilio** | Dirección completa registrada para facturación y entregas a domicilio. | `CPUERTO DE VERACRUZ, 2374, INDUSTRIAL EL PALMITO, 80160` |
| **Acciones** | Menú para consultar expediente completo o editar información. | `⋮` |

---

## 3. Pestañas de Estatus y Búsqueda Predictiva

La parte superior del módulo cuenta con pestañas de filtrado rápido y un buscador en tiempo real:

### 3.1 Pestaña "Activos"
Muestra a los clientes con historial vigente y facultados para realizar compras de contado y solicitar créditos:

![Pestaña Clientes Activos](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/02-tab-activos.png)

### 3.2 Pestaña "Inactivos"
Agrupa a los clientes sin compras recientes o con expedientes en pausa:

![Pestaña Clientes Inactivos](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-tab-inactivos.png)

### 3.3 Pestaña "Bloqueados"
Identifica a los clientes con restricciones comerciales, cuentas vencidas o reporte en buró de cobranza:

![Pestaña Clientes Bloqueados](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/04-tab-bloqueados.png)

### 3.4 Búsqueda en Tiempo Real
Permite filtrar la lista de inmediato al escribir el nombre, número de teléfono o correo en el campo **Buscar**:

![Búsqueda Predictiva de Clientes](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/05-busqueda-filtrada-cliente.png)

---

## 4. Ficha y Detalle de Cliente (`/clientes/:id`)

Al hacer clic en cualquier fila de la tabla, se abre la vista de expediente integral del cliente:

![Ficha de Detalle de Cliente](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/06-detalle-cliente.png)

### Datos del Expediente:
- **Información General:** Datos personales, RFC, CURP, fecha de registro y canales de contacto (WhatsApp / Teléfono / Correo).
- **Domicilio de Entrega:** Dirección residencial, referencias de calles, entrecalle y código postal para el área de rutas y logística.
- **Historial Crediticio y Comercial:** Estado de la línea de crédito autorizada en *Solicitudes de Crédito* y saldo de folypuntos acumulados.

---

## 5. Preguntas Frecuentes (FAQ)

### ¿Cómo se da de alta un nuevo cliente?
Los clientes nuevos se originan automáticamente al capturar una venta en el **Punto de Venta (POS)** o al iniciar un trámite en el módulo de **Solicitudes de Crédito**.

### ¿Qué implica que un cliente esté en estado "Bloqueado"?
Un cliente bloqueado no puede originar nuevas compras a crédito ni apartados hasta que el área de Cobranza o Crédito actualice su situación en el sistema.

### ¿Se pueden exportar los datos de clientes?
Sí, los usuarios con rol de Administrador o Gerencia pueden consultar y filtrar la base completa desde el menú de catálogos y reportes.
