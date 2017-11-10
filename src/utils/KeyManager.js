/**
 *          Clase KeyManager, orientada a asegurar la app desde peticiones externas.
 * 
 *  Con cada petición entre vistas, generamos una serie de claves que caducan al poco tiempo, que se
 *  dan inicialmente con el login, y luego se van generando forma específica para cada dato de la API,
 *  de modo que todos los accesos quedan reducidos a UNA acción entre vistas. Esta API está pensada para
 *  ser usada únicamente por un usuario, aunque se podría refactorizar para permitir varios usuarios.
 * 
 *  - cachedKeys:    mantiene las claves relativas a cada struct.
 *  - tempKeys:      se usa para generar secuencias de claves, antes de emitirlas.
 *  - sessionKey:    mantiene la clave de sesión del usuario.
 */

class KeyManager{

    constructor(){
        this.cachedKeys = [];  
        this.tempKeys = [];
        this.sessionKey = null;
    }

    /**
     * Genera una clave y la asocia a un struct pasado por parámetro
     */
    static genKey(struct){
        const key = Math.trunc(Math.random()*1000000)+1;
        this.tempKeys.push({structId: struct._id, key: key});  // Emitimos una clave para este struct
        console.log("pushed id: ", struct._id)
        return key;
    }

    /**
     * Genera una clave para tener constancia de la sesión de un usuario al pasar entre vistas.
     */
    static genSessionKey(){
        let key = Math.trunc(Math.random()*1000000)+1;
        this.sessionKey = key;
        setTimeout(() => {
            this.sessionKey = null;
        }, 15000);
        return key;
    }

    static checkSessionKey(key){
        if(this.sessionKey == key){
            this.sessionKey = null;
            return true;
        }else{
            return false;
        }
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