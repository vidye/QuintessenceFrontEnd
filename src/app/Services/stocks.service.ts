import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StocksService {
  readonly APIUrl="https://localhost:7071/api"

  constructor(private http:HttpClient) { }

  getStocksList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/Stocks');
  }
  getStockDetail(val:any){
    return this.http.get(this.APIUrl+'/Stocks/StockDetails/'+val)
  }

}
