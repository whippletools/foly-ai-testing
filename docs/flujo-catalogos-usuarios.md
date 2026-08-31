# Manual de Usuario: Catálogo de Usuarios

**Módulo:** Catálogos > Usuarios  
**Acceso en ERP:** Menú lateral > Catálogos > Usuarios (`/catalogos/usuarios`)  
**Dirigido a:** Administradores del Sistema, Recursos Humanos, Seguridad de la Información y Gerencias  

---

## 1. ¿Para qué sirve este módulo?

El módulo de **Usuarios** es el panel central de administración y control de acceso del personal a la plataforma **ERP Foly**. Permite registrar nuevos colaboradores, asignarles roles de seguridad, vincularlos a sus sucursales operativas, gestionar su estatus y configurar el inicio de sesión seguro con doble factor de autenticación (**OTP vía WhatsApp**).

A través de este catálogo se gestionan:
- **Directorio de Colaboradores:** Registro oficial de empleados con su número celular y número de empleado.
- **Asignación de Roles y Permisos:** Vinculación directa con los perfiles creados en **Catálogos > Roles**.
- **Control de Acceso Multi-Sucursal:** Asignación precisa de una o múltiples tiendas donde el colaborador está autorizado a operar.
- **Seguridad y Doble Factor (OTP):** Generación automática de contraseñas temporales por WhatsApp y verificación OTP en 2 pasos.
- **Ciclo de Vida del Usuario:** Activación, desactivación inmediata y reinicio seguro de credenciales de acceso.

---

## 2. Pantalla Principal y Listado de Usuarios

Al ingresar a **Catálogos > Usuarios**, se muestra la tabla con todos los colaboradores registrados en el sistema:

![Pantalla Principal - Listado de Usuarios](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/01-listado-usuarios.png)

### Columnas de la Tabla:
| Columna | Descripción | Ejemplo Real en Sistema |
|---------|-------------|-------------------------|
| **ID** | Identificador numérico único de 4 dígitos del usuario. | `0001`, `0002`, `0003`, `0004` |
| **Nombre** | Nombre(s) y Apellido(s) completos del colaborador. | `Administrador Sistema`, `Antonio Zamudio`, `Carlos Ríos` |
| **Rol** | Perfil de seguridad y permisos asignado (desde Catálogo de Roles). | `Administrador`, `Vendedor`, `Cajero` |
| **Celular** | Número telefónico a 10 dígitos para autenticación OTP WhatsApp. | `6670000000`, `6672302174` |
| **Sucursales** | Tiendas físicas y bodegas a las que tiene acceso. | `Foly Muebles Tampico Centro (+9)` |
| **Caja** | Terminal de cobro asignada para punto de venta. | `Sin asignar` / `Caja 1` |
| **Estatus** | Estado operativo del usuario en la plataforma. | Badge verde (*Activo*) / gris (*Inactivo*) |
| **Fecha registro** | Fecha y hora en que se dio de alta en el ERP. | `29/07/26 8:11pm` |
| **Últ. actualización** | Fecha y hora de la última modificación en sus datos. | `—` o fecha reciente |
| **Acciones** | Menú desplegable para editar, reiniciar acceso o desactivar. | `⋮` |

---

## 3. Búsqueda en Tiempo Real

Escribe en la barra de búsqueda el nombre, rol o número de celular del usuario para filtrar el listado al instante:

![Búsqueda Dinámica](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/CAv02-busqueda-filtrada.png)

---

## 4. Paso a Paso: Cómo Dar de Alta un Nuevo Usuario

### Paso 1: Abrir el Formulario
Haz clic en el botón azul **"+ Nuevo"** en la esquina superior derecha:

![Formulario Nuevo Usuario](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-formulario-nuevo-usuario.png)

> **Aviso del Sistema:** *"Se generará una contraseña temporal y se enviará por WhatsApp al crear el usuario."*

### Paso 2: Datos Generales
1. **Nombre(s) (\*):** Ingresa el nombre de pila del colaborador (ej. `Juan`).
2. **Apellido(s) (\*):** Ingresa los apellidos (ej. `Pérez García`).
3. **Número de empleado:** Ingresa el identificador interno del personal (máximo 8 caracteres).

### Paso 3: Rol y Contacto
1. **Celular (\*):** Ingresa el número de teléfono celular a 10 dígitos (ej. `8341234567`). Es indispensable para recibir la contraseña temporal y los códigos OTP.
2. **Selecciona un rol (\*):** Selecciona el rol correspondiente definido en **Catálogos > Roles**.
3. **Requiere doble factor (OTP) para iniciar sesión:** Marca la casilla para exigir el código de seguridad enviado a WhatsApp al iniciar sesión.

### Paso 4: Asignar Sucursales
Marca las casillas de las tiendas físicas donde operará el usuario:
- Casilla **"Seleccionar todas"** para personal corporativo o supervisores con acceso a todas las tiendas.
- O selecciona individualmente entre las 11 sucursales disponibles.

### Paso 5: Guardar y Enviar Invitación
Haz clic en el botón **"Enviar invitación"** o **"Guardar"**. El ERP registrará al usuario y enviará automáticamente un mensaje de WhatsApp con su contraseña temporal de acceso.

---

## 5. Menú de Acciones por Usuario

Al hacer clic en el botón de tres puntos (`⋮`) en cualquier fila del listado, se despliegan las siguientes operaciones:

![Menú de Acciones](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/e6804-menu-acciones.png)

- **Editar:** Abre la pantalla de edición para modificar datos personales, rol o sucursales asignadas.
- **Reiniciar acceso:** Envía de inmediato una nueva contraseña temporal por WhatsApp al teléfono registrado.
- **Desactivar / Activar:** Suspende o reactiva el acceso del usuario al sistema en tiempo real.

---

## 6. Edición y Desactivación de Usuarios

### 6.1 Modificar Datos de un Usuario
Para actualizar el rol, número telefónico o agregar nuevas sucursales a un colaborador, selecciona **Editar** en el menú de acciones:

![Formulario Editar Usuario](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/05-formulario-editar-usuario.png)

### 6.2 Confirmación de Desactivación
Al hacer clic en **Desactivar**, el sistema presenta un diálogo de confirmación para evitar suspensiones por error:

![Diálogo Desactivar Usuario](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/06-dialogo-desactivar-usuario.png)

---

## 7. Preguntas Frecuentes (FAQ)

### ¿Qué hago si el colaborador no recibe el mensaje de WhatsApp con su contraseña?
Abre el menú de acciones (`⋮`) en la fila del colaborador y selecciona **"Reiniciar acceso"**. Esto generará una nueva clave temporal y reenviará el mensaje al celular registrado.

### ¿Un usuario puede tener acceso a más de una sucursal?
Sí. En la sección **Sucursal Asignada** puedes marcar múltiples casillas individuales o hacer clic en **"Seleccionar todas"** para usuarios con responsabilidades gerenciales o de auditoría.

### ¿Qué sucede cuando un usuario es Desactivado?
Sus sesiones activas son revocadas de manera inmediata. No podrá ingresar al sistema ERP ni a las terminales de cobro hasta que un administrador lo vuelva a reactivar.

