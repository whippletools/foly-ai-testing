# Manual de Usuario: Catálogo de Proveedores

**Módulo:** Catálogos > Proveedores  
**Acceso en ERP:** Menú lateral > Catálogos > Proveedores (`/catalogos/proveedores`)  
**Dirigido a:** Compras, Cuentas por Pagar, Tesorería, Contabilidad y Almacén  

---

## 1. ¿Para qué sirve este módulo?

El módulo de **Proveedores** administra el padrón oficial de fabricantes, distribuidores y socios comerciales que abastecen el inventario de **Foly Muebles**. 

A través de este catálogo se centralizan:
- **Identidad Fiscal y Comercial:** Razón social, RFC, nombre comercial y tipo de empresa (Nacional o Extranjera).
- **Condiciones Comerciales y de Crédito:** Días de plazo de pago pactados (ej. *30, 60, 90 días*), políticas de flete (*Pagado* o *Por cobrar*) y límite de crédito.
- **Directorio de Contactos:** Agenda directa de ejecutivos de venta, cobranza y ejecutivos de cuenta por proveedor.
- **Integración Contable:** Vinculación directa con el catálogo de cuentas contables (`contabilidad.cuentas`) para compras, gastos y facturación.
- **Portal de Proveedores:** Envío de invitaciones digitales para que los proveedores carguen sus facturas XML y estados de cuenta.

---

## 2. Pantalla Principal y Directorio de Proveedores

Al ingresar a **Catálogos > Proveedores**, se despliega el listado maestro de proveedores:

![Pantalla Principal - Directorio de Proveedores](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/wIa01-listado-proveedores.png)

### Columnas de la Tabla:
| Columna | Descripción | Ejemplo Real en Sistema |
|---------|-------------|-------------------------|
| **ID** | Código numérico consecutivo de 4 dígitos. | `0001`, `0002`, `0003`, `0004` |
| **Nombre** | Nombre comercial o razón social del fabricante/distribuidor. | `Muebles del Pacífico`, `Colchones Restonic del Pacífico`, `Cocinas Berlín`, `Mirage - Norage` |
| **RFC** | Registro Federal de Contribuyentes con homoclave. | `MPA920315KL9`, `CRP910608MN3`, `CIB870225PL8`, `MNO900201XYZ` |
| **Email** | Correo electrónico principal de compras/pedidos. | `ventas@mueblesdelpacifico.mx`, `proyectos@cocinasberlin.mx` |
| **Tipo** | Origen fiscal del proveedor. | Badge azul (*Nacional*) / (*Extranjera*) |
| **Cuenta contable** | Cuenta asignada del catálogo contable. | `Sin asignar` o código contable |
| **Acciones** | Menú desplegable para editar o gestionar. | `⋮` |

---

## 3. Búsqueda en Tiempo Real

Escribe en la barra de búsqueda el nombre comercial o el RFC para filtrar el listado instantáneamente:

![Búsqueda Dinámica](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/heA02-busqueda-filtrada.png)

---

## 4. Paso a Paso: Cómo Dar de Alta un Nuevo Proveedor

Para registrar un nuevo proveedor comercial, haz clic en el botón azul **"Nuevo"** en la parte superior derecha (`/catalogos/proveedores/nuevo`).

El formulario se organiza en **3 Pestañas Especializadas**:

```
[ Pestaña 1: Datos generales ]  |  [ Pestaña 2: Contactos ]  |  [ Pestaña 3: Datos crediticios ]
```

---

### Pestaña 1: Datos Generales
Aquí se capturan los datos fiscales, comerciales y contables:

![Pestaña Datos Generales](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/04-tab-1-datos-generales.png)

#### Campos de Datos Generales:
| Campo | Obligatorio | Descripción |
|-------|:-----------:|-------------|
| **Nombre (\*)** | Sí | Nombre comercial distintivo (ej. *Muebles del Pacífico*). |
| **Razón social (\*)** | Sí | Razón social fiscal completa (ej. *Muebles del Pacífico S.A. de C.V.*). |
| **RFC (\*)** | Sí | RFC fiscal de 12 o 13 posiciones con homoclave. |
| **Página web** | No | Enlace al catálogo o sitio web oficial (`https://...`). |
| **Email (\*)** | Sí | Correo corporativo para recepción de órdenes de compra. |
| **Tipo (\*)** | Sí | Selección de radio button: **Nacional** o **Extranjera**. |
| **Plazo de pagos (días) (\*)** | Sí | Días naturales de crédito otorgados para liquidar facturas (ej. `30`, `45`, `60`). |
| **Flete (\*)** | Sí | Selección de radio button: **Pagado** (por el proveedor) o **Cobrar** (pagado por Foly). |
| **Cuenta contable** | No | Asignación de la subcuenta de pasivo correspondiente en `contabilidad.cuentas`. |
| **Observaciones** | No | Notas sobre condiciones de entrega, empaque o garantías. |

---

### Pestaña 2: Directorio de Contactos
Permite registrar a los ejecutivos de atención al cliente, cobranza o agentes de ventas:

![Pestaña Contactos](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/05-tab-2-contactos.png)

---

### Pestaña 3: Datos Crediticios
Configura los límites de compra autorizados, días de gracia y cuentas bancarias para transferencias SPEI:

![Pestaña Datos Crediticios](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/06-tab-3-datos-crediticios.png)

---

### Guardar o Enviar Invitación Digital:
- **Botón "Guardar":** Guarda el proveedor en el ERP inmediatamente para asociarlo a compras e inventario.
- **Botón "Enviar invitación":** Envía un enlace seguro por correo al proveedor para que complete su expediente digital de alta de proveedor.

---

## 5. Menú de Acciones y Consulta de Ficha Técnica

Al presionar el botón de tres puntos (`⋮`) o hacer clic directo sobre cualquier fila del proveedor:

![Menú de Acciones](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-menu-acciones-abierto.png)

---

### Consulta y Modificación de Proveedor
Permite revisar el historial de compras, actualizar plazos de pago o editar datos fiscales:

![Ficha Detalle y Edición](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/07-detalle-edicion-proveedor.png)

---

## 6. Preguntas Frecuentes

### ¿Qué diferencia hay entre "Proveedores" y "Proveedores de reparaciones"?
> - **Catálogos > Proveedores (`/catalogos/proveedores`):** Son los fabricantes mayoristas y distribuidores a quienes Foly les compra muebles, línea blanca y artículos para venta en tienda.
> - **Catálogos > Proveedores de reparaciones (`/catalogos/proveedores-reparaciones`):** Son los talleres técnicos especializados y centros de servicio autorizados encargados de reparar artículos con garantía de clientes.

### ¿Cómo afecta el campo "Plazo de pagos (días)" a la tesorería?
> Determina la fecha de vencimiento automática que se calcula al recibir una factura en el módulo de Cuentas por Pagar y Compras.

### ¿Cómo se asigna una Cuenta Contable al proveedor?
> En el campo *Cuenta contable*, escribe el nombre o número de subcuenta de pasivo (proveedores nacionales o extranjeros) para que los asientos contables de compra se generen automáticamente.
