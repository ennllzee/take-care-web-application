import LanguageSkill from "./LanguageSkill"
import WorkExp from "./WorkExp"

interface GuideForm {
    FirstName?: string
    LastName?: string
    Gender?: string
    DOB?: any
    Address?: string
    ContactAddress?: string
    PhoneNumber?: string
    Email?: string
    Education?: {
        Degree?: string
        Acadamy?: string
        Certificate?: any
    }
    WorkExp?: WorkExp[]
    LangSkill?: LanguageSkill[]
    IdCard?: string
    FaceWithIdCard?: any
    Avatar?: any
    Token: string | null
}

export default GuideForm