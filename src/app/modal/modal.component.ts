import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '@/services/pokemon.service';
import { ModalService } from '@/services/modal.service';
import { ModalData } from '@/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit, OnDestroy {
  modalSubscription: Subscription | undefined;
  modalData: ModalData | undefined;

  constructor(
    private pokemonService: PokemonService,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.subscribeModal();
  }

  subscribeModal(): void {
    this.modalSubscription = this.modalService.modalData$.subscribe(
      (data: ModalData) => {
        this.modalData = data;
      },
    );
  }

  closeModal(): void {
    this.pokemonService.clearResult();
    this.modalService.closeModal();
  }

  ngOnDestroy(): void {
    this.modalSubscription?.unsubscribe();
  }
}
