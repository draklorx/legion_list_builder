import { UnitDto } from './unit_dto.model';
import { FactionDto } from './faction_dto.model';
import { RankDto } from './rank_dto.model';
import { ListUpgradeTypeDto } from './list_upgrade_type_dto.model';

export class ListUnitDto extends UnitDto {
    constructor(
        public id: string,
        public name: string,
        public faction: FactionDto,
        public rank: RankDto,
        public upgradeSlots: ListUpgradeTypeDto[],
        public points: number,
        public cardFrontImageUrl: string
    ) {
        super(id, name, faction, rank, upgradeSlots, points, cardFrontImageUrl);
    }
}
