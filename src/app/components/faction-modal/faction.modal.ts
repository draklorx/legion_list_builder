import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';
import { FactionService } from '../../services/faction.service';
import { FactionDto } from '../../dtos/faction_dto.model';

@Component({
    selector: 'ns-legion-faction-modal',
    templateUrl: 'faction.modal.html',
    styleUrls: ['./faction.modal.css']
})
export class FactionModalComponent implements OnInit {
    public factions: FactionDto[] = [];

    public constructor(private params: ModalDialogParams, private factionService: FactionService) {}

    public chooseFaction(factionId: string) {
        this.params.closeCallback(factionId);
    }

    async ngOnInit() {
        let factions = await this.factionService.getFactions();
        this.factions = factions;
    }
}
