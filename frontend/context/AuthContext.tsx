'use client';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { onAuthStateChanged, signOut as firebaseSignOut, User as FirebaseUser, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { setWasmUrl } from '@lottiefiles/dotlottie-react';

if (typeof window !== 'undefined') {
    setWasmUrl('/dotlottie-player.wasm');
}

interface User extends FirebaseUser {
    name?: string;
    role?: string;
    // Add other dbUser properties here if needed
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
    signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    logout: async () => { },
    signInWithGoogle: async () => { },
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Fetch user data from Firestore directly
                    // This avoids auto-creation via API, allowing 'signup-details' flow to work.
                    const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));

                    if (userDoc.exists()) {
                        // Use Object.assign to preserve prototype methods (like getIdToken)
                        // Spreading ({...firebaseUser}) creates a plain object and loses the prototype.
                        const enrichedUser = Object.assign(firebaseUser, userDoc.data());
                        setUser(enrichedUser);
                    } else {
                        setUser(firebaseUser as User);
                    }
                } catch (err) {
                    console.error("Auth Fetch Error", err);
                    setUser(firebaseUser as User); // Fallback
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            if (typeof window !== 'undefined') {
                localStorage.removeItem('apex_student_data_v1');
            }
        } catch (e) { console.error('Error clearing cache', e); }
        await firebaseSignOut(auth);
        router.push('/');
    };

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            // Auth state change will be handled by onAuthStateChanged
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
