import { addDoc, collection, doc, getDocs, or, orderBy, query, updateDoc, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { notifications } from "@mantine/notifications";

export async function addInfoToFirestore(form: any) {
    try {
      const docRef = await addDoc(collection(db, "patients"), {
        ...form.values,
      });

     notifications.show({
      title: "Success",
      message: `Successfuly saved record for ${form.values.first}`,
      color:"green",
     })
     
    } catch (error) {
      notifications.show({
        title: "Failure",
        message: `Could not save record for ${form.values.first}`,
        color:"red",
       })
    }
  }

  export async function getAllPatients(){
    const patientCollection = collection(db,"patients");
    const querySnapshot = await getDocs(query(patientCollection));
    const patients:any[] = []
    querySnapshot.forEach((doc)=>{
        const patientData = doc.data();
        patients.push({id:doc.id, ...patientData})
    })
    return patients
  }

  export async function updatePatientRecords(form:any, id:string){
    try {
        const patientRef= doc(db,"patients",id)
        await updateDoc(patientRef,form.values)
          notifications.show({
          title: "Success",
          message: `Successfuly saved record for ${form.values.first}`,
          color:"green",
         })
    } catch (error) {
      notifications.show({
        title: "Failure",
        message: `Could not save record for ${form.values.first}`,
        color:"red",
       })
    }
  }

  export async function getPatientsCompletedDoctorVerification(){
    const q = query(collection(db, "patients"), where("status", "==", true));
    const querySnapshot = await getDocs(query(q));
    const patients:any[] = []
    querySnapshot.forEach((doc)=>{
        const patientData = doc.data();
        patients.push({id:doc.id, ...patientData})
    })
    return patients
  }

  export async function getPatientsNeedingDoctorVerification(){
    const q = query(collection(db, "patients"), where("status", "==", false));
    const querySnapshot = await getDocs(query(q));
    const patients:any[] = []
    querySnapshot.forEach((doc)=>{
        const patientData = doc.data();
        patients.push({id:doc.id, ...patientData})
    })
    return patients
  }

  export async function getSearchPatient(value:string){
    const q = query(collection(db, "patients"), or(where("first","==",value ),where("last","==",value ),where("pid","==",value )));
    const querySnapshot = await getDocs(query(q));
    const patients:any[] = []
    querySnapshot.forEach((doc)=>{
        const patientData = doc.data();
        patients.push({id:doc.id, ...patientData})
    })
    return patients
  }