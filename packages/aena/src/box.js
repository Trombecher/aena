export class Box {
    l = new Set;

    constructor(value) {
        this._ = value;
    }

    get value() {
        return this._;
    }

    set value(value) {
        const oldValue = this._;
        this._ = value;
        this.l.forEach(listener => listener(value, oldValue));
    }

    attach(listener) {
        this.l.add(listener);
        return listener;
    }

    detach(listener) {
        this.l.delete(listener);
    }

    derive(transform) {
        const box = new Box(transform(this._));
        this.attach(value => box.value = transform(value));
        return box;
    }
}