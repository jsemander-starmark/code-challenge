import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private userInfo : Observable<any>;

  constructor(private api: ApiService) {
  }

  ngOnInit() {
    this.userInfo = this.api.getData('me');
    this.userInfo.subscribe(res => {
      console.log('Res', res);
    },
    error => console.error('Error', error))
  }

}
