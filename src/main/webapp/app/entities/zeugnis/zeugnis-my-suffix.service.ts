import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DateUtils } from 'ng-jhipster';

import { ZeugnisMySuffix } from './zeugnis-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ZeugnisMySuffixService {

    private resourceUrl = 'api/zeugnis';

    constructor(private http: Http, private dateUtils: DateUtils) { }

    create(zeugnis: ZeugnisMySuffix): Observable<ZeugnisMySuffix> {
        const copy = this.convert(zeugnis);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    update(zeugnis: ZeugnisMySuffix): Observable<ZeugnisMySuffix> {
        const copy = this.convert(zeugnis);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }

    find(id: number): Observable<ZeugnisMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        });
    }
    getBySchueler(id: number): Observable<ZeugnisMySuffix> {
        return this.http.get('api/getBySchueler/'+id).map((res: Response) => {
            const jsonResponse = res.json();
            this.convertItemFromServer(jsonResponse);
            return jsonResponse;
        })
    }
    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        for (let i = 0; i < jsonResponse.length; i++) {
            this.convertItemFromServer(jsonResponse[i]);
        }
        return new ResponseWrapper(res.headers, jsonResponse);
    }

    private convertItemFromServer(entity: any) {
        entity.datum = this.dateUtils
            .convertDateTimeFromServer(entity.datum);
    }

    private convert(zeugnis: ZeugnisMySuffix): ZeugnisMySuffix {
        const copy: ZeugnisMySuffix = Object.assign({}, zeugnis);

        copy.datum = this.dateUtils.toDate(zeugnis.datum);
        return copy;
    }
}
