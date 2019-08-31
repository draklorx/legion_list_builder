import { Injectable } from '@angular/core';
import { UnitDto } from '../dtos/unit_dto.model';
import { UpgradeTypeDto } from '../dtos/upgrade_type_dto.model';
import { ListUnitDto } from '../dtos/list_unit_dto.model';
import { ListUpgradeTypeDto } from '../dtos/list_upgrade_type_dto.model';

@Injectable({
    providedIn: 'root'
})
export class ListUnitService {
    constructor() {}

    public static generate(unitDto: UnitDto): ListUnitDto {
        // Set up base unit.
        let listUnitDto = new ListUnitDto(
            unitDto.id,
            unitDto.name,
            unitDto.faction,
            unitDto.rank,
            [],
            unitDto.points,
            unitDto.cardFrontImageUrl
        );

        // Create upgrade slots for unit.
        unitDto.upgradeSlots.forEach((upgradeSlot: UpgradeTypeDto) => {
            listUnitDto.upgradeSlots.push(new ListUpgradeTypeDto(upgradeSlot.id, upgradeSlot.name, upgradeSlot.imageUrl, null));
        });
        return listUnitDto;
    }
}
