import { Component, OnInit } from '@angular/core';
import {StocksService} from "../Services/stocks.service";
import {RowArgs} from "@progress/kendo-angular-grid";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-stocks-list',
  templateUrl: './stocks-list.component.html',
  styleUrls: ['./stocks-list.component.scss']
})
export class StocksListComponent implements OnInit {

  StocksList_gridData:any = [];
  StockDetails_gridData:any = [];
  StockName!: string;
  ActivateExportToJson:boolean=false;
  StockDetailsList: any = [];
  // Stocks_gridData: any;

  constructor(
    private StocksService:StocksService,
    private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this.ActivateExportToJson = false;
    this.refreshStockList();
  }


  PickClick(item: any){
    const ID = item.Id
    this.StocksService.getStockDetail(ID).subscribe(response=>{
      this.StocksList_gridData = response;
    });
    this.ActivateExportToJson = true;
  }

  ExportToJsonClick(){

    const data = this.StockDetails_gridData;
    const blob = new Blob([JSON.stringify(data)], {type: 'text/plain'});
    const tmpFile = new File([blob], 'stock_data.json');

// now you can pass this tmp file to a form with your pdf
    const form = new FormData();
    form.append('file', tmpFile);
  }

  refreshStockList(){
    this.ActivateExportToJson = false;
    this.StocksService.getStocksList().subscribe(response=>{
      this.StocksList_gridData = response;
    });
  }

  goToManage({index}: { index: any }) {
    let detail = this.StocksList_gridData[index];
    console.log(detail);

    const StockId = detail.id;
    console.log( "ID : " + StockId);
    this.StocksService.getStockDetail(StockId).subscribe(response=>{
      this.StockName = detail.stock;
      console.log(this.StockName);
      this.StockDetails_gridData = response;
      console.log(this.StockDetails_gridData);
    });

    // console.log(this.StockDetailsList);
    // this.StockDetails_gridData = this.StockDetailsList;
    // console.log(this.StockDetails_gridData);
    this.ActivateExportToJson = true;
  }


}
