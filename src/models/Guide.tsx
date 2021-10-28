import LanguageSkill from "./LanguageSkill"
import WorkExp from "./WorkExp"

interface Guide {
    _id: string
    FirstName: string
    LastName: string
    Gender: string
    DOB: any
    Address?: string
    ContactAddress?: string
    PhoneNumber: string
    Email: string
    GoogleId: string
    Gmail: string
    IsVerified?: boolean
    Education?: {
        Degree: string
        Acadamy: string
        Certificate?: any
    }
    WorkExp?: WorkExp[]
    LangSkill?: LanguageSkill[]
    IdCard?: string
    FaceWithIdCard?: any
    VerifyDate?: any
    Avatar?: any
    Status?: {
        Tag: string
        Details: string[]
    }
    Role: string
    CreatedAt: any
    UpdatedAt: any
    Rating?: number
    Tips?: number
}

export default Guide