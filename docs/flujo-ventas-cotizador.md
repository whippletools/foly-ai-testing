# Manual de Usuario: Ventas y Cotizaciones

**Módulo:** Ventas y Cotizaciones  
**Acceso en ERP:** Menú lateral > Ventas (`/ventas`)  
**Dirigido a:** Asesores Comerciales, Cajeros, Jefes de Sucursal y Gerencia de Ventas  

---

## 1. ¿Para qué sirve este módulo?

El módulo de **Ventas y Cotizaciones** es la herramienta comercial y punto de venta (**POS**) de **Foly Muebles**. Permite a la fuerza de ventas estructurar cotizaciones, seleccionar artículos del catálogo, vincular clientes registrados o prospectos de crédito y emitir notas de venta bajo las modalidades de **Contado**, **Crédito** o **Apartado** para su cobro y timbrado en caja.

A través de este módulo se gestionan:
- **Punto de Venta Dinámico (POS):** Búsqueda ágil de artículos por código, nombre o escáner de código de barras.
- **Modalidades de Venta:** Generación de operaciones a **Contado**, **Crédito Departamental** o plan de **Apartado**.
- **Cotizador Comercial:** Almacenamiento y recuperación de presupuestos para seguimiento con prospectos (**Cotizaciones Guardadas**).
- **Control de Ventas Especiales / Ventas en Rojo:** Monitoreo de pedidos que requieren autorización de precio, margen o descuento.
- **Trazabilidad Integral:** Folio de control único vinculado a la sucursal, asesor comercial y estatus de pago en caja.

---

## 2. Pantalla Principal y Listado de Ventas

Al acceder a **Ventas**, se muestra la bandeja general con todas las transacciones generadas en la sucursal:

![Pantalla Principal - Listado de Ventas](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/01-punto-de-venta-inicial.png)

### Columnas de la Tabla:
| Columna | Descripción | Ejemplo Real en Sistema |
|---------|-------------|-------------------------|
| **Folio** | Identificador alfanumérico único de la transacción. | `V220260822-6362`, `V220260821-2625` |
| **Estatus** | Estado actual de la venta. | `Pagada` (verde), `Pendiente de cobro` (amarillo), `Borrador` (gris) |
| **Cliente** | Nombre o razón social del cliente o prospecto. | `BRYAN EDUARDO LOPEZ`, `María García` |
| **Artículos** | Cantidad o descripción de productos incluidos en la venta. | `2 artículos`, `Librero Modular 5 Niveles` |
| **Fecha** | Fecha y hora de emisión del ticket o cotización. | `Ayer`, `21 ago` |
| **Tipo** | Modalidad financiera de la compra. | `Contado`, `Crédito`, `Apartado` |
| **Total** | Monto total a liquidar en moneda nacional. | `$27,698.00`, `$4,599.00` |
| **Acciones** | Menú para consultar detalle, reimprimir o cancelar. | `⋮` |

---

## 3. Pestañas de Filtrado y Búsqueda

La cabecera del listado incluye pestañas para filtrar las ventas de forma inmediata:
- **Todas:** Vista consolidada de todas las ventas del periodo.
- **Finalizadas / Pagadas:** Transacciones liquidadas y entregadas exitosamente.
- **Realizadas:** Ventas emitidas por la fuerza de comercialización.
- **Pendientes:** Pedidos en espera de liquidación de enganche o cobro total en caja.
- **Buscador:** Filtrado en tiempo real por folio, nombre de cliente o código de artículo.

---

## 4. Paso a Paso: Cómo Registrar una Nueva Venta (Punto de Venta)

Para iniciar una venta o cotización, haz clic en el botón azul **"Nueva"** en la parte superior del listado.

![Pantalla Nueva Venta - POS](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/02-formulario-nueva-venta-pos.png)

### Paso 1: Agregar Artículos
1. Haz clic en el botón **"Buscar"** o utiliza el lector con **"Escanear artículos"**.
2. En el catálogo emergente, selecciona los muebles o electrodomésticos deseados:

![Modal de Búsqueda de Artículos](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-modal-buscar-articulos-catalogo.png)

3. El sistema añadirá los artículos al carrito calculando subtotal, IVA y total de la operación.

### Paso 2: Seleccionar el Tipo de Venta
Elige el esquema de pago acordado con el cliente:
- **Contado:** Pago en una sola exhibición en caja (efectivo, tarjeta bancaria o transferencia).
- **Crédito:** Financiamiento departamental previa aprobación en el módulo de *Solicitudes de Crédito*.
- **Apartado:** Pago fraccionado con reserva de mercancía en bodega.

![Carrito de Venta y Totales](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/04-pos-con-articulos-y-totales.png)

### Paso 3: Asignar el Cliente
Escribe el nombre o teléfono del cliente en el campo **Buscar cliente** y selecciónalo de la lista autocompletable.

### Paso 4: Finalizar la Operación
En la parte superior dispones de dos opciones:
1. **Guardar cotización:** Guarda el presupuesto para consultarlo posteriormente en *Cotizaciones guardadas*.
2. **Registrar venta (pendiente de cobro):** Envía la orden directamente a la caja para que el cliente pase a realizar el pago.

---

## 5. Cotizaciones Guardadas (`/cotizaciones-guardadas`)

En el submódulo de **Cotizaciones guardadas**, los asesores pueden recuperar los presupuestos guardados y convertirlos en ventas definitivas con un solo clic:

![Listado de Cotizaciones Guardadas](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/06-listado-cotizaciones-guardadas.png)

---

## 6. Ventas en Rojo (`/ventas/ventas-en-rojo`)

El panel de **Ventas en rojo** clasifica automáticamente aquellas transacciones que presentan alertas operativas o comerciales (por ejemplo: márgenes mínimos, descuentos especiales solicitados o falta de inventario inmediato en piso):

![Ventas en Rojo](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/08-ventas-en-rojo.png)

---

## 7. Consulta y Ficha de Detalle de Venta (`/ventas/:id`)

Al hacer clic sobre cualquier registro en el listado, se abre la vista de detalle con el desglose del pedido, cliente, asesor responsable, fecha y desglose financiero:

![Ficha de Detalle de Venta](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/07-detalle-venta-finalizada.png)

---

## 8. Preguntas Frecuentes (FAQ)

### ¿Qué pasa cuando hago clic en "Registrar venta (pendiente de cobro)"?
La venta queda registrada en el sistema bajo el estado **Pendiente de cobro** y con su folio asignado. El cliente puede acudir a cualquier caja de la sucursal para liquidar su cuenta y recibir su comprobante fiscal.

### ¿Puedo modificar los artículos de una cotización guardada?
Sí. Al abrir la cotización desde el submódulo **Cotizaciones guardadas**, los artículos y precios se cargan nuevamente en el POS para añadir o remover productos antes de emitir la venta.

### ¿Cómo aplico un crédito a una venta?
Selecciona la opción **Crédito** en el tipo de venta y asegúrate de vincular al cliente cuya solicitud figure como **Aceptada** en el módulo de *Solicitudes de Crédito*.
