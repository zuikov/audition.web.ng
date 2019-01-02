import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(categories: any, searchText: any): any {
    if (searchText === '') {return categories; }
    return categories.filter((category) => {
      if (category.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        || category.description.toLowerCase().indexOf(searchText.toLowerCase()) > -1)  {
        return true; }
    });
  }
}
