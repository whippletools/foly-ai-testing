# Manual de Usuario: Catálogo de Folypuntos y Programa de Lealtad

**Módulo:** Catálogos > Folypuntos  
**Acceso en ERP:** Menú lateral > Catálogos > Folypuntos (`/catalogos/folypuntos`)  
**Dirigido a:** Mercadotecnia, Ventas, Finanzas, Crédito y Cobranza y Gerencia General  

---

## 1. ¿Para qué sirve este módulo?

El módulo de **Folypuntos** administra las reglas y equivalencias monetarias del **Programa de Recompensas y Fidelización** de **Foly Muebles**. Permite premiar a los clientes otorgándoles puntos por sus compras que posteriormente pueden utilizar como dinero en efectivo para pagar enganches, liquidar saldos o comprar nuevos muebles.

A través de este catálogo se parametrizan:
- **Reglas de Acumulación (Compra a Puntos):** Cuántos pesos gastados generan 1 Folypunto.
- **Reglas de Canje o Redención (Puntos a Pesos):** Cuánto dinero en moneda nacional vale cada Folypunto al momento de pagar en caja.
- **Diferenciación por Tipo de Venta:** Reglas independientes para compras de **Contado**, **Crédito** y **Apartado**.

---

## 2. Pantalla Principal y Pestañas por Tipo de Venta

Al ingresar a **Catálogos > Folypuntos**, se presenta el panel de configuración dividido en 3 modalidades de venta:

```
[ Pestaña: Contado ]  |  [ Pestaña: Crédito ]  |  [ Pestaña: Apartado ]
```

---

### 2.1 Pestaña 1: Configuración para Ventas de Contado
Configura los puntos otorgados a clientes que liquidan en una sola exhibición (efectivo, tarjeta de débito/crédito, transferencia):

![Folypuntos - Contado](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/01-folypuntos-tab-contado.png)

---

### 2.2 Pestaña 2: Configuración para Ventas a Crédito
Incentiva la compra a plazos y el pago puntual de abonos:

![Folypuntos - Crédito](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/02-folypuntos-tab-credito.png)

---

### 2.3 Pestaña 3: Configuración para Planes de Apartado
Premia a los clientes que aseguran mercancía mediante sistema de apartado:

![Folypuntos - Apartado](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-folypuntos-tab-apartado.png)

---

## 3. Parámetros y Reglas de Equivalencia

En cada pestaña se configuran dos secciones fundamentales:

### Sección A: Equivalencia de Compra a Folypuntos (Generación de Puntos)
> Define cuántos Folypuntos recibe el cliente en su monedero electrónico por cada peso gastado.

| Campo | Ejemplo | Interpretación |
|-------|---------|----------------|
| **Por cada ($)** | `$10.00` | Monto base de compra requerido. |
| **Folypuntos** | `1` | Cantidad de puntos acreditados al cliente. |

*Ejemplo:* En una compra de `$5,000.00` con factor `$10 = 1 punto`, el cliente acumula **500 Folypuntos**.

---

### Sección B: Equivalencia de Venta a Folypuntos (Canje / Valor del Punto)
> Define el valor monetario en pesos mexicanos que tiene cada Folypunto al ser utilizado como método de pago.

| Campo | Ejemplo | Interpretación |
|-------|---------|----------------|
| **1 Folypunto** | `$1.00` | Cada punto equivale exactamente a $1.00 peso mexicano de descuento directo. |

---

## 4. Paso a Paso: Cómo Modificar y Guardar las Equivalencias

### Paso 1: Seleccionar la Modalidad
Haz clic en la pestaña correspondiente (**Contado**, **Crédito** o **Apartado**).

### Paso 2: Editar los Factores
Ingresa los nuevos valores deseados en las casillas:

![Edición de Equivalencias](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/04-edicion-valores-equivalencias.png)

### Paso 3: Guardar Cambios
Haz clic en el botón azul **"Guardar"** en la esquina superior derecha. Las nuevas equivalencias se aplicarán de inmediato en todas las cajas y módulos de venta de la empresa.

---

## 5. Preguntas Frecuentes

### ¿Dónde consulta el cliente su saldo de Folypuntos?
> En el ticket de compra impreso en caja, en el portal de clientes y en la ficha del cliente en **Clientes > Consulta**.

### ¿Se pueden pagar compras combinando Folypuntos y Efectivo?
> **Sí.** En el módulo de **Cajas**, el cajero puede aplicar los Folypuntos disponibles del cliente como pago parcial y liquidar la diferencia con efectivo, tarjeta o crédito.

### ¿Los Folypuntos tienen fecha de caducidad?
> La vigencia general del monedero electrónico es de 12 meses naturales a partir de la fecha de emisión.
