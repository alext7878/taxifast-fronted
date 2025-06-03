import { HttpClient, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class PlacesApiClient extends HttpClient {

    baseUrl: string = 'https://api.mapbox.com/search/geocode/v6/forward';

    constructor(handler: HttpHandler) {
        super(handler);
    }

    public override get<T>(url: string, options: {
        params?: HttpParams | Record<string, string | number | boolean | ReadonlyArray<string | number | boolean>>
    }) {
        url = this.baseUrl + url;
        return super.get<T>(url, {
            params: {
                country: 'co',
                limit: 5,
                access_token: environment.MAPBOX_KEY,
                ...options.params,
            }
        });
    }
}