import { Logger, Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

/**
 * Dummy class for projecting REST APIs
 */
@Injectable()
export class AuthenticationGuard implements CanActivate {

    private readonly logger = new Logger(AuthenticationGuard.name);

    /**
     * framework method to determine access.
     * @param context
     */
    canActivate( context: ExecutionContext): boolean {

        const request = context.switchToHttp().getRequest();
        return this.validateRequest(request);
    }

    /**
     * Validating request.
     * @param request
     */
    private validateRequest(request: any): boolean {
        this.logger.log('Fake authentication check:  pass') ;
        return true ;
    }
}
