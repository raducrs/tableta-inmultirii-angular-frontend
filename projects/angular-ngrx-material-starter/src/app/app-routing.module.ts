import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // {
  //   path: 'about',
  //   loadChildren: () =>
  //     import('./features/about/about.module').then((m) => m.AboutModule)
  // },
  {
    path: 'home',
    loadChildren: () =>
      import('./features/home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'user-forms',
    loadChildren: () =>
      import('./features/signup/signup.module').then((m) => m.SignupModule)
  },
  {
    path: 'duser',
    loadChildren: () =>
      import('./features/duser/account.module').then((m) => m.AccountModule)
  },
  {
    path: 'puser',
    loadChildren: () =>
      import('./features/puser/puser.module').then((m) => m.PuserModule)
  },
  {
    path: 'confirmation',
    loadChildren: () =>
      import('./features/confirmation/confirmation.module').then((m) => m.ConfirmationModule)
  },
  // {
  //   path: 'feature-list',
  //   loadChildren: () =>
  //     import('./features/feature-list/feature-list.module').then(
  //       (m) => m.FeatureListModule
  //     )
  // },
  {
    path: 'donate',
    loadChildren: () =>
      import('./features/donate/donate.module').then(
        (m) => m.DonateModule
      )
  },
  {
    path: 'share',
    loadChildren: () =>
      import('./features/blackboard/blackboard.module').then((m) => m.BlackboardModule)
  },
  // {
  //   path: 'settings',
  //   loadChildren: () =>
  //     import('./features/settings/settings.module').then(
  //       (m) => m.SettingsModule
  //     )
  // },
  // {
  //   path: 'examples',
  //   loadChildren: () =>
  //     import('./features/examples/examples.module').then(
  //       (m) => m.ExamplesModule
  //     )
  // },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  // useHash supports github.io demo page, remove in your app
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      scrollPositionRestoration: 'enabled',
      preloadingStrategy: PreloadAllModules,
      enableTracing: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
