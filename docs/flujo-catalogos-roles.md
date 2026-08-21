# Flujo: Catálogos - Roles

## Fecha: 2026-08-17
## Módulo: Catálogos > Roles
## URL Listado: /catalogos/roles
## URL Formulario Nuevo: /catalogos/roles/nuevo
## Estado: Documentado y Verificado

---

## 1. Descripción General

El submódulo **Roles** administra la seguridad perimetral y los permisos de acceso del ERP Foly. Permite definir perfiles operativos (por ejemplo: *Administrador*, *Cajero*, *Vendedor*, *Cobrador*, *Auditor*) y asignar permisos granulares de cuatro niveles (**Visualizar**, **Crear**, **Editar**, **Borrar**) sobre las 60 vistas y submódulos que componen la plataforma web y móvil del ERP.

---

## 2. Acceso al Módulo

### Navegación por sidebar:
1. Iniciar sesión en el ERP Foly como Administrador.
2. En el menú lateral izquierdo, hacer clic en **Catálogos** para desplegar los submódulos.
3. Seleccionar **Roles**.
4. URL resultante: `/catalogos/roles`.

---

## 3. Estructura de la Tabla de Roles

La vista principal de listado presenta las siguientes columnas de información:

| Columna | Descripción |
|---------|-------------|
| **ID** | Identificador único del rol en base de datos. |
| **Nombre** | Nombre descriptivo del perfil de usuario. |
| **Plataforma** | Entorno donde opera el rol (*Web*, *Móvil*, *ERP*). |
| **Últ. Actualización** | Fecha y hora de la última modificación en permisos. |
| **Acciones** | Botones de edición detallada, clonación y activación/desactivación. |

---

## 4. Formulario de Creación y Edición (`/catalogos/roles/nuevo`)

### 4.1 Datos Principales del Rol
- **Nombre del Rol**: Campo de texto obligatorio.
- **Plataforma**: Selector del entorno de ejecución.
- **Descripción / Notas**: Detalle de alcance del puesto.

### 4.2 Matriz Granular de Permisos (4 niveles por vista: Visualizar | Crear | Editar | Borrar)

Cada una de las siguientes áreas funcionales cuenta con 4 casillas de verificación independientes:

