import Department from "./Department";

interface Building {
    _id: any
    Name: string
    Departments?: Department[]
}

export default Building