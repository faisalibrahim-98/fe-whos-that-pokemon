import { Injectable } from '@angular/core';
import { ModalData } from '@/interfaces';
import { BehaviorSubject } from 'rxjs';

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

  public modalData$ = new BehaviorSubject<ModalData>(this.default);

  constructor() {}

  showModal(data: ModalData): void {
    this.modalData$.next(data);
  }

  closeModal(): void {
    this.modalData$.next(this.default);
  }
}
