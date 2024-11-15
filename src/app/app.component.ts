import { Component } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { CalculationViewAreaComponent } from "./calculation-view-area/calculation-view-area.component";
import { CalculationInputAreaComponent } from "./calculation-input-area/calculation-input-area.component";
import {evaluate} from 'mathjs';
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
    //Eşittire bastıktan sonra yeni bir sayı girmeye çalıştığında  0lama
    if(this.isEqualityOperatorHidden){
        this.currentNumber = "";
        this.currentNumber += value;
        this.isEqualityOperatorHidden = false;
        this.calculation = "";
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
    this.isEqualityOperatorHidden = true;
    if(this.lastItems.length === 3)
    {
       this.lastItems.shift()
    }
    this.lastItems.push( { process : this.currentNumber, result : this.calculation})

    if(this.calculation === "Infinity"){
      this.calculation = "Hata";
    }
    //Sayi/0 kontrolü arka arkaya bölme işlemlerinde 12 / 5 / 0 gibi bir işlemde infinity geliyor.
    let divideSplit= this.currentNumber.split(" / ");
    if(divideSplit.length >= 2){
      for(let i = 1 ; i < divideSplit.length; i+2){
        if(divideSplit[i] === "0"){
          console.log("Sayi/0 yapamazsınız.");
          this.calculation = "Sayi/0"
        }
        return;
      }
    }
    
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

    const lastPart = arr.pop();  

    if (!lastPart) {
         return;
    }

    let toggledNumber = lastPart.startsWith('-')
        ? lastPart.slice(1) 
        : '-' + lastPart; 
    
    toggledNumber = toggledNumber.replaceAll(" ","");
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
