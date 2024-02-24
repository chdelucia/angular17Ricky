import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  //call service to get token from localstorage usually
  // inject(localStorageServvice)
  //this.localStorageService.getValue(jwtToken);

  const modifiedRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer tokenObtenidoArriba`,
    },
    setParams: {
      lang: 'ES',
    },
  });

  return next(modifiedRequest);
};
