import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { FactionDto } from '../models/faction_dto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.token
  })

  constructor( ) { }
/*
  public getUnits(query?: object): Promise<Entry<any>[]> {
    return this.client.getEntries(Object.assign({
      content_type: 'unit'
    }, query))
    .then (result => result.items);
  }

  public getRanks(query?: object): Promise<Entry<any>[]> {
    return this.client.getEntries(Object.assign({
      content_type: 'rank'
    }, query))
    .then (result => result.items);
  }

  public getFactions(query?: object): Promise<Entry<any>[]> {
    return this.client.getEntries(Object.assign({
      content_type: 'faction'
    }, query))
    .then (result => result.items);
  }

  public getUnit(unitId): Promise<Entry<any>> {
    return this.client.getEntries(Object.assign({
      content_type: 'unit'
    }, {'sys.id': unitId}))
    .then (result => result.items[0]);
  }
  */
  public async getEntriesByType(type: string): Promise<Entry<any>[]> {
    const result = await this.client.getEntries(Object.assign({
          content_type: 'faction'
      }));
    return result.items;
  }

    public async getEntryById(id: string): Promise<Entry<any>> {
        return this.client.getEntry(id);
    }

}
