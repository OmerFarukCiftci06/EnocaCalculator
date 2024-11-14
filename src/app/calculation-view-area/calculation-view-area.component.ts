import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Input } from '@angular/core';


@Component({
  selector: 'app-calculation-view-area',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calculation-view-area.component.html',
  styleUrl: './calculation-view-area.component.css'
})
export class CalculationViewAreaComponent {
  @Input() currentNumber !: string;
  @Input() calculation !: string;
  @Input() isEqualityOperatorHidden !: boolean;
  @Input() isDarkMode !: boolean;
}
