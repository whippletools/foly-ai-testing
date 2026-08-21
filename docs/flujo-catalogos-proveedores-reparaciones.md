# Manual de Usuario: Proveedores de Reparaciones

**Módulo:** Catálogos > Proveedores de reparaciones  
**Acceso en ERP:** Menú lateral > Catálogos > Proveedores de reparaciones (`/catalogos/proveedores-reparaciones`)  
**Dirigido a:** Administradores, Encargados de Garantías, Servicio Postventa y Almacén  

---

## 1. ¿Para qué sirve este módulo?

El módulo de **Proveedores de reparaciones** administra el directorio de talleres externos, técnicos y ebanistas especializados autorizados por **Foly Muebles** para atender garantías, restauraciones y servicios técnicos de artículos dañados o con defectos de fábrica.

A través de este catálogo se gestionan:
- **Directorio de Técnicos y Talleres:** Datos fiscales, teléfonos, correos y personas de contacto.
- **Especialidad por Departamentos:** Asignación de categorías que cada taller puede intervenir (*Carpintería/Muebles, Tapicería/Salas, Electrónica/Línea Blanca, etc.*).
- **Control de Carga y Horas:** Monitoreo de horas de trabajo invertidas en reparaciones durante el mes.
- **Configuración de Ajustes:** Parámetros globales del flujo de servicio y costos por hora.

---

## 2. Pantalla Principal y Listado de Proveedores

Al ingresar al módulo, se presenta la tabla general con todos los talleres registrados:

![Pantalla Principal - Proveedores de Reparaciones](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/01-listado-proveedores.png)

### Columnas de la Tabla:
| Columna | Descripción | Ejemplo Real |
|---------|-------------|--------------|
| **ID** | Identificador numérico único de 4 dígitos. | `0001`, `0002`, `0003` |
| **Nombre** | Razón social o nombre comercial del taller técnico. | `Ebanista Armendariz`, `Tapicería Juventud` |
| **Horas este mes** | Contador acumulado de horas de servicio técnico reportadas. | `0` hrs |
| **Departamentos** | Categorías de producto que el taller está autorizado a reparar. | *Muebles, Sofás, Recámaras (+2)* |
| **Acciones** | Menú desplegable para editar o eliminar el registro. | `⋮` |

---

## 3. Búsqueda y Pestañas Principales

La cabecera del módulo organiza la gestión en dos áreas principales:

```
[Proveedores (N)]  |  [Ajustes]
```

### 3.1 Búsqueda Dinámica
El buscador permite filtrar técnicos en tiempo real por nombre, teléfono o especialidad:

![Búsqueda Dinámica](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/GgI02-busqueda-filtrada.png)

---

### 3.2 Pestaña de Ajustes del Módulo
La pestaña **Ajustes** permite configurar parámetros generales de facturación técnica y tiempos de respuesta:

![Pestaña Ajustes](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/03-tab-ajustes.png)

---

## 4. Paso a Paso: Cómo Registrar un Nuevo Proveedor de Reparaciones

### Paso 1: Abrir el formulario de registro
Haz clic en el botón azul **"Nuevo"** en la esquina superior derecha:

![Modal Nuevo Proveedor](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/04-modal-nuevo-proveedor.png)

### Paso 2: Completar la Información de Contacto
1. **Nombre del proveedor (\*):** Nombre comercial o razón social del taller (ej. *Servicio Técnico Hogar*).
2. **Persona de contacto:** Nombre del técnico titular o encargado de recepción.
3. **Número de teléfono (\*):** Teléfono directo a 10 dígitos para asignación de órdenes de servicio.
4. **Correo electrónico:** Email para envío de órdenes de compra de servicios y cotizaciones.

### Paso 3: Asignar Departamentos que Puede Atender
Haz clic en el campo **"Departamentos que puede atender"** para seleccionar las categorías en las que el taller está certificado:

![Selector de Departamentos](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/05-selector-departamentos-abierto.png)

- Marca las casillas de los departamentos correspondientes (*Electrodomésticos, Colchones, Muebles, etc.*).

### Paso 4: Guardar
Haz clic en **"Guardar cambios"**. El taller quedará disponible de inmediato en el módulo de **Atención a Cliente / Garantías**.

---

## 5. Menú de Acciones y Modificaciones

Al final de cada fila, presiona el botón de tres puntos (`⋮`):

![Menú de Acciones](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/06-menu-acciones-abierto.png)

```
[ ⋮ ]
 ├── 1. Editar
 └── 2. Eliminar
```

---

### 5.1 Opción 1: Editar Proveedor
Permite actualizar teléfonos de contacto, agregar nuevos departamentos atendidos o modificar datos fiscales:

![Modal Editar Proveedor](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/07-modal-editar-proveedor.png)

---

### 5.2 Opción 2: Eliminar Proveedor
Para dar de baja un proveedor que ya no presta servicios, confirma la acción en la ventana de advertencia:

![Diálogo Confirmar Eliminación](https://folydocs.whipple.mx/uploads/images/gallery/2026-08/5LW08-dialogo-confirmar-eliminar.png)

---

## 6. Preguntas Frecuentes

### ¿Dónde se visualizan las órdenes de reparación asignadas a estos proveedores?
> En el módulo principal **Atención a Cliente > Garantías y Reparaciones**, donde al levantar un ticket de servicio se seleccionan los talleres registrados en este catálogo según el departamento del artículo.

### ¿Se pueden asignar varios departamentos a un solo taller?
> **Sí.** Un proveedor con capacidad multidisciplinaria puede atender simultáneamente *Salas, Comedores y Muebles de Oficina*.

### ¿Por qué el contador "Horas este mes" inicia en 0?
> Se calcula de manera automática a partir de las horas de mano de obra registradas en los servicios técnicos concluidos dentro del mes calendario en curso.