export interface IApiHooks {
    get: Function;
    add: Function;
    update: Function;
    delete: Function;
}

export class ApiHooks implements IApiHooks {
    get() { console.log('get'); };
    add() { console.log('add'); };
    update() { console.log('update'); };
    delete() { console.log('delete'); };

}