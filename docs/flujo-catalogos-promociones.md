# Manual de Usuario: Catálogo de Departamentos

**Módulo:** Catálogos > Departamentos  
**Acceso en ERP:** Menú lateral > Catálogos > Departamentos (`/catalogos/departamentos`)  
**Dirigido a:** Administradores, Gerentes de Compras, Contadores y Encargados de Inventario  

---

## 1. ¿Para qué sirve este módulo?

El módulo de **Departamentos** estructura y clasifica jerárquicamente todo el inventario de **Foly Muebles**. Es la base sobre la cual se organizan los artículos, se definen los márgenes de utilidad esperados y se vinculan las cuentas contables de inventario y resultados.

A través de este catálogo se gestionan:
- **Categorías Comerciales:** Agrupación principal de productos (*Cocinas, Colchones, Comedor, Electrodomésticos, Muebles, etc.*).
- **Márgenes de Utilidad Sugeridos (%):** Porcentaje objetivo de rentabilidad para los artículos del departamento.
- **Líneas y Subdepartamentos:** Subcategorías especializadas para organizar los productos (ej. en *Cocinas*: *Cocinas integrales, Alacenas, Repisas*).
- **Integración Contable:** Mapeo con las cuentas del catálogo contable para inventario en balance y cuentas de resultados.

---

## 2. Pantalla Principal y Listado de Departamentos

Al ingresar a **Catálogos > Departamentos**, se presenta la tabla central con todas las categorías activas:

![Pantalla Principal - Listado de Departamentos](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/ACN01-listado-departamentos.png)

### Columnas de la Tabla:
| Columna | Descripción | Ejemplo Real |
|---------|-------------|--------------|
| **ID** | Código identificador de 2 dígitos del departamento. | `04`, `06`, `08` |
| **Nombre** | Nombre de la categoría comercial. | `Cocinas`, `Colchones`, `Electrodomésticos` |
| **Margen** | Porcentaje de utilidad objetivo asignado a la categoría. | `25.00%`, `32.00%`, `18.00%` |
| **Cuenta Inventario** | Cuenta contable asignada para valuación de existencias. | `Sin asignar` o código contable |
| **Cuenta Resultados** | Cuenta contable para registro de ingresos / costo de ventas. | `Sin asignar` o código contable |
| **Líneas** | Listado de subcategorías vinculadas a este departamento. | *Cocinas integrales, Alacenas, Repisas...* |
| **Acciones** | Menú desplegable para editar o gestionar el departamento. | `⋮` |

---

## 3. Búsqueda y Filtrado en Tiempo Real

El módulo incluye un buscador dinámico en la parte superior para localizar cualquier departamento por nombre o ID de inmediato:

![Búsqueda Dinámica de Departamentos](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/02-busqueda-filtrada.png)

- Escribe parte del nombre (ej. *Cocinas*) para que la tabla filtre automáticamente los resultados coincidentes.

---

## 4. Paso a Paso: Cómo Crear un Nuevo Departamento

### Paso 1: Abrir el formulario de registro
Haz clic en el botón azul **"Nuevo departamento"** en la esquina superior derecha:

![Modal Nuevo Departamento](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-modal-nuevo-departamento.png)

### Paso 2: Llenar la Información Requerida
1. **Nombre de la categoría (\*):** Escribe el nombre oficial del departamento (ej. *Línea Blanca*, *Electrónica*, *Decoración*).
2. **Margen (\*):** Ingresa el porcentaje de margen de utilidad esperado (valor numérico entre `0` y `100`).
3. **Cuenta contable inventario:** Selecciona la cuenta contable donde se registrará el valor de los artículos de este departamento en el balance general.
4. **Cuenta contable resultados:** Selecciona la cuenta contable para el registro de ingresos y costo de ventas.

### Paso 3: Guardar el Departamento
Haz clic en el botón **"Crear"**. El nuevo departamento aparecerá de inmediato en la tabla.

---

## 5. Menú de Acciones y Gestión de Departamentos

Al final de cada fila, al presionar el botón de tres puntos (`⋮`), se despliega el menú con las 3 opciones de administración:

![Menú de Acciones](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/04-menu-opciones-abierto.png)

```
[ ⋮ ]
 ├── 1. Ver detalle
 ├── 2. Editar
 └── 3. Eliminar
```

---

### 5.1 Opción 1: Ver Detalle del Departamento
Permite consultar la ficha completa del departamento con sus líneas y cuentas asociadas:

![Vista Ver Detalle](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/06-vista-ver-detalle.png)

---

### 5.2 Opción 2: Editar Departamento
Permite modificar el nombre, margen de rentabilidad y cuentas contables:

![Modal Editar Departamento](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/05-modal-editar-departamento.png)

- Realiza los ajustes necesarios y presiona **"Guardar cambios"**.

---

### 5.3 Opción 3: Eliminar Departamento
Si un departamento fue creado por error y **no tiene artículos asociados**, el sistema permite su eliminación mediante un cuadro de confirmación de seguridad:

![Diálogo Confirmar Eliminación](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/07-dialogo-confirmacion-eliminar.png)

- Presiona **"Confirmar"** para borrar el departamento o **"Cancelar"** para mantenerlo intacto.

---

## 6. Preguntas Frecuentes

### ¿Qué sucede si cambio el porcentaje de Margen de un departamento?
> El nuevo porcentaje servirá como sugerencia predeterminada al momento de dar de alta nuevos artículos dentro de esta categoría. Los precios de los artículos ya existentes no se alteran automáticamente.

### ¿Puedo eliminar un departamento que ya tiene artículos registrados?
> **No por seguridad.** Si un departamento ya tiene productos vinculados, el sistema impedirá su eliminación para evitar inconsistencias en el catálogo histórico y en reportes de ventas.

### ¿Para qué sirven las cuentas contables de Inventario y Resultados?
> Permiten que cuando se realicen compras, recepciones de mercancía o ventas de productos pertenecientes a este departamento, el sistema genere automáticamente las pólizas contables correspondientes en los libros financieros.