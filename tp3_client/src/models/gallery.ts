import { User } from "./user";

export class Gallery {
    constructor(public id: number,
        public name: string,
        public isPublic: boolean,
        public owners: User[]) { }
}