import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SilhouetteComponent } from '@/silhouette/silhouette.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

describe('SilhouetteComponent', () => {
  let fixture: ComponentFixture<SilhouetteComponent>;
  let component: SilhouetteComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      declarations: [SilhouetteComponent],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(SilhouetteComponent);
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
});
