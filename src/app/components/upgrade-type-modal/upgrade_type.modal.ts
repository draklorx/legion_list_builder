import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';
import { UpgradeTypeService } from '../../services/upgrade_type.service';
import { UpgradeTypeDto } from '../../dtos/upgrade_type_dto.model';

@Component({
    selector: 'ns-legion-upgrade-type-modal',
    templateUrl: 'upgrade_type.modal.html',
    styleUrls: ['./upgrade_type.modal.css']
})
export class UpgradeTypeModalComponent implements OnInit {
    public upgradeTypes: UpgradeTypeDto[] = [];

    public constructor(private params: ModalDialogParams, private upgradeTypeService: UpgradeTypeService) {}

    public chooseUpgradeType(upgradeTypeId: string) {
        this.params.closeCallback(upgradeTypeId);
    }

    async ngOnInit() {
        this.upgradeTypes = this.params.context.upgradeSlots;
    }
}
