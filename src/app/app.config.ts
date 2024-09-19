import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userReducer } from './store/users/users.reducer';
import { provideEffects } from '@ngrx/effects';
import { UsersEffect } from './store/users/users.effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { postsReducer } from './store/posts/posts.reducer';
import { PostsEffect } from './store/posts/posts.effects';
import { commentsReducer } from './store/comments/comments.reducer';
import { CommentsEffect } from './store/comments/comments.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      userState: userReducer,
      postsState: postsReducer,
      commentsState: commentsReducer
    }),
    provideEffects([UsersEffect, PostsEffect, CommentsEffect]),
    provideStoreDevtools({
      maxAge: 25, // Retains last 25 states
      logOnly: !isDevMode(), // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
      trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
      traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
      connectInZone: true // If set to true, the connection is established within the Angular zone
    }), provideAnimationsAsync()]

    // bootstrapApplication(AppComponent, {
    //   providers: [
    //     // alternative to `StoreModule.forRoot`
    //     provideStore({ router: routerReducer, auth: AuthReducer }),
    //     // alternative to `StoreRouterConnectingModule.forRoot`
    //     provideRouterStore(),
    //     // alternative to `StoreDevtoolsModule.instrument`
    //     provideStoreDevtools(),
    //     // alternative to `EffectsModule.forRoot`
    //     provideEffects([RouterEffects, AuthEffects]),
    //   ),
    // });
};
