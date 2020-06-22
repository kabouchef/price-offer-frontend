import { Component, OnInit, OnDestroy } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {PATH_IMAGES} from '../core/common/common.constants';
import {Subscription} from 'rxjs';
import {LoaderService} from '../core/services/loader/loader.service';

@Component({
  selector: 'app-progress-spinner-configurable',
  templateUrl: './progress-spinner-configurable.component.html',
  styleUrls: ['./progress-spinner-configurable.component.scss']
})
export class ProgressSpinnerConfigurableComponent implements OnInit, OnDestroy {

  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';


  public show = true;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) {
    console.log('the good');
  }

  /**
   * Listen to loader subscriber for know when show the loader
   */
  ngOnInit() {
    this.subscription = this.loaderService.getLoader().subscribe((state: number) => this.showLoader(state));
  }

  /**
   * Show loader if state is not already run
   * The loader is display when value > 0
   * @param state of spinner
   */
  private showLoader(state): void {
    this.show = state !== 0;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
