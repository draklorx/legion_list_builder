import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { ApiService } from "../../services/api.service";
import { Faction } from "../../models/faction.model";

@Component({
    selector: "legion-faction-modal",
    templateUrl: "faction.modal.html",
    styleUrls: ["./faction.modal.css"]
})
export class FactionModalComponent implements OnInit {
    public factions: Faction[] = [];

    public constructor(
        private params: ModalDialogParams,
        private apiService: ApiService
    ) { }

    public close(response: string) {
        this.params.closeCallback(response);
    }

    ngOnInit() {
        this.apiService.getFactions().then(factions => this.factions = factions);
    }
}
