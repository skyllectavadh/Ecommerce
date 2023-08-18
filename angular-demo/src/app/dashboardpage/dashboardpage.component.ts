import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { SearchService } from '../services/search.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-dashboardpage',
  templateUrl: './dashboardpage.component.html',
  styleUrls: ['./dashboardpage.component.css']
})
export class DashboardComponent implements OnInit {
  private socket: Socket;
  products: any[] = [];
  totalPages: number = 0;
  currentPage: number = 1;
  // pageSize = 10;
  productDetail: any;
  isProduct: boolean = false;
  isSearch:boolean = false;
  searchTerm: string = ''; // Define the searchTerm property


  constructor(private productService: ProductService, private searchService: SearchService) {

    this.socket = io('http://localhost:4400',{ transports : ['websocket'] });
  }

  private sortField: string = 'price';
  private sortOrder: string = '';



  handleSearch(value: string) {
    // Use the search value here in your dashboard component
    // console.log('Search Value:', value);
    this.searchTerm =  value
    // You can perform any further actions with the search value as needed.
  }

  

  ngOnInit(): void {

    this.searchService.getSearchProducts().subscribe((response: any) => {
      //     // console.log("1",response);
          this.products = response.products || [];
          this.currentPage = response.currentPage || 1;
          this.totalPages = response.totalPages || 0;
          if (this.products && this.products.length > 0) {
            this.isSearch = true;
          }
        });

    // Listen for the 'createdData' event from the backend
    this.socket.on('createdData', (data) => {
      this.products.push(data.data);  
    });

    // Listen for the 'getData' event from the backend
    this.socket.on('getData', (data) => {
      this.products = data.data; 
    });

    
    this.socket.on('editData', (data) => {
      const newData = data.data;
      const indexToUpdate = this.products.findIndex(product => product.id === newData.id);
    
      if (indexToUpdate !== -1) {
        // Update the existing data with the new data
        this.products[indexToUpdate] = newData;
      } else {
        console.log("Data not found in the array.");
      }
    });
    
    this.socket.on('deleteData', (data) => {
      const idToDelete = data.data.id; // Access the ID from the data object
    
      // Create a new array excluding the item to delete
      this.products = this.products.filter(product => product.id !== idToDelete);
    });
    
    this.fetchProducts();
  }

  home(){
    this.productService.getProducts(this.currentPage = 1).subscribe(
      (response: any) => {
        this.products = response.products || [];
        // this.currentPage = response.currentPage || 1;
        this.totalPages = response.totalPages || 0;
        if (this.isSearch===false) {
        
          // console.log("false");

          this.isSearch===false
        } else {
          // console.log("true");
          this.isSearch===true
        }
  },
  (error) => {
    console.error('Error fetching initial products', error);
  });
  }

  // fetchProducts() {
  //   this.productService.getProducts(this.currentPage, this.searchTerm, this.sortField, this.sortOrder).subscribe(
  //     (response: any) => {
  //       this.products = response.products || [];
  //       this.currentPage = response.currentPage || 1;
  //       this.totalPages = response.totalPages || 0;
  //       this.isProduct = this.products.some(product => product.stock > 0);
  //     },
  //     (error) => {
  //       console.error('Error fetching initial products', error);
  //     }
  //   );
  // }
  

  fetchProducts() {
    // Fetch all products using the ProductService
    this.productService.getProducts(this.currentPage,this.searchTerm,this.sortField, this.sortOrder).subscribe(

      (response: any) => {
        this.products = response.products || [];
        // console.log("pro",this.products);
        
        this.currentPage = response.currentPage || 1;
        this.totalPages = response.totalPages || 0;
        this.isProduct = this.products.some(product => product.stock > 0);
        this.isProduct = false
        if (this.isSearch===false) {
          // console.log("false");          
          this.isSearch===false
        } else {
          // console.log("true");

          this.isSearch===true
        }

      },
      (error) => {
        console.error('Error fetching  initial products', error);
      }
    );
  }


