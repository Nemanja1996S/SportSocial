import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { UserComment } from '../../models/Comment';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ImageModule } from 'primeng/image';
import { AppState } from '../store/app.state';
import { Store } from '@ngrx/store';
import { loadComments } from '../store/comments/comments.actions';
import { Observable, of } from 'rxjs';
import { errorCommentsSelector, userCommentsSelector } from '../store/comments/comments.selector';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../models/User';
import { userIdSelector, userSelector } from '../store/users/users.selector';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'comment',
  standalone: true,
  imports: [MatCardModule,NgFor, NgIf, ReactiveFormsModule, ImageModule, CommonModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatIcon, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, RouterLink],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
  // MatButtonModule, MatIconModule,
  // CommonModule, ReactiveFormsModule, MatFormFieldModule,
  // MatInputModule, MatCheckboxModule
})
export class CommentComponent implements OnInit{
  // comments : Comment[]= [{'postId' : 1 , 'usersComments' : [{'userId' : 1, 'userFullName': 'Nemanja Savic', 'userPicSrc' : 'https://scontent.fbeg10-1.fna.fbcdn.net/v/t1.18169-1/969987_488172031277757_895038162_n.jpg?stp=c50.50.620.620a_dst-jpg_s160x160&_nc_cat=107&ccb=1-7&_nc_sid=312bcd&_nc_ohc=AYQcGVtt09QQ7kNvgEPWl6J&_nc_ht=scontent.fbeg10-1.fna&oh=00_AYAiqX-zih0ndWA239uG0Vv8Zzhvp00_L8KtYt1Lk1HZ3A&oe=67097EE0',
  //   'commentDate' : '12/2/2024', 'commentText' : 'neki komentar', 'commentPic' : }]},
  //   {'postId' : 2 , 'usersComments' : [{'userId' : 1, 'userFullName': 'Nemanja Savic', 'userPicSrc' : 'https://scontent.fbeg10-1.fna.fbcdn.net/v/t1.18169-1/969987_488172031277757_895038162_n.jpg?stp=c50.50.620.620a_dst-jpg_s160x160&_nc_cat=107&ccb=1-7&_nc_sid=312bcd&_nc_ohc=AYQcGVtt09QQ7kNvgEPWl6J&_nc_ht=scontent.fbeg10-1.fna&oh=00_AYAiqX-zih0ndWA239uG0Vv8Zzhvp00_L8KtYt1Lk1HZ3A&oe=67097EE0',
  //     'commentDate' : '12/2/2024', 'commentText' : 'neki komentar', 'commentPic' : }]
  //  }]
  // userComments : UserComment[] = [{'userId' : 0, 'userFullName': 'Nemanja Savic', 'userPicSrc' : 'https://scontent.fbeg10-1.fna.fbcdn.net/v/t1.18169-1/969987_488172031277757_895038162_n.jpg?stp=c50.50.620.620a_dst-jpg_s160x160&_nc_cat=107&ccb=1-7&_nc_sid=312bcd&_nc_ohc=AYQcGVtt09QQ7kNvgEPWl6J&_nc_ht=scontent.fbeg10-1.fna&oh=00_AYAiqX-zih0ndWA239uG0Vv8Zzhvp00_L8KtYt1Lk1HZ3A&oe=67097EE0',
  //   'commentDate' : '12/2/2024', 'commentText' : 'neki komentarkdjkldjakld jdaskljd','commentPic' : 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8fA%3D%3D' },
  //   {'userId' : 1, 'userFullName': 'Marko Stoiljkovic', 'userPicSrc' : 'https://scontent.fbeg10-1.fna.fbcdn.net/v/t39.30808-1/376655995_6714521235279645_6116058130008955357_n.jpg?stp=dst-jpg_s200x200&_nc_cat=100&ccb=1-7&_nc_sid=0ecb9b&_nc_ohc=2EntqmsTtnkQ7kNvgF-JwGW&_nc_ht=scontent.fbeg10-1.fna&oh=00_AYB5v-5jGQckdABA0X6puJuE_KRSCNpaayafKn1ifgYeOQ&oe=66E7B680',
  //     'commentDate' : '15/3/2024', 'commentText' : 'neki komentarkdjkldjakld jdaskljd asdhashdkh sahdjha sdh ak hasjdj hasdha asd ', 'commentPic': 'https://images.unsplash.com/photo-1511204338744-5d4e9b3ffee0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTJ8fHxlbnwwfHx8fHw%3D'},
  //     {'userId' : 2, 'userFullName': 'Bogdan Randjelovic', 'userPicSrc' : 'https://scontent.fbeg10-1.fna.fbcdn.net/v/t1.6435-1/74662494_2299750623463166_1663064976857759744_n.jpg?stp=dst-jpg_s200x200&_nc_cat=103&ccb=1-7&_nc_sid=e4545e&_nc_ohc=CF_XUumXkz0Q7kNvgE_yN5G&_nc_ht=scontent.fbeg10-1.fna&_nc_gid=A1Nr9ArtthRpv0U4fqLiHP_&oh=00_AYB_RC2EWbHSIGZhoxajxZ8XQsl7vNVYbW6B9WQbX3C1tg&oe=67095FC2',
  //       'commentDate' : '1/6/2024', 'commentText' : 'neki komentarkdjkldjakld jdaskljd sadnjkaskdaks  jsahdjkhw hwjhkah ah awjhk jhawd', 'commentPic': 'https://media.istockphoto.com/id/2148242778/photo/the-champion-cup-stands-on-a-green-field-at-a-football-stadium-with-the-light-of-spotlights.webp?a=1&b=1&s=612x612&w=0&k=20&c=Q2m3C9MSfyudDe2fvubvfTRQAg1jEWsM5oWd8QBGfKk='}]

  usersComment$ : Observable<UserComment[]> = of([])
  commentTextFormControl = new FormControl('', Validators.required);
  selectedImageFile = null;
  userCommentImg : string = '';
  currentUser$: Observable<User> = of();
  currentPostId: number = -1;
  currentUserId$: Observable<number> = of();
  error$: Observable<string | null> = of();
  readonly dialog = inject(MatDialog);

  constructor(private store: Store<AppState>, private route: ActivatedRoute){
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('postId');
      if(id){
        this.currentPostId = parseInt(id)
      }
    })
    this.store.dispatch(loadComments({postId: this.currentPostId})) //u json api se ne trazi po postId, nego id, al sam su id i post jednaki
    this.error$ = this.store.select(errorCommentsSelector);
    this.usersComment$ = this.store.select(userCommentsSelector);
    this.currentUser$ = this.store.select(userSelector);
    this.currentUserId$ = this.store.select(userIdSelector);
    // this.usersComment$.subscribe((comments) => console.log(comments));
  }

  onFileSelected( event: any) : void{
    this.selectedImageFile = event.target.files[0];
    this.userCommentImg = URL.createObjectURL(event.target.files[0]);
  }

  onComment(){  //post comment
    console.log(this.currentPostId)
    console.log(this.commentTextFormControl.value)
    console.log(this.userCommentImg)
    this.currentUser$.subscribe(currentUser => console.log(currentUser))
  }
  }

