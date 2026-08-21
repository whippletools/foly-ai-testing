# Flujo: Catálogos - Tasa de mora

## Fecha: 2026-08-17
## Módulo: Catálogos > Tasa de mora
## URL: /catalogos/tasa-mora
## Estado: Documentado

---

## 1. Descripción General

El submódulo **Tasa de mora** permite definir y actualizar el porcentaje de interés moratorio que el sistema ERP Foly aplica de forma automática a las cuentas y abonos vencidos de los clientes con crédito activo. Este valor actúa como parámetro global para el cálculo financiero de recargos por retraso de pago en el módulo de Cobranza y Ventas a Crédito.

---

## 2. Acceso al Módulo

### Navegación por sidebar:
1. Iniciar sesión en el sistema ERP Foly.
2. En el menú lateral izquierdo, hacer clic en **Catálogos** para expandir las opciones.
3. Hacer clic en **Tasa de mora**.
4. URL resultante: `/catalogos/tasa-mora`.

### Permisos requeridos:
- Requiere rol de **Administrador** o usuario con permisos especiales de configuración financiera en Catálogos.

---

## 3. Elementos de la UI Identificados

### Header
- **Título**: "Tasa de mora" (`h1`).
- **Botón "Nueva solicitud"**: Acceso rápido global en el encabezado.

### Formulario de Configuración
- **Campo de porcentaje de tasa**:
  - **Tipo**: Numérico / Decimal (`input[type="text"]` con formato de moneda/porcentaje).
  - **Placeholder**: `0.00`
  - **Función**: Permite ingresar el porcentaje mensual o anualizado de recargo por mora.
- **Botón "Guardar"**:
  - **Ubicación**: Junto al campo o en la parte inferior del formulario.
  - **Función**: Aplica la nueva tasa moratoria a nivel global en la base de datos del ERP.

---

## 4. Flujo de Configuración: Modificar Tasa de Mora

### Paso 1: Acceder al submódulo
- Navegar a **Catálogos > Tasa de mora**.
- El sistema muestra el valor porcentual actualmente configurado.

### Paso 2: Ingresar la nueva tasa
- Hacer clic en el campo numérico de la tasa.
- Ingresar el nuevo porcentaje aplicable (ejemplo: `5.00` para 5%).

### Paso 3: Guardar cambios
- Hacer clic en el botón **"Guardar"**.
- El sistema valida el formato numérico y actualiza la tasa moratoria.
- Se muestra confirmación visual de guardado exitoso.

---

## 5. Impacto en Otros Módulos

| Módulo Afectado | Impacto de la Tasa de Mora |
|-----------------|-----------------------------|
| **Crédito y Cobranza** | Cálculo diario o quincenal del recargo moratorio en abonos vencidos. |
| **Caja / Cobros** | Desglose automático de saldo regular vs. recargo moratorio en el recibo de pago. |
| **Estados de Cuenta** | Visualización clara del interés generado por atraso en el historial del cliente. |

---

## 6. Consideraciones y Reglas de Negocio

1. **Vigencia no retroactiva**: El cambio en la tasa de mora generalmente aplica para los cortes y vencimientos generados a partir de la fecha de actualización, respetando las condiciones contractuales previamente emitidas en pagarés de crédito.
2. **Validación de rango**: El campo no admite valores negativos y requiere validación de 2 decimales (`0.00`).
3. **Auditoría**: Toda modificación de tasa de mora queda registrada en la bitácora del sistema con usuario, fecha y valor anterior.
