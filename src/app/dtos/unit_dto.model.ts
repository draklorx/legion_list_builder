import { FactionDto } from './faction_dto.model';
import { RankDto } from './rank_dto.model';
export class UnitDto {
    constructor(
        public id: string,
        public name: string,
        public faction: FactionDto,
        public rank: RankDto,
        public points: number,
        public cardFrontImageUrl: string
    ) { }
}
