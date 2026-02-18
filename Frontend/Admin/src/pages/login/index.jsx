import React, { useState } from "react";
import { Lock, Mail, Shield, Eye, EyeOff, Loader2, AlertCircle, Key, User, Cloud, ShieldCheck } from "lucide-react";
import "../../styles/login.scss";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    try {
      // Add your login logic here
      console.log("Login attempt:", formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Handle successful login
    } catch (error) {
      setErrors({ general: "Login failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <div className="login-page">
      {/* Animated Background Icons */}
      <div className="background-icons">
        <Cloud className="icon cloud-1" size={40} />
        <Shield className="icon shield-1" size={32} />
        <Key className="icon key-1" size={28} />
        <ShieldCheck className="icon shield-2" size={36} />
        <Cloud className="icon cloud-2" size={45} />
        <Key className="icon key-2" size={25} />
        <Shield className="icon shield-3" size={33} />
      </div>

      <main className="login-page__main">
        <section className="auth">
          <article className="auth__card">
            <header className="auth__header">
              <div className="auth__logo">
                <Shield className="logo-icon" size={48} />
              </div>
              <h1>Welcome Back Admin</h1>
              <p>Please sign in to continue</p>
            </header>

            {errors.general && (
              <div className="auth__error" role="alert">
                <AlertCircle size={16} />
                <span>{errors.general}</span>
              </div>
            )}

            <form className="auth__form" onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email">
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={errors.email ? "error" : ""}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : ""}
                  disabled={isLoading}
                />
                {errors.email && (
                  <span id="email-error" className="error-message" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  <Lock size={16} />
                  Password
                </label>
                <div className="password-input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={errors.password ? "error" : ""}
                    aria-invalid={errors.password ? "true" : "false"}
                    aria-describedby={errors.password ? "password-error" : ""}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <span id="password-error" className="error-message" role="alert">
                    {errors.password}
                  </span>
                )}
              </div>

              <button 
                type="submit" 
                className="btn-primary"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="btn-content">
                    <Loader2 className="spinner" size={18} />
                    Signing in...
                  </span>
                ) : (
                  <span className="btn-content">
                    <User size={18} />
                    Login
                  </span>
                )}
              </button>
            </form>

            <footer className="auth__footer">
              <p>
                Don't have an account? <span className="custom-p">Contact your administrator</span>
              </p>
            </footer>
          </article>
        </section>
      </main>
    </div>
  );
};

export default Login;
