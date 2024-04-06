import axios from 'axios';

import { MapInitializer } from './MapInitializer';
import { Coordinates } from '../inc/interfaces';
import { Autobind } from '../inc/decorators';

export class SharePlaceApp {
    private form: HTMLFormElement;
    private addressInput: HTMLInputElement;

    constructor() {
        this.form = document.querySelector('form')! as HTMLFormElement;
        this.addressInput = document.getElementById('address')! as HTMLInputElement;

        this.events();
    }

    private events() {
        this.form.addEventListener('submit', this.searchAddressHandler);
    }

    private async fetchAddress(enteredAddress: string): Promise<Coordinates | null> {
        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAddress)}&key=${
                    import.meta.env.VITE_GOOGLE_API_KEY
                }`
            );

            if (response.data.status !== 'OK') {
                throw new Error('Could not fetch location! ');
            }

            const coordinates = response.data.results[0].geometry.location;
            return coordinates;
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message);
            }

            return null;
        }
    }

    @Autobind
    private async searchAddressHandler(event: Event) {
        event.preventDefault();

        const enteredAddress = this.addressInput.value.toString();
        const coordinates = await this.fetchAddress(enteredAddress);

        if (coordinates) {
            MapInitializer.initMap(coordinates);
        }
    }
}
