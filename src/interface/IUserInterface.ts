export interface IUser {
    userId: number,
    name:string,
    email:string,
    image:string,
    admin:boolean,
    createdAt:string,
    updatedAt:string
}

export interface IPutUser{
    userId?: number,
    name?:string,
    email?:string,
    image?:string,
    admin?:boolean,
}

export interface ITokens{
    access_token:string,
    refresh_token:string
}

export interface IUserAndTokens{
    user:IUser,
    tokens:ITokens
}

export interface IClientId{
    clientId:string|undefined
}