import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import { PostComponent } from '../post/post.component';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { pictureSelector, selectedSportsSelector, selSportsSelector, userSelector } from '../store/user/user.selector';
import { postsSelector } from '../store/posts/posts.selector';
import { Router } from '@angular/router';

interface LinkIconsPath{
  link: string,
  icon: string,
  path: string
}

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    NgFor,
    ReactiveFormsModule,
    PostComponent,
    CommonModule
   ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  
  //usersSports : string[] = ['football', 'basketball', 'table tennis', 'voleyball', 'swiming', 'bodybuilding'];
  usersSport$: Observable<string[]> = of([]);
  usersSports : string[] = []
  linksIcons: LinkIconsPath[] = [{link: 'Home', icon: 'home', path: 'home'}, {link: 'Friends', icon: 'group', path: 'home/friends'}, {link:'Groups', icon: 'groups', path: 'home'}];
  // activeLink = this.linksIcons[0].link;
  @Input() activeLink: string = 'Home';


  selectedSportFormControl = new FormControl([],Validators.required);

  
  constructor(private snackBar: MatSnackBar, private store: Store<AppState>, private router: Router){
    // this.store.select(selectedSportsSelector).subscribe(userSports => console.log(userSports)) ovo se rekli da ne valja
  }
  ngOnInit(): void {
    this.usersSport$ = this.store.select(selectedSportsSelector);
  }

  searchSports(){
    if(this.selectedSportFormControl.valid){
      console.log(this.selectedSportFormControl.value);
    }
    else {
      this.selectedSportFormControl.markAsTouched();
      let snackBarRef = this.snackBar.open('Selection of at least 1 sport is needed', 'OK');
    }
  }

  changeLink(linkIconPath : LinkIconsPath){
    this.activeLink = linkIconPath.link
    console.log(linkIconPath.path)
    if(linkIconPath.path){
      this.router.navigate([linkIconPath.path])
    }
    this.router.navigate([linkIconPath.path])
  }
  

}
