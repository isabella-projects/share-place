import { Coordinates } from '../inc/interfaces';

export class MapInitializer {
    static async initMap(coordinates: Coordinates) {
        const { Map } = (await google.maps.importLibrary('maps')) as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = (await google.maps.importLibrary('marker')) as google.maps.MarkerLibrary;

        const map = new Map(document.getElementById('map') as HTMLElement, {
            center: coordinates,
            zoom: 18,
            mapId: import.meta.env.VITE_GOOGLE_MAP_ID,
        });

        new AdvancedMarkerElement({
            map,
            position: coordinates,
        });
    }
}
