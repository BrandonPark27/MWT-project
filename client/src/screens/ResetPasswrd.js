import React, { useState } from "react";
import Header from "../screens/Header";
import "../css/resetpasswrd.css";

function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handlePasswordReset = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            alert("Password has been reset successfully.");
        } else {
            alert("Passwords do not match.");
        }
    };
// ligma
    return (
        <>
          
            <div className="reset-password-container">
                <h2>Reset Password</h2>
                <form onSubmit={handlePasswordReset} className="reset-password-form">
                    <label>
                        New Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </label>
                    <label>
                        Confirm Password:
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit" className="reset-password-button">
                        Reset Password
                    </button>
                </form>
            </div>
        </>
    );
}

export default ResetPassword;
