import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import "../css/Signup.css";

function SignUpOut() {
    return (
        <>
            <SignUp />
        </>
    );
}

function SignUp() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [dob, setDob] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setIsLoggedIn(true);
            alert(`Signed up with email: ${email}`);
        } else {
            alert("Passwords do not match.");
        }
    };

    const handleSignIn = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
        alert(`Signed in with email: ${email}`);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        alert("Logged out");
        navigate("/");
    };

    return (
        <div className="signup-container">
            {!isLoggedIn ? (
                <>
                    <div className="toggle-buttons">
                        <button 
                            className={`toggle-button ${!isSignUp ? 'active' : ''}`} 
                            onClick={() => setIsSignUp(false)}>
                            <MusicNoteIcon className="icon" /> SIGN IN
                        </button>
                        <button 
                            className={`toggle-button ${isSignUp ? 'active' : ''}`} 
                            onClick={() => setIsSignUp(true)}>
                            <MusicNoteIcon className="icon" /> SIGN UP
                        </button>
                    </div>

                    {isSignUp ? (
                        <form className="signup-form" onSubmit={handleSignUp}>
                            <h2 className="signup-header">Sign Up</h2>
                            <div className="form_group">
                                <label htmlFor="name">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form_group">
                                <label htmlFor="dob">Date of Birth:</label>
                                <input
                                    type="date"
                                    id="dob"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form_group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form_group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form_group">
                                <label htmlFor="confirm-password">Confirm Password:</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="signup_button">
                                Sign Up
                            </button>
                        </form>
                    ) : (
                        <form className="signup-form" onSubmit={handleSignIn}>
                            <h2 className="signup-header">Sign In</h2>
                            <div className="form_group">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form_group">
                                <label htmlFor="password">Password:</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="signup_button">
                                Sign In
                            </button>
                        </form>
                    )}
                </>
            ) : (
                <div className="logout">
                    <h2>Welcome, {email}!</h2>
                    <button onClick={() => navigate("/")} className="logout_button">
                        Return Home
                    </button>
                    <button onClick={handleLogout} className="logout_button">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default SignUpOut;
