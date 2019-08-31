// Contrib Modules
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import { AppRoutingModule } from './app-routing.module';

// Contrib Services
import { ModalDialogService } from 'nativescript-angular/modal-dialog';

// Custom Components
import { AppComponent } from './app.component';
import { ListsComponent } from './components/list/lists.component';
import { ListDetailComponent } from './components/list-details/list-detail.component';
import { FactionModalComponent } from './components/faction-modal/faction.modal';
import { RankModalComponent } from './components/rank-modal/rank.modal';
import { UnitModalComponent } from './components/unit-modal/unit.modal';
import { UpgradeTypeModalComponent } from './components/upgrade-type-modal/upgrade_type.modal';
import { UpgradeModalComponent } from './components/upgrade-modal/upgrade.modal';
import { OptionsModalComponent } from './components/options-modal/options.modal';

// Custom Services
import { LocalStorageService } from './services/local_storage.service';
import { ListService } from './services/list.service';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [AppComponent],
    imports: [NativeScriptModule, NativeScriptFormsModule, AppRoutingModule],
    declarations: [
        AppComponent,
        ListsComponent,
        ListDetailComponent,
        FactionModalComponent,
        RankModalComponent,
        UnitModalComponent,
        UpgradeTypeModalComponent,
        UpgradeModalComponent,
        OptionsModalComponent
    ],
    entryComponents: [
        FactionModalComponent,
        RankModalComponent,
        UnitModalComponent,
        UpgradeTypeModalComponent,
        UpgradeModalComponent,
        OptionsModalComponent
    ],
    providers: [ModalDialogService, LocalStorageService, ListService],
    schemas: [NO_ERRORS_SCHEMA]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule {}
