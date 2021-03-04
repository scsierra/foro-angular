import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserGuard } from './services/user.guard';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TopicDetailComponent } from './components/topic-detail/topic-detail.component';
import { TopicsComponent } from './components/topics/topics.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SearchComponent } from './components/search/search.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'logout/:id', component: LoginComponent },
    { path: 'user/register', component: RegisterComponent },
    { path: 'users', component: UsersComponent },
    { path: 'profile/:id', component: ProfileComponent },
    { path: 'user/edit', component: UserEditComponent, canActivate: [UserGuard] },
    { path: 'topics', component: TopicsComponent },
    { path: 'topics/:page', component: TopicsComponent },
    { path: 'topic/:id', component: TopicDetailComponent },
    { path: 'search/:text', component: SearchComponent },
    { path: '**', component: HomeComponent }

];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(appRoutes);