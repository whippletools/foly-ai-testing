# Manual de Usuario: Catálogo de Tasa de Mora Financiera

**Módulo:** Catálogos > Tasa de mora  
**Acceso en ERP:** Menú lateral > Catálogos > Tasa de mora (`/catalogos/tasa-mora`)  
**Dirigido a:** Dirección Financiera, Crédito y Cobranza, Tesorería y Contabilidad  

---

## 1. ¿Para qué sirve este módulo?

El módulo de **Tasa de mora** es el parámetro financiero maestro de **Foly Muebles** donde se fija el porcentaje de **interés moratorio anual** aplicable a los clientes que presentan atraso en el pago de sus letras o financiamientos.

### Regla Financiera del ERP:
> **Tasa de interés moratorio anual aplicada al capital vencido de los créditos.**  
> *El cambio aplica de inmediato a todo el sistema, incluida la mora ya vencida de meses anteriores sobre los saldos insolutos.*

---

## 2. Pantalla Principal y Parámetro Vigente

Al ingresar a **Catálogos > Tasa de mora**, se visualiza la tasa moratoria activa y la auditoría de última actualización:

![Pantalla Principal - Tasa de Mora](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/01-pantalla-principal-tasa-mora.png)

### Elementos de la Pantalla:
| Elemento | Descripción | Valor Actual en ERP |
|----------|-------------|---------------------|
| **Tasa de Mora (% anual)** | Porcentaje anualizado de recargo sobre capital vencido. | `30.00 % anual` |
| **Última actualización** | Registro de auditoría con fecha y hora exacta de modificación. | `5/8/2026, 1:08:32 p.m.` |
| **Botón "Guardar"** | Botón azul para asentar y aplicar el nuevo porcentaje. | `Guardar` |

---

## 3. Paso a Paso: Cómo Modificar la Tasa Moratoria

### Paso 1: Ingresar a la Pantalla
Navega en el menú lateral a **Catálogos > Tasa de mora**.

### Paso 2: Editar el Porcentaje
Haz clic sobre la casilla numérica e introduce el nuevo porcentaje anual acordado por el comité de crédito (ej. `36.00`):

![Edición de Porcentaje de Mora](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/02-edicion-porcentaje-mora.png)

### Paso 3: Guardar y Aplicar
Presiona el botón azul **"Guardar"**. 

El sistema recalculará automáticamente los intereses moratorios en los estados de cuenta de los clientes morosos y en la pantalla de cobro en caja.

---

## 4. Preguntas Frecuentes

### ¿Cómo se calcula el interés moratorio diario en una letra vencida?
> La fórmula financiera aplicada por el ERP es:  
> $$\text{Interés diario} = \frac{\text{Capital Vencido} \times (\text{Tasa Anual} / 100)}{360} \times \text{Días de Atraso}$$

### ¿Afecta el cambio de tasa a los créditos liquidados o al corriente?
> **No.** Solo genera recargos a los abonos que exceden su fecha límite de pago sin liquidarse.

### ¿Se pueden condonar intereses moratorios en caja?
> Las condonaciones o convenios de descuento sobre moratorios se autorizan a través del módulo de **Solicitudes de descuento** o mediante el perfil de *Supervisor de Cobranza*.
