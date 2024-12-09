import { Injectable } from '@angular/core';
import { ModalData } from '@/interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  default: ModalData = {
    showModal: false,
    title: '',
    close: '',
    body: '',
  };

  public modalData$ = new Subject<ModalData>();

  constructor() {}

  showModal(data: ModalData): void {
    this.modalData$.next(data);
  }

  closeModal(): void {
    this.modalData$.next(this.default);
  }
}
