import { Component, OnInit } from '@angular/core';
import {UserStatisticService} from "../../../services/user-statistic.service";

@Component({
  selector: 'app-statistics-layout',
  templateUrl: './statistics-layout.component.html',
  styleUrls: ['./statistics-layout.component.scss']
})
export class StatisticsLayoutComponent implements OnInit {

  constructor(
    private infoUser: UserStatisticService
  ) { }

  ngOnInit(): void {
   this.infoUser.getUserInfo().subscribe(res =>{
     console.log(res)
   })
  }

}
