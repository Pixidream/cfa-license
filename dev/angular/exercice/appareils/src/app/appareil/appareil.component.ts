import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AppareilService } from '../services/appareil.service'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.css']
})
export class AppareilComponent implements OnInit {
  @Input() appareilName: string
  @Input() appareilStatus: string
  @Input() appareilId: string

  @Output() didChangeStatus = new EventEmitter();

  faTrash = faTrash
  faPen = faPen

  constructor(
    private appareilService: AppareilService
  ) { }

  ngOnInit(): void {}

  onAllumerOne(id) {
    this.appareilService.allumerUnAppareil(id)
      .subscribe(data => {
        this.didChangeStatus.emit()
      })
  }

  onEteindreOne(id) {
    this.appareilService.eteindreUnAppareil(id)
      .subscribe(data => {
        this.didChangeStatus.emit()
      })
  }

  onSupprimerOne(id) {
    this.appareilService.supprimerUnAppareil(id)
      .subscribe(data => {
        this.didChangeStatus.emit()
      })
  }

  onModifierOne(data) {
    this.appareilService.modifierUnAppareil(data)
      .subscribe(data => {
        this.didChangeStatus.emit()
      })
  }

  getStatus(): string {
    return this.appareilStatus;
  }

  getColor(): string {
    if (this.appareilStatus === 'allumé') return 'green';
    else return 'red';
  }
}
