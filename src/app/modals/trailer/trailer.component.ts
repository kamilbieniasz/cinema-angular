import { Movie } from 'src/app/interface/movieInterface';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.scss']
})
export class TrailerComponent implements OnInit {
  @ViewChild('trailerModal') trailerModal: ElementRef;
  @Input() movie: Movie;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    console.log(this.movie);
  }

  stopTrailer(): void{
    const currentURL = this.trailerModal.nativeElement.children[0].getAttribute('src');
    this.trailerModal.nativeElement.children[0].setAttribute('src', currentURL + '?enablejsapi=1');
  }

  closeTrailer(): void{
    this.stopTrailer();
    this.close.emit(null);
  }
}
