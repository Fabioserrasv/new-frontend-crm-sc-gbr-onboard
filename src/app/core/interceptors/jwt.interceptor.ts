import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = localStorage.getItem('jwtToken');
  req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + jwtToken) })
  return next(req);
};
