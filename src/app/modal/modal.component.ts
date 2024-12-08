import { ModalData } from '@/interfaces';
import { ModalService } from '@/services/modal.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit, OnDestroy {
  modalSubscription: Subscription | undefined;
  modalData: ModalData | undefined;

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalSubscription = this.modalService.modalData$.subscribe(
      (data: ModalData) => {
        this.modalData = data;
      },
    );
  }

  closeModal() {
    this.modalService.closeModal();
  }

  ngOnDestroy(): void {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }
}
