import { ApiProperty } from "@nestjs/swagger";
import { EdicionDto } from "./edicion.dto";

export class PagedEdicionesResponseDto {
  @ApiProperty({ example: 34, description: "Total de coincidencias encontradas" })
  total!: number;

  @ApiProperty({ example: 1, description: "Número de página" })
  page!: number;

  @ApiProperty({ example: 20, description: "Resultados por página" })
  pageSize!: number;

  @ApiProperty({ type: [EdicionDto], description: "Resultados paginados" })
  items!: EdicionDto[];
}

export class YearEdicionesResponseDto {
  @ApiProperty({ example: 2024 })
  year!: number;

  @ApiProperty({ example: 1 })
  total!: number;

  @ApiProperty({ type: [EdicionDto] })
  items!: EdicionDto[];
}

export class NotFoundResponseDto {
  @ApiProperty({ example: "Edición no encontrada" })
  error!: string;
}
