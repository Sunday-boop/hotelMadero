import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
}) 
export class FirestoreService {

  constructor(public database: AngularFirestore) { }

  creatDoc(data: any, path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).set(data)
  }

  getDoc<tipo>(path: string, id: string){
    const collection = this.database.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string){
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);
  }

  getId(){
    return this.database.createId()
  }

  getCollection<tipo>(path: string){
    const collection = this.database.collection<tipo>(path);
    return collection.valueChanges();
  }


  
  getCollectionConsulta<tipo>(path: string, consulta: string, value){
    const collection: AngularFirestoreCollection<tipo> = this.database.collection<tipo>(path, ref =>
       ref.where(consulta, '==', value)
       
       
       );
       
    return collection.valueChanges();
  }

  getCollectionOrdenada<tipo>(path: string, order:string, consulta: string, value){
    const collection = this.database.collection<tipo>(path, ref =>
      ref.where(consulta, '>=', value));
    return collection.valueChanges();
  }
}
