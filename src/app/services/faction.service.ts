import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FactionDto } from '../models/faction_dto.model';
import { Entry } from 'contentful';

@Injectable({
  providedIn: 'root'
})
export class FactionService {

  constructor(private apiService: ApiService) { }

  public async getFactions() {
      let factionData = await this.apiService.getEntriesByType('faction') as Entry<any>[];
      let factions: FactionDto[] = [];
      factionData.forEach((faction: Entry<any>) => {
          factions.push(new FactionDto(faction.sys.id, faction.fields.name, 'https:/' + faction.fields.symbolImage.fields.file.url));
      });
      return factions;
  }

  public async getFactionById(id: string) {
    let result = await this.apiService.getEntryById(id) as Entry<any>;
    return new FactionDto(
        result.sys.id,
        result.fields.name,
        'https:/' + result.fields.symbolImage.fields.file.url
    );
  }
}
