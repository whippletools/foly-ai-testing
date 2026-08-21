# Flujo: Catálogos - Usuarios

## Fecha: 2026-08-17
## Módulo: Catálogos > Usuarios
## URL Listado: /catalogos/usuarios
## URL Formulario Nuevo: /catalogos/usuarios/nuevo
## Estado: Documentado y Verificado en Vivo

---

## 1. Descripción General

El submódulo **Usuarios** administra el directorio de colaboradores autorizados para operar en el sistema ERP Foly. Permite registrar nuevos empleados, asignarles su rol de seguridad, vincularlos a sus sucursales operativas, gestionar su estatus (Activo/Inactivo) y configurar el teléfono celular para el inicio de sesión seguro con doble factor de autenticación (**OTP vía WhatsApp**).

---

## 2. Acceso al Módulo

### Navegación por sidebar:
1. Iniciar sesión en el ERP Foly como Administrador.
2. En el menú lateral izquierdo, hacer clic en **Catálogos** para expandir las opciones.
3. Seleccionar **Usuarios**.
4. URL resultante: `/catalogos/usuarios`.

---

## 3. Estructura de la Tabla de Usuarios

La pantalla principal presenta el listado de personal con las siguientes columnas exactas:

| Columna | Descripción | Ejemplo en Sistema |
|---------|-------------|-------------------|
| **ID** | Identificador numérico de 4 dígitos del usuario. | `0001`, `0002` |
| **Nombre** | Nombre(s) y Apellido(s) del colaborador. | `Administrador Sistema`, `Antonio Zamudio` |
| **Rol** | Perfil de permisos asignado (definido en *Roles*). | `Administrador`, `Vendedor`, `Cajero` |
| **Celular** | Número a 10 dígitos para autenticación OTP WhatsApp. | `6670000000` |
| **Sucursales** | Sucursales a las que tiene acceso el colaborador. | `Foly Muebles Tampico Centro (+9)` |
| **Caja** | Caja asignada para cobros en punto de venta. | `Sin asignar` / `Caja 1` |
| **Estatus** | Estado operativo del usuario. | `Activo` / `Inactivo` |
| **Fecha registro** | Fecha y hora en que se dio de alta en el sistema. | `29/07/26 8:11pm` |
| **Últ. actualización** | Fecha del último cambio en permisos o datos. | `—` o fecha reciente |
| **Acciones** | Menú de opciones (Editar usuario, Cambiar estatus, Reenviar invitación). | `⋮` |

### Herramientas de Cabecera y Filtros:
- **Buscador global (`Buscar`)**: Filtra en tiempo real por nombre, rol, celular o ID.
- **Paginador**: Selector de registros por página (`10`, `25`, `50`).
- **Botón "Nuevo"**: Botón azul ubicado arriba a la derecha que redirige a `/catalogos/usuarios/nuevo`.

---

## 4. Formulario de Creación de Usuario (`/catalogos/usuarios/nuevo`)

El formulario de alta está dividido en 3 secciones funcionales:

### 4.1 Datos Generales
> *Mensaje informativo del sistema: "Se generará una contraseña temporal y se enviará por WhatsApp al crear el usuario."*

- **Nombre(s)**: Campo de texto obligatorio (`placeholder: Ej. Juan`).
- **Apellido(s)**: Campo de texto obligatorio (`placeholder: Ej. Pérez García`).
- **Número de empleado**: Identificador interno del personal (`placeholder: Máx. 8 caracteres`).

### 4.2 Rol y Contacto
- **Celular \***: Teléfono obligatorio a 10 dígitos (`placeholder: Ej. 8341234567`). Indispensable para recibir la contraseña temporal y códigos de acceso OTP.
- **Selecciona un rol**: Menú desplegable con los roles registrados en `/catalogos/roles`.
- **Requiere doble factor (OTP) para iniciar sesión**: Switch / casilla configurable (*"Sugerido según el rol seleccionado; puedes cambiarlo antes de guardar"*).

### 4.3 Sucursal Asignada
Permite definir las tiendas y almacenes en los que el usuario puede operar:
- **Casilla "Seleccionar todas"**: Otorga acceso global a todas las tiendas.
- **Listado de Sucursales:**
  - Foly Muebles Altamira
  - Foly Muebles Avenida Monterrey
  - Foly Muebles Bodega Tampico
  - Foly Muebles Coatzacoalcos
  - Foly Muebles Ejército Mexicano
  - Foly Muebles Pánuco
  - Foly Muebles San Luis Potosí Carranza
  - Foly Muebles San Luis Potosí Soledad
  - Foly Muebles Tampico Aeropuerto
  - Foly Muebles Tampico Centro
  - Foly Muebles Veracruz Puerto

---

## 5. Flujo Operativo: Alta y Envío de Invitación

```
[1. Catálogos > Usuarios]
          ↓
[2. Clic en botón "Nuevo"] → Abre /catalogos/usuarios/nuevo
          ↓
[3. Ingresar Datos Generales]: Nombre(s), Apellido(s), No. de Empleado
          ↓
[4. Configurar Contacto]: Celular (10 dígitos), Selección de Rol, Check OTP
          ↓
[5. Asignar Sucursal(es)]: Marcar tiendas permitidas
          ↓
[6. Clic en "Enviar invitación"]
          ↓
[7. Notificación WhatsApp]: El empleado recibe su contraseña temporal
          ↓
[8. Primer Acceso]: Inicia sesión, valida código OTP y actualiza su contraseña
```

---

## 6. Reglas de Negocio y Seguridad

1. **Unicidad de Celular**: No pueden existir dos usuarios activos con el mismo número de celular registrado (a 10 dígitos).
2. **Generación Automática de Contraseña**: No se ingresa contraseña manual; el ERP genera una clave segura y la despacha al WhatsApp del empleado.
3. **Control de Cajas**: Si el rol asignado es de tipo Cajero, se vincula a una caja abierta en **Catálogos > Cajas**.
4. **Restricción por Sucursal**: Las operaciones de venta, cobranza y traspasos se limitan a las sucursales asignadas.
5. **Desactivación Inmediata**: Al cambiar el estatus a *Inactivo*, las sesiones activas del colaborador se revocan al instante.
