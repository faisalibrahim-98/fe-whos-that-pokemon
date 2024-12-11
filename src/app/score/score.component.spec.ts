import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonService } from '@/services/pokemon.service';
import { provideHttpClient } from '@angular/common/http';
import { ScoreComponent } from '@/score/score.component';
import { ModalService } from '@/services/modal.service';
import { mockPokemon } from '@/mock';

describe('ScoreComponent', () => {
  let fixture: ComponentFixture<ScoreComponent>;
  let pokemonService: PokemonService;
  let modalService: ModalService;
  let component: ScoreComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreComponent);
    component = fixture.componentInstance;
    modalService = TestBed.inject(ModalService);
    pokemonService = TestBed.inject(PokemonService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call relevant functions when ngOnInit() is called', () => {
    spyOn(component, 'subscribePokemon').and.callThrough();
    spyOn(component, 'subscribeResult').and.callThrough();
    spyOn(component, 'initState').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.subscribePokemon).toHaveBeenCalled();
    expect(component.subscribeResult).toHaveBeenCalled();
    expect(component.initState).toHaveBeenCalled();
  });

  it('should increase score when updateScore() is called and result is true', () => {
    const initialScore = 1;
    component.state = {
      score: initialScore,
      question: 0,
    };
    const result = {
      correct: true,
      name: 'Random',
    };

    component.updateScore(result);
    fixture.detectChanges();

    expect(component.state.score).toBe(initialScore + 1);
  });

  it('should not increase score when updateScore() is called and result is false', () => {
    const initialScore = 1;
    component.state = {
      score: initialScore,
      question: 0,
    };
    const result = {
      correct: false,
      name: 'Random',
    };

    component.updateScore(result);
    fixture.detectChanges();

    expect(component.state.score).toBe(initialScore);
  });

  it('should call relevant function when showCompleteModal() is called', () => {
    spyOn(modalService, 'showModal').and.callThrough();

    component.showCompleteModal();
    fixture.detectChanges();

    expect(modalService.showModal).toHaveBeenCalled();
  });

  it('should reset state when when resetState() is called', () => {
    component.resetState();
    fixture.detectChanges();

    expect(component.state.score).toBe(0);
    expect(component.state.question).toBe(0);
  });

  it('should call relevant functions when pokemon is updated', () => {
    const emitSpy = spyOn(component.newGame, 'emit');
    spyOn(component, 'showCompleteModal');
    spyOn(component, 'resetState');

    component.state.question = 10;

    pokemonService.updatePokemon(mockPokemon);
    pokemonService.updatePokemon(mockPokemon);
    fixture.detectChanges();

    expect(component.showCompleteModal).toHaveBeenCalled();
    expect(component.resetState).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalled();
  });
});
