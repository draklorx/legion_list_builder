import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { UpgradeService } from "../../services/upgrade.service";
import { UpgradeDto } from "../../dtos/upgrade_dto.model";

@Component({
    selector: "legion-upgrade-modal",
    templateUrl: "upgrade.modal.html",
    styleUrls: ["./upgrade.modal.css"]
})
export class UpgradeModalComponent implements OnInit {
    public upgrades: UpgradeDto[] = [];

    public constructor(
        private params: ModalDialogParams,
        private upgradeService: UpgradeService
    ) { }

    public chooseUpgrade(upgrade: UpgradeDto) {
        this.params.closeCallback(upgrade);
    }

    async ngOnInit() {
        let upgrades = await this.upgradeService.getUpgradesByTypeAndUnit(this.params.context.upgradeTypeId, this.params.context.unit);
        this.upgrades = upgrades;
    }
}
