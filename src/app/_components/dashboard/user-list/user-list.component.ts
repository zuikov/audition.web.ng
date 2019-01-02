import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../../_services';
import {UserIntarface} from '../../../_models/User.model';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  public users: Array<UserIntarface> = [];
  constructor(
    private dashboardService: DashboardService
  ) {
  }

  ngOnInit() {
    this.dashboardService.getAllUsers()
      .subscribe((responce: any) => {
        this.users = responce.Userlist;
      });
  }
  public getIncomeSign(userList: UserIntarface) {
    return userList.username === 'Withdrawal' ? '-' : '+';
  }
}
