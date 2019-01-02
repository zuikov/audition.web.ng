import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HomeComponent } from './_components/home';
import { AuthGuardService as AuthGuard } from './_services/auth-guard.service';

import { PageNotFoundComponent } from './_components/page-not-found';

import { LandingComponent } from './_components/landing/landing.component';
import { SettingsComponent } from './_components/settings/settings.component';
import {DashboardComponent} from './_components/dashboard';
import {AccountBlockedComponent} from './_components/emails/account-blocked/account-blocked.component';
// import { VideoLibrary } from './_components/video-library/video-library.component';


const appRoutes: Routes = [
    // { path: '', component: HomeComponent},
    // { path: '**', component: PageNotFoundComponent },
    { path: '', component: LandingComponent },
    { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]  },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
    { path: 'account-blocked', component: AccountBlockedComponent },
    // { path: 'video-library', component: VideoLibrary, canActivate: [AuthGuard] },
    // otherwise redirect to home
    { path: '', redirectTo: '', pathMatch: 'full' }
    // { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(appRoutes);
