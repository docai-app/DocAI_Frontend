// index.js
import Storage from './Storage';
import Classification from './Classification';
import Label from './Label';
import Search from './Search';
import Form from './Form';
import Absence from './Absence';
import Document from './Document';
import FormSchema from './FormSchema';

export default class Api {
    Storage: Storage;
    Classification: Classification;
    Label: Label;
    Search: Search;
    Form: Form;
    Absence: Absence;
    Document: Document;
    FormSchema: FormSchema;

    constructor() {
        this.Storage = new Storage();
        this.Classification = new Classification();
        this.Label = new Label();
        this.Search = new Search();
        this.Form = new Form();
        this.Absence = new Absence();
        this.Document = new Document();
        this.FormSchema = new FormSchema();
    }
}
