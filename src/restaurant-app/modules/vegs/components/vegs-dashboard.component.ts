import {Component} from "@angular/core";
import {VegsService} from "../vegs.service";

@Component({
    selector: 'vegs-page',
    templateUrl:'vegs-dashboard.component.html',
    providers:[VegsService]    
})