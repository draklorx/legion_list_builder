import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { FactionService } from "../../services/faction.service";
import { FactionDto } from "../../models/faction_dto.model";

@Component({
    selector: "legion-faction-modal",
    templateUrl: "faction.modal.html",
    styleUrls: ["./faction.modal.css"]
})
export class FactionModalComponent implements OnInit {
    public factions: FactionDto[] = [];

    public constructor(
        private params: ModalDialogParams,
        private factionService: FactionService
    ) { }

    public chooseFaction(factionId: string) {
        this.params.closeCallback(factionId);
    }

    ngOnInit() {
        this.factionService.getFactions().then(factions => this.factions = factions);
    }
}
