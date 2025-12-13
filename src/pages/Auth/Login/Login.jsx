import React from "react";
import { useForm } from "react-hook-form";
import GoogleSignInButton from "../../../components/Buttons/GoogleSignInButton";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router";
 // make sure your firebase is initialized here

 

const Login = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
    const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
     
        await loginUser(data.email, data.password).then(()=>{
          toast.success("Login successful!");
          window.location.replace(from);
        }).catch((error)=>{
          toast.error(error.message);
        });
      if (data.remember) {
        localStorage.setItem("rememberMe", data.email);
      } else {
        localStorage.removeItem("rememberMe");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error(error.message);
    }
  };

  const handleForgotPassword = async (email) => {
    if (!email) {
      alert("Please enter your email to reset password");
      return;
    }
    try {
      
    } catch (error) {
     
      toast.error(error.message);
    }
  };



  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            defaultValue={localStorage.getItem("rememberMe") || ""}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Password:</label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <label>
            <input type="checkbox" {...register("remember")} /> Remember Me
          </label>
          <button
            type="button"
            onClick={() =>
              handleForgotPassword(
                document.querySelector('input[name="email"]').value
              )
            }
            style={{
              border: "none",
              background: "none",
              color: "blue",
              cursor: "pointer",
            }}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "blue",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Login
        </button>
          </form>
          <div>register page link <Link to='/register'>Register</Link> </div>

      <hr style={{ margin: "20px 0" }} />
<GoogleSignInButton/>
    </div>
  );
};

export default Login;
