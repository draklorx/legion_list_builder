import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "nativescript-angular/directives/dialogs";
import { RankService } from "../../services/rank.service";
import { RankDto } from "../../dtos/rank_dto.model";

@Component({
    selector: "ns-legion-rank-modal",
    templateUrl: "rank.modal.html",
    styleUrls: ["./rank.modal.css"]
})
export class RankModalComponent implements OnInit {
    public ranks: RankDto[] = [];

    public constructor(
        private params: ModalDialogParams,
        private rankService: RankService
    ) { }

    public chooseRank(rankId: string) {
        this.params.closeCallback(rankId);
    }

    async ngOnInit() {
        let ranks = await this.rankService.getRanks();
        this.ranks = ranks;
    }
}
