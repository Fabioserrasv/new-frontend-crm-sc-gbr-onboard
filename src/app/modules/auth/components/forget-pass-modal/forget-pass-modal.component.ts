import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from '@ui/modal/modal/modal.component';

@Component({
  selector: 'app-forget-pass-modal',
  templateUrl: './forget-pass-modal.component.html',
  styleUrl: './forget-pass-modal.component.scss'
})
export class ForgetPassModalComponent {
  @Input() isOpen: boolean = false;
  @ViewChild(ModalComponent) modal: any;
  private alert: any

  forgetPassForm = new FormGroup({
    nascimento: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  })

  constructor(private el: ElementRef) { }

  openModal(alertComponent?: any) {
    this.modal.isOpen = true;
    this.alert = alertComponent || null;
  }

  closeModal() {
    this.modal.isOpen = false;
  }

  private focusErrorInput(key: keyof typeof this.forgetPassForm.controls, neededPing: boolean = false): void {
    const invalidControl = this.el.nativeElement.querySelector(`[formcontrolname="${key}"]`);
    (invalidControl as HTMLElement).focus();

    if (neededPing) {
      invalidControl.classList.add('needed');

      setTimeout(() => {
        invalidControl.classList.remove('needed');
      }, 2000);
    }
  }

  onSubmit() {
    if (this.forgetPassForm.invalid) {
      this.alert.alert("Preencha os campos obrigatórios", "danger");

      for (const key of Object.keys(this.forgetPassForm.controls) as (keyof typeof this.forgetPassForm.controls)[]) {
        if (this.forgetPassForm.controls[key].invalid) {
          this.focusErrorInput(key);
          break;
        }
      }

      for (const key of Object.keys(this.forgetPassForm.controls) as (keyof typeof this.forgetPassForm.controls)[]) {
        if (this.forgetPassForm.controls[key].invalid) {
          this.focusErrorInput(key, true);
        }
      }

      return false;
    }

    this.alert.alert("Incluir lógica", "success");

    return true;
  }
}
