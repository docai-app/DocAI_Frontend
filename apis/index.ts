// index.js
import Absence from './Absence';
import Authorization from './Authorization';
import Classification from './Classification';
import Document from './Document';
import DocumentApproval from './DocumentApproval';
import Drive from './Drive';
import Folders from './Folders';
import Form from './Form';
import FormSchema from './FormSchema';
import Project from './Project';
import ProjectTask from './ProjectTask';
import Search from './Search';
import Statistics from './Statistics';
import Storage from './Storage';
import Tag from './Tag';

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
    Project: Project;
    ProjectTask: ProjectTask;

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
        this.Project = new Project();
        this.ProjectTask = new ProjectTask();
    }
}
