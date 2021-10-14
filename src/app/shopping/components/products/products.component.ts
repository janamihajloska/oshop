import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { Product } from 'shared/models/product';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  products : Product[] = [];
  filteredProducts : Product[] = [];
  
  category: string;
  cart$ : Observable<ShoppingCart>;

  constructor(private productService : ProductService,
              private route: ActivatedRoute,
              private shoppingCartService : ShoppingCartService
    ) { 
      


    

   

  }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();

    
  }
  private populateProducts(){
    this.productService.getAll().subscribe(products =>{
      this.products=products;
      this.route.queryParamMap.subscribe(params =>{

        this.category=params.get("category");
        this.applyFilter();
  
        
  
      });

    });

  }

  private applyFilter(){
          this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) :
          this.products;
  }
 
}
