import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';
import { UpgradeTypeService } from '../../services/upgrade_type.service';
import { ListUpgradeTypeDto } from '../../dtos/list_upgrade_type_dto.model';
import { ListUnitDto } from '~/app/dtos/list_unit_dto.model';

@Component({
    selector: 'ns-legion-upgrade-type-modal',
    templateUrl: 'upgrade_type.modal.html',
    styleUrls: ['./upgrade_type.modal.css']
})
export class UpgradeTypeModalComponent implements OnInit {
    public upgradeTypes: ListUpgradeTypeDto[] = [];

    public constructor(private params: ModalDialogParams, private upgradeTypeService: UpgradeTypeService) {}

    public chooseUpgradeType(upgradeSlot: ListUpgradeTypeDto) {
        this.params.closeCallback(upgradeSlot);
    }

    async ngOnInit() {
        this.upgradeTypes = this.params.context.upgradeSlots;
    }
}
