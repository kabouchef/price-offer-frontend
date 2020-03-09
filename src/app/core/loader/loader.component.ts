import {Component, OnDestroy, OnInit} from '@angular/core';

import {Subscription} from 'rxjs';

import {PATH_IMAGES} from '../common/common.constants';
import {LoaderService} from '../services/loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})

/**
 * Loader Component
 * @author: Farouk KABOUCHE
 */
export class LoaderComponent implements OnInit, OnDestroy {

  public show = true;
  public pathLoader = `${PATH_IMAGES}/logo-lm.svg`;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) {
  }

  /**
   * Listen to loader subscriber for know when show the loader
   */
  ngOnInit() {
    this.subscription = this.loaderService.getLoader().subscribe((state: Number) => this.showLoader(state));
  }

  /**
   * Show loader if state is not already run
   * The loader is display when value > 0
   * @param state
   */
  private showLoader(state): void {
    this.show = state !== 0;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
