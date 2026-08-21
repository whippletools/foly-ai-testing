# Flujo: Catálogos - Costos de envío

## Fecha: 2026-08-10
## Módulo: Catálogos > Costos de envío
## URL: /catalogos/costos-envio
## Estado: Documentado

---

## 1. Descripción General

El submódulo **Costos de envío** permite configurar los costos de envío por ciudad. Mediante un dropdown se selecciona la ciudad a configurar, y en el panel derecho se visualiza un mapa interactivo para delimitar las zonas de cobertura y asignar costos de envío por zona. No utiliza un listado tradicional con tabla; su funcionamiento se basa en la selección de una ciudad y la edición de zonas directamente sobre el mapa.

---

## 2. Acceso al Módulo

### Navegación por sidebar:
1. Iniciar sesión como Administrador
2. En el menú lateral, hacer clic en **Catálogos** (se expande)
3. Hacer clic en **Costos de envío**
4. URL resultante: `/catalogos/costos-envio`

### Nota importante:
- El acceso requiere navegación por sidebar con sesión activa.
- El usuario debe contar con permisos de Administrador para configurar costos de envío.

---

## 3. Elementos de la UI Identificados

### Header
- **Título**: "Costos de envío" (h1)
- **Botón "Guardar cambios"**: Arriba a la derecha, gris/deshabilitado hasta que se realicen modificaciones.

### Panel izquierdo: Configuración de ciudad
- **Dropdown "Ciudad"**: Selector para elegir la ciudad a configurar
- **Mensaje informativo**: "Selecciona una ciudad para cargar o crear su configuración de costos de envío."

### Panel derecho: Mapa de zonas
- **Mensaje inicial**: "Selecciona una ciudad para visualizar y editar sus zonas en el mapa."
- El panel muestra un **mapa interactivo** una vez seleccionada la ciudad.
- Permite visualizar y editar las zonas de cobertura y sus costos de envío asociados.

---

## 4. Flujo Principal: Configurar Costos de Envío por Ciudad

### Paso 1: Navegar a Catálogos > Costos de envío
- Iniciar sesión como Administrador
- Clic en Catálogos en sidebar → Clic en Costos de envío
- Verificar título "Costos de envío" visible

### Paso 2: Seleccionar una ciudad
- Abrir el dropdown **"Ciudad"**
- Seleccionar la ciudad deseada de la lista
- El panel derecho carga el mapa con las zonas de esa ciudad

### Paso 3: Visualizar y editar zonas en el mapa
- El mapa muestra las zonas de cobertura de la ciudad seleccionada
- Cada zona puede tener un costo de envío asignado
- Editar las zonas directamente sobre el mapa (agregar, modificar o eliminar zonas)

### Paso 4: Guardar cambios
- Clic en **Guardar cambios** (se activa cuando hay modificaciones)
- La configuración se guarda para la ciudad seleccionada

---

## 5. Flujo Secundario: Cambiar de Ciudad

### Paso 1: Navegar a Catálogos > Costos de envío

### Paso 2: Seleccionar otra ciudad
- Abrir el dropdown **"Ciudad"**
- Seleccionar otra ciudad
- El mapa se actualiza con las zonas de la nueva ciudad

---

## 6. Consideraciones Importantes

- Este módulo **no utiliza un listado tradicional** con tabla ni botón "Nuevo".
- La configuración se realiza **ciudad por ciudad** mediante el dropdown.
- El **mapa interactivo** es el medio principal para definir zonas de cobertura y costos.
- El botón **"Guardar cambios"** solo se habilita cuando se detectan modificaciones en la configuración.
- Las zonas previamente configuradas en el módulo **Zonas** pueden utilizarse como base para la delimitación geográfica.
- Los cambios no guardados se perderán al cambiar de ciudad si no se presiona **Guardar cambios** antes.

---
