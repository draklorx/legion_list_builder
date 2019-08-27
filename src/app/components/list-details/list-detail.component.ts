import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalDialogService } from 'nativescript-angular/directives/dialogs';
import { RankModalComponent } from '../rank-modal/rank.modal';
import { UnitModalComponent } from '../unit-modal/unit.modal';
import { ActivatedRoute } from '@angular/router';

import { ListDto } from '../../dtos/list_dto.model';
import { ListService } from '../../services/list.service';
import { ListUnitDto } from '../../dtos/list_unit_dto.model';
import { FactionService } from '../../services/faction.service';
import { RouterExtensions } from 'nativescript-angular/router';
import { UpgradeTypeDto } from '../../dtos/upgrade_type_dto.model';
import { UpgradeTypeModalComponent } from '../upgrade-type-modal/upgrade_type.modal';
import { UpgradeModalComponent } from '../upgrade-modal/upgrade.modal';
import { ListUnitService } from '~/app/services/list_unit.service';

@Component({
    selector: 'ns-legion-list-details',
    moduleId: module.id,
    templateUrl: './list-detail.component.html',
    styleUrls: ['./list-detail.component.css']
})
export class ListDetailComponent implements OnInit {
    list: ListDto;
    listIndex: number;

    constructor(
        private listService: ListService,
        private factionService: FactionService,
        private route: ActivatedRoute,
        private router: RouterExtensions,
        private modal: ModalDialogService,
        private vcRef: ViewContainerRef
    ) {}

    async ngOnInit() {
        if (this.route.snapshot.params.id) {
            const listIndex = this.route.snapshot.params.id;
            this.list = await this.listService.getList(listIndex);
            this.listIndex = listIndex;
        } else {
            const factionId = this.route.snapshot.params.factionId;
            let faction = await this.factionService.getFactionById(factionId);
            this.list = new ListDto('New List', faction, []);
        }
    }

    chooseUpgradeType(listUnit: ListUnitDto) {
        let options = {
            context: {
                upgradeSlots: listUnit.upgradeSlots
            },
            fullscreen: false,
            viewContainerRef: this.vcRef
        };

        this.modal.showModal(UpgradeTypeModalComponent, options).then(upgradeTypeId => {
            if (upgradeTypeId) {
                let options = {
                    context: {
                        upgradeTypeId: upgradeTypeId,
                        unit: listUnit
                    },
                    fullscreen: true,
                    viewContainerRef: this.vcRef
                };
                this.modal.showModal(UpgradeModalComponent, options).then(upgrade => {
                    if (upgrade) {
                        listUnit.upgrades.push(upgrade);
                    }
                });
            }
        });
    }

    chooseRank() {
        let options = {
            context: {},
            fullscreen: false,
            viewContainerRef: this.vcRef
        };

        this.modal.showModal(RankModalComponent, options).then(rankId => {
            if (rankId) {
                let options = {
                    context: {
                        factionId: this.list.faction.id,
                        rankId: rankId
                    },
                    fullscreen: true,
                    viewContainerRef: this.vcRef
                };
                this.modal.showModal(UnitModalComponent, options).then(unit => {
                    if (unit) {
                        this.list.units.push(ListUnitService.generate(unit));
                    }
                });
            }
        });
    }

    saveChanges(name: string) {
        if (this.listIndex) {
            this.listService.updateList(this.list, this.listIndex);
        } else {
            this.listService.createList(this.list);
        }
        this.router.navigate(['/lists']);
    }

    cancelChanges() {
        this.router.navigate(['/lists']);
    }
}
