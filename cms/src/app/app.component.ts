import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private selectedFeature: string = "documents";
  title = 'app';

  switchView(selectedFeature: string) {
    this.selectedFeature = selectedFeature;
  }
}
