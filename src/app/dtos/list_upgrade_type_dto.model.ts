import { UpgradeTypeDto } from "./upgrade_type_dto.model";
import { UpgradeDto } from "./upgrade_dto.model";

export class ListUpgradeTypeDto extends UpgradeTypeDto {
    constructor(
        public id: string,
        public name: string,
        public imageUrl: string,
        public upgrade: UpgradeDto
    ) {
        super(id, name, imageUrl);
    }
}
