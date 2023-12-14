import { Component, Input, ViewChild } from '@angular/core';
import { ModalComponent } from '@ui/modal/modal/modal.component';

@Component({
  selector: 'app-forget-pass-modal',
  templateUrl: './forget-pass-modal.component.html',
  styleUrl: './forget-pass-modal.component.scss'
})
export class ForgetPassModalComponent {
  @Input() isOpen: boolean = false;
  @ViewChild(ModalComponent) modal: any;

  public nascimento: any
  public cpf: any
  public email: any

  openModal() {
    this.modal.isOpen = true;
  }

  closeModal() {
    this.modal.isOpen = false;
  }
}
