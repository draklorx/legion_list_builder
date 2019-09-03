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
        let upgradeData = (await this.apiService.getEntriesByType('upgrade', { 'fields.upgradeType.sys.id': typeId, "order": "fields.name" })) as Entry<any>[];
        let upgrades: UpgradeDto[] = [];
        upgradeData.forEach((upgrade: Entry<any>) => {
            // If there is a restriction on the upgrade.
            if (upgrade.fields.restrictedTo) {
                // Assume all possible restrictions match.
                let unitMatch = true;
                let unitTypeMatch = true;
                let factionMatch = true;
                // Loop over each possible restriction and if one exists for a type, assume that type does not match.
                upgrade.fields.restrictedTo.forEach(restriction => {
                    if (restriction.sys.contentType.sys.id == "unit") {
                        unitMatch = false;
                    }
                    else if (restriction.sys.contentType.sys.id == "faction") {
                        factionMatch = false;
                    }
                    else if (restriction.sys.contentType.sys.id == "unitType") {
                        unitTypeMatch = false;
                    }
                });
                // Loop over all possible restrictions again, and if any match is good within a possible set then it is good.
                upgrade.fields.restrictedTo.forEach(restriction => {
                    if (restriction.sys.contentType.sys.id == "unit" && restriction.sys.id == unit.id) {
                        unitMatch = true;
                    }
                    else if (restriction.sys.contentType.sys.id == "faction" && restriction.sys.id == unit.faction.id) {
                        factionMatch = true;
                    }
                    else if (restriction.sys.contentType.sys.id == "unitType" && restriction.fields.name == unit.unitType) {
                        unitTypeMatch = true;
                    }
                });
                // If there is no restriction, or if each restriction matches on at least one entry then add it.
                if (unitMatch && unitTypeMatch && factionMatch) {
                    upgrades.push(this.buildUpgradeDtoFromApiData(upgrade));
                }
            }
            else {
                upgrades.push(this.buildUpgradeDtoFromApiData(upgrade));
            }
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
