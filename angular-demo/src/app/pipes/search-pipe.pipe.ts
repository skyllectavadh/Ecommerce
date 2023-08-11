import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], searchQuery: string): any[] {
    const regexp = new RegExp(searchQuery, 'i');
    return products.filter(product => regexp.test(product.name));
  }

}

export const SearchPipePipe = SearchPipe;
