export interface ApparelAttribute{
    size:string;
    quantity:number;
    price:number
}

export interface Apparel{
    ID:number,
    code:string;
    vendor:number;
    price:number[];
    size:string[];
    quality:number;
    quantity:number[];
    attributes:ApparelAttribute[];
}

