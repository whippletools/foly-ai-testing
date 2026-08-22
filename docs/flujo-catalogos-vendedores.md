# Manual de Usuario: Catálogo de Vendedores (Equipo de Ventas)

**Módulo:** Catálogos > Vendedores  
**Acceso en ERP:** Menú lateral > Catálogos > Vendedores (`/catalogos/vendedores`)  
**Dirigido a:** Gerencias Comerciales, Jefes de Sucursal, Recursos Humanos y Administradores  

---

## 1. ¿Para qué sirve este módulo?

El módulo de **Vendedores** (titulado en la interfaz como **"Equipo de ventas"**) es el directorio centralizado de consulta, filtrado y monitoreo de todos los asesores y ejecutivos comerciales autorizados en **Foly Muebles**.

A través de este catálogo se gestionan:
- **Directorio de Asesores Comerciales:** Visualización de la fuerza de ventas activa con su identificador numérico, nombre y número celular de contacto.
- **Asignación de Sucursales:** Supervisión de las tiendas físicas donde cada vendedor está habilitado para cotizar y registrar ventas.
- **Vinculación con Metas y Comisiones:** Base operativa para la asignación de objetivos mensuales de venta en **Catálogos > Metas**.
- **Sincronización Automática con Usuarios:** La fuerza de ventas se nutre de forma directa desde **Catálogos > Usuarios** al asignar el rol de *Vendedor*.

---

## 2. Pantalla Principal y Listado de Vendedores

Al ingresar a **Catálogos > Vendedores**, el sistema muestra la tabla consolidada con los ejecutivos comerciales registrados:

![Pantalla Principal - Listado de Vendedores](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/01-listado-vendedores.png)

### Columnas de la Tabla:
| Columna | Descripción | Ejemplo Real en Sistema |
|---------|-------------|-------------------------|
| **ID** | Identificador único de 4 dígitos del vendedor / empleado. | `0012` |
| **Nombre** | Nombre completo del ejecutivo comercial. | `bryan vendedor` |
| **Celular** | Teléfono celular a 10 dígitos registrado para contacto y OTP. | `6699336655` |
| **Sucursales** | Sucursal o sucursales físicas donde tiene autorización de venta. | `Foly Muebles Altamira` |

---

## 3. Filtros y Búsqueda en Tiempo Real

### 3.1 Filtrado por Sucursal
En la parte superior se cuenta con un selector desplegable para filtrar el equipo de ventas según la tienda física:

![Filtro por Sucursal](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/02-filtro-sucursal-desplegado.png)

### 3.2 Búsqueda Predictiva
La barra de búsqueda permite localizar asesores al instante ingresando su nombre, teléfono o ID de empleado:

![Búsqueda Dinámica](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-busqueda-filtrada.png)

---

## 4. Paso a Paso: Cómo Dar de Alta o Gestionar un Vendedor

Debido a que este catálogo sincroniza automáticamente a todo usuario con el perfil comercial, el flujo para registrar o modificar un vendedor es el siguiente:

### Paso 1: Ingresar a Catálogos > Usuarios
En el menú lateral izquierdo, dirígete a **Catálogos > Usuarios** (`/catalogos/usuarios`).

### Paso 2: Crear el Nuevo Usuario
Haz clic en el botón azul **"+ Nuevo"** para abrir el formulario de alta.

### Paso 3: Completar Datos y Asignar el Rol
1. Ingresa el **Nombre(s)**, **Apellido(s)** y **Número de empleado**.
2. En el campo **Celular (\*)**, ingresa el número telefónico a 10 dígitos.
3. En el campo **Selecciona un rol (\*)**, selecciona **"Vendedor"**.
4. En **Sucursal Asignada**, marca la(s) tienda(s) donde el ejecutivo atenderá clientes.

### Paso 4: Guardar
Haz clic en **"Enviar invitación"** o **"Guardar"**. El sistema creará la cuenta y el colaborador se reflejará de inmediato en la tabla de **Catálogos > Vendedores**.

---

## 5. Selección y Monitoreo del Equipo de Ventas

Al interactuar con la lista de ejecutivos, el sistema resalta la fila seleccionada para facilitar la consulta de información:

![Selección de Vendedor](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/04-seleccion-vendedor.png)

---

## 6. Integración con Otros Módulos del ERP

| Módulo | Tipo de Integración |
| :--- | :--- |
| **Metas (`/catalogos/metas`)** | Asignación de objetivos mensuales de venta en monto ($) por ejecutivo y sucursal. |
| **Ventas (`/ventas`)** | Selección del vendedor responsable al generar cotizaciones, pedidos y notas de venta. |
| **Solicitudes de Crédito** | Registro del asesor que origina la solicitud y brinda atención al cliente. |
| **Usuarios (`/catalogos/usuarios`)** | Control de credenciales, cambio de rol, reactivación o baja del colaborador. |

---

## 7. Preguntas Frecuentes (FAQ)

### ¿Por qué no aparece un botón "Nuevo" en el catálogo de Vendedores?
Porque el catálogo de vendedores es un directorio especializado que se alimenta de forma automática. Para agregar un vendedor, simplemente da de alta al colaborador en **Catálogos > Usuarios** y asígnale el rol de **Vendedor**.

### ¿Cómo cambio a un vendedor de sucursal?
Ve a **Catálogos > Usuarios**, busca al colaborador, abre su menú de opciones (`⋮`), haz clic en **Editar**, actualiza las sucursales marcadas y guarda los cambios. El cambio se reflejará al instante en este módulo y en el punto de venta.

### ¿Qué sucede con las ventas históricas si un vendedor se da de baja?
Al desactivar al vendedor en el catálogo de usuarios, no podrá iniciar sesión ni registrar nuevas cotizaciones, pero su nombre e ID permanecerán asociados a todos los pedidos, ventas y comisiones históricas para fines de auditoría.

