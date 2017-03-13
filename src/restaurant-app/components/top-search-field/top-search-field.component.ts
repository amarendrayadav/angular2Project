import { Component, Input } from '@angular/core';
@Component({
    selector: 'top-search-field',
    templateUrl: 'top-search-field.component.html'
})
export class TopSearchFieldComponent {
    @Input()
    placeholder = "";

    value: TopSearchValue = { value: "" };
}
export interface TopSearchValue {
    value: String;
}