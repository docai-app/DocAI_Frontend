// index.js
import Storage from './Storage';
import Classification from './Classification';
import Label from './Label';

export default class Api {
    Storage: any;
    Classification: any;
    Label: any;

    constructor() {
        this.Storage = new Storage();
        this.Classification = new Classification();
        this.Label = new Label();
    }
}
