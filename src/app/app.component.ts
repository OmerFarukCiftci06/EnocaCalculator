import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { CalculationViewAreaComponent } from "./calculation-view-area/calculation-view-area.component";
import { CalculationInputAreaComponent } from "./calculation-input-area/calculation-input-area.component";
import {evaluate, parse} from 'mathjs';
import { CommonModule } from '@angular/common';
interface LastTreeItems{
  process: string;
  result: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, CalculationViewAreaComponent, CalculationInputAreaComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  defaultNumber: string = "0";
  currentNumber: string = "";
  isEqualityOperatorHidden: boolean= false;
  calculation: string = "";
  lastItems: LastTreeItems[] = [];
  isDarkMode: boolean= false;
  hasComma: boolean = false;
  history : string[] = [];
   //this.arr[this.arr.length-1].split("")
  hasNegative: boolean = false;
  isHistoryActive: boolean = false;

  getNumber(value: string){
    if(value=== "."){
      
      if(!this.hasComma){
        this.currentNumber += value;
        this.hasComma = true;
      }
    }else{
      this.currentNumber += value;
    }
  }

  getReset(){
    this.currentNumber = "";
    this.isEqualityOperatorHidden = false;
    this.calculation = "";
    this.hasComma = false;
    this.hasNegative= false;
  }

  getOperator(value:string){
    if(this.currentNumber.trim().charAt(this.currentNumber.length -1) >= '0' && this.currentNumber.trim().charAt(this.currentNumber.length -1) <= '9'){
      this.currentNumber += ` ${value} `
    }
    else{
      this.currentNumber = this.currentNumber.substring(0, this.currentNumber.length -2);
      this.currentNumber += ` ${value} `
    }
    this.hasComma = false;
    this.hasNegative = false;
  }

  equalityOperator(){
    this.calculation = evaluate(this.currentNumber);
    let store = evaluate(this.currentNumber)
    this.isEqualityOperatorHidden = true;
    // this.lastItems.push(this.currentNumber)
    if(this.lastItems.length === 3)
    {
       this.lastItems.shift()
    }
    this.lastItems.push( { process : this.currentNumber, result : this.calculation})
    
  }

  getChangeLightMode(){
    this.isDarkMode = !this.isDarkMode;
  }

  historyEvent(){
    this.isHistoryActive = !this.isHistoryActive;
  }

  getNegative(){
  if(this.currentNumber.trim().charAt(this.currentNumber.length -1) >= '0' && this.currentNumber.trim().charAt(this.currentNumber.length -1) <= '9'){
    const arr = this.currentNumber.split(' ');
    if (arr.length === 1) {
      this.currentNumber = this.currentNumber.startsWith('-') ? this.currentNumber.slice(1) : '-' + this.currentNumber;
      return;
    }
    
    // Get the last part of the expression (expected to be the number to toggle)
    const lastPart = arr.pop();
    
    // If lastPart is undefined, return the input (edge case handling)
    if (!lastPart) {
         return;
    }

    // Toggle the sign of the last number
    let toggledNumber = lastPart.startsWith('-')
        ? lastPart.slice(1)  // Remove '-' if it's negative
        : '-' + lastPart;    // Add '-' if it's positive
    toggledNumber = toggledNumber.replaceAll(" ","");
    
    // Reassemble the expression with the toggled last number
    this.currentNumber = arr.join('') + ' '+ toggledNumber;
  }
  }

  get100(){
    const arr = this.currentNumber.split(' ');
    const lastPart = arr.pop();
    if (!lastPart) {
      return;
    }

    let result = parseFloat(lastPart) / 100;
    this.currentNumber = arr.join('') + ' '+ result;
  }
}
