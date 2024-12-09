import { PokemonService } from '@/services/pokemon.service';
import { Result } from '@/interfaces';
import { Subscription } from 'rxjs';
import {
  EventEmitter,
  OnDestroy,
  Component,
  OnInit,
  Output,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrl: './choices.component.css',
})
export class ChoicesComponent implements OnInit, OnDestroy {
  @Input() options: string[] = [];

  @Output() onSelect = new EventEmitter<string>();

  resultSubscription: Subscription | undefined;
  selection: string | undefined;
  answer: string | undefined;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.subscribeResult();
  }

  subscribeResult(): void {
    this.resultSubscription = this.pokemonService.result$.subscribe(
      (result: Result | undefined) => {
        this.answer = !result ? undefined : result.name;
      },
    );
  }

  selectAnswer(option: string): void {
    this.selection = option;
    this.onSelect.emit(option);
  }

  btnClasses(option: string): Record<string, boolean> {
    return {
      'hover:bg-blue-400': !this.answerExists(),
      'opacity-80': this.answerExists(),
      'outline outline-offset-2 outline-green-500':
        this.isAnswerCorrect(option),
      'outline outline-offset-2 outline-red-500': this.isAnswerWrong(option),
    };
  }

  isAnswerCorrect(option: string): boolean {
    return this.answer && option === this.answer ? true : false;
  }

  isAnswerWrong(option: string): boolean {
    return !!this.answer && option !== this.answer && option === this.selection;
  }

  answerExists(): boolean {
    return !!this.answer;
  }

  ngOnDestroy(): void {
    this.resultSubscription?.unsubscribe();
  }
}
