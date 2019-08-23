import { UnitDto } from "./unit_dto.model";
import { FactionDto } from "./faction_dto.model";

export class ListDto {

    constructor(
        public name: string,
        public faction: FactionDto,
        public units: UnitDto[]
    ) { }
}
