import {Component, OnInit} from '@angular/core';
import {UserStatisticService} from "../../../services/user-statistic.service";
import {UserStatistic} from "../../../interfaces/userStatistic";
import {animate, style, transition, trigger} from "@angular/animations";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-statistics-page',
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
  animations: [
    trigger('table', [
      transition('void => *', [
        style({opacity: 0}),
        animate('850ms ease-out')
      ])
    ])
  ]
})
export class StatisticsPageComponent implements OnInit {
  userStatistic: UserStatistic[]
  countPage = []
  showPage
  count = 1
  paginateActiveBtn = 1
  disablePrev: boolean = false
  disableNext: boolean = false
  showCount = 5

  constructor(
    private  userStatisticService: UserStatisticService,
    private spinner: NgxSpinnerService
  ) {
  }

  ngOnInit(): void {
    this.userStatisticService.getUsersStatistic(1).subscribe(userStatistic => {
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
    this.showCount += 1
    this.disablePrev = this.count === 1;

    if (this.showCount=== this.countPage.length) {
      this.disableNext = true
    }
  }

  showPrev() {
    this.count -= 1
    this.showCount -= 1
    if(this.showCount == 5){
      this.disablePrev = true;
      this.disableNext = false
    }
  }

  activeBtn(index) {
    this.spinner.show();
    this.userStatistic = null;
    this.paginateActiveBtn = index;
    this.userStatisticService.getUsersStatistic(index).subscribe(userStatistic => {
      this.userStatistic = userStatistic.users
      this.spinner.hide();
    })

  }

}
