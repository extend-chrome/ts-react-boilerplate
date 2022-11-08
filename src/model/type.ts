import {Type as TypeEnum} from '../enum/type'
import {Size} from "./size";

export class Type {
    name: string
    url: string
    sizes: Size[]
    code: TypeEnum
}