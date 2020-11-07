import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {HttpClientModule} from '@angular/common/http';
import {Apollo, ApolloModule} from 'apollo-angular';
import {HttpLink, HttpLinkModule} from 'apollo-angular-link-http';
import {InMemoryCache, NormalizedCacheObject} from 'apollo-cache-inmemory';


import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './theme/shared/shared.module';

import {AppComponent} from './app.component';
import {AdminComponent} from './theme/layout/admin/admin.component';
import {AuthComponent} from './theme/layout/auth/auth.component';
import {NavigationComponent} from './theme/layout/admin/navigation/navigation.component';
import {NavContentComponent} from './theme/layout/admin/navigation/nav-content/nav-content.component';
import {NavGroupComponent} from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import {NavCollapseComponent} from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import {NavItemComponent} from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import {NavBarComponent} from './theme/layout/admin/nav-bar/nav-bar.component';
import {NavRightComponent} from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import {ConfigurationComponent} from './theme/layout/admin/configuration/configuration.component';
import {ToasterModule, ToasterService} from 'angular2-toaster';

import {ToggleFullScreenDirective} from './theme/shared/full-screen/toggle-full-screen';
/* Menu Items */
import {NavigationItem} from './theme/layout/admin/navigation/navigation';
import {NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavRightComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective,
  ],
  imports: [
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    NgxMaterialTimepickerModule,
    ToasterModule
  ],
  providers: [NavigationItem , ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(apollo: Apollo, httpLink: HttpLink) {
    const defaultOption: NormalizedCacheObject = {
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'all',
      },
    }
    apollo.create({
      link: httpLink.create({uri: 'http://139.59.144.83:8089/'}),
      cache: new InMemoryCache(),
      defaultOptions : defaultOption

    });
  }
}
