export type PatientDataAPI = {
id:string;
    pid: string;
    visit: number;
    first: string;
    last: string;
    age: string;
    sex: string;
    status: boolean;
    compounder?: string;
    phn: string;
    doctor?: string;
    prescription: {
      medicineName: string;
      dose: string;
      course: string;
    }[];
}

export type PatientData = Omit<PatientDataAPI,"id">

