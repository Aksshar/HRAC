import { Component, OnInit } from '@angular/core';
import { ImageService } from '../image.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-halls',
  templateUrl: './halls.component.html',
  styleUrls: ['./halls.component.css']
})
export class HallsComponent implements OnInit {
  imageList:any[];
  rowIndexArray: any[];

  constructor( private service:ImageService) { }

  ngOnInit() {
     this.service.imageDetailList.snapshotChanges().subscribe(
       list=>{
         this.imageList = list.map(item=> {return item.payload.val();});
         this.rowIndexArray= Array.from(Array(Math.ceil(this.imageList.length/3)).keys());
       }
     );
  }

}
