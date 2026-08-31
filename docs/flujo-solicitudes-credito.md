# Manual de Usuario: Solicitudes de Crédito

**Módulo:** Solicitudes de Crédito  
**Acceso en ERP:** Menú lateral > Solicitudes de crédito (`/solicitudes-credito`)  
**Dirigido a:** Asesores Comerciales, Analistas de Crédito, Gerentes de Sucursal y Auditoría  

---

## 1. ¿Para qué sirve este módulo?

El módulo de **Solicitudes de Crédito** es el núcleo de evaluación crediticia y originación de créditos departamentales de **Foly Muebles**. Permite a la fuerza de ventas registrar prospectos con validación oficial de identidad (**INE**), recopilar su expediente socioeconómico y remitirlo al área de análisis para la consulta en **Buró de Crédito**, cálculo de score de riesgo y dictamen de aprobación o rechazo.

A través de este módulo se gestionan:
- **Recepción y Registro de Prospectos:** Captura de solicitudes nuevas asociadas a una cotización o intención de compra.
- **Validación de Identidad Digital:** Verificación y digitalización de la credencial oficial INE/IFE del cliente.
- **Expediente Socioeconómico Integral:** Registro estructurado de datos personales, domicilio, vínculos familiares, estabilidad laboral y referencias personales.
- **Evaluación de Riesgo y Buró:** Consulta de historial crediticio, cálculo automático de score y nivel de riesgo (*Bajo, Medio, Alto*).
- **Dictamen y Aprobación:** Acciones de resolución (*Aprobar solicitud, Rechazar solicitud o Solicitar información adicional*).

---

## 2. Pantalla Principal y Listado de Solicitudes

Al acceder a **Solicitudes de crédito**, se muestra la bandeja general con todas las solicitudes registradas, indicando su folio, estado de trámite, nombre del prospecto, teléfono, fecha y domicilio:

![Pantalla Principal - Listado de Solicitudes de Crédito](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/yqI01-listado-solicitudes.png)

### Columnas de la Tabla:
| Columna | Descripción | Ejemplo Real en Sistema |
|---------|-------------|-------------------------|
| **ID** | Folio numérico correlativo de la solicitud. | `6`, `5`, `4`, `3`, `2` |
| **Estatus** | Estado actual del trámite crediticio. | `Borrador` (gris), `Aceptada` (verde), `Enviada` (azul), `Rechazada` (rojo) |
| **Nombre** | Nombre completo del prospecto o cliente. | `BRYAN EDUARDO LOPEZ SALAZAR`, `Ana Lucía Fuentes Robles` |
| **Teléfono** | Número telefónico de contacto a 10 dígitos. | `6666666666`, `6671002004` |
| **Solicitado** | Fecha y hora exacta de registro de la solicitud. | `3 ago 2026, 2:46 pm`, `29 jul 2026, 8:15 pm` |
| **Domicilio** | Dirección completa registrada para entrega e investigación. | `CPUERTO DE VERACRUZ, 2374, INDUSTRIAL EL PALMITO, 80160` |
| **Tipo** | Tipo de cliente ante la empresa. | `Nuevo` / `Recurrente` |

---

## 3. Pestañas de Estatus y Búsqueda en Tiempo Real

Para agilizar la gestión de solicitudes, la cabecera ofrece pestañas de filtrado rápido por estado operativo:

### 3.1 Pestaña "Pendiente"
Filtra los expedientes en espera de revisión o complemento de documentos:

![Pestaña Pendientes](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/02-tab-pendientes.png)

### 3.2 Pestaña "Aceptadas"
Muestra las solicitudes que ya cuentan con dictamen favorable y línea autorizada:

![Pestaña Aceptadas](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-tab-aceptadas.png)

### 3.3 Pestaña "Rechazadas"
Consolida las solicitudes denegadas por políticas de riesgo o buró:

![Pestaña Rechazadas](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/04-tab-rechazadas.png)

