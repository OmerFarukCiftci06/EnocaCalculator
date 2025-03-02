import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() modeLightVisulizationEvent: EventEmitter<boolean> =
    new EventEmitter();
  @Output() historyVisulizationEvent: EventEmitter<boolean> =
    new EventEmitter();

  isLightMode: boolean = true;

  getThemeClass(baseClass: string): { [key: string]: boolean } {
    return {
      [`${baseClass}-light-mode`]: this.isLightMode,
      [`${baseClass}-dark-mode`]: !this.isLightMode,
    };
  }

  getSrc(imageName: string): string {
    return `../../assets/images/${imageName}-${
      this.isLightMode ? 'light' : 'dark'
    }-mode.png`;
  }

  isHistoryActive() {
    this.historyVisulizationEvent.emit();
  }

  getChangeLightMode() {
    this.isLightMode = !this.isLightMode;
    this.modeLightVisulizationEvent.emit(this.isLightMode);
  }
}
