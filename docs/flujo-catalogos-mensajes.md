# Manual de Usuario: Catálogo de Mensajes y Plantillas

**Módulo:** Catálogos > Mensajes  
**Acceso en ERP:** Menú lateral > Catálogos > Mensajes (`/catalogos/mensajes`)  
**Dirigido a:** Crédito y Cobranza, Atención a Clientes, Mercadotecnia y Administración  

---

## 1. ¿Para qué sirve este módulo?

El módulo de **Mensajes** administra la biblioteca oficial de **plantillas dinámicas de comunicación** de **Foly Muebles**. Permite estandarizar los textos que se envían por SMS, WhatsApp y Correo Electrónico a los clientes en diferentes etapas de su crédito y compras.

A través de este catálogo se controlan:
- **Recordatorios Preventivos de Pago:** Avisos previos al vencimiento semanal o quincenal de letras.
- **Alertas de Cobranza y Mora:** Notificaciones de atraso, avisos extrajudiciales y notificaciones de cobranza judicial.
- **Agradecimientos de Pago:** Confirmaciones automáticas de abono exitoso tras acudir a caja o pagar por transferencia.
- **Variables Dinámicas Inteligentes:** Personalización automática del mensaje sustituyendo variables como nombre del cliente, número de factura, fecha límite y saldo pendiente.

---

## 2. Pantalla Principal y Directorio de Plantillas

Al ingresar a **Catálogos > Mensajes**, se muestra el catálogo de plantillas activas:

![Pantalla Principal - Catálogo de Mensajes](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/01-listado-mensajes.png)

### Columnas de la Tabla:
| Columna | Descripción | Ejemplo Real en Sistema |
|---------|-------------|-------------------------|
| **ID** | Código numérico de 2 dígitos. | `01`, `02`, `03`, `04`, `07` |
| **Nombre** | Título descriptivo o propósito del mensaje. | `Email de recordatorio 1 semana`, `Mensaje advertencia judicial`, `Mensaje de agradecimiento` |
| **Mensaje** | Texto completo con las etiquetas de personalización. | *"Esta es tu recordatorio semanal: Tu próximo pago vence el \*fecha_limite\*. Monto pendiente: \*monto_pendiente\*."* |
| **Estatus** | Estado operativo de la plantilla. | Badge azul (*En uso*) |
| **Acciones** | Menú desplegable para editar o eliminar. | `⋮` |

---

## 3. Búsqueda en Tiempo Real

Utiliza el campo de texto **"Buscar"** para localizar plantillas por nombre o palabras clave dentro del contenido:

![Búsqueda Dinámica](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/FDg02-busqueda-filtrada.png)

---

## 4. Paso a Paso: Cómo Crear una Nueva Plantilla

### Paso 1: Abrir el formulario
Haz clic en el botón azul **"Nuevo"** en la esquina superior derecha:

![Modal Nuevo Mensaje](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-modal-nuevo-mensaje.png)

### Paso 2: Configurar los Campos
1. **Nombre del mensaje (\*):** Asigna un título claro que identifique el propósito (ej. *Recordatorio 3 días antes de vencimiento*).
2. **Contenido del mensaje (\*):** Redacta el cuerpo de la comunicación e inserta las variables dinámicas del cliente.

### Variables Dinámicas Disponibles:
Al enviar la notificación, el ERP reemplazará automáticamente los comodines entre asteriscos por la información real del cliente:
- `*fecha_limite*`: Fecha exacta de vencimiento del próximo abono (ej. *15/09/2026*).
- `*num_factura*`: Número de folio de la factura o pagaré.
- `*descripcion_factura*`: Resumen de los artículos adquiridos (ej. *Comedor 6 sillas + Sala Zurich*).
- `*total_adeudo*`: Saldo total adeudado del crédito.
- `*proximo_pago*`: Monto exacto de la letra o cuota a pagar.
- `*monto_pendiente*`: Saldo acumulado vencido.

### Paso 3: Guardar
Haz clic en **"Guardar"**. La nueva plantilla estará lista de inmediato para ser utilizada en los módulos de **Crédito y Cobranza** y **Atención a Clientes**.

---

## 5. Menú de Acciones y Modificación

Al presionar el botón de tres puntos (`⋮`) en cualquier plantilla:

![Menú de Acciones](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/Yiy04-menu-acciones-abierto.png)

```
[ ⋮ ]
 ├── 1. Editar
 └── 2. Eliminar
```

---

### 5.1 Edición de Plantilla
Permite ajustar la redacción, corregir faltas ortográficas o agregar nuevas variables dinámicas:

![Modal Editar Mensaje](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/05-modal-editar-mensaje.png)

---

## 6. Preguntas Frecuentes

### ¿Dónde se utilizan estas plantillas en la operación diaria?
> En los módulos de **Solicitudes de crédito**, **Cobranza** y **Atención a clientes**, los gestores pueden presionar el botón de contacto con el cliente y seleccionar cualquiera de estas plantillas predefinidas para enviar el mensaje por WhatsApp o SMS en un solo clic.

### ¿Qué ocurre si un cliente no tiene factura asociada?
> Las variables como `*num_factura*` se sustituirán por el número de contrato de crédito o folio de venta correspondiente.

### ¿Se pueden crear plantillas promocionales?
> **Sí.** Puedes dar de alta plantillas como *Invitación a venta nocturna* o *Promoción de aniversario* para campañas masivas a clientes vigentes.
