import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { CalculationViewAreaComponent } from './calculation-view-area/calculation-view-area.component';
import { CalculationInputAreaComponent } from './calculation-input-area/calculation-input-area.component';
import { evaluate } from 'mathjs';
import { CommonModule } from '@angular/common';
interface LastTreeItems {
  process: string;
  result: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    CalculationViewAreaComponent,
    CalculationInputAreaComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  defaultNumber: string = '0';
  currentNumber: string = '';
  isEqualityOperatorHidden: boolean = false;
  calculation: string = '';
  lastItems: LastTreeItems[] = [];
  isDarkMode: boolean = false;
  hasComma: boolean = false;
  isHistoryActive: boolean = false;

  getReset() {
    this.currentNumber = '';
    this.isEqualityOperatorHidden = false;
    this.calculation = '';
    this.hasComma = false;
  }

  getNumber(value: string) {
    if (value === '.') {
      if (!this.hasComma) {
        this.currentNumber += value;
        this.hasComma = true;
      }
    } else {
      this.currentNumber += value;
    }

    if (this.isEqualityOperatorHidden) {
      this.getReset();
      this.currentNumber += value;
    }
  }

  getInput() {
    return this.currentNumber.trim().charAt(this.currentNumber.length - 1);
  }

  getOperator(value: string) {
    if (this.currentNumber.length === 0) {
      return;
    }

    if (this.getInput() >= '0' && this.getInput() <= '9') {
      this.currentNumber += ` ${value} `;
    } else {
      this.currentNumber = this.currentNumber.substring(
        0,
        this.currentNumber.length - 2
      );
      this.currentNumber += ` ${value} `;
    }
    this.hasComma = false;
  }

  equalityOperator() {
    this.calculation = parseFloat(evaluate(this.currentNumber)).toFixed(2);
    this.isEqualityOperatorHidden = true;

    if (this.lastItems.length === 3) {
      this.lastItems.shift();
    }
    this.lastItems.push({
      process: this.currentNumber,
      result: this.calculation,
    });

    if (this.calculation == 'Infinity' || this.calculation == '-Infinity') {
      this.calculation = 'Sayi/0';
    }
  }

  getChangeLightMode() {
    this.isDarkMode = !this.isDarkMode;
  }

  historyEvent() {
    this.isHistoryActive = !this.isHistoryActive;
  }

  getNegative() {
    if (this.getInput() >= '0' && this.getInput() <= '9') {
      const arr = this.currentNumber.split(' ');
      if (arr.length === 1) {
        this.currentNumber = this.currentNumber.startsWith('-')
          ? this.currentNumber.slice(1)
          : '-' + this.currentNumber;
        return;
      }

      const lastPart = arr.pop();

      if (!lastPart) {
        return;
      }

      let toggledNumber = lastPart.startsWith('-')
        ? lastPart.slice(1)
        : '-' + lastPart;

      this.currentNumber = arr.join(' ') + ' ' + toggledNumber;
    }
  }

  getDivide100() {
    const arr = this.currentNumber.split(' ');
    const lastPart = arr.pop();
    if (!lastPart) {
      return;
    }
    let result = parseFloat(lastPart) / 100;
    this.currentNumber = arr.join(' ') + ' ' + result;
  }
}
