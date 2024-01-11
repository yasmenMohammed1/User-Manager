import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-custom-btn',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './custom-btn.component.html',
  styleUrl: './custom-btn.component.scss',
})
export class CustomBtnComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {}
  @Input() loading = false;
  @Input() title = '';
  save(): void {
    this.loading = true;
  }
}
