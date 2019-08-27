import { UnitDto } from './unit_dto.model';
import { FactionDto } from './faction_dto.model';
import { RankDto } from './rank_dto.model';
import { UpgradeTypeDto } from './upgrade_type_dto.model';
import { UpgradeDto } from './upgrade_dto.model';

export class ListUnitDto extends UnitDto {
    constructor(
        public id: string,
        public name: string,
        public faction: FactionDto,
        public rank: RankDto,
        public upgradeSlots: UpgradeTypeDto[],
        public points: number,
        public cardFrontImageUrl: string,
        public upgrades: UpgradeDto[]
    ) {
        super(id, name, faction, rank, upgradeSlots, points, cardFrontImageUrl);
    }
}
