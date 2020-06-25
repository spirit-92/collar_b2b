import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {NotFoundPageComponent} from "./pages/not-found-page/not-found-page.component";


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {
        path: '', redirectTo: '/', pathMatch: 'full'
      },
      {
        path: '', component: MainPageComponent
      },
      {
        path: 'statistic', loadChildren: () => import('./modules/statistic.module').then(mod => mod.StatisticModule)
      }
    ]
  },
  {
    path: '**', component: NotFoundPageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
