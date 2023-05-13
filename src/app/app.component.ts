import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, ClipboardModule],
  template: `
    <style>
      .container {
        display: flex;
        flex-direction: column;
        width: 400px;
        gap: 20px;
        padding: 20px;
        font-family: Arial, Helvetica, sans-serif;
      }

      .alert.alert-danger {
        color: red;
      }

      .cmd-container {
        display: flex;
        flex-direction: column;
        width: 90%;
        max-width: 1000px;
        height: 100px;
        gap: 25px;
        padding: 10px;
        background-color: #263238;
        border-radius: 5px;
        box-shadow: 0 5px 30px rgba(100, 0, 200, 0.5);
      }

      .cmd-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
      }

      .cmd-text {
      }

      .cmd-text .command {
        color: rgba(199, 146, 234, 1);
      }

      .cmd-text .parameters {
        color: #82B1FF;
      }

      .btn-copy {
        width: 24px;
        height: 24px;
        border: none;
        background-color: transparent;
        cursor: pointer;
        color: silver;
      }

      .copied {
        color: silver;
      }

      .btn-primary {
        border: none;
        border-radius: 5px;
        background-color: blueviolet;
        color: white;
        cursor: pointer;
        padding: 10px;
        font-size: 14px;
        font-weight: bold;
      }

      .btn-primary:active {
        background-color: #984fdb;
      }

      .item-row {
        display: flex;
        gap: 5px;
        flex-direction: column;
      }

    </style>

    <form [formGroup]="optionsForm" (ngSubmit)="submit()">
      <div class="container">
        <div class="item-row">
            <label for="name">Proyect's name* </label>
            <input id="name" type="text" formControlName="name" placeholder="example">
            <div *ngIf="this.optionsForm.invalid && (this.name?.dirty || this.name?.touched)" class="alert alert-danger">
              <div *ngIf="this.name?.errors?.['required']">
                Name is required.
              </div>
              <div *ngIf="this.name?.errors?.['minlength']">
                Name must be at least 3 characters long.
              </div>
              <div *ngIf="this.name?.errors?.['maxlength']">
                Name must have less than 30 characters.
              </div>
            </div>
        </div>
        <div class="item-row">
          <label for="package-manager">Package manager* </label>
          <select id="package-manager" formControlName="packageManager">
            <option [ngValue]="null">Select</option>
            <option *ngFor="let option of packagesOptions" [ngValue]="option.id">{{option.value}}</option>
          </select>
          <div *ngIf="this.optionsForm.invalid && (this.packageManager?.dirty || this.packageManager?.touched)" class="alert alert-danger">
              <div *ngIf="this.packageManager?.errors?.['required']">
                Package manager is required.
              </div>
            </div>
        </div>
        <div class="item-row">
          <label for="style-type">Style type* </label>
          <select id="style-type" formControlName="style">
            <option [ngValue]="null">Select</option>
            <option *ngFor="let option of stylesOptions" [ngValue]="option.id">{{option.value}}</option>
          </select>
          <div *ngIf="this.optionsForm.invalid && (this.style?.dirty || this.style?.touched)" class="alert alert-danger">
            <div *ngIf="this.style?.errors?.['required']">
              Style type is required.
            </div>
          </div>
        </div>
        <div class="item-row">
          <label for="style-inline">Style inline
            <input id="style-inline" type="checkbox" formControlName="styleInline" />
          </label>
          <div *ngIf="this.optionsForm.invalid && (this.styleInline?.dirty || this.styleInline?.touched)" class="alert alert-danger">
            <div *ngIf="this.styleInline?.errors?.['required']">
              Style inline is required.
            </div>
          </div>
        </div>
        <div class="item-row">
          <label for="template-inline">Template inline
            <input id="template-inline" type="checkbox" formControlName="templateInline" />
          </label>
          <div *ngIf="this.optionsForm.invalid && (this.templateInline?.dirty || this.templateInline?.touched)" class="alert alert-danger">
            <div *ngIf="this.templateInline?.errors?.['required']">
              Template inline is required.
            </div>
          </div>
        </div>
        <div class="item-row">
          <label for="routing">Routing
            <input id="routing" type="checkbox" formControlName="routing" />
          </label>
          <div *ngIf="this.optionsForm.invalid && (this.routing?.dirty || this.routing?.touched)" class="alert alert-danger">
            <div *ngIf="this.routing?.errors?.['required']">
              Routing is required.
            </div>
          </div>
        </div>
        <div class="item-row">
          <label for="standalone">Standalone
            <input id="standalone" type="checkbox" formControlName="standalone" />
          </label>
          <div *ngIf="this.optionsForm.invalid && (this.standalone?.dirty || this.standalone?.touched)" class="alert alert-danger">
            <div *ngIf="this.standalone?.errors?.['required']">
              Standalone is required.
            </div>
          </div>
        </div>

        <div class="item-row">
          <button class="btn-primary" type="submit">Generate</button>
        </div>

      </div>
    </form>
    <div class="cmd-container" *ngIf="this.cmdText">
      <div class="cmd-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
          <g fill="none" fill-rule="evenodd" transform="translate(1 1)">
            <circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle>
            <circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle>
            <circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle>
          </g>
        </svg>
        <span>
          <span *ngIf="this.copied" class="copied">Copied!</span>
          <button [cdkCopyToClipboard]="'ng new ' + cmdText" class="btn-copy" (click)="this.copied = true">
            <svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-14yq2cq" focusable="false" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24" data-testid="FileCopyIcon">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm-1 4 6 6v10c0 1.1-.9 2-2 2H7.99C6.89 23 6 22.1 6 21l.01-14c0-1.1.89-2 1.99-2h7zm-1 7h5.5L14 6.5V12z"></path>
            </svg>
          </button>
        </span>
      </div>
      <div class="cmd-text">
        <span class="command">ng new </span><span class="parameters">{{ cmdText }}</span>
      </div>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'nginit';

  cmdText: string = '';

  copied = false;

  packagesOptions: Option[] = [
    { id: 1, value: 'npm' },
    { id: 2, value: 'yarn' },
    { id: 3, value: 'pnpm' }
  ]

  stylesOptions: Option[] = [
    { id: 1, value: 'css' },
    { id: 2, value: 'scss' },
    { id: 3, value: 'sass' },
    { id: 4, value: 'less' }
  ]

  optionsForm = new FormGroup({
    name: new FormControl<string | null>('', { validators: [ Validators.required, Validators.minLength(3), Validators.maxLength(30) ], nonNullable: true }),
    packageManager: new FormControl<number | null>(null, { validators: [ Validators.required ], nonNullable: true }),
    style: new FormControl<number | null>(null, { validators: [ Validators.required ], nonNullable: false }),
    styleInline: new FormControl<boolean | null>(false, { validators: [ Validators.required ], nonNullable: true }),
    templateInline: new FormControl<boolean | null>(false, { validators: [ Validators.required ], nonNullable: true }),
    routing: new FormControl<boolean | null>(false, { validators: [ Validators.required ], nonNullable: true }),
    standalone: new FormControl<boolean | null>(false, { validators: [ Validators.required ], nonNullable: true }),
  })

  get name() { return this.optionsForm.get('name') }
  get packageManager() { return this.optionsForm.get('packageManager') }
  get style() { return this.optionsForm.get('style') }
  get styleInline() { return this.optionsForm.get('styleInline') }
  get templateInline() { return this.optionsForm.get('templateInline') }
  get routing() { return this.optionsForm.get('routing') }
  get standalone() { return this.optionsForm.get('standalone') }

  submit(): void {
    this.copied = false;
    if (!this.optionsForm.valid) {
      this.optionsForm.markAllAsTouched();
    } else {
      console.log(this.optionsForm.value);

      this.cmdText = `${this.optionsForm.get('styleInline')?.value ? '--inline-style ' : '' }` +
        `${this.optionsForm.get('templateInline')?.value ? '--inline-template ' : ''}` +
        `${this.optionsForm.get('routing')?.value ? '--routing ' : '--routing false '}` +
        `${this.optionsForm.get('packageManager')?.value ? `--package-manager ${this.packagesOptions[this.optionsForm.get('packageManager')?.value! -1].value} ` : ''}` +
        `${this.optionsForm.get('standalone')?.value ? '--standalone ' : ''}` +
        `${this.optionsForm.get('style')?.value ? `--style ${this.stylesOptions[this.optionsForm.get('style')?.value! -1].value} ` : ''}` +
        `${this.optionsForm.get('name')?.value}`;

    }
  }

}

interface Option {
  id: number;
  value: string;
}
