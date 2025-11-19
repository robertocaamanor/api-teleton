// src/app.module.ts
import { Module } from "@nestjs/common";
import { EdicionesController } from "./ediciones/ediciones.controller";
import { EdicionesService } from "./ediciones/ediciones.service";

@Module({
  controllers: [EdicionesController],
  providers: [EdicionesService]
})
export class AppModule {}
