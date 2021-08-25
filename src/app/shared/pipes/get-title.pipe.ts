import { CategoryService } from './../services/category.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getCategoryTitle'
})
export class GetTitlePipe implements PipeTransform {
    
  constructor(private categoryService: CategoryService) { }

  transform(categoryId): string {
    const category = this.categoryService.categories.find(category => category.id === categoryId);
    return category ? category.title : '';
  }
}