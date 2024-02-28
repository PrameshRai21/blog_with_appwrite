import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {

    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client)
    }

    //creating account section
    async createAccount({email, password, name}){
        try {
          const userAccount = await this.account.create(ID.unique(), email, password, name)

            if(userAccount){
                //call login function
                return this.login({email, password})
            }else {
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    //login section
    async login({email, password}){
        try {
           return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    //check current user
    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service:: getCurrentUser :: error", error);
        }
        return null;
    }

    //logout
    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite Service :: logout :: error", error);
        }
    }


}


const authService = new AuthService()

export default authService