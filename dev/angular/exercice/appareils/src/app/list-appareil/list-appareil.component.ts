import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AppareilService } from '../services/appareil.service';
import { faPlus, faSync } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-list-appareil',
  templateUrl: './list-appareil.component.html',
  styleUrls: ['./list-appareil.component.css']
})
export class ListAppareilComponent implements OnInit, OnDestroy {
  @Input() appareilName: string;
  isLoading: boolean;
  appareils: any;
  isAuth: boolean;
  watchLogin: ReturnType<typeof setInterval>;

  faPlus = faPlus
  faSync = faSync

  constructor(
    private appareilService: AppareilService
  ) { }

  ngOnInit(): void {
    this.getAppareils();
  }

  ngOnDestroy() {
    clearInterval(this.watchLogin);
  }

  getAppareils(): void {
    this.isLoading = true;
    this.appareils = [];
    this.appareilService.getAppareils()
      .subscribe(appareils => {
        for (let items in appareils) {
          let id = { id: items }
          this.appareils.push({ ...appareils[items], ...id });
        }
        this.isLoading = false;
      })
  }

  addAppareil(appareil) {
    this.isLoading = true;
    const appareilObject = {
      name: appareil,
      status: 'éteint'
    }
    this.appareilService.addAppareil(appareilObject)
      .subscribe(appareil => {
        this.getAppareils();
        this.appareilName = '';
        this.isLoading = false;
      })
  }

  onAllumer() {
    this.appareils.forEach(appareil => {
      this.appareilService.allumerUnAppareil(appareil.id)
        .subscribe(appareil => {})
    });
    this.getAppareils()
  }

  onEteindre() {
    this.appareils.forEach(appareil => {
      this.appareilService.eteindreUnAppareil(appareil.id)
        .subscribe(appareil => {})
    });
    this.getAppareils()
  }

  onStatusChange() {
    this.getAppareils()
  }
}
