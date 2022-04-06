import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {}

  getUserName() {
    return this.authenticationService.getConnectedUser()?.displayName;
  }

  async logout() {
    await this.authenticationService.logout();
    this.router.navigate(['/auth']);
  }

  isSignedIn(): boolean {
    return this.authenticationService.isSignedIn();
  }

  navigateBack() {
    this.location.back();
  }
  canNavigateBack() {
    return this.router.url !== '/playlist' && this.router.url !== '/auth';
  }
}
