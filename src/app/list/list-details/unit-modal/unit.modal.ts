import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { UnitService } from "../../../services/unit.service";
import { UnitDto } from "../../../dtos/unit_dto.model";

@Component({
    selector: "legion-unit-modal",
    templateUrl: "unit.modal.html",
    styleUrls: ["./unit.modal.css"]
})
export class UnitModalComponent implements OnInit {
    public units: UnitDto[] = [];

    public constructor(
        private params: ModalDialogParams,
        private unitService: UnitService
    ) { }

    public chooseUnit(unit: UnitDto) {
        this.params.closeCallback(unit);
    }

    async ngOnInit() {
        let units = await this.unitService.getUnitsForFactionAndRank(this.params.context.factionId, this.params.context.rankId);
        this.units = units;
    }
}