  sortProduct(order: string) { //1
    // Update the sortField and sortOrder based on the selected sorting option
    this.sortField = 'price';
    this.sortOrder = order === 'highToLow' ? 'desc' : 'asc';

    // Fetch products with the new sorting parameters from the ProductService API
    this.productService.getProducts(this.currentPage, this.searchTerm, this.sortField, this.sortOrder).subscribe(
      (response: any) => {
        console.log('sort', this.searchTerm);
        this.products = response.products || [];
        this.currentPage = response.currentPage || 1;
        this.totalPages = response.totalPages || 0;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  sortProducts(order: string) {
    this.sortField = 'price';
    if (order === 'highToLow' ) {
        this.sortOrder = 'desc'
        this.productService.getProducts(this.currentPage, this.searchTerm, this.sortField, this.sortOrder).subscribe(
          (response: any) => {
            console.log('sort', this.searchTerm);
            this.products = response.products || [];
            this.currentPage = response.currentPage || 1;
            this.totalPages = response.totalPages || 0;
          });
    } else if (order === 'lowToHigh') {
      this.sortOrder = 'asc'
      this.productService.getProducts(this.currentPage, this.searchTerm, this.sortField, this.sortOrder).subscribe(
        (response: any) => {
          console.log('sort', this.searchTerm);
          this.products = response.products || [];
          this.currentPage = response.currentPage || 1;
          this.totalPages = response.totalPages || 0;
        });
    }
    else{
      this.productService.getProducts(this.currentPage, this.searchTerm).subscribe(
        (response: any) => {
          console.log('sort', this.searchTerm);
          this.products = response.products || [];
          this.currentPage = response.currentPage || 1;
          this.totalPages = response.totalPages || 0;
        });
    }
  }

  getPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    this.currentPage = page;
    // console.log("gotob",this.isSearch);
    if (this.isSearch===false) {
      // console.log("false");

      this.isSearch===false
    } else {
      // console.log("true");

      this.isSearch===true
    }
    console.log("gotoa",this.isSearch);
    // this.isSearch = true ? this.isSearch = true : this.isSearch = false;
    this.fetchProducts();
  }

  redirectToProductdetail(product: any) {
    this.productDetail = product;
    this.isProduct = true;
  }

  back() {
    this.isProduct = false;
  }
}


// ngOnInit() {
  //   // Subscribe to the searchProducts observable to get updates when search data changes
  //   this.searchService.getSearchProducts().subscribe((response: any) => {
  //     // console.log("1",response);
  //     this.products = response.products || [];
  //     this.currentPage = response.currentPage || 1;
  //     this.totalPages = response.totalPages || 0;
  //     if (this.products && this.products.length > 0) {
  //       this.isSearch = true;
  //     }
  //   });

  //   // Fetch initial products
  //   this.fetchProducts();
  // }












// import { Component,OnInit } from '@angular/core';
// import { ProductService } from '../services/product.service';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-dashboardpage',
//   templateUrl: './dashboardpage.component.html',
//   styleUrls: ['./dashboardpage.component.css']
// })
// export class DashboardComponent implements OnInit {
//   products: any[] = [];
//   productDetail: any;
//   isProduct: boolean = false;

//   // Set the number of products to display per page
//   pageSize = 10;

//   // Create a method to retrieve the products for the current page
//   getProductsForCurrentPage() {
//     // console.log("cp",this.currentPage);

//     const startIndex = (this.currentPage - 1) * this.pageSize;
//     // console.log("sI",startIndex);

//     const endIndex = startIndex + this.pageSize;
//     // console.log("ei",endIndex);
//     // console.log(this.products);

//     return this.products.slice(startIndex, endIndex);
//   }

//   // Assuming you have a property for the current page number
//   currentPage = 1;

//   constructor(private productService: ProductService,private router: Router) {}

//   ngOnInit() {
//     this.fetchProducts();
//   }

//   fetchProducts() {
//     this.productService.getProducts().subscribe(
//       (response) => {
//         this.products = response;
//         // console.log('Product data', this.products);
//       },
//       (error) => {
//         console.error('Error fetching products', error);
//       }
//     );
//   }

//   redirectToProductdetail(product: any) {
//     this.productDetail = product

//     this.isProduct = true
//     // this.router.navigate(['/productdetail'], { state: { product: product } });
//     // console.log("productdata from dashboard",product);

//   }

//   back()
//   {
//     return this.isProduct=false;
//   }
// }


// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../services/product.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-dashboardpage',
//   templateUrl: './dashboardpage.component.html',
//   styleUrls: ['./dashboardpage.component.css']
// })
// export class DashboardComponent implements OnInit {
//   products: any = null;
//   totalPages: number = 0;



//   productDetail: any;
//   isProduct: boolean = false;
//   pageSize = 10;
//   currentPage = 1;

//   constructor(private productService: ProductService, private router: Router) {}

//   ngOnInit() {
//     this.fetchProducts();
//   }

//   onPageChange(page: number) {
//     console.log("page",page);

//     this.currentPage = page;
//     this.fetchProducts();
//   }



//   fetchProducts() {
//     this.productService.getProducts(this.currentPage).subscribe(
//       (response: any) => {
//         this.products = response.products || [];
//         this.currentPage = response.currentPage || 1;
//         this.totalPages = response.totalPages || 0;
//         console.log("t",this.totalPages);

//       },
//       (error) => {
//         console.error('Error fetching products', error);
//       }
//     );
//   }





//   getProductsForCurrentPage() {
//     return this.products?.products || [];
//   }


//   redirectToProductdetail(product: any) {
//     this.productDetail = product;
//     this.isProduct = true;
//   }

//   back() {
//     this.isProduct = false;
//   }
// }
// Sort the products array based on the selected sorting option for search results only
      // if (this.isSearch) {
      //   this.sortProducts(this.sortOrder);
      // }
// Sort the products array based on the selected sorting option for search results only
        // if (this.isSearch) {
        //   this.sortProducts(this.sortOrder);
        // }

  // sortProducts(order: string) { //2
  //   // Update the sortField and sortOrder based on the selected sorting option
  //   this.sortField = 'price';
  //   this.sortOrder = order === 'highToLow' ? 'desc' : 'asc';

  //   // Sort the products array based on the selected sorting option for search results only
  //   if (this.isSearch) {
  //     if (this.sortOrder === 'desc') {
  //       // Sort in descending order (high to low)
  //       this.products = this.products.sort((a, b) => b.price - a.price);
  //     } else {
  //       // Sort in ascending order (low to high)
  //       this.products = this.products.sort((a, b) => a.price - b.price);
  //     }
  //   }
  // }


 // ngOnInit() {
  //   // Subscribe to the searchProducts observable to get updates when search data changes
  //   this.searchService.getSearchProducts().subscribe((response: any) => {
  //     // console.log("1",response);
  //     this.products = response.products || [];
  //     this.currentPage = response.currentPage || 1;
  //     this.totalPages = response.totalPages || 0;
  //     if (this.products && this.products.length >= 0) this.isSearch = true;
  //   });
  //   // Fetch initial products
  //   this.fetchProducts();
  // }

  // fetchProducts() {
  //   // console.log('-++++++++++++++++', this.searchService.hasSearchPerformed());
  //     // Fetch all products using the ProductService if no search has been performed
  //     this.productService.getProducts(this.currentPage).subscribe(
  //       (response: any) => {
  //         console.log("else");
  //         this.products = response.products || [];
  //         this.currentPage = response.currentPage || 1;
  //         this.totalPages = response.totalPages || 0;
  //         console.log('this.products', this.products);
  //         if(this.products && this.products.length > 0) {
  //           this.isSearch = false
  //         }

  //       },
  //       (error) => {
  //         console.error('Error fetching products', error);
  //       }
  //     );
  // }




  // fetchProducts() {
  //   if (this.isSearch) {

  //     // Fetch products with the existing search parameters (if any) and sorting parameters
  //     this.productService.getProducts(this.currentPage, this.searchTerm, this.sortField, this.sortOrder).subscribe(
  //       (response: any) => {
  //         this.products = response.products || [];
  //         this.currentPage = response.currentPage || 1;
  //         this.totalPages = response.totalPages || 0;
  //         if(this.products && this.products.length > 0) {
  //           this.isSearch = false
  //         }
  //       },
  //       (error) => {
  //         console.error('Error fetching products', error);
  //       }
  //     );
  //   } else {
  //     // Fetch all products using the ProductService if no search has been performed
  //     this.productService.getProducts(this.currentPage).subscribe(
  //       (response: any) => {
  //         this.products = response.products || [];
  //         this.currentPage = response.currentPage || 1;
  //         this.totalPages = response.totalPages || 0;
  //       },
  //       (error) => {
  //         console.error('Error fetching products', error);
  //       }
  //     );
  //   }
  // }

  // Add the sortProducts function to handle sorting
  // sortProducts(order: string) {
  //   // Update the sortField and sortOrder based on the selected sorting option
  //   this.sortField = 'price';
  //   this.sortOrder = order === 'highToLow' ? 'desc' : 'asc';

  //   // Fetch products with the new sorting parameters
  //   this.fetchProducts();
  // }


// fetchProducts() {
//   // console.log('-++++++++++++++++', this.searchService.hasSearchPerformed());

//   if (this.searchService.hasSearchPerformed()) {
//     console.log("if");

//     // Fetch searchProducts from the SearchService if a search has been performed
//     // this.searchService.getSearchProducts().subscribe(
//     //   (response: any) => {
//     //     this.products = response.products || [];
//     //     console.log("if p");

//     //     this.currentPage = response.currentPage || 1;
//     //     this.totalPages = response.totalPages || 0;
//     //   },
//     //   (error) => {
//     //     console.error('Error fetching search products', error);
//     //   }
//     // );
//   } else {
//     // Fetch all products using the ProductService if no search has been performed
//     this.productService.getProducts(this.currentPage).subscribe(

//       (response: any) => {
//         console.log("else");

//         this.products = response.products || [];
//         this.currentPage = response.currentPage || 1;
//         this.totalPages = response.totalPages || 0;
//       },
//       (error) => {
//         console.error('Error fetching products', error);
//       }
//     );
//   }
// }


























// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../services/product.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-dashboardpage',
//   templateUrl: './dashboardpage.component.html',
//   styleUrls: ['./dashboardpage.component.css']
// })
// export class DashboardComponent implements OnInit {
//   products: any[] = [];
//   filteredProducts: any[] = []; // Newly added array to hold filtered products
//   productDetail: any;
//   isProduct: boolean = false;
//   searchQuery: string = ''; // Newly added search query property

//   // Set the number of products to display per page
//   pageSize = 10;

//   // Create a method to retrieve the products for the current page
//   getProductsForCurrentPage() {
//     console.log("cp",this.currentPage);

//     const startIndex = (this.currentPage - 1) * this.pageSize;
//     // console.log("sI",startIndex);

//     const endIndex = startIndex + this.pageSize;
//     // console.log("ei",endIndex);
//     // console.log(this.products);

//     // Modify the code to use the filteredProducts array instead of products array
//     return this.filteredProducts.slice(startIndex, endIndex);
//   }

//   currentPage = 1;

//   constructor(private productService: ProductService, private router: Router) {}

//   ngOnInit() {
//     this.fetchProducts();
//   }

//   fetchProducts() {
//     this.productService.getProducts(this.searchQuery).subscribe(
//       (response) => {
//         this.products = response;
//         this.filteredProducts = this.products; // Initialize filteredProducts array with all products
//       },
//       (error) => {
//         console.error('Error fetching products', error);
//       }
//     );
//   }

//   search() {
//     this.filteredProducts = this.products.filter((product) =>
//       product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
//     );
//   }

//   redirectToProductdetail(product: any) {
//     this.productDetail = product;
//     this.isProduct = true;
//   }

//   back() {
//     this.isProduct = false;
//   }
// }



// import { Component, OnInit } from '@angular/core';
// import { ProductService } from '../services/product.service';
// import { Router } from '@angular/router';
// import { Subject } from 'rxjs';
// import { ActivatedRoute } from '@angular/router';
// // import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

// @Component({
//   selector: 'app-dashboardpage',
//   templateUrl: './dashboardpage.component.html',
//   styleUrls: ['./dashboardpage.component.css']
// })
// export class DashboardComponent implements OnInit {
//   products: any[] = [];
//   productDetail: any;
//   isProduct: boolean = false;
//   searchTerm$ = new Subject<string>();

//   // Set the number of products to display per page
//   pageSize = 10;
//   searchValue: string = '';
//   // Create a method to retrieve the products for the current page
//   getProductsForCurrentPage() {
//     let filteredProducts = this.products;
//     if (this.searchValue && this.searchValue.trim() !== '') {
//       filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(this.searchValue.toLowerCase()));
//     }

//     const startIndex = (this.currentPage - 1) * this.pageSize;
//     const endIndex = startIndex + this.pageSize;

//     return filteredProducts.slice(startIndex, endIndex);
//   }

//   // Assuming you have a property for the current page number
//   currentPage = 1;

//   constructor(private productService: ProductService,private router: Router,private route: ActivatedRoute) {}

//   ngOnInit() {
//     this.route?.data.subscribe((data) => {
//       this.products = data['products'];
//     });
//   }

//   fetchProducts() {
//     if (this.products && this.products.length > 0) {
//       // Use existing products if available
//       return;
//     }

//     this.productService.getProducts().subscribe(
//       (response) => {
//         this.products = response;
//       },
//       (error) => {
//         console.error('Error fetching products', error);
//       }
//     );
//   }





//   redirectToProductdetail(product: any) {
//     this.productDetail = product

//     this.isProduct = true
//     // this.router.navigate(['/productdetail'], { state: { product: product } });
//     // console.log("productdata from dashboard",product);

//   }

//   back()
//   {
//     return this.isProduct=false;
//   }

//   searchProducts() {
//     this.searchTerm$.next(this.searchValue);
//   }

// }






























// import { Component, OnInit } from '@angular/core';
// import { SearchPipePipe } from '../pipes/search-pipe.pipe';
// // import { Product } from '../models/product';
// import { ProductService } from '../services/product.service';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-dashboardpage',
//   templateUrl: './dashboardpage.component.html',
//   styleUrls: ['./dashboardpage.component.css']
// })

// export class DashboardComponent implements OnInit {
//   products: any[] = [];
//   productDetail: any;
//   isProduct: boolean = false;
//   searchQuery: string = '';

//   // Set the number of products to display per page
//   pageSize = 10;

//   // Create a method to retrieve the products for the current page
//   getProductsForCurrentPage() {
//     // console.log("cp",this.currentPage);

//     const startIndex = (this.currentPage - 1) * this.pageSize;
//     // console.log("sI",startIndex);

//     const endIndex = startIndex + this.pageSize;
//     // console.log("ei",endIndex);
//     // console.log(this.products);

//     return this.products.slice(startIndex, endIndex);
//   }

//   // Assuming you have a property for the current page number
//   currentPage = 1;

//   constructor(private productService: ProductService,private router: Router) {}

//   ngOnInit() {
//     this.fetchProducts();
//   }

//   fetchProducts() {
//     this.productService.getProducts().subscribe(
//       (response) => {
//         this.products = response;
//         // console.log('Product data', this.products);
//       },
//       (error) => {
//         console.error('Error fetching products', error);
//       }
//     );
//   }


//   redirectToProductdetail(product: any) {
//     this.productDetail = product

//     this.isProduct = true
//     // this.router.navigate(['/productdetail'], { state: { product: product } });
//     // console.log("productdata from dashboard",product);

//   }

//   back()
//   {
//     return this.isProduct=false;
//   }

//   onSearch() {
//     // Filter the products based on the search query.
//     const filteredProducts = this.products.filter(product => product.name.match(this.searchQuery));

//     // Display the filtered products.
//     this.products = filteredProducts;
//   }
// }























// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// interface Product {
//   // Define the properties of a product
//   name: string;
//   description: string;
//   price: number;
//   // Add any other properties as needed
// }

// @Component({
//   selector: 'app-dashboardpage',
//   templateUrl: './dashboardpage.component.html',
//   styleUrls: ['./dashboardpage.component.css'],
// })
// export class DashboardpageComponent {
//   isProduct: boolean = false;
//   products: Product[] = []; // Array to store the products
//   productDetail: any; // Variable to store the selected product detail
//   currentPage: number = 1;
//   pageSize: number = 6;

//   constructor(private http: HttpClient, private router: Router) {}

//   ngOnInit() {
//     // Fetch the initial list of products
//     this.fetchProducts();
//   }

//   fetchProducts() {
//     // Make an HTTP GET request to fetch the list of products
//     this.http.get<Product[]>('http://localhost:5000/products').subscribe(
//       (data) => {
//         this.products = data;
//       },
//       (error) => {
//         console.error('Error fetching products:', error);
//       }
//     );
//   }

//   getProductsForCurrentPage(): Product[] {
//     const startIndex = (this.currentPage - 1) * this.pageSize;
//     return this.products.slice(startIndex, startIndex + this.pageSize);
//   }

//   redirectToProductdetail(product: Product) {
//     this.isProduct = true;
//     this.productDetail = product;
//   }

//   back() {
//     this.isProduct = false;
//   }

//   searchProductByName(searchTerm: string) {
//     if (searchTerm.trim()) {
//       // Make an HTTP GET request to search products by name
//       this.http.get<Product[]>(`http://localhost:5000/product/${searchTerm}`).subscribe(
//         (data) => {
//           this.products = data;
//         },
//         (error) => {
//           console.error('Error searching products:', error);
//         }
//       );
//     } else {
//       // If search term is empty, fetch all products again
//       this.fetchProducts();
//     }
//   }
// }


// import { Component,OnInit } from '@angular/core';
// import { ProductService } from '../services/product.service';
// import { Router } from '@angular/router';
// @Component({
//   selector: 'app-dashboardpage',
//   templateUrl: './dashboardpage.component.html',
//   styleUrls: ['./dashboardpage.component.css']
// })

// export class DashboardComponent implements OnInit {
//   products: any[] = [];

//   // Set the number of products to display per page
//   pageSize = 10;

//   // Create a method to retrieve the products for the current page
//   getProductsForCurrentPage() {
//     // console.log("cp",this.currentPage);

//     const startIndex = (this.currentPage - 1) * this.pageSize;
//     // console.log("sI",startIndex);

//     const endIndex = startIndex + this.pageSize;
//     // console.log("ei",endIndex);
//     // console.log(this.products);

//     return this.products.slice(startIndex, endIndex);
//   }

//   // Assuming you have a property for the current page number
//   currentPage = 1;

//   constructor(private productService: ProductService,private router: Router) {}

//   ngOnInit() {
//     this.fetchProducts();
//   }

//   fetchProducts() {
//     this.productService.getProducts().subscribe(
//       (response) => {
//         this.products = response;
//         // console.log('Product data', this.products);
//       },
//       (error) => {
//         console.error('Error fetching products', error);
//       }
//     );
//   }


//   redirectToProductdetail(product: any) {
//     this.router.navigate(['/productdetail', product.id]);
//   }
// }


// redirectToCart(product: any) {
//   this.router.navigate(['/cart', product._id], { state: { product } });
// }
// export class DashboardComponent implements OnInit {
//   products: any[] = [];

//   constructor(private productService: ProductService) {}

//   ngOnInit() {
//     this.fetchProducts();
//   }

//   fetchProducts() {
//     this.productService.getProducts().subscribe(
//       (response) => {
//         this.products = response;
//         console.log('Product data', this.products);
//       },
//       (error) => {
//         console.error('Error fetching products', error);
//       }
//     );
//   }
// }



  // sortProducts(order: string) {
  //   // Update the sortField and sortOrder based on the selected sorting option
  //   this.sortField = 'price'; // Change this to the appropriate field you want to sort by (e.g., 'price')
  //   this.sortOrder = order === 'highToLow' ? 'desc' : 'asc';

  //   // Check if isSearch is true
  //   if (this.isSearch) {
  //     // Fetch products with the new sorting parameters from the ProductService API
  //     this.productService.getProducts(this.currentPage, this.searchTerm, this.sortField, this.sortOrder).subscribe(
  //       (response: any) => {
  //         this.products = response.products || [];
  //         this.currentPage = response.currentPage || 1;
  //         this.totalPages = response.totalPages || 0;
  //       },
  //       (error) => {
  //         console.error('Error fetching products', error);
  //       }
  //     );
  //   } else {
  //     // Fetch all products using the ProductService
  //     this.productService.getProducts(this.currentPage, this.searchTerm).subscribe(
  //       (response: any) => {
  //         this.products = response.products || [];
  //         this.currentPage = response.currentPage || 1;
  //         this.totalPages = response.totalPages || 0;
  //       },
  //       (error) => {
  //         console.error('Error fetching initial products', error);
  //       }
  //     );
  //   }
  // }
