import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        status: 'success', // o cualquier valor que desees para status
        data: data,
        mensaje: 'Operación realizada con éxito', // Puedes personalizar este mensaje según necesites
      })),
    );
  }
}
