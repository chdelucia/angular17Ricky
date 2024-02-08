# Info

-Just used ngrx v17.1 cause state was mandatory. 
-Some unit test are provided (service, pagination and filter component)
-Some e2e test are provided

# future work

-Since the api does not change on realtime we could save call to the api at least when the name is not given and it is the first page.

-Save queryParams and add a browser history to allow user refresh page and go back forward throw the browser.

-Add more select filters like gender and status

-Add skeletons solving repainting problems

# Angular17Ricky

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute cypress.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
