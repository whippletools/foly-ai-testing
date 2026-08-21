# Flujo: Catálogos - Mensajes

## Fecha: 2026-08-10
## Módulo: Catálogos > Mensajes
## URL: /catalogos/mensajes
## Estado: Documentado

---

## 1. Descripción General

El submódulo **Mensajes** permite gestionar los mensajes predeterminados o plantillas que se envían a los clientes. Cada mensaje registra un nombre, el contenido del mensaje y un estatus que indica si está en uso o no. Se utiliza para automatizar comunicaciones como recordatorios de pago, advertencias judiciales, agradecimientos y promociones.

---

## 2. Acceso al Módulo

### Navegación por sidebar:
1. Iniciar sesión como Administrador
2. En el menú lateral, hacer clic en **Catálogos** (se expande)
3. Hacer clic en **Mensajes**
4. URL resultante: `/catalogos/mensajes`

### Nota importante:
- El acceso requiere navegación por sidebar con sesión activa.
- El usuario debe contar con permisos de Administrador para visualizar y gestionar mensajes.

---

## 3. Elementos de la UI Identificados

### Header
- **Título**: "Mensajes" (h1)
- **Buscador**: Campo de texto con placeholder "Buscar"
- **Botón "Nuevo"**: Azul, arriba a la derecha. Crea un nuevo mensaje.

### Tabla de Mensajes
| Columna | Descripción |
|---------|-------------|
| **ID** | Código numérico del mensaje (ej. 01, 02, 03) |
| **Nombre** | Nombre descriptivo del mensaje (ej. "Email de recordatorio 1 semana") |
| **Mensaje** | Contenido del mensaje (truncado en la tabla) |
| **Estatus** | Estado del mensaje (En uso / Sin uso) |

### Mensajes de ejemplo (datos reales):

| ID | Nombre | Mensaje | Estatus |
|----|--------|---------|---------|
| 03 | Email de recordatorio 1 semana | Esta es tu recordatorio semanal: Tu próximo pago vence... | En uso |
| 04 | Mensaje advertencia judicial | No hemos recibido el pago correspondiente a *factura_... | En uso |
| 07 | Mensaje de agradecimiento | ¡Gracias por tu pago! Tu cuenta ha sido actualizada corr... | En uso |
| 02 | Mensaje de invitación de pago | ¡Hola! Te invitamos a realizar tu pago el día de hoy por c... | En uso |
| 05 | Mensaje Notificación cobranza judicial | Tu cuenta presenta mora prolongada. Este mensaje es u... | En uso |
| 09 | Mensaje promoción pago anticipado | ¡Aprovecha! Si realizas tu pago antes del *fecha_limite* ... | Sin uso |
| 01 | Mensaje recordatorio de pago | ¡Hola! Te recordamos que la fecha límite de pago es el p... | En uso |
| 10 | Mensaje recordatorio semanal | Esta es tu recordatorio semanal: Tu próximo pago vence... | Sin uso |
| 11 | Recordatorio de pago | Te recordamos que tienes un pago pendiente. Comunic... | En uso |
| 12 | Recordatorio de pago WhatsApp | Hola, te compartimos un recordatorio de tu pago pendie... | Sin uso |

---

## 4. Flujo Principal: Crear Nuevo Mensaje

### Paso 1: Navegar a Catálogos > Mensajes
- Iniciar sesión como Administrador
- Clic en Catálogos en sidebar → Clic en Mensajes
- Verificar título "Mensajes" visible
- Verificar tabla con mensajes cargados

### Paso 2: Clic en botón "Nuevo"
- Botón azul superior derecha
- Se abre el formulario de creación de mensaje

### Paso 3: Llenar formulario "Nuevo mensaje"

El formulario se abre como un modal lateral con el título **"Nuevo mensaje"**.

#### Botón del formulario:
- **Guardar**: Guarda el nuevo mensaje

#### Campos del formulario:

| Campo | Tipo | Requerido | Descripción |
|-------|------|-----------|-------------|
| **Nombre del mensaje** | Input | Sí | Ingresa el nombre del mensaje |
| **Contenido del mensaje** | Textarea | Sí | Escribe el contenido del mensaje aquí... |

#### Variables disponibles para el mensaje:

El formulario permite insertar datos variables del cliente usando las siguientes etiquetas:

- **\*fecha_limite\*** — Fecha límite de pago
- **\*num_factura\*** — Número de factura
- **\*descripcion_factura\*** — Descripción de la factura
- **\*total_adeudo\*** — Total adeudado
- **\*proximo_pag\*** — Próximo pago

### Paso 4: Guardar y verificar
- Clic en **Guardar**
- El mensaje aparece en la tabla con el estatus correspondiente

---

## 5. Flujo Secundario: Buscar Mensaje

### Paso 1: Navegar a Catálogos > Mensajes

### Paso 2: Usar el buscador
- Escribir el nombre del mensaje en el campo de búsqueda

### Paso 3: Verificar resultados
- Tabla filtrada con mensajes coincidentes

---

## 6. Consideraciones Importantes

- Los mensajes pueden tener estatus **"En uso"** o **"Sin uso"**.
- El estatus **"En uso"** se visualiza con un badge verde.
- El contenido del mensaje se muestra truncado en la tabla; para verlo completo se debe abrir el mensaje.
- Las **variables dinámicas** permiten personalizar mensajes automáticos con datos del cliente (fecha límite, número de factura, total adeudado, etc.).
- Los mensajes se utilizan en módulos de cobranza y notificaciones automáticas.

---
