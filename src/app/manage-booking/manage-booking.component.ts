import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from 'angularfire2/firestore';
import { NewBookingService } from '../new-booking.service';
import { Booking } from '../booking.model';
import { map, take, debounceTime} from 'rxjs/Operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit{
  list:Booking[];
  constructor(private service:NewBookingService,private toastr: ToastrService, private afs: AngularFirestore){}

  ngOnInit() {
   this.service.getBooking().subscribe(res=>{
     this.list= res.map(item =>{
       return{
         id: item.payload.doc.id,
         //...item.payload.doc.data()
        } as Booking
     })
   });
    
  }

onDelete(id:string){
  if(confirm("Are you sure to delete this?")){
    this.afs.doc('booking/'+ id).delete();
    this.toastr.warning("Delete Successful")
  }
}

}
