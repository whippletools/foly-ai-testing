# Flujo: Catálogos - Vendedores (Equipo de Ventas)

## Fecha: 2026-08-17
## Módulo: Catálogos > Vendedores
## Título en Sistema: Equipo de ventas
## URL: /catalogos/vendedores
## Estado: Documentado y Verificado en Vivo

---

## 1. Descripción General

El submódulo **Vendedores** (titulado en interfaz como **"Equipo de ventas"**) es el catálogo centralizado donde se consultan y monitorean todos los ejecutivos y asesores comerciales activos en el ERP Foly. 

A diferencia de otros catálogos con alta manual directa, la incorporación de un vendedor se gestiona de manera automática desde **Catálogos > Usuarios** al registrar a un colaborador con el rol de *Vendedor*. Este catálogo consolida su información de contacto, ID de empleado y sucursales físicas asignadas para fines de asignación de metas, cotizaciones y comisiones de venta.

---

## 2. Acceso al Módulo

### Navegación por sidebar:
1. Iniciar sesión en el ERP Foly.
2. En el menú lateral izquierdo, hacer clic en **Catálogos** para expandir la lista.
3. Seleccionar **Vendedores**.
4. URL resultante: `/catalogos/vendedores`.

---

## 3. Estructura de la Tabla "Equipo de ventas"

El listado principal presenta las siguientes columnas exactas:

| Columna | Descripción | Ejemplo Real en Sistema |
|---------|-------------|-------------------------|
| **ID** | Identificador numérico único de 4 dígitos del vendedor / colaborador. | `0012` |
| **Nombre** | Nombre completo del ejecutivo de ventas. | `bryan vendedor` |
| **Celular** | Teléfono celular a 10 dígitos registrado para contacto y OTP. | `6699336655` |
| **Sucursales** | Sucursal o sucursales físicas donde el vendedor tiene autorización para operar. | `Foly Muebles Altamira` |

### Herramientas de Control y Navegación:
- **Buscador Dinámico (`Buscar`)**: Filtra en tiempo real por nombre del vendedor, número de celular, sucursal o ID.
- **Paginador**: Selector de registros por página (`10`, `25`, `50`) con contador (`1-N de N`).

---

## 4. Flujo Operativo: Alta y Asignación de Vendedores

```
[1. Navegar a Catálogos > Usuarios]
                 ↓
[2. Clic en botón "Nuevo"] → (/catalogos/usuarios/nuevo)
                 ↓
[3. Llenar Datos]: Nombre, Apellidos, No. Empleado, Celular (10 dígitos)
                 ↓
[4. Asignar Rol]: Seleccionar "Vendedor" en el selector de roles
                 ↓
[5. Asignar Sucursal]: Marcar la(s) tienda(s) donde despachará
                 ↓
[6. Guardar / Enviar Invitación]
                 ↓
[7. Sincronización Automática]: El colaborador aparece de inmediato en /catalogos/vendedores
```

---

## 5. Integración con Otros Módulos del ERP

| Módulo | Tipo de Integración |
|--------|---------------------|
| **Metas (`/catalogos/metas`)** | Asignación de objetivos mensuales de venta por ejecutivo y por sucursal. |
| **Ventas (`/ventas`)** | Selección del vendedor responsable al generar cotizaciones, pedidos o notas de venta. |
| **Solicitudes de Crédito** | Registro del asesor que origina y da seguimiento a la solicitud del cliente. |
| **Usuarios (`/catalogos/usuarios`)** | Control de credenciales, autenticación OTP y bloqueo de acceso. |

---

## 6. Reglas de Negocio

1. **Dependencia de Rol**: Solo los usuarios que posean el rol de *Vendedor* en su ficha de usuario se visualizan en este catálogo.
2. **Visibilidad por Sucursal**: En los módulos de ventas y cotizaciones, los vendedores disponibles para selección en los dropdowns se filtran según la sucursal activa de la sesión.
3. **Persistencia Histórica**: Si un vendedor causa baja o pasa a estatus *Inactivo*, su nombre e ID se preservan en las ventas y pedidos históricos para efectos de auditoría y reportes.
