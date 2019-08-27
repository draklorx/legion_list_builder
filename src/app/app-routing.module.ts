import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';

import { ListsComponent } from './components/list/lists.component';
import { ListDetailComponent } from './components/list-details/list-detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/lists', pathMatch: 'full' },
    { path: 'lists', component: ListsComponent },
    { path: 'list/new/:factionId', component: ListDetailComponent },
    { path: 'list/:id', component: ListDetailComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
