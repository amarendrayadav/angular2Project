import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: 'main-navbar',
    templateUrl: 'navbar.component.html'
})
export class NavbarComponent {
    @Input()
    header = "";
    @Output()
    logoutClick = new EventEmitter();
    onLogout($event: Event): void {
        this.logoutClick.emit($event);
    }
}