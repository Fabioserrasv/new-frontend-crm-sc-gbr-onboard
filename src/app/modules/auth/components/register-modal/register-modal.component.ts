import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '@ui/modal/modal/modal.component';
import { CRMResponse, CrmApiService } from '../../services/crm-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertComponent } from '@ui/alert/alert/alert.component';

export type RegisterForm = {
  temcrm: string | null;
  crm: string | null;
  nome: string | null;
  cpf: string | null;
  nascimento: string | null;
  email: string | null;
  confirma_email: string | null;
  senha: string | null;
  resenha: string | null;
}

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrl: './register-modal.component.scss'
})
export class RegisterModalComponent {
  @Input() isOpen: boolean = false;
  @ViewChild(ModalComponent) modal: any;

  private alert: any

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

  constructor(private crmApiService: CrmApiService, private authService: AuthService) { }

  openModal(alertComponent?: any) {
    this.modal.isOpen = true;
    this.alert = alertComponent || null;
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

  async register() {
    if (this.registerForm.invalid) {
      this.alert.alert("Preencha os campos obrigatórios", "danger");
      return;
    }

    if (await this.authService.register(this.registerForm.value as RegisterForm)) {
      this.alert.alert("Cadastro realizado com sucesso", "success");

      this.closeModal();
    } else {
      this.alert.alert("Erro ao inserir o cadastro.", "warning");
    }

  }
}
