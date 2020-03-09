import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SimulationService} from '../../core/services/simulation.service';

interface Environment {
  value: string;
  viewValue: string;

}

@Component({
  selector: 'app-simulation-extractor',
  templateUrl: './simulation-extractor.component.html',
  styleUrls: ['./simulation-extractor.component.scss']
})
export class SimulationExtractorComponent implements OnInit {

  constructor(private snackBar: MatSnackBar,
              private simulationService: SimulationService) {
  }

  public simulationCode = '20190415S38248';
  public environment = 'RECETTE';
  public priceLineList;
  public oneExists = true;


  @Input() environments: Environment[] = [
    {value: 'PROD', viewValue: 'PROD'},
    {value: 'PREPROD', viewValue: 'PREPROD'},
    {value: 'RECETTE', viewValue: 'RECETTE'},
    {value: 'DEV', viewValue: 'DEV'}
  ];

  @Input() schema = '';

  /*this.oneExists = this.priceLineList.filter(priceLine => priceLine.identifiant !== null).length > 0;
  console.log(oneExists);*/


  ngOnInit(): void {

  }

  submitSimulation() {
    this.snackBar.open(this.simulationCode, this.environment, {
      duration: 2000,
    });

    this.simulationService.sendSimulation(this.simulationCode, this.environment).subscribe(el => {
      this.priceLineList = el;
    });

  }

}
