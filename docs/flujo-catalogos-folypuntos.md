# Flujo: Catálogos - Folypuntos

## Fecha: 2026-08-10
## Módulo: Catálogos > Folypuntos
## URL: /catalogos/folypuntos
## Estado: Documentado

---

## 1. Descripción General

El submódulo **Folypuntos** permite configurar el programa de lealtad y puntos del negocio. Define la equivalencia entre compras en pesos y Folypuntos otorgados, así como el valor de canje de cada Folypunto a pesos mexicanos. El programa de lealtad puede configurarse de forma diferente según el método de pago: **Contado**, **Crédito** o **Apartado**.

---

## 2. Acceso al Módulo

### Navegación por sidebar:
1. Iniciar sesión como Administrador
2. En el menú lateral, hacer clic en **Catálogos** (se expande)
3. Hacer clic en **Folypuntos**
4. URL resultante: `/catalogos/folypuntos`

### Nota importante:
- El acceso requiere navegación por sidebar con sesión activa.
- El usuario debe contar con permisos de Administrador para visualizar y modificar la configuración de Folypuntos.

---

## 3. Elementos de la UI Identificados

### Header
- **Título**: "Configuración de Folypuntos" (h1)
- **Botón "Guardar"**: Azul, arriba a la derecha. Guarda los cambios de configuración.

### Tabs de método de pago
- **Contado**: Configuración para pagos de contado
- **Crédito**: Configuración para pagos a crédito
- **Apartado**: Configuración para apartados

### Sección: Equivalencia de compra a Folypuntos
- **Descripción**: "Configura la cantidad de Folypuntos que se otorgan por cada peso gastado."
- **Configuración**: Por cada **$ 10** pesos → **1** Folypunto
- Controles **+** y **−** para ajustar los valores

### Sección: Equivalencia de venta a Folypuntos
- **Descripción**: "Configura el valor en pesos que tendrá cada Folypunto al ser canjeado."
- **Configuración**: 1 Folypunto → **$ 1.00** pesos mexicanos
- Controles **+** y **−** para ajustar los valores

---

## 4. Flujo Principal: Configurar Folypuntos

### Paso 1: Navegar a Catálogos > Folypuntos
- Iniciar sesión como Administrador
- Clic en Catálogos en sidebar → Clic en Folypuntos
- Verificar título "Configuración de Folypuntos" visible

### Paso 2: Seleccionar el método de pago a configurar
- Seleccionar el tab **Contado**, **Crédito** o **Apartado** según corresponda

### Paso 3: Ajustar equivalencia de compra a Folypuntos
- Usar los controles **+** y **−** para establecer cuántos pesos equivalen a 1 Folypunto
- Ejemplo: Por cada $10 pesos → 1 Folypunto

### Paso 4: Ajustar equivalencia de venta (canje) a Folypuntos
- Usar los controles **+** y **−** para establecer el valor de cada Folypunto en pesos mexicanos
- Ejemplo: 1 Folypunto → $1.00 pesos mexicanos

### Paso 5: Guardar cambios
- Clic en **Guardar**
- La configuración se aplica al método de pago seleccionado

---

## 5. Flujo Secundario: Configurar Otro Método de Pago

### Paso 1: Navegar a Catálogos > Folypuntos

### Paso 2: Seleccionar otro tab
- Clic en **Crédito** o **Apartado**
- Repetir los pasos 3-5 del flujo principal para configurar el nuevo método de pago

---

## 6. Consideraciones Importantes

- La configuración de Folypuntos es **por método de pago**: Contado, Crédito y Apartado pueden tener reglas diferentes.
- **Equivalencia de compra**: define cuántos pesos debe gastar el cliente para obtener 1 Folypunto.
- **Equivalencia de venta (canje)**: define cuánto vale cada Folypunto al momento de canjearlo por descuentos o productos.
- Los cambios se guardan **por tab**; es necesario guardar cada método de pago por separado.
- Si no se configura un método de pago, el sistema puede usar valores por defecto o no otorgar puntos para ese método.
- El programa de lealtad se aplica automáticamente en las ventas según la configuración activa.

---
