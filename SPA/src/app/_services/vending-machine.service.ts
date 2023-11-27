import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { Snack } from '@app/_models';

const baseUrl = `${environment.apiUrl}/snack`;

@Injectable({ providedIn: 'root' })
export class VendingMachineService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Snack[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Snack>(`${baseUrl}/${id}`);
    }

    create(params: any) {
        return this.http.post(baseUrl, params);
    }

    update(id: string, params: any) {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }

    decreaseQuantity(id: string, params: any) {
        return this.http.put(`${baseUrl}/decreaseQuantity/${id}`, params);
    }
}