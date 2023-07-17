import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, scan } from 'rxjs/operators';

import { latLng, LeafletMouseEvent, tileLayer } from 'leaflet';
import { LeafletLayerDirective } from '../../../../projects/ngx-leaflet/src/lib/layers/leaflet-layer.directive';
import { LeafletDirective } from '../../../../projects/ngx-leaflet/src/lib/core/leaflet.directive';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'leafletEventsDemo',
    templateUrl: './events-demo.component.html',
    standalone: true,
    imports: [FormsModule, LeafletDirective, LeafletLayerDirective]
})
export class LeafletEventsDemoComponent {

	eventCount = 0;
	eventLog: string = '';

	options = {
		zoom: 5,
		center: latLng([ 46.879966, -121.726909 ])
	};
	baselayer = tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: 'Open Street Map' });

	eventSubject = new Subject<string>();

	constructor() {
		this.eventSubject.pipe(
				scan((acc: string, v: string) => `${++this.eventCount}: ${v}\n${acc}`, ''),
				debounceTime(50)
			)
			.subscribe((v: string) => { this.eventLog = v; } );
	}

	handleEvent(eventType: string, event: any) {
		this.eventSubject.next(eventType);
	}

}
