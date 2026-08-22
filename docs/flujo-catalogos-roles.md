# Manual de Usuario: Catálogo de Roles y Matriz de Permisos

**Módulo:** Catálogos > Roles  
**Acceso en ERP:** Menú lateral > Catálogos > Roles (`/catalogos/roles`)  
**Dirigido a:** Administradores del Sistema, Recursos Humanos, Auditoría y Seguridad de la Información  

---

## 1. ¿Para qué sirve este módulo?

El módulo de **Roles** es el centro de control de **seguridad y permisos de acceso** de **Foly Muebles**. Permite crear perfiles de usuario estandarizados (ej. *Administrador, Vendedor, Cajero, Cobranza, Gerente de Tienda, Almacenista*) y asignar con precisión qué botones, menús y acciones puede realizar cada colaborador en el ERP.

A través de esta matriz de privilegios se controlan:
- **Segregación de Funciones:** Asegurar que un cajero solo cobre, un vendedor solo cotice y un auditor solo consulte información sin poder editar precios.
- **Permisos Granulares por Módulo:** Niveles de acceso para *Visualizar*, *Crear*, *Editar* y *Eliminar* sobre cada sección del sistema.
- **Asignación a Usuarios:** Los roles creados aquí se vinculan directamente con los empleados en **Catálogos > Usuarios**.

---

## 2. Pantalla Principal y Directorio de Roles

Al ingresar a **Catálogos > Roles**, se muestra la tabla con todos los perfiles de seguridad activos:

![Pantalla Principal - Listado de Roles](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/01-listado-roles.png)

### Columnas de la Tabla:
| Columna | Descripción | Ejemplo Real en Sistema |
|---------|-------------|-------------------------|
| **ID** | Código numérico del rol. | `01`, `02`, `03`, `04` |
| **Nombre** | Título del puesto o perfil operativo. | `Administrador`, `Vendedor`, `Cajero`, `Cobranza`, `Gerente` |
| **Descripción** | Alcance de responsabilidades asignadas al perfil. | *"Acceso total al sistema"*, *"Operación de terminales de cobro"* |
| **Estatus** | Estado del rol. | Badge verde (*Activo*) |
| **Acciones** | Menú desplegable para editar permisos o desactivar. | `⋮` |

---

## 3. Búsqueda en Tiempo Real

Escribe en la barra de búsqueda el nombre del perfil (ej. *Vendedor*, *Cajero*) para filtrar los roles instantáneamente:

![Búsqueda Dinámica](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/Sdt02-busqueda-filtrada.png)

---

## 4. Paso a Paso: Cómo Crear o Configurar un Rol con Matriz de Permisos

### Paso 1: Abrir el Formulario
Haz clic en el botón azul **"Nuevo"** en la esquina superior derecha:

![Modal Nuevo Rol y Matriz de Permisos](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-modal-nuevo-rol-permisos.png)

### Paso 2: Datos Generales del Rol
1. **Nombre del rol (\*):** Escribe el nombre descriptivo del puesto (ej. *Auditor de Inventarios*).
2. **Descripción:** Describe brevemente las funciones y sucursales donde operará.

### Paso 3: Configurar la Matriz de Permisos por Módulo
Marca o desmarca las casillas según el nivel de privilegio que requiera el puesto:

| Módulo del ERP | Permisos Disponibles |
|----------------|----------------------|
| **Solicitudes de Crédito** | Ver listado, Crear solicitud, Editar datos, Aprobar crédito, Rechazar. |
| **Ventas y Cotizaciones** | Generar cotización, Aplicar descuentos, Emitir pagaré, Facturar. |
| **Cajas y Tesorería** | Apertura de turno, Cobro de ventas, Retiro parcial de efectivo, Corte de caja. |
| **Clientes** | Consulta de historial, Alta de clientes, Modificación de domicilio. |
| **Inventario y Traspasos** | Consulta de existencias, Entrada de almacén, Traspasos entre sucursales, Ajustes. |
| **Catálogos** | Configuración de Artículos, Precios, Zonas, Proveedores y Usuarios. |
| **Atención a Clientes** | Registro de garantías, Asignación a talleres y Cierre de folios. |

### Paso 4: Guardar
Haz clic en **"Guardar rol"**. El nuevo perfil quedará disponible de inmediato en **Catálogos > Usuarios** para asignarlo a nuevos empleados.

---

## 5. Menú de Acciones y Modificación

Al presionar el botón de opciones (`⋮`) al final de cualquier rol:

```
[ ⋮ ]
 ├── 1. Editar permisos
 └── 2. Desactivar / Eliminar
```

---

## 6. Preguntas Frecuentes

### ¿Qué sucede si modifico los permisos de un rol existente?
> Los cambios se aplican automáticamente a **todos los usuarios** que tengan asignado ese rol en cuanto recarguen su pantalla o inicien sesión nuevamente.

### ¿Se puede asignar más de un rol a un mismo usuario?
> En **Catálogos > Usuarios** se selecciona el **Rol Principal** del empleado. Si requiere permisos combinados especiales, se recomienda crear un rol específico (ej. *Gerente de Sucursal con Caja*).

### ¿Se puede eliminar un rol que ya tiene usuarios asignados?
> **No por seguridad.** Primero debes reasignar a los empleados activos a otro rol antes de poder desactivar o borrar el perfil anterior.
