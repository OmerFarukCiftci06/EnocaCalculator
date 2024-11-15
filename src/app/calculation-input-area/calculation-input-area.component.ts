import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
  selector: 'app-calculation-input-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculation-input-area.component.html',
  styleUrl: './calculation-input-area.component.css'
})
export class CalculationInputAreaComponent {
  @Output() operator: EventEmitter<string> = new EventEmitter()
  @Output() AC: EventEmitter<any> = new EventEmitter()
  @Output() number: EventEmitter<string> = new EventEmitter();
  @Output() calculation: EventEmitter<any> = new EventEmitter();
  @Output() negativeOperator: EventEmitter<string> = new EventEmitter();
  @Output() asd: EventEmitter<string> = new EventEmitter();
  @Input() isDarkMode!: boolean;

  buttons: string[] = ["1","2","3","4","5","6","7","8","9",".","0","00"]

  miniInputs = [
    { label: 'AC', action: 'getReset()' },
    { label: '+/-', action: 'getNegative()' },
    { label: '%', action: 'get100()' }
  ];

  operators = [
    {
      display: "÷", symbol: "/", 
    },
    {
      display: "*", symbol: "*", 
    },
    {
      display: "-", symbol: "-", 
    },
    {
      display: "+", symbol: "+", 
    }
  ]

  getNumber(value:string){
    this.number.emit(value);
  }
  
  getReset(){
    this.AC.emit();
  }

  getOperator(value:string){
    this.operator.emit(value);
  }

  equalityOperator(){
    this.calculation.emit();
  }

  getNegative(){
    this.negativeOperator.emit();
  }

  get100(){
    this.asd.emit();
  }
}
