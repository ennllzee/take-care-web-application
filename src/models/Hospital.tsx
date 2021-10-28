import Building from "./Building";
import Department from "./Department";

interface Hospital{
    _id: any
    Name: string
    Buildings?: Building[]
    Departments?: Department[]
}

export default Hospital