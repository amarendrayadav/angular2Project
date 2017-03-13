import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'global-toolbar',
    templateUrl: 'global-toolbar.component.html'
})
export class GlobalToolBarComponent {
    constructor(private router: Router) { }
    goTo(url: string[]): void {
        this.router.navigate(url);
    }
    is(url: string): boolean {
        return this.router.url == url;
    }
}