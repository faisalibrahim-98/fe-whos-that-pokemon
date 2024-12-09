import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultComponent } from '@/result/result.component';
import { PokemonService } from '@/services/pokemon.service';
import { provideHttpClient } from '@angular/common/http';

describe('ResultComponent', () => {
  let fixture: ComponentFixture<ResultComponent>;
  let pokemonService: PokemonService;
  let component: ResultComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call relevant functions when ngOnInit() is called', () => {
    spyOn(component, 'subscribeResult').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.subscribeResult).toHaveBeenCalled();
  });

  it('should set success message when result is correct', () => {
    component.message = '';

    pokemonService.updateResult({ correct: true, name: 'Random' });
    fixture.detectChanges();

    expect(component.message).toBe('Nice Gary! This is Random!');
  });

  it('should set failure message when result is wrong', () => {
    component.message = '';

    pokemonService.updateResult({ correct: false, name: 'Random' });
    fixture.detectChanges();

    expect(component.message).toBe('Nah Man! Give it Another Shot!');
  });

  it('should remove message when result is removed', () => {
    pokemonService.clearResult();
    fixture.detectChanges();

    expect(component.message).toBe('');
  });
});
