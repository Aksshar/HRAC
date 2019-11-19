import { Component, OnInit } from '@angular/core';
import { finalize } from "rxjs/operators";
import { AngularFireStorage, AngularFireStorageModule } from "@angular/fire/storage";
import { FormControl, FormGroup, FormControlName, Validators } from "@angular/forms";
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-newform',
  templateUrl: './newform.component.html',
  styleUrls: ['./newform.component.css']
})
export class NewformComponent implements OnInit {
  imgSrc : string ='/assets/img/a.jpg';
  selectedImage: any =null ;
  isSubmitted:   boolean=false;

  hallForm = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl(''),
    seats: new FormControl(''),
    imageUrl: new FormControl('',Validators.required)
  })
  constructor(private storage:AngularFireStorage) { }
  showSuccessMessage:boolean;
  ngOnInit() {
    this.resetForm();
  }
  showPreview(event:any){
    if(event.target.files && event.target.files[0]){
      const reader= new FileReader();
      reader.onload= (e:any)=>this.imgSrc =e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage=event.target.files[0];     }
      else{
        this.imgSrc='/assets/img/a.jpg';
        this.selectedImage =null;  
      }
 }
 onSubmit(formValue){
  this.isSubmitted=true;
  if(this.hallForm.valid){
    var filePath ='${formValue.type}/${this.selectedImage.name}_${new Date().getTime()}';
  const fileRef= this.storage.ref(filePath);
  
  this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
      finalize(()=>{
        fileRef.getDownloadURL().subscribe((url)=>{
          this.resetForm();
        })
      
      })
    ).subscribe(); 
    this.showSuccessMessage =true;
    
}
}

resetForm(){
  this.hallForm.reset();
  this.hallForm.setValue(
  {
    name:'',
    type:'Lecture Hall ',
    category:''
  }
  );
  
this.imgSrc='/assets/img/a.jpg';
this.isSubmitted=false;
this.selectedImage=null;

}
get formControls(){
  return this.hallForm['controls'] ;
}
}
