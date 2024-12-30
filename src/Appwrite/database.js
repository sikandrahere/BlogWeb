import conf from "../conf/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";

// Define the Database class to manage database and storage operations
export class Database {
    // Initialize the client instance
    client = new Client();

    // Define properties for databases and storage
    databases;
    storage;

    // Constructor to configure the client and initialize databases and storage
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl) // Set the endpoint URL for Appwrite
            .setProject(conf.appwriteProjectId); // Set the project ID for Appwrite

        // Initialize the databases instance
        this.databases = new Databases(this.client);

        // Initialize the storage instance
        this.storage = new Storage(this.client);

        // Note: Ideally, these should be created in separate files for better organization,
        // but for simplicity, they are created in the same file here.
    }

    // Method to create a new post
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, // Use the slug as the document ID, though you could also use ID.unique()
                {
                    title,
                    content,
                    userId,
                    status,
                    featuredImage
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    // Method to update an existing post
    async updatePost(slug, { title, content, featuredImage, status, userId }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    userId,
                    status,
                    featuredImage
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    // Method to delete a post by slug
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    // Method to get a post by slug
    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    // Method to get all posts, filtering for active status
    async getPosts(queries = [Query.equal("status", "active")]) {
        // Use a query to select all active posts
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    // Method to upload a file
    async uploadFile(file) {
        // Accept the whole file object, not just the ID
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    // Method to delete a file by file ID
    async deleteFile(fileId) {
        // The fileId is generated when the file is uploaded
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    // Method to get a file preview by file ID
    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
}

// Create an instance of the Database class
const database = new Database();

// Export the database instance for use in other parts of the application
export default database;
