import { FactionDto } from './faction_dto.model';
import { ListUnitDto } from './list_unit_dto.model';

export class ListDto {
    constructor(public name: string, public faction: FactionDto, public units: ListUnitDto[]) {}
}
