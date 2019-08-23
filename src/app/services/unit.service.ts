import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UnitDto } from '../dtos/unit_dto.model';
import { Entry } from 'contentful';
import { FactionService } from './faction.service';
import { RankService } from './rank.service';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(
    private apiService: ApiService,
    private factionService: FactionService,
    private rankService: RankService
  ) { }

  public async getUnitsForFactionAndRank(factionId: string, rankId: string) {
      let unitData = await this.apiService.getEntriesByType('unit', {'fields.faction.sys.id': factionId, 'fields.rank.sys.id': rankId}) as Entry<any>[];
      let units: UnitDto[] = [];
      unitData.forEach((unit: Entry<any>) => {
        //let faction = this.factionService
        units.push(this.buildUnitDtoFromApiData(unit));
      });
      return units;
  }

  public buildUnitDtoFromApiData(apiData: Entry<any>): UnitDto {
    return new UnitDto(
        apiData.sys.id,
        apiData.fields.name,
        this.factionService.buildFactionDtoFromApiData(apiData.fields.faction),
        this.rankService.buildRankDtoFromApiData(apiData.fields.rank),
        apiData.fields.points,
        this.apiService.imagePrefix + apiData.fields.cardImageFront.fields.file.url
    );
  }

  public async getUnitById(id: string) {
    let result = await this.apiService.getEntryById(id) as Entry<any>;
    return this.buildUnitDtoFromApiData(result);
  }
}
