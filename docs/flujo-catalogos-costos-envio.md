# Manual de Usuario: Catálogo de Costos de Envío y Fletes

**Módulo:** Catálogos > Costos de envío  
**Acceso en ERP:** Menú lateral > Catálogos > Costos de envío (`/catalogos/costos-envio`)  
**Dirigido a:** Logística, Embarques, Ventas, Gerentes de Sucursal y Atención a Clientes  

---

## 1. ¿Para qué sirve este módulo?

El módulo de **Costos de envío** administra las tarifas de flete y entrega a domicilio de **Foly Muebles**. Permite definir precios por municipio, diferenciar entre entregas urbanas locales y entregas foráneas, y delimitar visualmente polígonos de cobertura sobre un mapa satelital.

A través de esta herramienta se configuran:
- **Tarifas Dentro de Zona:** Costo de entrega estándar o gratuita (`$0.00`) para domicilios ubicados dentro del perímetro urbano de la tienda.
- **Tarifas Fuera de Zona:** Costo de flete adicional para entregas foráneas, ejidos o colonias periféricas.
- **Georreferenciación en Mapa Satelital:** Herramienta interactiva de Google Maps para trazar polígonos de reparto con precisión geográfica.
- **Cálculo Automático en Pedidos:** Al ingresar la dirección del cliente en una venta o solicitud de crédito, el ERP calcula el flete aplicable automáticamente.

---

## 2. Pantalla Principal y Selección de Ciudad

Al ingresar a **Catálogos > Costos de envío**, el panel solicita seleccionar el municipio a configurar:

![Pantalla Principal - Selección de Ciudad](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/01-pantalla-inicial-seleccion-ciudad.png)

---

## 3. Búsqueda y Selección de Municipio

En el campo **"Buscar municipio..."**, escribe el nombre de la ciudad o estado (ej. *Tampico*, *Altamira*, *Pánuco*, *Coatzacoalcos*):

![Buscador de Municipios](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/02-buscador-autocompletado-ciudad.png)

---

## 4. Configuración de Tarifas y Delimitación de Zonas

Una vez seleccionado el municipio (ej. *Tampico (Tamaulipas)*), se cargan las tarifas y el mapa de cobertura:

![Mapa y Tarifas de Municipio](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-mapa-y-tarifas-municipio.png)

### 4.1 Campos de Tarifas de Envío:
| Parámetro | Descripción | Ejemplo de Configuración |
|-----------|-------------|--------------------------|
| **Costo dentro de zona ($)** | Tarifa para domicilios dentro del polígono urbano. | `$0.00` (Envío gratis) o `$150.00` |
| **Costo fuera de zona ($)** | Tarifa para direcciones fuera del polígono trazado. | `$450.00` o `$600.00` |

---

### 4.2 Edición de Montos en Pesos
Captura los importes correspondientes según la política de fletes vigente:

![Edición de Tarifas](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/04-edicion-tarifas-dentro-fuera-zona.png)

---

### 4.3 Trazado de Nuevas Zonas de Cobertura en el Mapa
Presiona el botón **"Nueva"** para trazar un nuevo polígono de reparto sobre el mapa satelital:

![Trazado de Cobertura en Mapa](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/05-trazado-nueva-zona-mapa.png)

- Haz clic en los diferentes puntos del mapa para delimitar las colonias y avenidas que componen el perímetro de entrega.

---

### Paso Final: Guardar Cambios
Haz clic en el botón azul **"Guardar cambios"** en la esquina superior derecha. Las tarifas se aplicarán de inmediato en el cotizador de ventas y en la logística de rutas.

---

## 5. Preguntas Frecuentes

### ¿Cómo sabe el sistema si una entrega es "dentro" o "fuera" de zona?
> Al capturar el Código Postal y las coordenadas GPS del domicilio del cliente en el módulo de **Ventas** o **Clientes**, el ERP valida si el punto geográfico cae dentro del polígono trazado en este mapa.

### ¿Se pueden configurar envíos gratuitos a partir de cierto monto de compra?
> Las promociones de *Envío Gratis* se configuran en **Catálogos > Promociones** vinculadas a este tabulador de fletes.

### ¿Qué sucede si un municipio no tiene zonas trazadas?
> El sistema cobrará la tarifa predeterminada de *Costo fuera de zona* para todas las entregas dirigidas a esa localidad.
