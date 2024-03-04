import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // swagger
  const config = new DocumentBuilder()
    .setTitle("Blog API")
    .setDescription("Blog API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  app.enableCors({
    origin: process.env.CORS_ORIGIN.split(", "),
    methods: ["GET", "POST", "PUT"],
  });
  await app.listen(8000);
}
bootstrap();
