import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FourOhFourComponent} from './modules/four-oh-four/four-oh-four.component';
import {SimulationExtractorComponent} from './modules/simulation-extractor/simulation-extractor.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {AuthComponent} from './auth/auth.component';
import {AuthService} from './core/services/auth.service';
import {AuthGuard} from './core/services/auth.guard';
import {SimulationService} from './core/services/simulation.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {LoaderInterceptor} from './core/interceptors/loader.interceptor';
import {ProgressSpinnerConfigurableComponent} from './progress-spinner-configurable/progress-spinner-configurable.component';


const appRoutes: Routes = [
  {path: '', canActivate: [AuthGuard], component: AppComponent},
  {path: 'simulation-extractor', canActivate: [AuthGuard], component: SimulationExtractorComponent},
  {path: 'auth', component: AuthComponent},
  {path: 'not-found', component: FourOhFourComponent},
  {path: '**', redirectTo: 'not-found'}
];

@NgModule({
  declarations: [
    AppComponent,
    FourOhFourComponent,
    SimulationExtractorComponent,
    AuthComponent,
    ProgressSpinnerConfigurableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NoopAnimationsModule,
    MatRadioModule,
    MatInputModule,
    MatExpansionModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    MatSnackBar,
    AuthService,
    AuthGuard,
    SimulationService,
    {
      provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true
    },
    AuthComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
