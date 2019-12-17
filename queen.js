export default class Queen {
    constructor(position, killZones) {
        this.position = position;
        this.killZones = killZones;
    }

    ///////////////
    /// SETTERS ///
    ///////////////
    set position(position) {
        this._position = position;
    }

    set killZones(killZones) {
        this._killZones = killZones;
    }

    ///////////////
    /// GETTERS ///
    ///////////////
    get position() {
        return this._position;
    }

    get killZones() {
        return this._killZones;
    }

}