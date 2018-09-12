import { Component, OnInit } from '@angular/core';
import { WidgetsService, Widget} from '../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { log } from 'util';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent implements OnInit {
  widgets: Widget[];
  currentWidget: Widget;

  constructor(private widgetsService: WidgetsService, private http: Http) { }

  ngOnInit() {
    this.getWidgets();
    this.resetCurrentWidget();
    const obs = this.http.get('https://www.behindthename.com/api/lookup.json?name=mary&key=la201484095');
    obs.subscribe((response) => console.log(response));
  }

  resetCurrentWidget() {
    this.currentWidget = { id: null, name: '', description: '' };
  }

  selectWidget(widget) {
    this.currentWidget = widget;
  }

  cancel(widget) {
    this.resetCurrentWidget();
  }

  getWidgets() {
    this.widgetsService.all()
      .subscribe(widgets => this.widgets = widgets);
  }

  saveWidget(widget) {
    if (!widget.id) {
      this.createWidget(widget);
    } else {
      this.updateWidget(widget);
    }
  }

  createWidget(widget) {
    this.widgetsService.create(widget)
      .subscribe(response => {
        this.getWidgets();
        this.resetCurrentWidget();
      });
  }

  updateWidget(widget) {
    this.widgetsService.update(widget)
      .subscribe(response => {
        this.getWidgets();
        this.resetCurrentWidget();
      });
  }

  deleteWidget(widget) {
    this.widgetsService.delete(widget)
      .subscribe(response => {
        this.getWidgets();
        this.resetCurrentWidget();
      });
  }

}
