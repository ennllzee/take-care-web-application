import Building from "./Building";
import Hospital from "./Hospital";

interface Department {
    _id: any
    Name: string
    Building?: Building
    Hospital?: Hospital
}

export default Department