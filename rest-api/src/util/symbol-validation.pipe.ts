import { Logger, PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

/**
 * Input param validator
 */
@Injectable()
export class SymbolValidationPipe implements PipeTransform<string, string> {

    private readonly logger = new Logger(SymbolValidationPipe.name);

    /**
     * Simple data validation logic.
     * @param value
     * @param metadata
     */
    transform(value: string, metadata: ArgumentMetadata): string {

        const regex = /^[a-zA-Z0-9.]{0,5}$/;
        if (value && metadata.type === 'param' && !regex.test(value)) {
            this.logger.log('Validation failed:  ' + value) ;
            throw new BadRequestException('Bad input.') ;
        }

        return value;
    }
}
