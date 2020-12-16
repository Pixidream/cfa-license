import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/authentication.service'

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  constructor(private auth: AuthService) { }
  userData: any

  ngOnInit(): void {
    this.auth.user$.subscribe(data => {
      this.userData = data
    })
  }

  isAuth(): boolean {
    return this.userData?.uid ? true : false
  }

  handleLogout(): void {
    this.userData = null;
    this.isAuth()
    this.auth.signOut()
  }
}
