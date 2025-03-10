import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_URL = "https://e2ff-102-89-82-105.ngrok-free.app";

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    name: string;
  };
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/api/v1/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid login credentials");
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export interface SignupResponse {
  message: string; 
}

export const signup = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
): Promise<SignupResponse> => {
  try {
    const response = await fetch(`${API_URL}/auth/api/v1/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, firstName, lastName }),
    });

    if (!response.ok) {
      throw new Error("Sign-up failed");
    }

    const data: SignupResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Sign-up error:", error);
    throw error;
  }
};

//Fetch User Data API Call
export const fetchUserData = async (): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/auth/api/v1/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })

    if (!response.ok) {
      throw new Error("Failed to fetch user data")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Error fetching user data:", error)
    throw error
  }
}

//Logout API Call
export const logout = async (): Promise<void> => {
    try {
      const response = await fetch(`${API_URL}/auth/api/v1/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include any necessary authorization headers if required
          // Authorization: `Bearer ${yourAuthToken}`,
        },
      });
      await AsyncStorage.removeItem("userData");
  
      if (!response.ok) {
        throw new Error("Failed to log out");
      }
  
      // Optionally clear local storage or tokens
      // localStorage.removeItem("authToken");
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };
  

// Add Todo API Call
export const saveTodoToApi = async (taskTitle: string, taskDescription: string, userId: number): Promise<any> => {
    try {
      const token = await AsyncStorage.getItem("userToken"); // Retrieve the token
      if (!token) {
        throw new Error("Authentication token is missing.");
      }
  
      const response = await axios.post(
        `${API_URL}/todos/api/v1/create`,
        { title: taskTitle, description: taskDescription, userId },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token here
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Failed to save the task to the API:", error);
      throw error; // Re-throw to handle it in the caller
    }
  };
  

  // Update Todo API Call
export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export const fetchTodos = async (token: string): Promise<Todo[]> => {
  try {
    const response = await fetch(`${API_URL}/todos/api/v1/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const data: Todo[] = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch Todos error:", error);
    throw error;
  }
};
