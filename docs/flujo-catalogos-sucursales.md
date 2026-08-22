# Manual de Usuario: Catálogo de Sucursales

**Módulo:** Catálogos > Sucursales  
**Acceso en ERP:** Menú lateral > Catálogos > Sucursales (`/catalogos/sucursales`)  
**Dirigido a:** Administradores, Gerentes de Tienda, Contabilidad, Logística y Almacén  

---

## 1. ¿Para qué sirve este módulo?

El módulo de **Sucursales** administra la infraestructura física y centros de distribución de **Foly Muebles**. Permite dar de alta tiendas comerciales, bodegas de almacenamiento y puntos de entrega, configurando su ubicación geográfica exacta, zona de reparto y domicilio fiscal.

A través de este catálogo se controlan:
- **Puntos de Venta y Almacenes:** Registro de todas las tiendas de la cadena (*Tampico Centro, Tampico Aeropuerto, Altamira, Coatzacoalcos, Ejército Mexicano, Pánuco, SLP Carranza, SLP Soledad, Veracruz Puerto, Bodega Tampico*).
- **Asignación Territorial:** Vinculación directa con el catálogo de **Zonas**.
- **Georreferenciación:** Coordenadas GPS (Latitud y Longitud) y mapa interactivo para optimizar el ruteo de entregas.
- **Asignación de Personal y Cajas:** Base para autorizar usuarios, vendedores y aperturas de caja en **Catálogos > Usuarios** y **Catálogos > Cajas**.

---

## 2. Pantalla Principal y Listado de Sucursales

Al ingresar a **Catálogos > Sucursales**, se presenta el directorio maestro de tiendas:

![Pantalla Principal - Listado de Sucursales](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/01-listado-sucursales-real.png)

### Columnas de la Tabla:
| Columna | Descripción | Ejemplo Real en Sistema |
|---------|-------------|-------------------------|
| **ID** | Código numérico de 2 dígitos de la tienda. | `01`, `02`, `04`, `11` |
| **Nombre** | Nombre comercial de la sucursal o bodega. | `Foly Muebles Tampico Centro`, `Foly Muebles Coatzacoalcos` |
| **Zona** | Región operativa asignada. | `Zona 1`, `Zona 2`, `Sin zona` |
| **Domicilio** | Dirección completa con calle, número, colonia, municipio, estado y CP. | `Cristóbal Colón 103, TAMPICO CENTRO, Tampico, Tamaulipas, 89000` |
| **Estatus** | Estado operativo de la tienda. | Badge verde (*Activo*) / gris (*Inactivo*) |
| **Fecha registro** | Fecha en que se dio de alta en el ERP. | `29/07/2026` |
| **Últ. actualización** | Fecha de última modificación de datos o domicilio. | `06/08/2026` o `—` |
| **Acciones** | Menú de opciones de edición y estatus. | `⋮` |

---

## 3. Pestañas de Filtro y Búsqueda en Tiempo Real

La vista principal cuenta con filtros superiores para clasificar tiendas y bodegas:

```
[Todos]  |  [Activas]  |  [Inactivas]
```

### 3.1 Filtro de Sucursales Activas / Inactivas
Permite visualizar rápidamente solo las sucursales en operación o consultar el histórico de ubicaciones cerradas:

![Filtro Activas](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-filtro-activas-real.png)

---

### 3.2 Búsqueda Dinámica
Escribe en el campo **"Buscar"** el nombre de la ciudad o calle (ej. *Altamira*, *Coatzacoalcos*) para filtrar la tabla en tiempo real:

![Búsqueda Dinámica](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/02-busqueda-filtrada-real.png)

---

## 4. Paso a Paso: Cómo Dar de Alta una Nueva Sucursal

### Paso 1: Abrir el formulario de captura
Haz clic en el botón azul **"Nuevo"** en la esquina superior derecha:

![Modal Nueva Sucursal](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/A2F03-modal-nueva-sucursal.png)

### Paso 2: Datos Generales y Zonificación
- **Nombre de la sucursal (\*):** Nombre distintivo (ej. *Foly Muebles Poza Rica*).
- **Zona:** Selecciona la zona operativa registrada en **Catálogos > Zonas**.
- **Segmento de negocio:** Clasificación comercial interna.

### Paso 3: Domicilio y Georreferenciación
- **Calle (\*) y Número Exterior (\*):** Dirección física de la tienda.
- **Número Interior:** Opcional (ej. Local 4B, Plaza Comercial).
- **Código Postal (\*):** Al ingresar los 5 dígitos, el ERP autocompleta:
  - **Colonia (\*)** (menú desplegable de colonias válidas).
  - **Estado** y **Municipio**.
- **Latitud y Longitud:** Coordenadas GPS para visualización en el mapa interactivo de logística.

### Paso 4: Guardar
Haz clic en **"Guardar"**. La nueva sucursal aparecerá de inmediato en el listado y estará disponible en todo el ERP para asignación de existencias, usuarios y ventas.

---

## 5. Menú de Acciones y Modificaciones

Al final de cada fila, presiona el botón de opciones (`⋮`):

![Menú de Acciones](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/Gmr04-menu-acciones-abierto.png)

```
[ ⋮ ]
 ├── 1. Editar sucursal
 └── 2. Desactivar / Activar
```

---

### 5.1 Edición y Consulta de Ficha Técnica
Permite actualizar teléfonos, coordenadas GPS o corregir la zona asignada:

![Ficha Detalle de Sucursal](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/5rf04-clic-fila-sucursal.png)

---

## 6. Preguntas Frecuentes

### ¿Qué impacto tiene la Zona asignada a una sucursal?
> Determina las rutas de reparto predeterminadas para los pedidos originados en esa tienda y las tarifas de flete aplicables en **Catálogos > Costos de envío**.

### ¿Cómo se asignan vendedores o cajeros a una nueva sucursal?
> Una vez creada la sucursal en este catálogo, dirígete a **Catálogos > Usuarios**, abre la ficha del colaborador y marca la casilla de la nueva tienda en la sección *Sucursal Asignada*.

### ¿Se puede cambiar el estatus de una sucursal a Inactivo?
> **Sí.** Al desactivar una sucursal, no se permitirá abrir nuevas cajas ni capturar ventas en esa tienda, pero se conservará todo el historial contable, existencias pasadas y garantías de clientes.