import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// AuthService class to manage authentication-related tasks
export class AuthService {
    // Client instance is defined here
    client = new Client(); 
    
    // Account instance will be defined in the constructor
    account;

    // Constructor to initialize and configure the client
    constructor() {
        // Setting up the client with endpoint and project ID
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        
        // Initializing the account with the configured client
        this.account = new Account(this.client);
    }

    // Method to create a new account
    async createAccount({email, password, name}) {
        // Taking email, password, and name values from the user
        // Using try and catch because this method can fail
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // If account creation is successful, log in the user
                return this.login({email, password});
            } else {
                // If account creation is not successful, return the userAccount
                return userAccount;
            }
        } catch (error) {
            // Throwing an error if something goes wrong
            throw error;
        }
    }
    
    // Method to log in the user
    async login({email, password}) {
        try {
            // Creating an email session for the user
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            // Throwing an error if something goes wrong
            throw error;
        }
    }

    // Method to check if the user is logged in
    async getCurrentUser() {
        try {
            // Getting the current user session
            return await this.account.get();
        } catch (error) {
            // Logging an error if something goes wrong
            console.log(error);
        }
        // Returning null if no user is logged in
        return null;
    }

    // Method to log out the user
    async logOut() {
        try {
            // Deleting all user sessions
            return await this.account.deleteSessions();
        } catch (error) {
            // Logging an error if something goes wrong
            console.log(error);
        }
    }
}

// Creating an instance of AuthService
const authService = new AuthService();

// Exporting the authService instance
// Now authService works like an object and can be used like authService.login and authService.logout
export default authService;
