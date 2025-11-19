import { ApiProperty } from "@nestjs/swagger";

export class EdicionDto {
  @ApiProperty({ example: 35, description: "Identificador incremental interno" })
  id!: number;

  @ApiProperty({ example: 2024 })
  year!: number;

  @ApiProperty({ example: "8 y 9 de noviembre" })
  dates!: string;

  @ApiProperty({ example: "Juntos, todos los días" })
  motto!: string;

  @ApiProperty({ example: "Chris Lindsay Doren" })
  ambassador!: string;

  @ApiProperty({ example: 38044459976, nullable: true })
  goal_clp?: number;

  @ApiProperty({ example: 40502617946, nullable: true })
  last_on_air_clp?: number;

  @ApiProperty({ example: 6.46, nullable: true })
  last_on_air_pct?: number;

  @ApiProperty({ example: 47437062872, nullable: true })
  audited_total_clp?: number;

  @ApiProperty({ example: 48076955, nullable: true })
  value_current_clp?: number;

  @ApiProperty({ example: 52000000, nullable: true })
  value_current_usd?: number;

  @ApiProperty({ example: "Programada", nullable: true })
  notes?: string;
}
