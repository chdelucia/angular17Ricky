import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export const queryParamInterceptor: HttpInterceptorFn = (
  req,
  next,
): Observable<HttpEvent<unknown>> => {
  const modifiedRequest = req.clone();
  const queryParams = modifiedRequest.params.toString();

  const router = inject(Router);

  return next(req).pipe(
    tap({
      next: () => {
        if (queryParams) {
          const paramsObj: Params = {
            name: modifiedRequest.params.get('name'),
            page: modifiedRequest.params.get('page'),
          };
          router.navigate([], {
            queryParamsHandling: 'merge',
            queryParams: paramsObj,
          });
        }
      },
      error: (e) => {
        if (
          e instanceof HttpErrorResponse &&
          (e.status === 401 || e.status === 403)
        ) {
          router.navigateByUrl('/logout');
        }
        if (e instanceof HttpErrorResponse && e.status === 500) {
          router.navigateByUrl('/not-found');
        }
      },
    }),
  );
};
