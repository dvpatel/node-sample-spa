import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthenticationGuard} from './util/authentication.guard' ;

/**
 * Bootstrapper
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: console });

  //  Authentication check. Point is you can put your real logic here to fully proect ALL APIs
  app.useGlobalGuards(new AuthenticationGuard());

  //  Enable CORS for x-domain, secure access
  app.enableCors();

  //  Listen on port 3000
  await app.listen(3000);
}

bootstrap();
