export class Bibliografia{
  constructor(
    public _id: String,
    public type:String,
    public titulo: String,
    public autor: String,
    public edicion: String,
    public palabrasClave: [],
    public temas: [],
    public descripccion: String,
    public copias: Number,
    public disponibles: Number,
    public ejemplares: Number,
    public frecuenciaActual: String,
    public prestados: Number,
    public buscados: Number
    ){}
}
