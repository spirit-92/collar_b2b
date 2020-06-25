import {Component, OnInit} from '@angular/core';
import {UserStatisticService} from "../../../services/user-statistic.service";
import {UserStatistic} from "../../../interfaces/userStatistic";
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss']
})
export class StatisticsPageComponent implements OnInit {
  userStatistic: UserStatistic[]
  countPage =[]
  showPage
  count = 1
  paginateActiveBtn = 1
  disablePrev: boolean = false
  disableNext: boolean = false

  constructor(
    private  userStatisticService: UserStatisticService
  ) {
  }

  ngOnInit(): void {
    this.userStatisticService.getUserStatistic(1).subscribe(userStatistic => {
      this.userStatistic = userStatistic.users;
      this.countPage = new Array(userStatistic.countUser);
      this.showPage = new Array(userStatistic.countUser).slice(0, 5)
    })
    if (this.count === 1) {
      this.disablePrev = true
    }
    if (this.count === this.countPage.length) {
      this.disableNext = true
    }
  }

  showNext() {
    this.count += 1
    this.disablePrev = this.count === 1;
    if (this.count === this.countPage.length){
      this.disableNext = true
    }
  }

  showPrev() {
    this.count -= 1
    this.disablePrev = this.count == 1;
  }
  activeBtn(index){
    this.paginateActiveBtn = index;
    this.userStatisticService.getUserStatistic(index).subscribe(userStatistic =>{
      this.userStatistic  = userStatistic.users
    })
  }

}
