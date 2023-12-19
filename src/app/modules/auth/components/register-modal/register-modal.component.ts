import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '@ui/modal/modal/modal.component';
import { CRMResponse, CrmApiService } from '../../services/crm-api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertComponent } from '@ui/alert/alert/alert.component';
import { PasswordInputs, validarCPF, viewPasswordInput } from '../../../../shared/utils/utils';

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
    temcrm: new FormControl('sim', [Validators.required]),
    crm: new FormControl('', [Validators.required]),
    nome: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    nascimento: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    confirma_email: new FormControl('', [Validators.required, Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.minLength(4)]),
    resenha: new FormControl('', [Validators.required,]),
  })

  public passwordInputs: PasswordInputs = {
    senha: "password",
    resenha: "password"
  }

  public readonlys = {
    nome: true,
    crm: false
  }

  public searched = false;

  constructor(private crmApiService: CrmApiService, private authService: AuthService, private el: ElementRef) {
    this.lockInputs();
  }

  callViewPasswordInput(input: string) {
    this.passwordInputs = viewPasswordInput(input, this.passwordInputs);
  }

  checkInputsDisponobility() {
    let x = this.registerForm.controls['temcrm'].value;
    let n = this.registerForm.controls['nome'].value;

    if (x == "sim") {
      document.querySelector('.crm-search label')?.classList.add('label-required')
      if (this.searched && n != "") {
        this.unlockInputs();
      } else {
        this.lockInputs();
      }
    } else if (x == "nao") {
      this.noCrmInputs();
      document.querySelector('.crm-search label')?.classList.remove('label-required')
    }
  }

  noCrmInputs() {
    this.registerForm.controls['nome'].enable({ emitEvent: false });
    this.registerForm.controls['cpf'].enable({ emitEvent: false });
    this.registerForm.controls['nascimento'].enable({ emitEvent: false });
    this.registerForm.controls['email'].enable({ emitEvent: false });
    this.registerForm.controls['confirma_email'].enable({ emitEvent: false });
    this.registerForm.controls['senha'].enable({ emitEvent: false });
    this.registerForm.controls['resenha'].enable({ emitEvent: false });
    this.registerForm.controls['crm'].disable({ emitEvent: false });
    this.readonlys.nome = false;
  }

  lockInputs() {
    this.registerForm.controls['nome'].disable({ emitEvent: false });
    this.registerForm.controls['cpf'].disable({ emitEvent: false });
    this.registerForm.controls['nascimento'].disable({ emitEvent: false });
    this.registerForm.controls['email'].disable({ emitEvent: false });
    this.registerForm.controls['confirma_email'].disable({ emitEvent: false });
    this.registerForm.controls['senha'].disable({ emitEvent: false });
    this.registerForm.controls['resenha'].disable({ emitEvent: false });
    this.registerForm.controls['crm'].setValue('');
    this.registerForm.controls['crm'].enable({ emitEvent: false });
  }

  unlockInputs() {
    this.registerForm.controls['cpf'].enable({ emitEvent: false });
    this.registerForm.controls['nascimento'].enable({ emitEvent: false });
    this.registerForm.controls['email'].enable({ emitEvent: false });
    this.registerForm.controls['confirma_email'].enable({ emitEvent: false });
    this.registerForm.controls['senha'].enable({ emitEvent: false });
    this.registerForm.controls['resenha'].enable({ emitEvent: false });
    this.registerForm.controls['nome'].enable({ emitEvent: false });

    this.readonlys.nome = true;
    this.readonlys.crm = true;
  }

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
        temcrm: "sim"
      })
      this.searched = true;

      this.checkInputsDisponobility();
    });
  }

  isCPF(): boolean {
    return this.registerForm.value['cpf'] == null ? true : this.registerForm.value['cpf'].length < 12 ? true : false;
  }

  getCpfCnpjMask(): string {
    return '000.000.000-009';
  }

  private focusErrorInput(key: keyof typeof this.registerForm.controls, neededPing: boolean = false): void {
    const invalidControl = this.el.nativeElement.querySelector(`[formcontrolname="${key}"]`);
    (invalidControl as HTMLElement).focus();

    if (neededPing) {
      invalidControl.classList.add('needed');

      setTimeout(() => {
        invalidControl.classList.remove('needed');
      }, 2000);
    }
  }

  async register() {
    if (this.registerForm.invalid) {
      this.alert.alert("Preencha os campos obrigatórios", "danger");

      for (const key of Object.keys(this.registerForm.controls) as (keyof typeof this.registerForm.controls)[]) {
        if (this.registerForm.controls[key].invalid) {
          this.focusErrorInput(key);
          break;
        }
      }

      for (const key of Object.keys(this.registerForm.controls) as (keyof typeof this.registerForm.controls)[]) {
        if (this.registerForm.controls[key].invalid) {
          this.focusErrorInput(key, true);
        }
      }

      return false;
    }

    if (!validarCPF(this.registerForm.value['cpf'] as string)) {
      this.focusErrorInput('cpf', true);

      this.alert.alert("CPF Invalido", "danger")
      return false;
    }

    if (this.registerForm.value["email"] != this.registerForm.value["confirma_email"]) {
      const invalidControl = this.el.nativeElement.querySelector(`[formcontrolname="confirma_email"]`);

      this.alert.alert("Os emails não coincidem", "danger");
      return false;
    }

    if (this.registerForm.value["senha"] != this.registerForm.value["resenha"]) {
      this.alert.alert("As senhas não coincidem", "danger");
      return false;
    }

    if (await this.authService.register(this.registerForm.value as RegisterForm)) {
      this.alert.alert("Cadastro realizado com sucesso", "success");

      this.closeModal();
    } else {
      this.alert.alert("Erro ao inserir o cadastro.", "warning");
    }
    return true;
  }
}
