import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { ListDto } from '../models/list_dto.model';
import { List } from '../models/list.model';
import { UnitDto } from '../models/unit_dto.model';
import { Unit } from '../models/unit.model';
import { FactionService } from './faction.service';
import { FactionDto } from '../models/faction_dto.model';

@Injectable()
export class ListService {
    private lists: List[] = [];
    private documentId: string = "lists";


    constructor(private localStorageService: LocalStorageService, private factionService: FactionService) {
        let listsDocument = this.localStorageService.getDocument(this.documentId);
        if (listsDocument == null) {
            this.localStorageService.createDocument({"lists": []}, this.documentId);
        }
        else {
            listsDocument.lists.forEach((listData: List) => {
                let list = new List(
                    listData.name,
                    listData.factionId,
                    []
                );
                listData.units.forEach((unitData: Unit) => {
                    list.units.push(new Unit(
                        unitData.unitId,
                        unitData.upgradeIds
                    ))
                });
                this.lists.push(list);
            });
            this.lists = listsDocument.lists;
        }
    }

    public async getLists() {
        let lists: ListDto[] = [];
        this.lists.forEach(async (list: List) => {
            let faction = await this.factionService.getFactionById(list.factionId);

            let listDto = new ListDto(
                list.name,
                faction,
                []
            );

            list.units.forEach(async (unit: Unit) => {
                //TODO Handle units
                //let unitDto = await this.unitService.getUnitById(unit.unitId);
                //listDto.units.push(unitDto);
            });

            lists.push(listDto);
        });

        return lists;
    }

    public getList(listIndex: number): List {
        if (listIndex >=0 && listIndex < this.lists.length) {
            return this.lists[listIndex];
        }
    }

    public createList(listDto: ListDto) {
        this.lists.push(this.buildListFromListDto(listDto));
        this.localStorageService.updateDocument({"lists": this.lists}, this.documentId);
    }

    private buildListFromListDto(listDto: ListDto) {
        let list = new List(
            listDto.name,
            listDto.faction.id,
            []
        );
        listDto.units.forEach((unitDto: UnitDto) => {
            let unit = new Unit(
                unitDto.id,
                []
            )
            // TODO: handle upgrades
            list.units.push(unit);
        });
        return list;
    }

    public updateList(listDto: ListDto, listIndex: number) {
        if (listIndex >=0 && listIndex < this.lists.length) {

            this.lists[listIndex] = this.buildListFromListDto(listDto);
            this.localStorageService.updateDocument({"lists": this.lists}, this.documentId);
        }
    }

    public deleteList(listIndex: number) {
        if (listIndex >=0 && listIndex < this.lists.length) {
            this.lists.splice(listIndex, 1);
            this.localStorageService.updateDocument({"lists": this.lists}, this.documentId);
        }
    }

    getPointsForList(list: ListDto): number {
        let points = 0;
        list.units.forEach(unit => {
            points += unit.points;
        })
        return points;
    }
}
