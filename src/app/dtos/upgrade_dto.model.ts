import { UpgradeTypeDto } from './upgrade_type_dto.model';

export class UpgradeDto {
    constructor(
        public id: string,
        public name: string,
        public typeId: string,
        public points: number,
        public cardImageUrl: string
    ) {}
}
