import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SimulationService {

  private URI = '/api/v1/';

  constructor(private http: HttpClient) {
  }

  sendSimulation(simulationCode, environnement) {

    const url = 'request?simulationCode=' + simulationCode + '&environnement=' + environnement + '&schema=REEL';
    console.log(url);
    return this.http.get(this.URI + url);
  }

}
