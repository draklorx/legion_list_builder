import { Unit } from './unit.model';

export class List {
    constructor(public name: string, public factionId: string, public units: Unit[]) {}
}
