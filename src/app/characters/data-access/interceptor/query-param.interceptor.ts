import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Observable } from 'rxjs';

export const queryParamInterceptor: HttpInterceptorFn = (
  req,
  next,
): Observable<HttpEvent<unknown>> => {
  const modifiedRequest = req.clone();
  const queryParams = modifiedRequest.params.toString();

  const router = inject(Router);
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

  return next(req);
};
