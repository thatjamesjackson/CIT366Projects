import {Component, EventEmitter, Output} from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<String>();

  onSelected(selectedEvent: string){
    this.selectedFeatureEvent.emit(selectedEvent)
  }
}
