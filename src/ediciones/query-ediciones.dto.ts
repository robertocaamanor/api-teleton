// src/ediciones/dto/query-ediciones.dto.ts
import { IsOptional, IsInt, IsString, Min } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class QueryEdicionesDto {
  @ApiPropertyOptional({ description: "Año exacto de la edición", example: 2024, minimum: 1978 })
  @IsOptional() @Type(() => Number) @IsInt() year?: number;

  @ApiPropertyOptional({ description: "Coincidencia parcial del lema", example: "todos los días" })
  @IsOptional() @IsString() motto?: string;

  @ApiPropertyOptional({ description: "Monto mínimo auditado (CLP)", example: 40000000000, minimum: 0 })
  @IsOptional() @Type(() => Number) @IsInt() @Min(0) minAudited?: number;

  @ApiPropertyOptional({ description: "Número de página (1-indexed)", example: 1, default: 1, minimum: 1 })
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page?: number = 1;

  @ApiPropertyOptional({ description: "Cantidad de resultados por página", example: 20, default: 20, minimum: 1 })
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) pageSize?: number = 20;
}
