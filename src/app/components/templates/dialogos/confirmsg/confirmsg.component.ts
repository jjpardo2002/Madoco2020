import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Observable } from 'rxjs';
declare var $: any;
declare var jQuery: any;
@Component({
  selector: 'app-confirmsg',
  templateUrl: './confirmsg.component.html',
  styleUrls: ['./confirmsg.component.css']
})
export class ConfirmsgComponent implements OnInit {
  @Input() msg: string;
  constructor() { }

  ngOnInit(): void {
  }

}
