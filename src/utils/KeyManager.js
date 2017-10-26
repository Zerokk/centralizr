class KeyManager{

    constructor(){
        this.cachedKeys = [];
        this.tempKeys = [];
    }

    /**
     * Genera una clave y la asocia a un struct pasado por parámetro
     */
    static genKey(struct){
        const key = Math.trunc(Math.random()*1000000)+1;
        this.tempKeys.push({structId: struct.id, key: key});  // Emitimos una clave para este struct
        return key;
    }

    /**
     * Emite el set de claves y coloca fecha de caducación para las mismas
     */
    static emitKeys(){
        this.cachedKeys = JSON.parse(JSON.stringify(this.tempKeys));
        this.tempKeys = [];
        console.log("emitted keys: ", this.cachedKeys)
        setTimeout(()=> this.cachedKeys = [], 15000); // Tras este tiempo, las claves caducan
    }

    static check(key){
        let found = null;
        this.cachedKeys.map(val => val.key == key ? found = val.structId : null); 
        return found;
    }

    static reset(){
        this.cachedKeys = [];
        this.tempKeys = [];
    }
}

exports.KeyManager = KeyManager;