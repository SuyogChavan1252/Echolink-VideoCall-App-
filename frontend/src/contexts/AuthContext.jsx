import axios from "axios";
import httpStatus from "http-status";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

// import server from "../environment";


export const AuthContext = createContext({}); //AuthContext is like global storage

const client = axios.create({
    baseURL: "http://localhost:8000/api/v1/users"  //instead of making axios.get for multiple times on smae url we create like this client so clinet.get or post
})

//AuthProvider wraps your application (or part of it) and provides the authentication data to all child components.
//It uses React Context to share this data, so any component inside <AuthProvider> can access the authentication data without having to pass it manually via props.


export const AuthProvider = ({ children }) => {  //children is a special prop that represents the components wrapped inside <AuthProvider>.

    const authContext = useContext(AuthContext);


    const [userData, setUserData] = useState(authContext);


    const router = useNavigate();

    const handleRegister = async (name, username, password) => {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            });
    
            if (request.status === httpStatus.CREATED) {
                return request.data.message;
            }
        } catch (err) {
            console.error("Registration error:", err.response?.data || err.message);
            throw new Error(err.response?.data?.message || "Registration failed. Please try again.");
        }
    };
    

    const handleLogin = async (username, password) => {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            });

            console.log(username, password)
            console.log(request.data)

            if (request.status === httpStatus.OK) {
                localStorage.setItem("token", request.data.token);
                router("/home")
            }
        } catch (err) {
            throw err;
        }
    }

    const getHistoryOfUser = async () => {
        try {
            let request = await client.get("/get_all_activity", {
                params: {
                    token: localStorage.getItem("token")
                }
            });
            return request.data
        } catch
         (err) {
            throw err;
        }
    }

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (e) {
            throw e;
        }
    }


    const data = {
        userData, setUserData, addToUserHistory, getHistoryOfUser, handleRegister, handleLogin
    }

    return (
        <AuthContext.Provider value={data}> 
            {children}
        </AuthContext.Provider>
    )
//This {children} is placed inside AuthContext.Provider to ensure all child components get access to the provided data.
}

// User visits the authentication page (Authentication.jsx).

// User enters details & clicks Login/Register.

// handleAuth function calls the appropriate function from AuthContext.jsx.

// API call is made using axios to /register or /login.

// If successful:

// On login → Token is stored, and user is redirected.

// On register → Success message is shown.

// AuthContext provides login/logout functions to the entire app.

//Key Points:
// AuthProvider is a custom component that wraps your application.

// It provides authentication data (e.g., login state, user data, functions) using React Context.

// Any child component inside <AuthProvider> can access this data by using useContext(AuthContext).