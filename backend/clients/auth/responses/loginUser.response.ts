export class LoginUserResponse {
    "email": string;
    "username": string;
    "bio": string;
    "image": string;
    "token": string;

    constructor( email: string, username: string, bio: string, image: string, token: string){
        this.email = email;
        this.username = username;
        this.bio = bio;
        this.image = image;
        this.token = token;
    }
}