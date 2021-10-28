import Customer from "./Customer";
import Department from "./Department";
import Guide from "./Guide";
import Hospital from "./Hospital";

interface AppointmentForm {
    Period?: string //"Morning" "Afternoon" "All-day"
    AppointTime?: any
    Customer?: Customer
    Guide?: Guide
    Hospital?: Hospital
    Department?: Department
    Note? : string
    ScheuleGuideId? : string
}


export default AppointmentForm