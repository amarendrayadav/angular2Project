import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouteService } from "../../shared/route/route.service";
import { ComponentsModule } from '../../components/components.module';

@NgModule({
    imports: [
        BrowserModule,
        ComponentsModule,
        FormsModule,
        HttpModule
    ],
    declarations: [],
    exports: [],
    providers: []
})

export class VegsModule {
}