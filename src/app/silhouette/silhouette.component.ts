import { Component, Input } from '@angular/core';
import { Result } from '@/interfaces';

@Component({
  selector: 'app-silhouette',
  templateUrl: './silhouette.component.html',
  styleUrl: './silhouette.component.css',
})
export class SilhouetteComponent {
  @Input() silhouetteUrl = '';
  @Input() result: Result | undefined;
}
