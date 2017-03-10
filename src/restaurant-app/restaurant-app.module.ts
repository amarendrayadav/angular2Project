import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RestaurantAppRoutingModule } from "./restaurant-app.routing.module";
import { RestuarantAppComponent } from "./restaurant-app.component";
@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, RestaurantAppRoutingModule],
    declarations: [RestuarantAppComponent],
    providers: [],
    bootstrap: [RestuarantAppComponent]
})

export class RestaurantAppModule {
    
}