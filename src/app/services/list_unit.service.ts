import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UnitDto } from '../dtos/unit_dto.model';
import { Entry } from 'contentful';
import { FactionService } from './faction.service';
import { RankService } from './rank.service';
import { UpgradeTypeService } from './upgrade_type.service';
import { UpgradeTypeDto } from '../dtos/upgrade_type_dto.model';
import { ListUnitDto } from '../dtos/list_unit_dto.model';

@Injectable({
  providedIn: 'root'
})
export class ListUnitService {

  constructor(
    private apiService: ApiService,
    private factionService: FactionService,
    private rankService: RankService,
    private upgradeTypeService: UpgradeTypeService
  ) { }

  public buildListUnitDtoFromApiData(apiData: Entry<any>): UnitDto {
    let upgradeSlots: UpgradeTypeDto[] = [];

    apiData.fields.upgradeSlots.forEach(upgradeType => {
        upgradeSlots.push(this.upgradeTypeService.buildUpgradeTypeDtoFromApiData(upgradeType));
    });

    return new UnitDto(
        apiData.sys.id,
        apiData.fields.name,
        this.factionService.buildFactionDtoFromApiData(apiData.fields.faction),
        this.rankService.buildRankDtoFromApiData(apiData.fields.rank),
        upgradeSlots,
        apiData.fields.points,
        this.apiService.imagePrefix + apiData.fields.cardImageFront.fields.file.url
    );
  }

  public static generate(unitDto: UnitDto): ListUnitDto {
      return new ListUnitDto(
          unitDto.id,
          unitDto.name,
          unitDto.faction,
          unitDto.rank,
          unitDto.upgradeSlots,
          unitDto.points,
          unitDto.cardFrontImageUrl,
          []
        );
  }
}
