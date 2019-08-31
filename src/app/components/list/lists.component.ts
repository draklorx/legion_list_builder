import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { FactionModalComponent } from '../faction-modal/faction.modal';
import { isAndroid } from 'tns-core-modules/platform';
import * as application from 'tns-core-modules/application';
import { AndroidApplication, AndroidActivityBackPressedEventData } from 'tns-core-modules/application';
import { Router } from '@angular/router';

import { ListDto } from '../../dtos/list_dto.model';
import { ListService } from '../../services/list.service';
import { OptionsModalComponent } from '../options-modal/options.modal';

@Component({
    selector: 'ns-legion-lists',
    moduleId: module.id,
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
    lists: ListDto[];

    constructor(
        private listService: ListService,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef,
        private router: Router
    ) {}

    async ngOnInit() {
        if (!isAndroid) {
            return;
        }
        application.android.on(AndroidApplication.activityBackPressedEvent, (data: AndroidActivityBackPressedEventData) => {
            if (this.router.url == '' || this.router.url == '/lists') {
                data.cancel = true; // prevents default back button behavior
            }
        });
        this.lists = await this.listService.getLists();
    }

    chooseFaction() {
        let options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };

        this.modal.showModal(FactionModalComponent, options).then(factionId => {
            if (factionId) {
                // This is a bit of a hack. When closing the modal it always routes back.
                // This creates a race condition where this navigate may fire before or after that back route.
                // Delay this route by a few miliseconds to ensure it always fires first.
                setTimeout(() => {
                    this.router.navigate(['/list/new', factionId]);
                }, 30);
            }
        });
    }

    listOptions(listIndex: number) {

        let options = {
            context: {
                choices: ['Edit', 'Delete']
            },
            fullscreen: false,
            viewContainerRef: this.vcRef
        };

        this.modal.showModal(OptionsModalComponent, options).then(async (choice: string) => {
            if (choice == "Edit") {
                this.router.navigate(['/list', listIndex]);
            }
            else if (choice == "Delete") {
                this.listService.deleteList(listIndex);
                this.lists = await this.listService.getLists();
            }
        });
    }

    getPointsForList(listDto: ListDto) {
        return this.listService.getPointsForList(listDto);
    }
}
