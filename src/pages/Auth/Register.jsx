import React, { useContext, useState } from "react";
import { FiEye, FiEyeOff, FiMail, FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import AuthContext from "../../provider/AuthContext";
import { FcGoogle } from "react-icons/fc";

const BG_URL = "https://i.postimg.cc/hPWm2gyp/pexels-photo-13845237.jpg";

const Register = () => {
  const { createUser, setUser, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [nameError, setNameError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photo = form.photo.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    if (name.length < 5) {
      setNameError("Name Should be more than 5 characters");
      return;
    } else setNameError("");

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return;
    } else if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      return;
    } else if (password !== confirm) {
      setPasswordError("Passwords do not match.");
      return;
    } else setPasswordError("");

    toast
      .promise(
        createUser(email, password)
          .then((result) => {
            const user = result.user;
            form.reset();
            return updateProfile(user, {
              displayName: name,
              photoURL: photo,
            }).then(() => {
              setUser({ ...user, displayName: name, photoURL: photo });
              return true;
            });
          })
          .catch((error) => {
            throw new Error(`Failed to register.\nReason: ${error.code}`);
          }),
        {
          loading: "Creating your account...",
          success: <b>Account created successfully!</b>,
          error: (err) => <b>{err.message}</b>,
        }
      )
      .then(() => {
        setTimeout(() => navigate("/"), 500);
      });
  };

  const handleGoogleSignup = () => {
    toast.promise(
      googleSignIn()
        .then((result) => {
          setUser(result.user);
          navigate("/");

          const newUser = {
            user: result.user.displayName,
            email: result.user.email,
            image: result.user.photoURL,
          };
          // Create user in the database
          fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("data after save", data);
            })
            .catch((err) => console.error("❌ Save failed:", err));
        })
        .catch((error) => {
          throw new Error(`Google Signup failed.\nReason: ${error.code}`);
        }),
      {
        loading: "Connecting to Google...",
        success: <b>Welcome!</b>,
        error: (err) => <b>{err.message}</b>,
      }
    );
  };

  return (
    <div
      className="min-h-screen w-full bg-black/60 bg-blend-multiply bg-center bg-cover grid place-items-center p-4"
      style={{ backgroundImage: `url('${BG_URL}')` }}
    >
      <div className="w-full max-w-md rounded-[22px] border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.5)]">
        <form
          onSubmit={handleRegister}
          className="px-8 sm:px-10 pt-8 sm:pt-10 pb-8"
        >
          <h1 className="text-center text-3xl sm:text-[34px] font-extrabold text-white tracking-wide">
            Register
          </h1>

          {/* Name */}
          <div className="mt-10">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Full Name"
                className="w-full bg-transparent text-white placeholder-white/80 outline-none border-b border-white/30 focus:border-white/90 pb-3 pt-1 pr-9"
                required
              />
              <FiUser className="absolute right-0 bottom-2.5 text-white/80 pointer-events-none" />
            </div>
            {nameError && (
              <p className="text-red-400 text-xs mt-2">{nameError}</p>
            )}
          </div>

          {/* Email */}
          <div className="mt-7">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                className="w-full bg-transparent text-white placeholder-white/80 outline-none border-b border-white/30 focus:border-white/90 pb-3 pt-1 pr-9"
                autoComplete="email"
                required
              />
              <FiMail className="absolute right-0 bottom-2.5 text-white/80 pointer-events-none" />
            </div>
          </div>

          {/* Photo URL */}
          <div className="mt-7">
            <input
              id="photo"
              name="photo"
              type="url"
              placeholder="Photo URL"
              className="w-full bg-transparent text-white placeholder-white/60 outline-none border-b border-white/20 focus:border-white/60 pb-3 pt-1"
              required
            />
          </div>

          {/* Password */}
          <div className="mt-7">
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-transparent text-white placeholder-white/80 outline-none border-b border-white/30 focus:border-white/90 pb-3 pt-1 pr-9"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-0 bottom-2.5 text-white/80 hover:text-white transition"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-400 text-xs mt-2">{passwordError}</p>
            )}
          </div>

          {/* Confirm */}
          <div className="mt-7">
            <div className="relative">
              <input
                id="confirm"
                name="confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full bg-transparent text-white placeholder-white/80 outline-none border-b border-white/30 focus:border-white/90 pb-3 pt-1 pr-9"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm((p) => !p)}
                className="absolute right-0 bottom-2.5 text-white/80 hover:text-white transition"
                aria-label={showConfirm ? "Hide password" : "Show password"}
              >
                {showConfirm ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {/* T&C */}
          <div className="mt-5 text-sm text-white/85">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                required
                type="checkbox"
                className="h-4 w-4 rounded bg-transparent border-white/40 text-white focus:ring-0 focus:outline-none"
              />
              <span>I agree to the Terms & Conditions</span>
            </label>
          </div>

          {/* Register */}
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-white text-gray-900 font-semibold py-3 shadow-[0_6px_20px_rgba(0,0,0,.25)] hover:opacity-95 active:scale-[.99] transition"
          >
            Register
          </button>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            className="flex items-center justify-center gap-2 mt-3 w-full rounded-full bg-white/10 text-white font-medium py-3 border border-white/20 hover:bg-white/15 transition"
          >
            <FcGoogle size={30} />
            Continue with Google
          </button>

          <p className="mt-6 text-center text-white/90 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold underline decoration-white/60"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
