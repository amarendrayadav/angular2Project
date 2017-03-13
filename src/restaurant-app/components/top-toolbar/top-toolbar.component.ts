import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
    selector: 'top-toolbar',
    templateUrl: 'top-toolbar.component.html'
})
export class TopToolbarComponent {
    @Input()
    header = "";
    @Input()
    leftButtonText = "";
    @Input()
    rightButtonText = "";
    @Output('leftClick')
    leftClick = new EventEmitter();

    @Output('rightClick')
    rightClick = new EventEmitter();

    onLeftClick($event: Event): void {
        this.leftClick.emit($event);
    }

    onRightClick($event: Event): void {
        this.rightClick.emit($event);
    }
}