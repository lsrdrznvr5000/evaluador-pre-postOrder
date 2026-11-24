class Nodo {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
    }
}

class Pila {
    constructor() {
        this.cima = null;
        this.tam = 0;
    }

    apilar(dato) {
        const nodo = new Nodo(dato);
        nodo.siguiente = this.cima;
        this.cima = nodo;
        this.tam++;
    }

    desapilar() {
        if (this.cima === null) return null;
        const dato = this.cima.dato;
        this.cima = this.cima.siguiente;
        this.tam--;
        return dato;
    }

    tope() {
        return this.cima ? this.cima.dato : null;
    }

    vacia() {
        return this.cima === null;
    }
}

class Cola {
    constructor() {
        this.frente = null;
        this.atras = null;
        this.tam = 0;
    }

    encolar(dato) {
        const nodo = new Nodo(dato);
        if (this.atras === null) {
            this.frente = this.atras = nodo;
        } else {
            this.atras.siguiente = nodo;
            this.atras = nodo;
        }
        this.tam++;
    }

    desencolar() {
        if (this.frente === null) return null;
        const dato = this.frente.dato;
        this.frente = this.frente.siguiente;
        if (this.frente === null) this.atras = null;
        this.tam--;
        return dato;
    }

    vacia() {
        return this.frente === null;
    }
}

class Expresiones {
    constructor() {
        this.colaEntrada = new Cola();
        this.pilaNumeros = new Pila();
    }

    ingresar(expresion) {
        const tokens = expresion.split(' ');
        for (const token of tokens) {
            this.colaEntrada.encolar(token);
        }
    }

    evaluar() {
        while (!this.colaEntrada.vacia()) {
            const token = this.colaEntrada.desencolar();
            if (!isNaN(Number(token))) {
                this.pilaNumeros.apilar(Number(token));
            } else {
                const op2 = this.pilaNumeros.desapilar();
                const op1 = this.pilaNumeros.desapilar();
                this.pilaNumeros.apilar(this._operar(op1, token, op2));
            }
        }
        return this.pilaNumeros.desapilar();
    }

    _operar(a, op, b) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return a / b;
        }
    }
}
