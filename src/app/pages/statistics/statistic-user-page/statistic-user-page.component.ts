import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserStatisticService} from "../../../services/user-statistic.service";
import {ActivatedRoute} from "@angular/router";
import {UserStatistic} from "../../../interfaces/userStatistic";
import {Chart} from 'chart.js'

@Component({
  selector: 'app-statistic-user-page',
  templateUrl: './statistic-user-page.component.html',
  styleUrls: ['./statistic-user-page.component.scss']
})
export class StatisticUserPageComponent implements OnInit, AfterViewInit {
  userStatistic: UserStatistic;
  userId;
  chart = [];
  @ViewChild('myChart') child: ElementRef;
  @ViewChild('myViews') views: ElementRef;
  constructor(
    private statisticUser: UserStatisticService,
    private activateRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.userId = this.activateRoute.snapshot.params['id']
  }

  renderChart(statistic) {
  console.log(statistic)
    this.chart = new Chart(this.child.nativeElement, {
      type: 'line',

      data: {
        labels: statistic.month,
        datasets: [{
          label: 'clicks',
          data: statistic.totalClicks,
          backgroundColor: 'rgba(0,0,0,0)',
          pointHoverBorderWidth:8,
          pointRadius:[4,0,0,0,0,4]
        }],
      },

      options: {
        legend: {
          display: false
        },
        scales: {

          yAxes: [{
            stacked: true,
            gridLines: {
              drawBorder:false
            },
            ticks: {
              suggestedMin: 0,
              fontColor: '#CCCCCC',
              fontSize:16,
              fontFamily:'Montserrat',
              lineHeight:1.4,
              suggestedMax: 1000,
              max: 1000,
              padding:5,
              min: 0,
              stepSize: 200
            },

          }],
          xAxes:[{
            gridLines:{
              display: false
            },
            ticks: {
              fontColor: '#CCCCCC',
              fontSize:16,
              fontFamily:'Montserrat',
              lineHeight:1.4,
              padding:12,
            },
          }]
        },
        elements:{
          line:{
            borderColor:'#3A80BA',
            borderWidth:4,

          },
          point:{
            backgroundColor:'#3A80BA',
            borderWidth:8,
            borderColor:'#3A80BA',
            hitRadius:8
          }
        }
      }
    })
    this.chart = new Chart(this.views.nativeElement, {
      type: 'line',
      data: {
        labels: statistic.month,
        datasets: [{
          data: statistic.totalViews,
          backgroundColor: 'rgba(0,0,0,0)',
          pointHoverBorderWidth:8,
          pointRadius:[4,0,0,0,0,4]
        }],
      },

      options: {
        legend: {
          display: false,

        },
        scales: {

          yAxes: [{
            stacked: true,
            gridLines: {
              drawBorder:false
            },
            ticks: {
              suggestedMin: 0,
              fontColor: '#CCCCCC',
              fontSize:16,
              fontFamily:'Montserrat',
              lineHeight:1.4,
              suggestedMax: 1000,
              max: 1000,
              padding:5,
              min: 0,
              stepSize: 200
            },

          }],
          xAxes:[{
            gridLines:{
              display: false
            },
            ticks: {
              fontColor: '#CCCCCC',
              fontSize:16,
              fontFamily:'Montserrat',
              lineHeight:1.4,
              padding:12,
            },
          }]
        },
        elements:{
          line:{
            borderColor:'#3A80BA',
            borderWidth:4,

          },
          point:{
            backgroundColor:'#3A80BA',
            borderWidth:8,
            borderColor:'#3A80BA',
            hitRadius:8
          }
        }
      }
    })

  }

  ngAfterViewInit() {
    this.statisticUser.getUserStatistic(this.userId).subscribe((user) => {
      this.userStatistic = user.user;
      this.renderChart(user.statistic)


    })

  }
}