| Sección / Vista | Visualizar | Crear | Editar | Borrar |
|-----------------|:----------:|:-----:|:------:|:------:|
| **Artículos** | ☐ | ☐ | ☐ | ☐ |
| **Atención al cliente** | ☐ | ☐ | ☐ | ☐ |
| **Cajas** | ☐ | ☐ | ☐ | ☐ |
| **Cancelar venta** | ☐ | ☐ | ☐ | ☐ |
| **Clientes** | ☐ | ☐ | ☐ | ☐ |
| **Cobranza** | ☐ | ☐ | ☐ | ☐ |
| **Confirmar traspaso** | ☐ | ☐ | ☐ | ☐ |
| **Costeos** | ☐ | ☐ | ☐ | ☐ |
| **Costos de envío** | ☐ | ☐ | ☐ | ☐ |
| **Cotizaciones guardadas** | ☐ | ☐ | ☐ | ☐ |
| **Dashboard** | ☐ | ☐ | ☐ | ☐ |
| **Departamentos** | ☐ | ☐ | ☐ | ☐ |
| **Detalle atención al cliente** | ☐ | ☐ | ☐ | ☐ |
| **Detalle de artículo** | ☐ | ☐ | ☐ | ☐ |
| **Detalle de costeo** | ☐ | ☐ | ☐ | ☐ |
| **Detalle de cotización** | ☐ | ☐ | ☐ | ☐ |
| **Detalle de pedido** | ☐ | ☐ | ☐ | ☐ |
| **Detalle de promoción** | ☐ | ☐ | ☐ | ☐ |
| **Detalle de proveedor** | ☐ | ☐ | ☐ | ☐ |
| **Detalle de rol** | ☐ | ☐ | ☐ | ☐ |
| **Detalle de sucursal** | ☐ | ☐ | ☐ | ☐ |
| **Detalle de traspaso** | ☐ | ☐ | ☐ | ☐ |
| **Detalle de usuario** | ☐ | ☐ | ☐ | ☐ |
| **Detalle de vendedor** | ☐ | ☐ | ☐ | ☐ |
| **Detalle de venta** | ☐ | ☐ | ☐ | ☐ |
| **Editar traspaso** | ☐ | ☐ | ☐ | ☐ |
| **Folypuntos** | ☐ | ☐ | ☐ | ☐ |
| **Inicio de sesión** | ☐ | ☐ | ☐ | ☐ |
| **Inventario** | ☐ | ☐ | ☐ | ☐ |
| **Liquidaciones** | ☐ | ☐ | ☐ | ☐ |
| **Mensajes** | ☐ | ☐ | ☐ | ☐ |
| **Mercancía dañada** | ☐ | ☐ | ☐ | ☐ |
| **Metas** | ☐ | ☐ | ☐ | ☐ |
| **Morosidad** | ☐ | ☐ | ☐ | ☐ |
| **Nueva recepción de mercancía** | ☐ | ☐ | ☐ | ☐ |
| **Nueva solicitud de descuento** | ☐ | ☐ | ☐ | ☐ |
| **Nueva venta** | ☐ | ☐ | ☐ | ☐ |
| **Nuevo pedido** | ☐ | ☐ | ☐ | ☐ |
| **Nuevo traspaso** | ☐ | ☐ | ☐ | ☐ |
| **Pedidos** | ☐ | ☐ | ☐ | ☐ |
| **Pólizas Generadas** | ☐ | ☐ | ☐ | ☐ |
| **Pólizas Sistema** | ☐ | ☐ | ☐ | ☐ |
| **Promociones** | ☐ | ☐ | ☐ | ☐ |
| **Prorrateos** | ☐ | ☐ | ☐ | ☐ |
| **Proveedores** | ☐ | ☐ | ☐ | ☐ |
| **Proveedores de reparaciones** | ☐ | ☐ | ☐ | ☐ |
| **Recepción de mercancía** | ☐ | ☐ | ☐ | ☐ |
| **Roles** | ☐ | ☐ | ☐ | ☐ |
| **Rutas** | ☐ | ☐ | ☐ | ☐ |
| **Solicitudes de crédito** | ☐ | ☐ | ☐ | ☐ |
| **Solicitudes de descuentos** | ☐ | ☐ | ☐ | ☐ |
| **Solicitudes de facturas** | ☐ | ☐ | ☐ | ☐ |
| **Sucursales** | ☐ | ☐ | ☐ | ☐ |
| **Tasa de mora** | ☐ | ☐ | ☐ | ☐ |
| **Tipos de Transacción** | ☐ | ☐ | ☐ | ☐ |
| **Traspasos** | ☐ | ☐ | ☐ | ☐ |
| **Usuarios** | ☐ | ☐ | ☐ | ☐ |
| **Validar OTP** | ☐ | ☐ | ☐ | ☐ |
| **Vendedores** | ☐ | ☐ | ☐ | ☐ |
| **Ventas** | ☐ | ☐ | ☐ | ☐ |
| **Zonas** | ☐ | ☐ | ☐ | ☐ |

---

## 5. Flujo Operativo: Creación de un Nuevo Rol

1. **Ingresar a Catálogos > Roles**.
2. Hacer clic en el botón azul **"Nuevo"** (`/catalogos/roles/nuevo`).
3. Asignar el **Nombre** del rol (ejemplo: *Cajero Sucursal Centro*).
4. Configurar la matriz de permisos activando únicamente las casillas necesarias para la operación del puesto.
5. Hacer clic en el botón **"Guardar"**.
6. El rol queda registrado en la base de datos y disponible para ser asignado en el submódulo **Catálogos > Usuarios**.

---

## 6. Reglas de Negocio y Buenas Prácticas

1. **Principio de menor privilegio**: Otorgar únicamente los permisos estrictamente indispensables para la función operativa.
2. **Permiso de Visualización requerido**: Para poder crear, editar o borrar sobre un módulo, la casilla de *Visualizar* debe estar activada.
3. **Propagación en tiempo real**: Toda actualización en la matriz de un rol se aplica al usuario correspondiente en su siguiente petición o inicio de sesión.
