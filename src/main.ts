// src/main.ts
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle("Teletón API")
    .setDescription("Endpoints públicos para consultar ediciones de la Teletón")
    .setVersion("1.0.0")
    .setLicense("MIT", "https://opensource.org/licenses/MIT")
    .addServer("http://localhost:3000", "Desarrollo local")
    .addTag("Ediciones", "Consulta y filtros sobre las distintas campañas")
    .setExternalDoc(
      "Fuente de datos (Wikipedia)",
      "https://es.wikipedia.org/wiki/Telet%C3%B3n_(Chile)"
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
    customSiteTitle: "Teletón API Docs",
  });

  await app.listen(3000);
}
bootstrap();
