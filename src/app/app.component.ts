import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Firestore, addDoc, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private fireStore: Firestore = inject(Firestore);
  ngOnInit() {
    const testingCollection = collection(this.fireStore, 'test');
    addDoc(testingCollection, {
      testingText: 'yarab elerror yt7l ',
    });
  }
  title = 'User-Manager';
}
