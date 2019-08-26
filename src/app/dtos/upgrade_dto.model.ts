import { UpgradeTypeDto } from './upgrade_type_dto.model';

export class UpgradeDto {
    constructor(
        public id: string,
        public name: string,
        public UpgradeType: UpgradeTypeDto,
        public points: number,
        public cardImageUrl: string
    ) { }
}
