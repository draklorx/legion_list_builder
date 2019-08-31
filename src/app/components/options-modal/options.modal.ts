import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from 'nativescript-angular/directives/dialogs';

@Component({
    selector: 'ns-legion-options-modal',
    templateUrl: 'options.modal.html',
    styleUrls: ['./options.modal.css']
})
export class OptionsModalComponent implements OnInit {
    public options: string[] = [];

    public constructor(private params: ModalDialogParams) {}

    public chooseOption(option: string) {
        this.params.closeCallback(option);
    }

    async ngOnInit() {
        this.options = this.params.context.choices;
    }
}
