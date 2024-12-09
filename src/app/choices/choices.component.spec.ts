import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChoicesComponent } from '@/choices/choices.component';
import { provideHttpClient } from '@angular/common/http';

describe('ChoicesComponent', () => {
  let fixture: ComponentFixture<ChoicesComponent>;
  let component: ChoicesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChoicesComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(ChoicesComponent);
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

  it('should set selection when selectAnswer() is called', () => {
    const mockSelection = 'Random';

    component.selectAnswer(mockSelection);
    fixture.detectChanges();

    expect(component.selection).toBe(mockSelection);
  });

  it('should return an object with initial values when btnClasses() is called and answer is not set', () => {
    const mockSelection = 'Random';

    const obj = component.btnClasses(mockSelection);
    fixture.detectChanges();

    const values = Object.values(obj);
    values[0] = !values[0];

    for (let i = 0; i < 4; i++) {
      expect(values[i]).toBe(false);
    }
  });

  it('should return false when isAnswerCorrect() is called and answer is not set ', () => {
    const mockSelection = 'Random';

    const ans = component.isAnswerCorrect(mockSelection);
    fixture.detectChanges();

    expect(ans).toBe(false);
  });

  it('should return false when isAnswerWrong() is called and answer is not set ', () => {
    const mockSelection = 'Random';

    const ans = component.isAnswerWrong(mockSelection);
    fixture.detectChanges();

    expect(ans).toBe(false);
  });

  it('should return false when answerExists() is called and answer is not set ', () => {
    const ans = component.answerExists();
    fixture.detectChanges();

    expect(ans).toBe(false);
  });

  it('should return true when answerExists() is called and answer is not set ', () => {
    component.answer = 'Random';
    const ans = component.answerExists();
    fixture.detectChanges();

    expect(ans).toBe(true);
  });
});
