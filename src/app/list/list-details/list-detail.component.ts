import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { ListDto } from "../../models/list_dto.model";
import { ListService } from "../../services/list.service";
import { FactionService } from "../../services/faction.service";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "legion-list-details",
    moduleId: module.id,
    templateUrl: "./list-detail.component.html"
})
export class ListDetailComponent implements OnInit {
    list: ListDto;
    listIndex: number;

    constructor(
        private listService: ListService,
        private factionService: FactionService,
        private route: ActivatedRoute,
        private router: RouterExtensions
    ) { }

    ngOnInit(): void {
        const listIndex = this.route.snapshot.params.id;
        if (!listIndex) {
            const factionId = this.route.snapshot.params.factionId;
            this.factionService.getFactionById(factionId).then(faction => {
                this.list = new ListDto(
                    'New List',
                    faction,
                    []
                );
            });
        }
        else {
            // TODO Get list by ID
            //this.list = this.listService.getList(listIndex);
            this.listIndex = listIndex;
        }
    }

    saveChanges() {
        if (this.listIndex) {
            this.listService.updateList(this.list, this.listIndex);
        }
        else {
            this.listService.createList(this.list);
        }
        this.router.navigate(['/lists']);
    }

    cancelChanges() {
        this.router.navigate(['/lists']);
    }
}
