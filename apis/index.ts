// index.js
import Absence from './Absence';
import Assistant from './Assistant';
import Authorization from './Authorization';
import Chatbot from './Chatbot';
import Classification from './Classification';
import Document from './Document';
import DocumentApproval from './DocumentApproval';
import Drive from './Drive';
import Folders from './Folders';
import Form from './Form';
import FormSchema from './FormSchema';
import Generate from './Generate';
import MiniApp from './MiniApp';
import Project from './Project';
import ProjectTask from './ProjectTask';
import ProjectWorkflow from './ProjectWorkflow';
import Prompt from './Prompt';
import Search from './Search';
import SmartExtractionSchemas from './SmartExtractionSchemas';
import Statistics from './Statistics';
import Storage from './Storage';
import Storyboard from './Storyboard';
import Tag from './Tag';
import User from './User';

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
    ProjectWorkflow: ProjectWorkflow;
    User: User;
    Generate: Generate;
    MiniApp: MiniApp;
    Chatbot: Chatbot;
    SmartExtractionSchemas: SmartExtractionSchemas;
    Prompt: Prompt;
    Storyboard: Storyboard;
    Assistant: Assistant;

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
        this.ProjectWorkflow = new ProjectWorkflow();
        this.User = new User();
        this.Generate = new Generate();
        this.MiniApp = new MiniApp();
        this.Chatbot = new Chatbot();
        this.SmartExtractionSchemas = new SmartExtractionSchemas();
        this.Prompt = new Prompt();
        this.Storyboard = new Storyboard();
        this.Assistant = new Assistant();
    }
}
