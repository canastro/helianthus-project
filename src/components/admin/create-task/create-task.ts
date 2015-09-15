/// <reference path="../../../../typings/angular2/angular2.d.ts" />
import {FORM_DIRECTIVES, FormBuilder, Component, View, Validators, ControlGroup, Inject} from 'angular2/angular2';
import {TasksService} from '../../../services/tasks';

// Annotation section
@Component({
    selector: 'create-task',
    viewBindings: [
        FormBuilder
    ]
})

@View({
  templateUrl: 'components/admin/create-task/create-task.html',
  directives: [FORM_DIRECTIVES]
})

// Component controller
export class CreateTask {
    taskForm: any;

    //TODO: https://github.com/auth0/angular2-authentication-sample/blob/master/src/login/login.ts
    //TODO; https://github.com/sitepoint-editors/PinYourAchievements-Angular2-TypeScript/blob/master/scripts/src/components/add/add.ts
    //TODO: https://groups.google.com/forum/#!topic/angular/diuTityfBOU
    //TODO: https://github.com/auth0/angular2-authentication-sample/blob/master/src/app/LoggedInOutlet.ts
    constructor(
        private formBuilder: FormBuilder,
        @Inject(TasksService) private tasksService: TasksService
    ) {
        this.taskForm = formBuilder.group({
            name: ['']
        });
    }

    createTask() {
        this.tasksService.createTask(this.taskForm.value)
            .subscribe(result => {
    			console.log(result);
    		});
    }
}
