import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { InputSwitchModule, CalendarModule } from 'primeng/primeng';
import { RouterModule } from "@angular/router";
import { GlobalToolBarComponent } from './global-toolbar/global-toolbar.component';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { TopSearchFieldComponent } from './top-search-field/top-search-field.component';
import { NavbarComponent } from "./navbar/navbar.component";
@NgModule({
    imports: [
        BrowserModule,
        CalendarModule,
        FormsModule,
        InputSwitchModule,
        RouterModule
    ],
    declarations: [
        GlobalToolBarComponent,
        TopToolbarComponent,
        TopSearchFieldComponent,
        NavbarComponent
    ],
    exports: [
        GlobalToolBarComponent,
        TopToolbarComponent,
        TopSearchFieldComponent,
        NavbarComponent
    ],
    providers: []
})
export class ComponentsModule {

}