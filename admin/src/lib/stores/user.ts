import { ID } from "appwrite";
import { account } from "../../appwrite";
import { reactive } from "vue";

// Define a type for the user object returned from the account.get() method.
// You should replace 'any' with the actual type of user data returned by Appwrite, if available.
type User = any | null; // Replace 'any' with the actual user type if you know it

// Define the reactive user object
export const user = reactive({
  current: null as User,

  // Initialize the user by fetching the current account session
  async init(): Promise<void> {
    try {
      this.current = await account.get();
    } catch (e) {
      this.current = null;
    }
  },

  // Register a new user
  async register(email: string, password: string): Promise<void> {
    await account.create(ID.unique(), email, password);
    await this.login(email, password);
  },

  // Log in the user
  async login(email: string, password: string): Promise<void> {
    await account.createEmailPasswordSession(email, password);
    window.location.href = "/"; // Redirect to home page
  },

  // Log out the user
  async logout(): Promise<void> {
    await account.deleteSession("current");
    this.current = null;
  }
});
