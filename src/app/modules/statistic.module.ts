import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {StatisticsLayoutComponent} from "../shared/components/statistics-layout/statistics-layout.component";
import {StatisticsPageComponent} from "../pages/statistics/statistics-page/statistics-page.component";
import {StatisticUserPageComponent} from "../pages/statistics/statistic-user-page/statistic-user-page.component";


@NgModule({
  declarations: [
    StatisticsLayoutComponent,
    StatisticsPageComponent,
    StatisticUserPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '', component: StatisticsLayoutComponent, children: [
          {
            path: '', component: StatisticsPageComponent
          },
          {
            path: 'user/:id', component: StatisticUserPageComponent
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class StatisticModule {

}
