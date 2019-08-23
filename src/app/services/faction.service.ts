import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { FactionDto } from '../dtos/faction_dto.model';
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
          factions.push(this.buildFactionDtoFromApiData(faction));
      });
      return factions;
  }

  public buildFactionDtoFromApiData(apiData: Entry<any>): FactionDto {
      return new FactionDto(
          apiData.sys.id,
          apiData.fields.name,
          this.apiService.imagePrefix + apiData.fields.symbolImage.fields.file.url
      );
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
