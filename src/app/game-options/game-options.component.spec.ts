import { GameOptionsComponent } from '@/game-options/game-options.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

describe('GameOptionsComponent', () => {
  let fixture: ComponentFixture<GameOptionsComponent>;
  let component: GameOptionsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameOptionsComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(GameOptionsComponent);
    component = fixture.componentInstance;
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

  it('should return an object with initial values when btnClasses() is called and result does not exist', () => {
    const obj = component.btnClasses();
    fixture.detectChanges();

    const values = Object.values(obj);
    values[3] = !values[3];

    for (let i = 0; i < 4; i++) {
      expect(values[i]).toBe(true);
    }
  });

  it('should emit next event when onClickNext() is called', () => {
    const emitSpy = spyOn(component.next, 'emit');

    component.onClickNext();
    fixture.detectChanges();

    expect(emitSpy).toHaveBeenCalled();
  });
});
