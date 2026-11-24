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

class Expresiones {
    constructor() {
        this.pilaEntrada = new Pila();
        this.pilaNumeros = new Pila();
    }

    ingresar(expresion) {
        const tokens = expresion.split(' ');
        for (const token of tokens) {
            this.pilaEntrada.apilar(token);
        }
    }

    evaluar() {
        while (!this.pilaEntrada.vacia()) {
            const token = this.pilaEntrada.desapilar();
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