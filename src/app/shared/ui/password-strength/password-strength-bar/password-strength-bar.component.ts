import { Component, OnChanges, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-password-strength-bar',
  templateUrl: './password-strength-bar.component.html',
  styleUrls: ['./password-strength-bar.component.scss']
})
export class PasswordStrengthBarComponent implements OnChanges {
  @Input() passwordToCheck: string;
  @Input() barLabel: string;
  bars: string[] = ['', '', '', '', ''];

  private colors = ['#F00', '#FF0000', '#FFD700', '#009900', '#0000FF'];

  private static measureStrength(pass: string): number {
    let score = 0;
    let letters: { [key: string]: number } = {};

    for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }

    let variations = {
      contemNumeros: /\d/.test(pass),
      contemLetras: /[a-z]/.test(pass),
      contemMaiuscula: /[A-Z]/.test(pass),
      contemEspecial: /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/g.test(pass),
    };

    let variationCount = Object.values(variations).filter((v) => v).length;

    return variationCount;
  }

  private getColor(score: number, pass: string) {
    let idx = 0;
    let length = pass != undefined ? pass.length : 0;

    if (length >= 6) {
      idx = 4;
    } else if (length >= 4) {
      idx = 3;
    } else if (length >= 3) {
      idx = 2;
    } else if (length >= 2) {
      idx = 1;
    }

    switch (score) {
      case 1:
        this.barLabel = "<i class=\"fa fa-thumbs-o-down fa-fw\"></i><b>Falha:</b> Senha muito fraca.";
        break;
      case 2:
        this.barLabel = "<i class=\"fa fa-warning fa-fw\"></i><b>Aviso:</> Melhore a sua senha.";
        break;
      case 3:
        this.barLabel = "<i class=\"fa fa-check fa-fw\"></i><b>Suficiente:</b> A senha atinge o mínimo aconselhado.";
        break;
      case 4:
        this.barLabel = "<i class=\"fa fa-thumbs-o-up fa-fw\"></i><b>Excepcional:</b> A senha excede os padrões mínimos.";
        break;
    }
    return {
      idx: idx + 1,
      col: this.colors[score]
    };
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    let password = changes['passwordToCheck'].currentValue;
    this.setBarColors(5, '#DDD');

    if (password) {
      let c = this.getColor(PasswordStrengthBarComponent.measureStrength(password), password);
      this.setBarColors(c.idx, c.col);
    }
  }

  private setBarColors(count: number, col: string) {
    for (let _n = 0; _n < count; _n++) {
      this.bars = Array.from({ length: count }, () => col);
    }
  }

}
