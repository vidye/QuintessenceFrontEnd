import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StocksListComponent} from "./stocks-list/stocks-list.component";

const routes: Routes = [
  {path:"", component:StocksListComponent},
  {path:"stocksList", component:StocksListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
