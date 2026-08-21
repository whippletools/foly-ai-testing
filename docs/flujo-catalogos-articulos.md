# Manual de Usuario: Catálogo de Artículos

**Módulo:** Catálogos > Artículos  
**Acceso en ERP:** Menú lateral > Catálogos > Artículos (`/catalogos/productos`)  
**Dirigido a:** Administradores, Gerentes de Tienda, Encargados de Compras, Ventas e Inventario  

---

## 1. ¿Para qué sirve este módulo?

El módulo **Artículos** es el catálogo maestro donde se centraliza la información de todos los productos y muebles comercializados por **Foly Muebles**. 

Permite gestionar integralmente:
- **Clasificación y Códigos:** Asociación con departamentos, sublíneas y claves fiscales del SAT.
- **Disponibilidad por Sucursales:** Tiendas físicas y bodegas autorizadas para venta.
- **Proveedores y Abastecimiento:** Tiempos de entrega y claves de proveedor.
- **Estructura de Precios:** Costo de compra, margen, precio de contado y financiamiento a crédito.
- **Galería Visual:** Fotos del producto para cotizaciones y catálogo en línea.
- **Paquetes y Combos:** Integración de paquetes de muebles con descuento especial.

---

## 2. Pantalla Principal y Listado de Artículos

Al ingresar a **Catálogos > Artículos**, se muestra el listado completo de productos registrados:

![Pantalla Principal - Listado de Artículos](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/01-listado-productos.png)

### Elementos de Control:
1. **Buscador en tiempo real (`Buscar`):** Permite filtrar por código de producto, descripción o departamento.
2. **Filtros por Estado:**
   - **Todas:** Muestra todo el catálogo general.
   - **Activos:** Productos disponibles para venta.
   - **Borradores:** Artículos en proceso de captura o pendientes de aprobación.
3. **Tabla de Resultados:**
   - **ID:** Identificador numérico del producto.
   - **Código:** SKU comercial único (ej. `10SAL-CEN00001`).
   - **Estatus:** Badge verde (*Activo*) o gris (*Inactivo/Borrador*).
   - **Nombre:** Nombre y descripción comercial completa.
   - **Departamento:** Área o categoría (ej. *SAL - Sala*, *OFI - Oficina*).
   - **Línea:** Subcategoría (ej. *SAL-COM - Salas completas*).
4. **Botón "Nuevo" (Azul):** Ubicado en la esquina superior derecha para registrar un nuevo producto.

---

## 3. Consulta y Ficha de Detalle del Artículo

Al hacer clic sobre cualquier fila de la tabla, el sistema abre la ficha técnica detallada del artículo para consultar sus especificaciones completas o realizar modificaciones:

![Ficha de Detalle del Artículo](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/02-ficha-detalle-articulo.png)

---

## 4. Paso a Paso: Registro de Nuevo Artículo (Desglose por Pestañas)

Al presionar el botón azul **"Nuevo"**, se abre el formulario de captura dividido en **6 pestañas funcionales**:

```
[Datos generales] → [Sucursales] → [Proveedores] → [Precio] → [Galería] → [Paquetes]
```

---

### Pestaña 1: Datos Generales
Aquí se capturan las características esenciales del artículo y su homologación fiscal ante el SAT:

![Pestaña 1 - Datos Generales](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-tab-1-datos-generales.png)

- **Departamento (\*):** Categoría principal del producto (*Sala, Oficina, Recámara, etc.*).
- **Línea (\*):** Subcategoría vinculada al departamento seleccionado.
- **Código:** Se genera automáticamente por el ERP con base en el departamento y línea.
- **Descripción del artículo (\*):** Nombre completo del producto para facturación y notas de venta.
- **Nombre corto (\*):** Nombre compacto para tickets y reportes reducidos.
- **Clave de producto/servicio SAT (\*):** Código fiscal oficial ante el SAT.
- **Clave de unidad de medida SAT (\*):** Unidad de medida fiscal (ej. *H87 - Pieza*).
- **Número de piezas (\*):** Total de cajas o bultos que conforman el producto (default `1`).
- **Garantía por meses / Póliza anexa:** Plazo de garantía de fábrica aplicable.

---

### Pestaña 2: Sucursales
Permite habilitar o restringir en qué tiendas físicas y centros de distribución estará disponible el artículo para venta:

![Pestaña 2 - Sucursales](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-tab-2-sucursales.png)

- Selecciona las casillas correspondientes a las tiendas autorizadas (*Tampico, Altamira, Veracruz, San Luis Potosí, etc.*).
- Opción global para activar en todas las sucursales simultáneamente.

---

### Pestaña 3: Proveedores
Asocia el producto con las empresas fabricantes o mayoristas que lo surten:

![Pestaña 3 - Proveedores](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-tab-3-proveedores.png)

- **Selección de Proveedor:** Empresa proveedora registrada en el catálogo de proveedores.
- **Código de Proveedor:** Código interno que utiliza el fabricante.
- **Días de entrega:** Tiempo estimado en días para surtido de mercancía.

---

### Pestaña 4: Precio
Configura la política de costos, precios de venta y financiamiento:

![Pestaña 4 - Precio](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-tab-4-precio.png)

- **Costo de compra:** Precio de adquisición ante el fabricante (sin IVA / con IVA).
- **Margen de utilidad (%):** Porcentaje de ganancia deseado.
- **Precio Contado:** Precio final de venta directa al cliente en una sola exhibición.
- **Precio Crédito:** Precio base sobre el cual se calcularán las cuotas quincenales y mensuales.
- **Aplica Folypuntos:** Permite acumular puntos de lealtad en las compras del cliente.

---

### Pestaña 5: Galería
Permite cargar imágenes en alta definición para que los vendedores y clientes puedan visualizarlas en el punto de venta:

![Pestaña 5 - Galería](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-tab-5-galer-a.png)

- **Subir imágenes:** Arrastra o selecciona archivos en formato JPG o PNG.
- **Foto principal:** Define la imagen que se mostrará como miniatura en el catálogo.

---

### Pestaña 6: Paquetes
Configura si el artículo forma parte de un paquete de muebles o combo promocional:

![Pestaña 6 - Paquetes](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-tab-6-paquetes.png)

- Permite vincular artículos complementarios (ej. *Comedor + 6 Sillas + Trinchador*) con un precio global preferencial.

---

## 5. Preguntas Frecuentes

### ¿Por qué no se habilita el botón "Guardar"?
> El botón **Guardar** requiere que todos los campos con asterisco (*) de la pestaña **Datos Generales** y al menos una sucursal en **Sucursales** estén correctamente configurados.

### ¿Cómo desactivo un artículo que ya no se comercializa?
> Accede a la ficha del artículo y cambia su estatus a **Inactivo**. El producto dejará de ser visible en el catálogo de ventas, pero se preservará todo el historial en facturación, cobranza y garantías.

### ¿Dónde consulto las existencias físicas en tienda?
> Este catálogo gestiona la configuración técnica y comercial del producto. Para consultar el inventario físico en tiempo real por almacén o tienda, debes ingresar al módulo principal **Inventario**.
