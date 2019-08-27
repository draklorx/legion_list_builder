import { Injectable } from '@angular/core';
import { Couchbase } from 'nativescript-couchbase';

@Injectable()
export class LocalStorageService {
    private database: any;

    constructor() {
        this.database = new Couchbase('legion_app');
    }

    public getDocument(docId: string) {
        return this.database.getDocument(docId);
    }

    public createDocument(data: any, docId: string) {
        return this.database.createDocument(data, docId);
    }

    public updateDocument(data: any, docId: string) {
        return this.database.updateDocument(docId, data);
    }

    public deleteDocument(docId) {
        return this.database.deleteDocument(docId);
    }
}
