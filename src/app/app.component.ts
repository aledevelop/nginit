import { Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from '@angular/cdk/clipboard';

declare var confetti: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, ClipboardModule],
  template: `
    <style>
    
      .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    .popup {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin-top: 50px;
    margin-bottom: 50px;
    padding: 20px;
    font-family: Arial, Helvetica, sans-serif;
    background-color: rgba(55, 55, 55, .1);
    backdrop-filter: blur(5px);
    border-radius: 10px;
    width: 600px;
    height: 60vh;
    }
    
    .alert.alert-danger {
    color: rgba(205, 0, 0 , .8);
    font-size: 12px;
    }
    
    .cmd-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 90%;
    max-width: 1000px;
    height: 100px;
    gap: 25px;
    padding: 10px;
    background-color: #263238;
    border-radius: 5px;
    box-shadow: 0 5px 30px rgba(100, 0, 200, 0.5);
    }
    
    .cmd-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
    flex-direction: column;
    width: 400px;
    }
    
    .item-row input, select {
    border: none;
    padding: 10px;
    border-radius: 5px;
    transition: all .3s ease-in-out;
    }
    
    .item-row input:focus, select:focus {
    outline: none;
    background-color: rgb(193, 226, 255);
    }
    
    </style>
    
    <form [formGroup]="optionsForm" (ngSubmit)="submit()">
      <div class="container">
        <div class="popup">
          <div class="item-row">
            <label for="name">Proyect's name* </label>
            <input id="name" type="text" autocomplete="off" autofocus formControlName="name" placeholder="example">
            @if (this.optionsForm.invalid && (this.name?.dirty || this.name?.touched)) {
              <div class="alert alert-danger">
                @if (this.name?.errors?.['required']) {
                  <div>
                    Name is required.
                  </div>
                }
                @if (this.name?.errors?.['minlength']) {
                  <div>
                    Name must be at least 3 characters long.
                  </div>
                }
                @if (this.name?.errors?.['maxlength']) {
                  <div>
                    Name must have less than 30 characters.
                  </div>
                }
              </div>
            }
            @if (!this.name?.errors || (!this.name?.dirty && !this.name?.touched)) {
              <div class="alert alert-danger">
                <div>&nbsp;</div>
              </div>
            }
          </div>
          <div class="item-row">
            <label for="package-manager">Package manager* </label>
            <select id="package-manager" formControlName="packageManager">
              <option [ngValue]="null">Select</option>
              @for (option of packagesOptions; track option) {
                <option [ngValue]="option.id">{{option.value}}</option>
              }
            </select>
            @if (this.optionsForm.invalid && (this.packageManager?.dirty || this.packageManager?.touched)) {
              <div class="alert alert-danger">
                @if (this.packageManager?.errors?.['required']) {
                  <div>
                    Package manager is required.
                  </div>
                }
              </div>
            }
            @if (!this.packageManager?.errors || (!this.packageManager?.dirty && !this.packageManager?.touched)) {
              <div class="alert alert-danger">
                <div>&nbsp;</div>
              </div>
            }
          </div>
          <div class="item-row">
            <label for="style-type">Style type* </label>
            <select id="style-type" formControlName="style">
              <option [ngValue]="null">Select</option>
              @for (option of stylesOptions; track option) {
                <option [ngValue]="option.id">{{option.value}}</option>
              }
            </select>
            @if (this.optionsForm.invalid && (this.style?.dirty || this.style?.touched)) {
              <div class="alert alert-danger">
                @if (this.style?.errors?.['required']) {
                  <div>
                    Style type is required.
                  </div>
                }
              </div>
            }
            @if (!this.style?.errors || (!this.style?.dirty && !this.style?.touched)) {
              <div class="alert alert-danger">
                <div>&nbsp;</div>
              </div>
            }
          </div>
          <div class="item-row">
            <label for="style-inline">Style inline
              <input id="style-inline" type="checkbox" formControlName="styleInline" />
            </label>
            @if (this.optionsForm.invalid && (this.styleInline?.dirty || this.styleInline?.touched)) {
              <div class="alert alert-danger">
                @if (this.styleInline?.errors?.['required']) {
                  <div>
                    Style inline is required.
                  </div>
                }
              </div>
            }
          </div>
          <div class="item-row">
            <label for="template-inline">Template inline
              <input id="template-inline" type="checkbox" formControlName="templateInline" />
            </label>
            @if (this.optionsForm.invalid && (this.templateInline?.dirty || this.templateInline?.touched)) {
              <div class="alert alert-danger">
                @if (this.templateInline?.errors?.['required']) {
                  <div>
                    Template inline is required.
                  </div>
                }
              </div>
            }
          </div>
          <div class="item-row">
            <label for="routing">Routing
              <input id="routing" type="checkbox" formControlName="routing" />
            </label>
            @if (this.optionsForm.invalid && (this.routing?.dirty || this.routing?.touched)) {
              <div class="alert alert-danger">
                @if (this.routing?.errors?.['required']) {
                  <div>
                    Routing is required.
                  </div>
                }
              </div>
            }
          </div>
          <div class="item-row">
            <label for="standalone">Standalone
              <input id="standalone" type="checkbox" formControlName="standalone" />
            </label>
            @if (this.optionsForm.invalid && (this.standalone?.dirty || this.standalone?.touched)) {
              <div class="alert alert-danger">
                @if (this.standalone?.errors?.['required']) {
                  <div>
                    Standalone is required.
                  </div>
                }
              </div>
            }
          </div>
          <div class="item-row">
            <label for="ssr">Server-Side Rendering (SSR)
              <input id="ssr" type="checkbox" formControlName="ssr" />
            </label>
            @if (this.optionsForm.invalid && (this.ssr?.dirty || this.ssr?.touched)) {
              <div class="alert alert-danger">
                @if (this.ssr?.errors?.['required']) {
                  <div>
                    Server-Side Rendering (SSR)
                  </div>
                }
              </div>
            }
          </div>
    
          <div class="item-row">
            <button class="btn-primary" type="submit">Generate</button>
          </div>
    
        </div>
      </div>
    </form>
    @if (this.cmdText) {
      <div class="cmd-container">
        <div class="cmd-box">
          <div class="cmd-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14">
              <g fill="none" fill-rule="evenodd" transform="translate(1 1)">
                <circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" stroke-width=".5"></circle>
                <circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" stroke-width=".5"></circle>
                <circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" stroke-width=".5"></circle>
              </g>
            </svg>
            <span>
              @if (this.copied) {
                <span class="copied">Copied!</span>
              }
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
      </div>
    }
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
    { id: 3, value: 'pnpm' },
    { id: 3, value: 'cnpm' }
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
    ssr: new FormControl<boolean | null>(false, { validators: [ Validators.required ], nonNullable: true }),
  })

  get name() { return this.optionsForm.get('name') }
  get packageManager() { return this.optionsForm.get('packageManager') }
  get style() { return this.optionsForm.get('style') }
  get styleInline() { return this.optionsForm.get('styleInline') }
  get templateInline() { return this.optionsForm.get('templateInline') }
  get routing() { return this.optionsForm.get('routing') }
  get standalone() { return this.optionsForm.get('standalone') }
  get ssr() { return this.optionsForm.get('ssr') }

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
        `${this.optionsForm.get('standalone')?.value ? ' ' : '--standalone false '}` +
        `${this.optionsForm.get('ssr')?.value ? '--ssr true ' : '--ssr false '}` +
        `${this.optionsForm.get('style')?.value ? `--style ${this.stylesOptions[this.optionsForm.get('style')?.value! -1].value} ` : ''}` +
        `${this.optionsForm.get('name')?.value}`;


        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

    }
  }

}

interface Option {
  id: number;
  value: string;
}
