import { MovieService } from './../../services/movie.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-order-modal',
  templateUrl: './confirm-order-modal.component.html',
  styleUrls: ['./confirm-order-modal.component.scss'],
})
export class ConfirmOrderModalComponent implements OnInit {
  @Input() movie;
  @Input() places;
  @Input() date;
  @Input() time;
  @Input() price;
  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Output() refresh: EventEmitter<any> = new EventEmitter();

  constructor(private service: MovieService) { }

  ngOnInit(): void {
  }

  close() {
    this.closeModal.emit(null);
  }

  refreshDate() {
    this.refresh.emit(null);
  }

  bookPlace(): void {
    const date = {
      id: this.movie.id,
      date: this.date,
      time: this.time,
      places: this.places
    }

    this.service.bookPlaces(date).subscribe();
    this.refreshDate();
    this.close();
  }

}
