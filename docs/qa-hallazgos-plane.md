# Registro Interno de Hallazgos y Bugs para Plane (Verificados)

Este documento contiene el re-análisis técnico y las evidencias en captura de pantalla para subir a **Plane**.

---

## 1. Módulo: Solicitudes de Crédito (`/solicitudes-credito`)

### 📌 CRED-01: Botón "Siguiente" deshabilitado en modal INE sin texto instructivo
- **Severidad:** Media (UX / Usabilidad)
- **Estado:** ✅ Resuelto en dev (`erpfoly-dev.vercel.app`) - Se incorporó la opción "Elegir cámara" y texto orientativo.
- **Evidencia Visual:** `@/Users/jovaniortizbarraza/Desktop/Foly-Pruebas/manual-screenshots/hallazgos-plane/BUG-CRED-01-modal-ine-boton-deshabilitado.png`
- **Descripción:** Al dar clic en `+ Nueva solicitud`, se abre el modal *"Paso 1 de 3 · Identificación oficial"*. En la versión inicial el botón *"Siguiente"* aparecía bloqueado sin instrucciones. En la versión `dev` ya se cuenta con selector de dispositivo de captura y feedback al usuario.
- **Pasos para reproducir:**
  1. Iniciar sesión en el ERP.
  2. Ir a **Solicitudes de crédito** (`/solicitudes-credito`).
  3. Hacer clic en el botón superior **"Nueva solicitud"**.
  4. Observar que el botón *"Siguiente"* está deshabilitado sin mensaje de ayuda complementario.

---

### 📌 CRED-02: Manejo de valores vacíos en solicitudes en Borrador
- **Severidad:** Baja (Informativo / Diseño)
- **Estado:** Comportamiento de sistema verificado
- **Evidencia Visual:** `@/Users/jovaniortizbarraza/Desktop/Foly-Pruebas/manual-screenshots/hallazgos-plane/BUG-CRED-02-listado-solicitudes-campos-guion.png`
- **Descripción:** En solicitudes con estatus `Borrador` (ej. ID 6), las columnas *Teléfono* y *Domicilio* muestran guión (`—`). Se validó que no rompe la interfaz, funcionando como fallback cuando el expediente aún no ha sido completado.

---

## 2. Módulo: Ventas y Cotizaciones (`/ventas`, `/ventas/nueva`, `/cotizaciones-guardadas`)

### 📌 VENT-01: Selector de cliente sin lista de recientes ni indicador de búsqueda
- **Severidad:** Baja (UX / Usabilidad)
- **Estado:** Confirmado / Real
- **Evidencia Visual:** `@/Users/jovaniortizbarraza/Desktop/Foly-Pruebas/manual-screenshots/hallazgos-plane/BUG-VENT-01-selector-cliente-sin-ayuda.png`
- **Descripción:** En la vista de Nueva Venta (POS), al hacer clic sobre el campo *"Buscar cliente"*, el dropdown no despliega clientes frecuentes ni una sugerencia de *"Escribe al menos 3 letras o teléfono"*, mostrando solo el cursor activo hasta que se teclea.
- **Pasos para reproducir:**
  1. Ir a **Ventas** > **Nueva venta** (`/ventas/nueva`).
  2. Hacer foco en el campo *"Buscar cliente"*.
  3. Observar la ausencia de dropdown predictivo inicial o texto placeholder orientativo.

---

### 📌 VENT-02: Cotizaciones guardadas sin cliente asignado
- **Severidad:** Baja (Informativo / Diseño)
- **Estado:** Comportamiento de sistema verificado
- **Evidencia Visual:** `@/Users/jovaniortizbarraza/Desktop/Foly-Pruebas/manual-screenshots/hallazgos-plane/BUG-VENT-02-cotizaciones-guardadas-sin-cliente.png`
- **Descripción:** En `/cotizaciones-guardadas` (ej. Folio 20), la columna *Cliente* presenta un guión (`—`) cuando la cotización fue guardada como presupuesto rápido de mostrador sin registrar los datos del cliente.
