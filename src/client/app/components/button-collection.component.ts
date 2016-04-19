import { Component } from 'angular2/core';
import { MusicButtonComponent } from './music-button.component';

@Component({
	selector: 'button-collection',
	templateUrl: 'app/components/button-collection.component.html',
	directives: [MusicButtonComponent],
	styleUrls: ['app/components/button-collection.component.css']
})
export class ButtonCollectionComponent {
	collectionName: string;
	items: MusicButtonComponent[];
	constructor() {
		console.log('loaded button collection');
	}
}