### 3.4 Búsqueda Predictiva
Permite encontrar cualquier expediente al instante por nombre, teléfono o folio:

![Búsqueda Predictiva](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/05-busqueda-filtrada.png)

---

## 4. Paso a Paso: Cómo Iniciar una Nueva Solicitud

### Paso 1: Iniciar el Trámite
Haz clic en el botón superior azul **"Nueva solicitud"**.

### Paso 2: Validación de Identidad (INE)
El sistema abre el asistente inicial solicitando la verificación de la credencial oficial:

![Modal Validación INE](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/06-modal-nueva-solicitud-ine.png)

1. Haz clic en **"Elegir cámara"** para seleccionar el dispositivo de escaneo o cámara web conectada.
2. Coloca o escanea la identificación oficial INE/IFE del cliente (frente y reverso).
3. El sistema realiza la validación de autenticidad y extrae automáticamente los datos biográficos principales.
4. Presiona **"Siguiente"** para avanzar al llenado del expediente.

---

## 5. Expediente Integral y Revisión de Solicitud (`/solicitudes-credito/:id/revision`)

Al hacer clic en cualquier solicitud del listado, el sistema abre el panel de análisis integral organizado en pestañas temáticas:

### 5.1 Información Básica
Contiene los datos biográficos oficiales (Nombres, Apellidos, Fecha de nacimiento, Estado civil, CURP, RFC, Correo y WhatsApp):

![Revisión - Información Básica](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/07-revision-info-basica.png)

### 5.2 Dirección
Detalla el domicilio particular verificado, código postal, colonia, municipio y referencias de ubicación:

![Revisión - Dirección](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/08-revision-direccion.png)

### 5.3 Empleo e Ingresos
Presenta la empresa donde labora el solicitante, puesto, antigüedad comprobable, ingresos mensuales y teléfono laboral:

![Revisión - Empleo](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/09-revision-empleo.png)

### 5.4 Referencias Personales y Familiares
Despliega los contactos de respaldo con parentesco, teléfonos verificados y validación de referencias:

![Revisión - Referencias](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/10-revision-referencias.png)

### 5.5 Buró de Crédito y Nivel de Riesgo
Muestra el score crediticio consolidado, semáforo de riesgo (*Riesgo medio / bajo / alto*), cuentas activas y comportamiento histórico de pagos:

![Revisión - Buró de Crédito](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/11-revision-buro-credito.png)

### 5.6 Intención de Compra
Consigna los artículos, línea de muebles, enganche propuesto y plan de financiamiento cotizado por el cliente:

![Revisión - Intención de Compra](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/12-revision-intencion-compra.png)

---

## 6. Dictamen y Acciones de Resolución

En la parte superior de la pantalla de revisión, los analistas y gerentes autorizados disponen de tres acciones de resolución:

1. **Aprobar solicitud:** Dictamina la solicitud como aceptada, fija la línea de crédito autorizada y habilita al vendedor para concretar la venta en caja.
2. **Rechazar solicitud:** Deniega el crédito fundamentado en las políticas de riesgo o capacidad de pago.
3. **Solicitar inf. adicional:** Regresa el trámite a estado pendiente para que la sucursal adjunte comprobantes adicionales o aclare datos.

---

## 7. Preguntas Frecuentes (FAQ)

### ¿Qué ocurre cuando una solicitud es Aprobada?
Pasa de inmediato al estado **Aceptada** y la línea de crédito queda disponible en el módulo de **Ventas** y **Clientes** para asociarla al pedido correspondiente.

### ¿Se puede reactivar una solicitud rechazada?
No de forma directa; si el cliente presenta nuevos comprobantes o un aval, se recomienda generar una nueva solicitud con la documentación complementaria.

### ¿Quiénes pueden Aprobar solicitudes de crédito?
Únicamente los usuarios con roles de **Administrador**, **Gerente** o **Analista de Crédito** con permisos explícitos configurados en la Matriz de Permisos de **Catálogos > Roles**.
