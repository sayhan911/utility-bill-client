import React, { useContext, useRef, useState } from "react";
import { FiEye, FiEyeOff, FiMail } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import AuthContext from "../../provider/AuthContext";
import { FcGoogle } from "react-icons/fc";

const BG_URL = "https://i.postimg.cc/wxsx4mn1/download-5.jpg";

const Login = () => {
  const { logIn, googleSignIn, setUser } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const emailRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    toast.promise(
      logIn(email, password)
        .then((result) => {
          form.reset();
          navigate(location.state?.from || "/");
          return result;
        })
        .catch((error) => {
          throw new Error(`Failed to login.\nReason: ${error.code}`);
        }),
      {
        loading: "Logging you in...",
        success: <b>Welcome back!</b>,
        error: (err) => <b>{err.message}</b>,
      }
    );
  };

  const handleGoogleLogin = () => {
    toast.promise(
      googleSignIn()
        .then((result) => {
          const user = result.user;
          setUser(user);
          navigate(location.state?.from || "/");
          const newUser = {
            user: user.displayName,
            email: user.email,
            image: user.photoURL,
          };
          fetch("https://utility-bill-server-eight.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("saved user:", data);
            })
            .catch((err) => {
              console.error("❌ Save failed:", err);
            });

          return result;
        })
        .catch((error) => {
          throw new Error(`Google Login failed.\nReason: ${error.code}`);
        }),
      {
        loading: "Connecting to Google...",
        success: <b>Logged in successfully!</b>,
        error: (err) => <b>{err.message}</b>,
      }
    );
  };

  return (
    <div
      className="min-h-screen w-full bg-black/80 bg-blend-multiply bg-center bg-cover grid place-items-center p-4"
      style={{ backgroundImage: `url('${BG_URL}')` }}
    >
      <div className="w-full max-w-md rounded-[22px] border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,.5)]">
        <form
          onSubmit={handleLogIn}
          className="px-8 sm:px-10 pt-8 sm:pt-10 pb-8"
        >
          <h1 className="text-center text-3xl sm:text-[34px] font-extrabold text-white tracking-wide">
            Login
          </h1>

          {/* Email */}
          <div className="mt-10">
            <div className="relative">
              <input
                id="email"
                name="email"
                ref={emailRef}
                type="email"
                placeholder="Email"
                className="w-full bg-transparent text-white placeholder-white/80 outline-none border-b border-white/30 focus:border-white/90 pb-3 pt-1 pr-9"
                autoComplete="email"
                required
              />
              <FiMail className="absolute right-0 bottom-2.5 text-white/80 pointer-events-none" />
            </div>
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
                autoComplete="current-password"
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
          </div>

          {/* Remember / Forgot */}
          <div className="mt-5 flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-white/85 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="h-4 w-4 rounded bg-transparent border-white/40 text-white focus:ring-0 focus:outline-none"
              />
              <span>Remember me</span>
            </label>

            <Link
              to="/reset"
              state={{ email: emailRef.current?.value || "" }}
              className="text-white/85 hover:text-white transition"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login */}
          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-white text-gray-900 font-semibold py-3 shadow-[0_6px_20px_rgba(0,0,0,.25)] hover:opacity-95 active:scale-[.99] transition"
          >
            Login
          </button>

          {/* Google (optional) */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 mt-3 w-full rounded-full bg-white/10 text-white font-medium py-3 border border-white/20 hover:bg-white/15 transition"
          >
            <FcGoogle size={30} />
            Continue with Google
          </button>

          {/* Footer */}
          <p className="mt-6 text-center text-white/90 text-sm">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-semibold underline decoration-white/60"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
