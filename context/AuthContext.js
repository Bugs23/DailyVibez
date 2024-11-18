"use client"
import { auth, db } from "@/firebase"
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import React, {useContext, useState, useEffect} from "react"

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null)
    const [userDataObj, setUserDataObj] = useState(null)
    const [loading, setLoading] = useState(true)
 
    // Auth handlers/User signup
    // createUserWithEmailAndPassword imported from firebase
    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    // User logout
    // signInWithEmailAndPassword imported from firebase
    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    // User logout
    function logout() {
        setUserDataObj(null)
        setCurrentUser(null)
        return signOut(auth)
    }
     
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user => {
            try {

                // Set user to local context state
                setLoading(true)
                setCurrentUser(user)

                // If the user doesn't exists, stop
                if (!user) {
                    console.log("No user found")
                    return
                }

                // If the user exists, fetch data from firestore db
                console.log("Fetching user data... ")
                const docRef = doc(
                    db, // Firestore database instance
                    "users", // Name of the collection
                    user.uid // ID of document from "users"
                )

                // Get the document with the info from docRef and store it in docSnap
                const docSnap = await getDoc(docRef)

                let firebaseData = {}

                // Check if the document actually exists
                if (docSnap.exists()) {
                    console.log("Found user data")
                    
                    firebaseData = docSnap.data() // Store user data in firebaseData
                    
                    // *** Remove before production **
                    console.log(firebaseData)
                }

            } catch(err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        })

        return unsubscribe

    }, [])

    const value = {
        currentUser,
        userDataObj,
        setUserDataObj,
        signup,
        logout,
        login,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}