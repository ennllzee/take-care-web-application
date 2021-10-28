import Customer from "./Customer";
import Guide from "./Guide";

interface Report {
    _id: any
    Title : string
    Description : string
    Reporter : Customer | Guide
    ResponseText? : string
    CreatedAt : any
    UpdatedAt? : any
}

export default Report