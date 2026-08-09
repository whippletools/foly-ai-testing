# Estructura de Pruebas

## Arquitectura

```
├── pages/              # Page Object Models (POM)
│   ├── login.page.ts
│   ├── dashboard.page.ts
│   └── pedidos.page.ts
├── tests/              # Tests E2E
│   ├── auth.setup.ts   # Login reusable
│   ├── pedidos.spec.ts
│   └── solicitudes-credito.spec.ts
├── fixtures/           # Fixtures de Playwright
│   └── pages.ts
├── docs/               # Documentación de flujos
│   └── flujo-pedidos.md
└── gitbook-docs/       # Documentación para cliente (GitBook)
```

## Principios

1. **POM Pattern**: Cada página tiene su clase reutilizable
2. **Session Reuse**: Login una vez, reutilizar en todos los tests
3. **Screenshots**: Evidencia visual en cada paso crítico
4. **Independencia**: Tests aislados, sin dependencias entre sí

## Módulos Documentados

| Módulo | Estado | Tests |
|--------|--------|-------|
| Pedidos | ✅ Documentado + Automatizado | 5 tests |
| Solicitudes de Crédito | ✅ Automatizado | 3 tests |
