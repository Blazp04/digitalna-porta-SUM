import { Client, Databases, Account } from "appwrite";

// Create the Appwrite client instance
const client = new Client();

client
    .setEndpoint('https://appwrite.skyguard.blazperic.com/v1') // Your Appwrite endpoint
    .setProject('6712c94b003641c8737b'); // Your Appwrite project ID

export default client;
export const account = new Account(client); // Account instance
export const databases = new Databases(client); // Databases instance
