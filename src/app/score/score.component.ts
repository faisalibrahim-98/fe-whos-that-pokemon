import { LocalstorageService } from '@/services/localstorage.service';
import { Component, Input, OnChanges } from '@angular/core';
import { Result, ScoreState } from '@/interfaces';
import { ModalService } from '@/services/modal.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrl: './score.component.css',
})
export class ScoreComponent implements OnChanges {
  @Input() result: Result | undefined;

  key = 'state';
  state: ScoreState = {
    question: 0,
    score: 0,
  };

  constructor(
    private localstorageService: LocalstorageService,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    const value = this.localstorageService.getItem(this.key);
    if (value) {
      this.state = JSON.parse(value);
    }
  }

  ngOnChanges(): void {
    this.updateState();
  }

  updateState(): void {
    if (!this.result) {
      this.state.question += 1;
    }

    if (this.result?.correct) this.state.score += 1;

    if (this.state.question === 11) {
      const modalData = {
        showModal: true,
        title: 'Game Complete',
        close: 'Play Again',
        body: `Congratulations! You have completed the game. Your score is ${this.state.score}`,
      };

      this.modalService.showModal(modalData);

      this.state.score = 0;
      this.state.question = 1;
    }

    this.saveState();
  }

  saveState(): void {
    this.localstorageService.setItem(this.key, JSON.stringify(this.state));
  }
}
