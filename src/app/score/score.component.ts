import { LocalstorageService } from '@/services/localstorage.service';
import { PokemonService } from '@/services/pokemon.service';
import { ModalService } from '@/services/modal.service';
import { Result, ScoreState } from '@/interfaces';
import { skip, Subscription } from 'rxjs';
import {
  EventEmitter,
  Component,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrl: './score.component.css',
})
export class ScoreComponent implements OnInit, OnDestroy {
  @Output() newGame = new EventEmitter();

  resultSubscription: Subscription | undefined;
  pokemonSubscription: Subscription | undefined;
  key: string = 'state';
  state: ScoreState = {
    question: 1,
    score: 0,
  };

  constructor(
    private localstorageService: LocalstorageService,
    private pokemonService: PokemonService,
    private modalService: ModalService,
  ) {}

  ngOnInit(): void {
    this.subscribeResult();
    this.subscribePokemon();
    this.initState();
  }

  subscribePokemon(): void {
    this.pokemonSubscription = this.pokemonService.pokemon$
      .pipe(skip(1))
      .subscribe(() => {
        this.state.question += 1;

        if (this.state.question === 11) {
          this.newGame.emit();
          this.showCompleteModal();
          this.resetState();
        }
      });
  }

  subscribeResult(): void {
    this.resultSubscription = this.pokemonService.result$.subscribe(
      (result: Result | undefined) => {
        if (!result) return;

        this.updateScore(result);
        this.saveState();
      },
    );
  }

  initState(): void {
    const value = this.localstorageService.getItem(this.key);
    if (value) this.state = JSON.parse(value);
  }

  updateScore(result: Result): void {
    if (result.correct) this.state.score += 1;
  }

  showCompleteModal(): void {
    const modalData = {
      showModal: true,
      title: `Score: ${this.state.score}`,
      close: 'Play Again',
      body: `Congratulations! You have completed the game`,
    };

    this.modalService.showModal(modalData);
  }

  saveState(): void {
    const newState = {
      question: this.state.question + 1,
      score: this.state.score,
    };

    this.localstorageService.setItem(this.key, JSON.stringify(newState));
  }

  resetState(): void {
    this.state.score = 0;
    this.state.question = 0;
    this.localstorageService.removeItem(this.key);
  }

  ngOnDestroy(): void {
    this.resultSubscription?.unsubscribe();
    this.pokemonSubscription?.unsubscribe();
  }
}
