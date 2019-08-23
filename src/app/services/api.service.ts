import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { FactionDto } from '../dtos/faction_dto.model';
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

  public async getEntriesByType(type: string): Promise<Entry<any>[]> {
    const result = await this.client.getEntries(Object.assign({
          content_type: 'faction'
      }));
    return result.items;
  }

    public async getEntryById(id: string): Promise<Entry<any>> {
        let result = await this.client.getEntry(id);
        return result;
    }

}
