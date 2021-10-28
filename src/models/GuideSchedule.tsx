import Appointment from "./Appointment";
import Guide from "./Guide";

interface GuideSchedule {
    _id: string
    ScheduleDate: any
    Period: string 
    Createdby: Guide
    AvailableMorning: boolean
    AvailableAfternoon: boolean
    WorkOnMorningAppointment: Appointment
    WorkOnAfternoonAppointment: Appointment
    ScheduleMorningStatus: {
        Tag: string
        Details: string[]
    }
    ScheduleAfternoonStatus: {
        Tag: string
        Details: string[]
    }

}

export default GuideSchedule