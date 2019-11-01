import { Component, ViewChild, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import {
  GridDataResult,
  GridComponent,
  PageChangeEvent
} from "@progress/kendo-angular-grid";

import { ProductsService } from "./northwind.service";

@Component({
  selector: "category-details",
  providers: [ProductsService],
  template: `
    <kendo-grid
      [data]="dataSource"
      [loading]="view.loading"
      [pageSize]="10"
      [skip]="skip"
      [pageable]="true"
      [scrollable]="'none'"
      (pageChange)="pageChange($event)"
      [navigable]="true"
      [resizable]="true"
      kendoGridFocusable
    >
      <kendo-grid-column
        [field]="column.field"
        [title]="column.title"
        *ngFor="let column of columns"
      ></kendo-grid-column>
    </kendo-grid>
  `
})
export class CategoryDetailComponent implements OnInit {
  /**
   * The category for which details are displayed
   */
  @Input() public category: any;
  public dataSource: any[] = [];
  public view: Observable<GridDataResult>;
  public skip = 0;
  public columns: any[];
  public columnConfig: any = {};

  constructor(private service: ProductsService) {
    this.columnConfig = {
      1: [
        { field: "ProductID", title: "Product ID" },
        { field: "ProductName", title: "Product Name" },
        { field: "QuantityPerUnit", title: "Quantity / Unit" },
        { field: "Discount", title: "Discount" }
      ],
      2: [
        { field: "ProductID", title: "Product ID" },
        { field: "ProductName", title: "Product Name" },
        { field: "Discount", title: "Discount" }
      ],
      3: [
        { field: "Discount", title: "Discount" },
        { field: "QuantityPerUnit", title: "Quantity / Unit" }
      ],
      0: [{ field: "QuantityPerUnit", title: "Quantity / Unit" }]
    };
  }

  public ngOnInit(): void {
    this.view = this.service;
    this.columns = this.columnConfig[this.category.CategoryID % 4 ];
    this.dataSource = [
      {
        ProductID: 1,
        ProductName: "product 1",
        QuantityPerUnit: "100",
        Discount: 10
      },
      {
        ProductID: 2,
        ProductName: "product 2",
        QuantityPerUnit: "200",
        Discount: 20
      },
      {
        ProductID: 3,
        ProductName: "product 3",
        QuantityPerUnit: "300",
        Discount: 30
      },
      {
        ProductID: 4,
        ProductName: "product 4",
        QuantityPerUnit: "400",
        Discount: 40
      },
      {
        ProductID: 5,
        ProductName: "product 5",
        QuantityPerUnit: "500",
        Discount: 10
      },
      {
        ProductID: 6,
        ProductName: "product 6",
        QuantityPerUnit: "600",
        Discount: 15
      },
      {
        ProductID: 7,
        ProductName: "product 7",
        QuantityPerUnit: "700",
        Discount: 25
      },
      {
        ProductID: 8,
        ProductName: "product 8",
        QuantityPerUnit: "800",
        Discount: 20
      },
      {
        ProductID: 9,
        ProductName: "product 9",
        QuantityPerUnit: "900",
        Discount: 10
      },
      {
        ProductID: 10,
        ProductName: "product 10",
        QuantityPerUnit: "1000",
        Discount: 25
      }
    ];

    /*load products for the given category*/
    this.service.queryForCategory(this.category, { skip: this.skip, take: 5 });
  }

  public pageChange({ skip, take }: PageChangeEvent): void {
    this.skip = skip;
    this.service.queryForCategory(this.category, { skip, take });
  }
}
