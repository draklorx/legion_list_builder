import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    public imagePrefix = 'https:/';
    private client = createClient({
        space: environment.contentful.spaceId,
        accessToken: environment.contentful.token
    })

    constructor( ) { }

    public async getEntriesByType(type: string, params: any = {}): Promise<Entry<any>[]> {
        params.content_type = type;
        const result = await this.client.getEntries(Object.assign(params));
        return result.items;
    }

    public async getEntryById(id: string): Promise<Entry<any>> {
        let result = await this.client.getEntry(id);
        return result;
    }

}
