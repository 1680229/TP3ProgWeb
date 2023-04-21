import { User } from "./user";

export class Gallery {
    constructor(public id: number,
        public name: string,
        public isPublic: boolean,
        //Est-ce que je dois rajouter les carac virtual ?
        public owners: User[]) { }
}