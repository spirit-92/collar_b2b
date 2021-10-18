import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainLayoutComponent} from "./shared/components/main-layout/main-layout.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {ProductPageComponent} from "./product-page/product-page.component";
import {CatalogDegComponent} from "./catalog-deg/catalog-deg.component";
import {DesignProductComponent} from "./design-product/design-product.component";
import {UnderCatalogComponent} from "./under-catalog/under-catalog.component";


const routes: Routes = [
  {
    path: '', component: MainLayoutComponent, children: [
      {path: '', redirectTo: '/', pathMatch: 'full'},
      {path: '', component: HomePageComponent},
      {path: 'catalog', component: CatalogDegComponent},
      {path: 'catalog/design/:design', component: DesignProductComponent},
      {path: 'catalog/:catalog_name/:design', component: UnderCatalogComponent},
      {path: 'catalog/design/:design/product/:id', component: ProductPageComponent},

    ]
  },
  {path: 'account', loadChildren: () => import('./admin/admin.module').then(mod => mod.AdminModule)},
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    paramsInheritanceStrategy: 'always'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
