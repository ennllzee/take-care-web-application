import Appointment from "./Appointment";

interface GuideSchedule {
    _id: string
    AvailableAfternoon: boolean
    AvailableMorning: boolean
    Createdby: string
    CreatedAt: any
    Period: string
    ScheduleAfternoonStatus?: any
    ScheduleMorningStatus?: any
    UpdatedAt: any
    WorkOnAfternoonAppointment?: Appointment
    WorkOnMorningAppointment?: Appointment
    ScheduleDate: any
}

export default GuideSchedule