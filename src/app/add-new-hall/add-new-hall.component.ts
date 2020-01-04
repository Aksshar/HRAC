import { Component, OnInit } from '@angular/core';
import { FormControl ,FormGroup,Validators} from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { finalize } from "rxjs/operators";
import { ImageService } from '../image.service';



@Component({
  selector: 'app-add-new-hall',
  templateUrl: './add-new-hall.component.html',
  styleUrls: ['./add-new-hall.component.css']
})
export class AddNewHallComponent implements OnInit {
  imgSrc: string ='/assets/img/avatar.png';
  selectedimage:any =null;
  isSubmitted:boolean =false;

  AddHallform =new FormGroup({
    name : new FormControl('',Validators.required), 
    seats : new FormControl('',Validators.required),
    type : new FormControl('',Validators.required),
    location : new FormControl('',Validators.required),
    imageurl : new FormControl('',Validators.required),
  })
  constructor(private storage: AngularFireStorage  , private service:ImageService) { }

  ngOnInit() {
  }

  ShowPreview(event:any){
    if(event.target.files && event.target.files[0]){
      const reader =new FileReader();
      reader.onload =(e:any)=> this.imgSrc =e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedimage-event.target.files[0] ; 
     }
     else{
       this.imgSrc ='/assets/img/avatar.png';
       this.selectedimage=null;
     }
  }

  onSubmit(formValue){
    // error.... reset when submit
    
    this.isSubmitted= true;
    if(this.AddHallform.valid){
      var filePath = "${formvalue.type}/${this.selectedimage.name}_${new Date().getTime()}";
      const fileRef =this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedimage).snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
            console.log(url)
            formValue['imageurl']=url;
             this.service.insertImageDetails(formValue);
             
            //this.resetForm();
          })
        })
      )

    }
  }

  get formControls()
{
  return this.AddHallform['controls'];
}

resetForm(){
  this.AddHallform.reset();
  this.AddHallform.setValue({
    name:'',
    seats:'',
    type:'',
    imageurl:'',
    location:''

  });
}
}
