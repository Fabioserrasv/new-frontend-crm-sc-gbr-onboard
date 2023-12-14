import { Component, ElementRef, Input, ViewChild } from '@angular/core';

type ModalSizes = "lg" | "md" | "sm";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  public isOpen: boolean = false;

  @ViewChild("modalBody") children: any;
  @Input() title: string = "";
  @Input() size: ModalSizes = "sm";

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}
