import { Component } from '@angular/core';

@Component({
    selector: 'app-nachos',
    templateUrl: './nachos.component.html',
    styleUrls: ['./nachos.component.css']
})
// Makes data available to the template/html
export class NachosComponent {
    spicy = 'Mega HOT!';
}
