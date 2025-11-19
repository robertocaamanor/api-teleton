# Teletón API

API sencilla en **NestJS** para consultar ediciones históricas de la Teletón en Chile. Proporciona filtros, paginación y documentación interactiva vía Swagger.

## 🚀 Características
- Listado paginado de ediciones.
- Filtros por año, lema (búsqueda parcial) y monto mínimo auditado.
- Endpoint de agrupación por año.
- Obtención individual por `id`.
- Documentación OpenAPI generada automáticamente en `/docs`.
- Conversión de fuente CSV a JSON mediante script.

## 📦 Estructura del proyecto
```
.
├── scripts/
│   └── csv-to-json.js         # Convierte teleton.csv a JSON dentro de src/data
├── src/
│   ├── app.module.ts
│   ├── main.ts                # Bootstrap + configuración Swagger
│   └── ediciones/
│       ├── ediciones.controller.ts
│       ├── ediciones.service.ts
│       ├── query-ediciones.dto.ts
│       └── dto/
│           ├── edicion.dto.ts
│           └── responses.dto.ts
├── teleton.csv                # Datos fuente (crudos)
├── src/data/teleton.json      # Datos convertidos usados por el servicio
├── package.json
├── tsconfig.json
└── README.md
```

## 🗃️ Fuente de datos
Los datos provienen de la página de Wikipedia:
https://es.wikipedia.org/wiki/Telet%C3%B3n_(Chile)

Se procesan manualmente en `teleton.csv` y luego se generan a JSON. La precisión puede variar respecto a montos / años en la fuente original. Si encuentras discrepancias, puedes actualizar el CSV y regenerar el JSON.

## 🔄 Actualizar los datos
Tras modificar `teleton.csv` ejecuta:
```powershell
node scripts/csv-to-json.js
```
Esto genera/actualiza `src/data/teleton.json`.

## 📂 DTOs y respuestas
Ejemplo de respuesta paginada (`GET /ediciones`):
```json
{
  "total": 34,
  "page": 1,
  "pageSize": 20,
  "items": [
    {
      "id": 35,
      "year": 2024,
      "dates": "8 y 9 de noviembre",
      "motto": "Juntos, todos los días",
      "ambassador": "Chris Lindsay Doren",
      "goal_clp": 38044459976,
      "last_on_air_clp": 40502617946,
      "last_on_air_pct": 6.46,
      "audited_total_clp": 47437062872,
      "value_current_clp": null,
      "value_current_usd": null,
      "notes": null
    }
  ]
}
```

## 🌐 Endpoints
| Método | Ruta | Descripción | Query Params |
|--------|------|-------------|--------------|
| GET | `/ediciones` | Lista paginada y filtrada | `year`, `motto`, `minAudited`, `page`, `pageSize` |
| GET | `/ediciones/year/:year` | Todas las ediciones de un año | `:year` (path) |
| GET | `/ediciones/:id` | Detalle por identificador | `:id` (path) |

### Ejemplos
```powershell
# Filtrar por lema parcial
curl http://localhost:3000/ediciones?motto=corazon

# Filtrar por año y mínimo auditado
curl http://localhost:3000/ediciones?year=2024&minAudited=40000000000

# Año específico
curl http://localhost:3000/ediciones/year/2024

# Edición individual
curl http://localhost:3000/ediciones/35
```

## 📘 Documentación Swagger
Disponible en:
```
http://localhost:3000/docs
```
Incluye: tags, ejemplos, tipos de respuesta y enlace externo a la fuente de datos.

## 🛠️ Requisitos
- Node.js 18+ (recomendado 20+)
- npm

## 🧪 Puesta en marcha
Instala dependencias:
```powershell
npm install
```
Genera datos JSON (solo si cambiaste el CSV):
```powershell
node scripts/csv-to-json.js
```
Inicia el servidor:
```powershell
npm run start
```
Modo watch (desarrollo):
```powershell
npm run start:dev
```

## 🔐 Validación
Se usa `class-validator` y `class-transformer` en `QueryEdicionesDto` para transformar y validar parámetros de consulta antes de llegar al servicio.

## 📄 Licencia y uso de datos
- Código bajo licencia MIT (ver cabecera Swagger).
- Los datos originales de Wikipedia pueden estar sujetos a la licencia CC BY-SA; cualquier redistribución pública debe considerar dicha licencia. Este repositorio no garantiza derechos sobre los datos, sólo facilita su consulta.

## 🤝 Contribuir
1. Haz fork.
2. Crea una rama descriptiva: `git checkout -b mejora-lema`.
3. Aplica cambios y prueba `npm run start`.
4. Abre un Pull Request explicando el motivo y fuente de cualquier dato agregado.

## 🧭 Próximas mejoras sugeridas
- Agregar endpoint de estadísticas agregadas (suma de montos por década).
- Añadir cache in-memory para respuestas frecuentes.
- Autenticación si se amplía el set de operaciones.

## ❓ Soporte
Abre un issue describiendo el problema o discrepancia en datos. Incluye la referencia (URL Wikipedia) y captura si aplica.

---
Hecho con NestJS y datos públicos de Wikipedia.
