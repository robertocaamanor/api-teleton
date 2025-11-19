// src/ediciones/ediciones.controller.ts
import { Controller, Get, Param, ParseIntPipe, Query } from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { QueryEdicionesDto } from "./query-ediciones.dto";
import { EdicionDto } from "./dto/edicion.dto";
import { NotFoundResponseDto, PagedEdicionesResponseDto, YearEdicionesResponseDto } from "./dto/responses.dto";
import { EdicionesService } from "./ediciones.service";

@ApiTags("Ediciones")
@Controller("ediciones")
export class EdicionesController {
  constructor(private readonly svc: EdicionesService) {}

  @Get()
  @ApiOperation({
    summary: "Listar ediciones con filtros opcionales",
    description: "Permite filtrar por año exacto, lema parcial y monto mínimo auditado. Incluye paginación.",
  })
  @ApiOkResponse({ type: PagedEdicionesResponseDto })
  list(@Query() q: QueryEdicionesDto): PagedEdicionesResponseDto {
    return this.svc.list(q);
  }

  @Get("year/:year")
  @ApiOperation({ summary: "Listar todas las ediciones de un año" })
  @ApiParam({ name: "year", type: Number, example: 2024 })
  @ApiOkResponse({ type: YearEdicionesResponseDto })
  listByYear(@Param("year", ParseIntPipe) year: number): YearEdicionesResponseDto {
    return this.svc.listByYear(year);
  }

  @Get(":id")
  @ApiOperation({ summary: "Obtener detalle de una edición por id" })
  @ApiParam({ name: "id", type: Number, example: 35 })
  @ApiOkResponse({ type: EdicionDto })
  @ApiNotFoundResponse({ description: "Edición no encontrada", type: NotFoundResponseDto })
  get(@Param("id", ParseIntPipe) id: number): EdicionDto | NotFoundResponseDto {
    const found = this.svc.get(id);
    if (!found) return { error: "Edición no encontrada" };
    return found;
  }
}
