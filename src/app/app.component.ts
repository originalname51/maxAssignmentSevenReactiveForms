import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: FormGroup;
  forbiddenProjectNames = ['badName'];
  options =  new FormArray(
    [new FormControl('Stable'), new FormControl('Critical'), new FormControl('Finished')]
  );


  ngOnInit() {
    this.projectForm = new FormGroup({
      'projectName': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)], this.forbiddenName),
      'email': new FormControl(null, [Validators.required,
      Validators.email]),
      'projectStatusOptions': this.options
    });
  }

    forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenProjectNames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  projectStatusValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value === '' ) {
      return {'needAValue': true};
    }
    return null;
  }


  forbiddenName(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Test') {
          resolve({'forbiddenName': true});
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }

  onSubmit() {
    console.log(this.projectForm);
  }

}
