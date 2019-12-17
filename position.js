export default class Position {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    ///////////////
    /// SETTERS ///
    ///////////////
    set row(row) {
        this._row = row;
    }

    set col(col) {
        this._col = col;
    }

    ///////////////
    /// GETTERS ///
    ///////////////
    get row() {
        return this._row;
    }

    get col() {
        return this._col;
    }
}