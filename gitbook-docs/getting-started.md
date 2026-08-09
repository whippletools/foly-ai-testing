# Getting Started

## Requisitos

- Node.js 18+
- pnpm (gestor de paquetes)
- Cuenta en ERP Foly (credenciales en `.env`)

## Instalación

```bash
# Clonar repositorio
git clone https://github.com/whippletools/foly-ai-testing.git
cd foly-ai-testing

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con credenciales de Foly

# Ejecutar tests
pnpm test
```

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `pnpm test` | Ejecutar todos los tests |
| `pnpm test:ui` | Modo UI interactivo |
| `pnpm test:ui:pedidos` | Modo UI - solo módulo Pedidos |
| `pnpm test:fast` | Tests rápidos (headless) |
| `pnpm test:report` | Ver reporte HTML |

## Flujo de Trabajo

1. **Documentar** el flujo manual del módulo
2. **Automatizar** con Playwright
3. **Validar** con el equipo
4. **Integrar** a la rama principal
