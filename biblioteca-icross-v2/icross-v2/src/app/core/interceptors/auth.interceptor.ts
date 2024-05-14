import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const headers = req.headers
/*     .set('X-RapidAPI-Key', 'ee0e07dd89msh7f00f1d903dc49cp10f1e4jsnc6d1a9404776')
    .set('X-RapidAPI-Host', 'rawg-video-games-database.p.rapidapi.com'); */
  req = req.clone({
    headers: headers,
    params: req.params
      ? req.params.set('key', environment.API_KEY)
      : new HttpParams().set('key', environment.API_KEY),
  });

  return next(req);
};
