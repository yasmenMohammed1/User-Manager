import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-custom-btn',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './custom-btn.component.html',
  styleUrl: './custom-btn.component.scss',
})
export class CustomBtnComponent {
  @Input() loading = false;
  @Input() title = '';
  @Input() color = 'basic';
}
