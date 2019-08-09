import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { List } from "../list.model";
import { ListService } from "../list.service";

@Component({
    selector: "legion-list-details",
    moduleId: module.id,
    templateUrl: "./list-detail.component.html"
})
export class ListDetailComponent implements OnInit {
    list: List;

    constructor(
        private listService: ListService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = +this.route.snapshot.params.id;
        this.list = this.listService.getList(id);
    }
}
