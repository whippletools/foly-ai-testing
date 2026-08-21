# Manual de Usuario: Catálogo de Cajas

**Módulo:** Catálogos > Cajas  
**Acceso en ERP:** Menú lateral > Catálogos > Cajas (`/catalogos/cajas`)  
**Dirigido a:** Administradores, Gerentes de Sucursal, Tesorería y Jefes de Cajas  

---

## 1. ¿Para qué sirve este módulo?

El módulo de **Cajas** (dentro del menú de Catálogos) es el panel central donde se definen, configuran y asignan todas las terminales de cobro y cajas físicas de **Foly Muebles**. 

A través de este catálogo se gestionan:
- **Alta y Nomenclatura de Cajas:** Creación de cajas de atención al público por sucursal (ej. *Caja principal, Caja 2, Caja cobranza*).
- **Asignación de Tienda:** Vinculación directa con una tienda física registrada en **Catálogos > Sucursales**.
- **Límites Máximos de Efectivo:** Fijación de topes de efectivo permitido en caja (ej. `$20,000.00`) para forzar cortes y retiros parciales de seguridad.
- **Asociación de Cajeros:** Supervisión del personal activo autorizado para operar la caja.

---

## 2. Pantalla Principal y Listado de Cajas

Al ingresar a **Catálogos > Cajas**, se muestra la tabla con todas las terminales registradas:

![Pantalla Principal - Listado de Cajas](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/01-listado-cajas.png)

### Columnas de la Tabla:
| Columna | Descripción | Ejemplo Real en Sistema |
|---------|-------------|-------------------------|
| **ID** | Código numérico de 2 dígitos de la caja. | `01`, `02`, `03`, `04` |
| **Nombre** | Nombre comercial o descriptivo de la terminal. | `Caja Demo Tampico Centro`, `Caja Demo Altamira` |
| **Sucursal** | Tienda física donde opera la caja. | `Foly Muebles Tampico Centro`, `Foly Muebles Altamira` |
| **Límite** | Monto máximo de efectivo en moneda nacional. | `$20,000.00` |
| **Cajero** | Nombre del cajero titular asignado. | `Laura Méndez`, `Sofía Reyes`, `Miguel Torres` |
| **Estatus** | Estado operativo de la terminal. | Badge verde (*Activo*) / gris (*Inactivo*) |
| **Acciones** | Menú desplegable para editar o desactivar. | `⋮` |

---

## 3. Pestañas de Filtro y Búsqueda en Tiempo Real

La cabecera incluye herramientas para filtrar cajas por su estado operativo:

```
[Todos]  |  [Activas]  |  [Inactivas]
```

### 3.1 Filtro de Cajas Activas / Inactivas
Permite visualizar únicamente las terminales autorizadas para cobro o consultar cajas en mantenimiento:

![Filtro Cajas Activas](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/bwH03-filtro-activas.png)

---

### 3.2 Búsqueda Dinámica
Escribe en el campo **"Buscar"** el nombre de la caja, cajero o sucursal (ej. *Altamira*) para filtrar los registros al instante:

![Búsqueda Dinámica](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/3QG02-busqueda-filtrada.png)

---

## 4. Paso a Paso: Cómo Dar de Alta una Nueva Caja

### Paso 1: Abrir el formulario de registro
Haz clic en el botón azul **"Nuevo"** en la esquina superior derecha:

![Modal Nueva Caja](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-modal-nueva-caja.png)

### Paso 2: Llenar la Información Requerida
1. **Nombre (\*):** Nombre identificador de la caja (ej. *Caja 1*, *Caja Principal Altamira*).
2. **Sucursal (\*):** Selecciona en el menú desplegable la tienda física donde estará instalada la terminal.
3. **Límite de Efectivo (\*):** Ingresa el monto límite permitido en caja en pesos mexicanos (ej. `20000`).

### Paso 3: Guardar
Haz clic en el botón **"Crear"**. La nueva caja aparecerá de inmediato en el listado y estará lista para que un usuario con rol de *Cajero* inicie sesión y realice la apertura de turno.

---

## 5. Menú de Acciones y Modificación de Cajas

Al final de cada fila, presiona el botón de tres puntos (`⋮`):

![Menú de Acciones](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/5cP05-menu-acciones-abierto.png)

```
[ ⋮ ]
 ├── 1. Editar
 └── 2. Desactivar / Activar
```

---

### 5.1 Opción 1: Editar Caja
Permite ajustar el nombre de la caja, reasignar sucursal o modificar el límite de efectivo:

![Modal Editar Caja](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/05-modal-editar-caja.png)

- Modifica los valores y presiona **"Guardar cambios"**.

---

### 5.2 Opción 2: Desactivar o Reactivar Caja
Si una terminal física se retira por mantenimiento o cierre temporal, selecciona **Desactivar** y confirma la acción:

![Diálogo Desactivar Caja](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/07-dialogo-desactivar-caja.png)

---

## 6. Preguntas Frecuentes

### ¿Cuál es la diferencia entre este módulo y el módulo principal "Cajas"?
> - **Catálogos > Cajas (`/catalogos/cajas`):** Es para **configuración administrativa** (dar de alta cajas, asociar sucursales y fijar límites de dinero).
> - **Cajas (`/cajas`):** Es para la **operación diaria** del cajero (apertura de turno, cobro de ventas, recepción de abonos de crédito, retiros parciales y arqueo de corte de caja).

### ¿Qué sucede cuando una caja supera su Límite de Efectivo?
> El sistema emite una alerta en la pantalla del cajero indicando que debe realizar un **Retiro Parcial de Efectivo** hacia la caja fuerte o tesorería de la tienda.

### ¿Se puede asignar un cajero fijo a una caja desde este catálogo?
> La asignación de personal se gestiona en **Catálogos > Usuarios** al vincular al empleado con la caja correspondiente.