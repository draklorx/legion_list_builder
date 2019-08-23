import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ModalDialogService } from "nativescript-angular/modal-dialog";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ListsComponent } from "./list/lists.component";
import { ListDetailComponent } from "./list/list-details/list-detail.component";
import { FactionModalComponent } from "./list/faction-modal/faction.modal";
import { RankModalComponent } from "./list/list-details/rank-modal/rank.modal";
import { UnitModalComponent } from "./list/list-details/unit-modal/unit.modal";


import { LocalStorageService } from "./services/local-storage.service";
import { ListService } from "./services/list.service";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        ListsComponent,
        ListDetailComponent,
        FactionModalComponent,
        RankModalComponent,
        UnitModalComponent
    ],
    entryComponents: [
        FactionModalComponent,
        RankModalComponent,
        UnitModalComponent
    ],
    providers: [
        ModalDialogService,
        LocalStorageService,
        ListService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
