import { Controller, Get } from '@nestjs/common';

/**
 * Simple health check controller
 */
@Controller('health')
export class HealthController {

  /**
   * ping.
   */
  @Get()
  getHello(): string {
    return 'up';
  }
}
