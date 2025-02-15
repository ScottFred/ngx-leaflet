import { Component } from '@angular/core';

import { latLng, MapOptions, tileLayer } from 'leaflet';
import { LeafletDirective } from '../../../../projects/ngx-leaflet/src/lib/core/leaflet.directive';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface MapSpec {
	options: MapOptions;
}

@Component({
    selector: 'leafletMultiMapDemo',
    templateUrl: './multi-map-demo.component.html',
    standalone: true,
    imports: [FormsModule, NgFor, LeafletDirective]
})
export class LeafletMultiMapDemoComponent {

	optionsSpec: any = {
		layers: [{ url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: 'Open Street Map' }],
		zoom: 5,
		center: [ 46.879966, -121.726909 ]
	};

	maps: MapSpec[] = [];

	doAddMap() {
		this.maps.push(this.createMapSpec(this.optionsSpec));
	}

	doRemoveMap() {
		this.maps.pop();
	}

	private createMapSpec(optionsSpec: any): MapSpec {
		return {
			options: {
				layers: [ tileLayer(optionsSpec.layers[0].url, { attribution: optionsSpec.layers[0].attribution }) ],
				zoom: optionsSpec.zoom,
				center: latLng(optionsSpec.center)
			}
		};
	}

}
