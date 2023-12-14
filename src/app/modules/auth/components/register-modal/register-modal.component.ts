import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '@ui/modal/modal/modal.component';
import { CRMResponse, CrmApiService } from '../../services/crm-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.scss'
})
export class RegisterModalComponent {
  @Input() isOpen: boolean = false;
  @ViewChild(ModalComponent) modal: any;
  public info: CRMResponse = {
    crm: 0,
    dsUf: "",
    nome: "",
    siglasituacao: "",
    uf: "",
  }

  private defaultInfo: CRMResponse = {
    crm: 0,
    dsUf: "",
    nome: "",
    siglasituacao: "",
    uf: "",
  }

  registerForm = new FormGroup({
    temcrm: new FormControl('', [Validators.required]),
    crm: new FormControl('', [Validators.required]),
    nome: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    nascimento: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    confirma_email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(4)]),
    resenha: new FormControl('', [Validators.required,]),
  })

  constructor(private crmApiService: CrmApiService) {
    this.registerForm.valueChanges.subscribe((value) => {
      console.log(value)
    })
  }

  openModal() {
    this.modal.isOpen = true;
  }

  closeModal() {
    this.info = this.defaultInfo;
    this.modal.isOpen = false;
    this.registerForm.reset();
  }

  onSearchCRM(crm: number | string) {
    this.crmApiService.getCrmInfo(Number(crm)).subscribe((response) => {
      this.info = response

      this.registerForm.setValue({
        confirma_email: null,
        cpf: null,
        crm: String(crm),
        email: null,
        nascimento: null,
        nome: this.info.nome,
        resenha: null,
        senha: null,
        temcrm: null
      })
    });
  }

  isCPF(): boolean {
    return this.registerForm.value['cpf'] == null ? true : this.registerForm.value['cpf'].length < 12 ? true : false;
  }

  getCpfCnpjMask(): string {
    return '000.000.000-009';
  }

  register() {
    if (this.registerForm.invalid) return;

  }
}
