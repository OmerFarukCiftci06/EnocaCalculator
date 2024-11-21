import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() modeLightVisulizationEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() historyVisulizationEvent: EventEmitter<boolean> = new EventEmitter();

  isLightMode: boolean = true;

  getThemeClass(baseClass: string): { [key: string]: boolean } {
    return {
      [`${baseClass}-light-mode`]: this.isLightMode,
      [`${baseClass}-dark-mode`]: !this.isLightMode
    };
  }


  getSrc(baseSource: string): { [key: string]: boolean } {
    return {
      [`../../assets/images/${baseSource}-light-mode.png`]: this.isLightMode,
      [`../../assets/images/${baseSource}-dark-mode.png`]: !this.isLightMode
    };
  }

  isHistoryActive(){
    this.historyVisulizationEvent.emit();
  }

  getChangeLightMode(){
    this.isLightMode = !this.isLightMode
    this.modeLightVisulizationEvent.emit(this.isLightMode);
  }
}
