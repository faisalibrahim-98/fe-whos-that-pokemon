import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameOptionsComponent } from '@/game-options/game-options.component';
import { SilhouetteComponent } from '@/silhouette/silhouette.component';
import { ChoicesComponent } from '@/choices/choices.component';
import { HeaderComponent } from '@/header/header.component';
import { ResultComponent } from '@/result/result.component';
import { BrowserModule } from '@angular/platform-browser';
import { ScoreComponent } from '@/score/score.component';
import { provideHttpClient } from '@angular/common/http';
import { ModalComponent } from '@/modal/modal.component';
import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from '@/app.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgModule } from '@angular/core';

@NgModule({
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
  imports: [
    BrowserAnimationsModule,
    NgxSpinnerModule,
    AppRoutingModule,
    BrowserModule,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
