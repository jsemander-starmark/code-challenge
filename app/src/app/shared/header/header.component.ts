import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Router } from '@angular/router';
import { JWTOKEN } from 'src/app/config/config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(private readonly api: ApiService,
              private router: Router) { }

  ngOnInit() {}
  /*
  * Signing Out
  */
  signOut(){ 
    localStorage.removeItem(JWTOKEN);
    this.router.navigateByUrl('/sign-in');
  }

}
