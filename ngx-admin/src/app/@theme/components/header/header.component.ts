import { Component, OnDestroy, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { UserService } from '../../../services/users/user.service';
import { SecurityService } from '../../../services/security/security.service';
import { User } from '../../../models/users/user.model';
import { LoginComponent } from '../../../pages/security/login/login.component';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy,OnChanges  {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: User;
  subscription: Subscription;

  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';

  userMenu = [
    { title: 'Log in', icon: 'fa fa-user', link: "pages/security/login" },
    { title: 'Log out', icon: 'fa fa-sign-out', link: "pages/security/logout" }];

    loginMenu= [
      { title: 'Log in', icon: 'fa fa-user', link: "pages/security/login" }];
  
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserService,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              private SecuritySvc: SecurityService, 
              private router: Router) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
    if (this.SecuritySvc.UserSesionActiva.id != undefined) {
      this.userService.show(this.SecuritySvc.UserSesionActiva.id)
      .subscribe((user: User) => {this.user = user[0];});
    }

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges){
    console.log(changes);
  }   

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}


