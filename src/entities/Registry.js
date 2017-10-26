class Registry {
    structId;
    values;

    constructor(){}
    constructor(structId, values){
        this.structId = structId;
        this.values = values;
    }
}

exports.Registry = Registry;