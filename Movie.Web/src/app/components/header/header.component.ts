import { Component } from '@angular/core';
import { MovieComponent } from '../movie/movie.component';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private eventService: EventService) { }
}
