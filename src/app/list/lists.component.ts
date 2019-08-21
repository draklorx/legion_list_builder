import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { FactionModalComponent } from "./faction-modal/faction.modal";
import { RouterExtensions } from 'nativescript-angular/router';

import { ListDto } from "../models/list_dto.model";
import { ListService } from "../services/list.service";

@Component({
    selector: "legion-lists",
    moduleId: module.id,
    templateUrl: "./lists.component.html"
})
export class ListsComponent implements OnInit {
    lists: ListDto[];

    // This pattern makes use of Angular’s dependency injection implementation to
    // inject an instance of the ListService service into this class.
    // Angular knows about this service because it is included in your app’s main NgModule,
    // defined in app.module.ts.
    constructor(
        private listService: ListService,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private router: RouterExtensions
    ) { }

    ngOnInit(): void {
        this.listService.getLists();
    }

    chooseFaction() {
        let options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };

        this.modal.showModal(FactionModalComponent, options).then(factionId => {
            if (factionId) {
                this.router.navigate(['/list/new', factionId]);
            }
        });
    }
}
