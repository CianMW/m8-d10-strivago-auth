export interface IUserModel {
    name: string
    email: string
    password: string,
    role: "host" | "guest"
}