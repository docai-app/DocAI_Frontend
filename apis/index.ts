// index.js
import Storage from './Storage';
import Classification from './Classification';
import Tag from './Tag';
import Search from './Search';
import Form from './Form';
import Absence from './Absence';
import Document from './Document';
import FormSchema from './FormSchema';
import Statistics from './Statistics';
import DocumentApproval from './DocumentApproval';
import Authorization from './Authorization';
import Drive from './Drive';
import Folders from './Folders';

export default class Api {
    Storage: Storage;
    Classification: Classification;
    Tag: Tag;
    Search: Search;
    Form: Form;
    Absence: Absence;
    Document: Document;
    FormSchema: FormSchema;
    Statistics: Statistics;
    DocumentApproval: DocumentApproval;
    Authorization: Authorization;
    Drive: Drive;
    Folders: Folders;

    constructor() {
        this.Storage = new Storage();
        this.Classification = new Classification();
        this.Tag = new Tag();
        this.Search = new Search();
        this.Form = new Form();
        this.Absence = new Absence();
        this.Document = new Document();
        this.FormSchema = new FormSchema();
        this.Statistics = new Statistics();
        this.DocumentApproval = new DocumentApproval();
        this.Authorization = new Authorization();
        this.Drive = new Drive();
        this.Folders = new Folders();
    }
}
