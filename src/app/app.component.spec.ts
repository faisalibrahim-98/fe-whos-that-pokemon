import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameOptionsComponent } from '@/game-options/game-options.component';
import { SilhouetteComponent } from '@/silhouette/silhouette.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ChoicesComponent } from '@/choices/choices.component';
import { PokemonService } from '@/services/pokemon.service';
import { HeaderComponent } from '@/header/header.component';
import { ResultComponent } from '@/result/result.component';
import { provideHttpClient } from '@angular/common/http';
import { ModalComponent } from '@/modal/modal.component';
import { ScoreComponent } from '@/score/score.component';
import { AppComponent } from '@/app.component';
import { mockPokemon } from '@/mock';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let spinnerService: NgxSpinnerService;
  let pokemonService: PokemonService;
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSpinnerModule, BrowserAnimationsModule],
      declarations: [
        GameOptionsComponent,
        SilhouetteComponent,
        ChoicesComponent,
        HeaderComponent,
        ResultComponent,
        ModalComponent,
        ScoreComponent,
        AppComponent,
      ],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService);
    spinnerService = TestBed.inject(NgxSpinnerService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should call relevant functions when ngOnInit() is called', () => {
    spyOn(app, 'getPokemon').and.callFake(() => Promise.resolve());
    spyOn(app, 'subscribePokemon').and.callThrough();

    app.ngOnInit();
    fixture.detectChanges();

    expect(app.subscribePokemon).toHaveBeenCalled();
    expect(app.getPokemon).toHaveBeenCalled();
  });

  it('should get pokemon data when getPokemon() is called', fakeAsync(() => {
    spyOn(pokemonService, 'getRandomPokemon').and.callFake(() =>
      Promise.resolve(),
    );
    spyOn(pokemonService, 'clearResult');
    spyOn(spinnerService, 'show');
    spyOn(spinnerService, 'hide');

    app.getPokemon();
    tick();
    fixture.detectChanges();

    expect(pokemonService.clearResult).toHaveBeenCalled();
    expect(spinnerService.show).toHaveBeenCalled();
    expect(spinnerService.hide).toHaveBeenCalled();
  }));

  it('should get result data when getResult() is called and pokemon is set', fakeAsync(() => {
    spyOn(pokemonService, 'verifyAnswer').and.callFake(() => Promise.resolve());
    spyOn(spinnerService, 'show');
    spyOn(spinnerService, 'hide');
    app.pokemon = mockPokemon;

    app.getResult(mockPokemon.names[0]);
    tick();
    fixture.detectChanges();

    expect(spinnerService.show).toHaveBeenCalled();
    expect(spinnerService.hide).toHaveBeenCalled();
  }));

  it('should not call verifyAnswer() when getResult() is called and pokemon is not set', fakeAsync(() => {
    spyOn(pokemonService, 'verifyAnswer').and.callFake(() => Promise.resolve());
    spyOn(spinnerService, 'show');
    spyOn(spinnerService, 'hide');
    app.pokemon = undefined;

    app.getResult('');
    tick();
    fixture.detectChanges();

    expect(spinnerService.show).not.toHaveBeenCalled();
    expect(spinnerService.hide).not.toHaveBeenCalled();
  }));

  it('should call relevant functions when onClickOption() is called', () => {
    spyOn(app, 'getResult');

    app.onClickOption('');
    fixture.detectChanges();

    expect(app.getResult).toHaveBeenCalled();
  });

  it('should call relevant functions when onClickNext() is called', () => {
    spyOn(app, 'getPokemon');

    app.onClickNext();
    fixture.detectChanges();

    expect(app.getPokemon).toHaveBeenCalled();
  });
});
