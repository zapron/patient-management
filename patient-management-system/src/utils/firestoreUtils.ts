import { addDoc, collection, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { notifications } from "@mantine/notifications";

export async function addInfoToFirestore(form: any) {
    try {
      const docRef = await addDoc(collection(db, "patients"), {
        ...form.values,
      });
      // return alert(
      //   ` PATIENT RECORD SAVED SUCCESSFULLY with id ${JSON.stringify(docRef)}`
      // );
     notifications.show({
      title: "Success",
      message: `Successfuly saved record for ${form.values.name}`,
      color:"green",
     })
     
    } catch (error) {
      notifications.show({
        title: "Failure",
        message: `Could not save record for ${form.values.name}`,
        color:"red",
       })
    }
  }

  export async function fetchPatientInfo(){
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
          message: `Successfuly saved record for ${form.values.name}`,
          color:"green",
         })
    } catch (error) {
      notifications.show({
        title: "Failure",
        message: `Could not save record for ${form.values.name}`,
        color:"red",
       })
    }
  }