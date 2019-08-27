import { Injectable } from '@angular/core';
import { LocalStorageService } from './local_storage.service';
import { ListDto } from '../dtos/list_dto.model';
import { List } from '../models/list.model';
import { Unit } from '../models/unit.model';
import { FactionService } from './faction.service';
import { FactionDto } from '../dtos/faction_dto.model';
import { UnitService } from '../services/unit.service';
import { ListUnitService } from '../services/list_unit.service';
import { UpgradeService } from '../services/upgrade.service';
import { UpgradeDto } from '../dtos/upgrade_dto.model';
import { ListUnitDto } from '../dtos/list_unit_dto.model';

@Injectable()
export class ListService {
    private lists: List[] = [];
    private documentId: string = 'lists';

    constructor(
        private localStorageService: LocalStorageService,
        private factionService: FactionService,
        private unitService: UnitService,
        private upgradeService: UpgradeService
    ) {
        let listsDocument = this.localStorageService.getDocument(this.documentId);
        if (listsDocument == null) {
            this.localStorageService.createDocument({ lists: [] }, this.documentId);
        } else {
            listsDocument.lists.forEach((listData: List) => {
                let list = new List(listData.name, listData.factionId, []);
                listData.units.forEach((unitData: Unit) => {
                    list.units.push(new Unit(unitData.unitId, unitData.upgradeIds));
                });
                this.lists.push(list);
            });
            this.lists = listsDocument.lists;
        }
    }

    public async getLists() {
        let listDtos: ListDto[] = [];
        for (var i = 0; i < this.lists.length; i++) {
            let listDto = await this.buildListDtoFromList(this.lists[i]);
            listDtos.push(listDto);
        }
        return listDtos;
    }

    public async getList(listIndex: number) {
        if (listIndex >= 0 && listIndex < this.lists.length) {
            let listDto = await this.buildListDtoFromList(this.lists[listIndex]);
            return listDto;
        }
    }

    public createList(listDto: ListDto) {
        this.lists.push(this.buildListFromListDto(listDto));
        this.localStorageService.updateDocument({ lists: this.lists }, this.documentId);
    }

    private async buildListDtoFromList(list: List) {
        let faction: FactionDto = await this.factionService.getFactionById(list.factionId);

        let listDto = new ListDto(list.name, faction, []);

        list.units.forEach(async unit => {
            let unitDto = await this.unitService.getUnitById(unit.unitId);
            let listUnitDto = ListUnitService.generate(unitDto);
            unit.upgradeIds.forEach(async upgradeId => {
                let upgradeDto = await this.upgradeService.getUpgradeById(upgradeId);
                listUnitDto.upgrades.push(upgradeDto);
            });
            listDto.units.push(listUnitDto);
        });

        return listDto;
    }

    private buildListFromListDto(listDto: ListDto) {
        let list = new List(listDto.name, listDto.faction.id, []);
        listDto.units.forEach((listUnitDto: ListUnitDto) => {
            let unit = new Unit(listUnitDto.id, []);

            listUnitDto.upgrades.forEach((upgradeDto: UpgradeDto) => {
                unit.upgradeIds.push(upgradeDto.id);
            });

            list.units.push(unit);
        });
        return list;
    }

    public updateList(listDto: ListDto, listIndex: number) {
        if (listIndex >= 0 && listIndex < this.lists.length) {
            this.lists[listIndex] = this.buildListFromListDto(listDto);
            this.localStorageService.updateDocument({ lists: this.lists }, this.documentId);
        }
    }

    public deleteList(listIndex: number) {
        if (listIndex >= 0 && listIndex < this.lists.length) {
            this.lists.splice(listIndex, 1);
            this.localStorageService.updateDocument({ lists: this.lists }, this.documentId);
        }
    }

    public getPointsForList(list: ListDto): number {
        let points = 0;
        list.units.forEach(unit => {
            points += unit.points;
            unit.upgrades.forEach(upgrade => {
                points += upgrade.points;
            });
        });
        return points;
    }
}
