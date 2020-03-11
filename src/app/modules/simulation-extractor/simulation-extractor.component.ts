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
  public tvaReduceAllowed = false;
  public tvaInterAllowed = false;
  public tvaNormalAllowed = false;
  public tvaReduceEffected = false;
  public tvaInterEffected = false;
  public tvaNormalEffected = false;
  public oneExists = false;


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
      if (this.priceLineList[1].totalPriceTVAReduite !== 0.0) {
        this.tvaReduceAllowed = true;
      }
      if (this.priceLineList[1].totalPriceTVAInter !== 0.0) {
        this.tvaInterAllowed = true;
      }
      if (this.priceLineList[1].totalPriceTVANormale !== 0.0) {
        this.tvaNormalAllowed = true;
        if (this.priceLineList[1].totalPriceTVAReduite !== 0.0) {
          this.tvaReduceEffected = true;
        } else if (this.priceLineList[1].totalPriceTVAInter !== 0.0) {
          this.tvaInterEffected = true;
        } else {
          this.tvaNormalEffected = true;
        }
      }

      this.oneExists = true;
    });

  }

}
