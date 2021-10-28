import Customer from "./Customer";
import Department from "./Department";
import Guide from "./Guide";
import Hospital from "./Hospital";
import Record from "./Record";

interface Appointment {
    _id: any
    Period: string //"morning" "afternoon" "all-day"
    AppointTime: any
    BeginTime?: any
    EndTime?: any
    Customer: Customer
    Guide?: Guide
    Status: {
        Tag: string
        Details: string[]
    }
    Hospital: Hospital
    Department: Department
    Review?: {
        Star: number
        Comment: string
    }
    Record?: Record[]
    OpenLink: any
    Note? : string
    CreatedAt: any
    UpdatedAt: any
    Price?: number
}


export default Appointment