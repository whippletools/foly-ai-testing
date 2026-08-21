# Manual de Usuario: Catálogo de Zonas

**Módulo:** Catálogos > Zonas  
**Acceso en ERP:** Menú lateral > Catálogos > Zonas (`/catalogos/zonas`)  
**Dirigido a:** Administradores, Gerentes de Logística, Supervisores de Rutas y Crédito  

---

## 1. ¿Para qué sirve este módulo?

El módulo de **Zonas** define la segmentación territorial y geográfica de operaciones de **Foly Muebles**. Permite agrupar municipios, sectores y colonias en regiones operativas para optimizar los procesos de:
- **Logística y Reparto:** Asignación de fletes y programación de camionetas en el módulo de **Rutas**.
- **Gestión de Cobranza:** Zonificación de carteras de crédito para cobradores y gestores de campo.
- **Costos de Envío:** Vinculación directa con el catálogo de **Costos de envío** para tarifar fletes según la distancia.

---

## 2. Pantalla Principal y Listado de Zonas

Al ingresar a **Catálogos > Zonas**, se presenta la tabla con todas las regiones registradas:

![Pantalla Principal - Listado de Zonas](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/01-listado-zonas.png)

### Columnas de la Tabla:
| Columna | Descripción | Ejemplo Real |
|---------|-------------|--------------|
| **ID** | Código identificador secuencial de 2 dígitos. | `01`, `02`, `03` |
| **Nombre** | Nombre de la región o zona operativa. | `Zona 1`, `Zona Centro`, `Zona Norte` |
| **Estatus** | Indicador visual de estado operativo. | Badge verde (*Activo*) / gris (*Inactivo*) |
| **Acciones** | Menú desplegable para editar o cambiar estatus. | `⋮` |

---

## 3. Pestañas de Filtro y Búsqueda Rápida

La cabecera incluye herramientas para clasificar y ubicar zonas al instante:

```
[Todos]  |  [Activas]  |  [Inactivas]
```

### 3.1 Filtro por Estado (Activas / Inactivas)
Permite consultar únicamente las regiones habilitadas o aquellas suspendidas temporalmente:

![Filtro Activas](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-filtro-activas.png)

---

### 3.2 Búsqueda Dinámica en Tiempo Real
Escribe en el campo **"Buscar"** el nombre o número de la zona para filtrar la tabla en segundos:

![Búsqueda Dinámica](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/HbV02-busqueda-filtrada.png)

---

## 4. Paso a Paso: Cómo Registrar una Nueva Zona

### Paso 1: Abrir el formulario de registro
Haz clic en el botón azul **"Nuevo"** ubicado en la esquina superior derecha:

![Modal Nueva Zona](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/04-modal-nueva-zona.png)

### Paso 2: Ingresar el Nombre de la Zona
- **Nombre (\*):** Escribe el nombre representativo del sector territorial (ej. *Zona 1*, *Zona Sur*, *Zona Conurbada*).

### Paso 3: Guardar la Zona
Haz clic en el botón azul **"Crear"**. La zona se registrará de inmediato con estatus **Activo** y quedará lista para vincularse a colonias, sucursales y tarifas de envío.

---

## 5. Menú de Acciones y Modificación de Zonas

Al final de cada fila, presiona el botón de tres puntos (`⋮`):

![Menú de Acciones](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/wcO05-menu-acciones-abierto.png)

```
[ ⋮ ]
 ├── 1. Editar
 └── 2. Desactivar / Activar
```

---

### 5.1 Opción 1: Editar Nombre de Zona
Permite renombrar o corregir la nomenclatura de la región:

![Modal Editar Zona](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/06-modal-editar-zona.png)

- Modifica el texto y presiona **"Guardar cambios"**.

---

### 5.2 Opción 2: Desactivar o Reactivar Zona
Si una zona geográfica queda temporalmente fuera de cobertura, selecciona **Desactivar** y confirma la acción en la ventana de advertencia:

![Diálogo Desactivar Zona](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/07-dialogo-desactivar-zona.png)

- Para reactivarla en el futuro, filtra en la pestaña **Inactivas**, abre el menú y selecciona **Activar**.

---

## 6. Preguntas Frecuentes

### ¿Dónde se utilizan estas zonas dentro del ERP?
> En el módulo de **Rutas y Entregas** para organizar los viajes de reparto diarios de los choferes, y en **Clientes** para asignar el domicilio a una zona de cobranza.

### ¿Qué pasa si desactivo una zona?
> Los clientes existentes conservarán su histórico, pero los cajeros y cotizadores no podrán asignar nuevas entregas a esa zona hasta que sea reactivada.

### ¿Se pueden eliminar zonas definitivamente?
> Para preservar la integridad de los contratos de crédito y facturas pasadas, el sistema utiliza el esquema de **Desactivación** en lugar de borrado físico.