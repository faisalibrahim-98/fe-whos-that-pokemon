import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonService } from '@/services/pokemon.service';
import { ModalComponent } from '@/modal/modal.component';
import { provideHttpClient } from '@angular/common/http';
import { ModalService } from '@/services/modal.service';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let pokemonService: PokemonService;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    pokemonService = TestBed.inject(PokemonService);
    modalService = TestBed.inject(ModalService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call relevant functions when ngOnInit() is called', () => {
    spyOn(component, 'subscribeModal').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.subscribeModal).toHaveBeenCalled();
  });

  it('should call relevant functions when closeModal() is called', () => {
    spyOn(pokemonService, 'clearResult');
    spyOn(modalService, 'closeModal').and.callThrough();

    component.closeModal();
    fixture.detectChanges();

    expect(pokemonService.clearResult).toHaveBeenCalled();
    expect(modalService.closeModal).toHaveBeenCalled();
  });
});
