import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-selected-category',
  templateUrl: './selected-category.component.html',
  styleUrls: ['./selected-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedCategoryComponent {
}
