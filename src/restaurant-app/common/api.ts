import {Http, Response,Headers} from "@angular/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {RouteService} from "../shared/route/route.service";
// import {Token} from "../modules/login/models/token.model";

@Injectable()
export abstract class ApiService {

    private debug = window.localStorage.getItem("debug") == "1";

    constructor(protected http: Http,
                protected routeService: RouteService) {
    }

    protected extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    protected handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    protected resolveUrl(urls: string[], options?: Object): string {
        let url = this.routeService.routes.gateWay + urls[0];
        if (this.debug && urls[1]) {
            url = urls[1];
        }
        if (options) {
            for (let key in options) {
                url = url.replace("{" + key + "}", options[key]);
            }
        }
        return url;
    }

    protected get(urls: string[], options?: Object) {
        return this.http.get(this.resolveUrl(urls, options))
            .map(this.extractData)
            .catch(this.handleError);
    }

    protected post(urls: string[], options?: Object, body?: any) {
        return this.http.post(this.resolveUrl(urls, options), body)
            .map(this.extractData)
            .catch(this.handleError);
    }

    protected put(urls: string[], token : Token, options?: Object, body?: any) {
        let authHeader = this.createAuthHeader(token);
        return this.http.put(this.resolveUrl(urls, options), body,{
            headers : authHeader
        })
            .map(this.extractData)
            .catch(this.handleError);
    }

    // private createAuthHeader(token : Token): Headers{
    //    let headers = new Headers();
    //    headers.append("Authorization", "Bearer "+token.accessToken);
    //    return headers;
    // }

}