import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { UnitDto } from '../dtos/unit_dto.model';
import { Entry } from 'contentful';
import { FactionService } from './faction.service';
import { RankService } from './rank.service';
import { UpgradeTypeService } from './upgrade_type.service';
import { UpgradeTypeDto } from '../dtos/upgrade_type_dto.model';
import { UpgradeDto } from '../dtos/upgrade_dto.model';

@Injectable({
    providedIn: 'root'
})
export class UpgradeService {
    constructor(
        private apiService: ApiService,
        private factionService: FactionService,
        private rankService: RankService,
        private upgradeTypeService: UpgradeTypeService
    ) {}

    public async getUpgradesByTypeAndUnit(typeId: string, unit: UnitDto) {
        let upgradeData = (await this.apiService.getEntriesByType('upgrade', { 'fields.upgradeType.sys.id': typeId })) as Entry<any>[];
        let upgrades: UpgradeDto[] = [];
        upgradeData.forEach((upgrade: Entry<any>) => {
            //let faction = this.factionService
            upgrades.push(this.buildUpgradeDtoFromApiData(upgrade));
        });
        return upgrades;
    }

    public buildUpgradeDtoFromApiData(apiData: Entry<any>): UpgradeDto {
        return new UpgradeDto(
            apiData.sys.id,
            apiData.fields.name,
            apiData.fields.upgradeType.sys.id,
            apiData.fields.points,
            this.apiService.imagePrefix + apiData.fields.cardImage.fields.file.url
        );
    }

    public async getUpgradeById(upgradeId: string) {
        let upgradeData = (await this.apiService.getEntryById(upgradeId)) as Entry<any>;
        return this.buildUpgradeDtoFromApiData(upgradeData);
    }
}
