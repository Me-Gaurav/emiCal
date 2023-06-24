import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Banner from "../customComponents/Banner";
import validation from "../utils/validation";

const LoginForm = () => {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [emailError, setEmailError] = useState("");
  const [decryptePassword, setDecryptePassword] = useState('')
  const [passwordError, setPasswordError] = useState("");

  var emailData = localStorage.getItem("email");
  var usernameData = localStorage.getItem("username");
  var passwordData = localStorage.getItem("password");
  var bytes = CryptoJS.AES.decrypt(usernameData, "my-secret-key@123");
  var bytes = CryptoJS.AES.decrypt(passwordData, "my-secret-key@123");

  useEffect(() => {
    var decryptedUsername= JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    setDecryptePassword(JSON.parse(bytes.toString(CryptoJS.enc.Utf8)))
  }, []);

  console.log(decryptePassword)


  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(emailData !== formValues.email){
        setEmailError('Invalid email')
    }
    if(decryptePassword !== formValues.password){
        setPasswordError('Incorrect password')
    } else {
        navigate('/')
    }
  };

  return (
    <div className="lg:flex">
      <Banner />
      <div className="lg:w-1/2">
        <section className=" bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-semibold text-center leading-tight tracking-tight md:text-2xl text-white">
                  Log In
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <input
                      type="email"
                      value={formValues.email}
                      name="email"
                      onChange={handleInput}
                      className="sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none focus:outline focus:outline-gray-500 focus:outline-1"
                      placeholder="Email"
                      required=""
                    />
                    {emailError && (
                      <p className="text-[13px] text-red-400 -mb-4">
                        {emailError}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      type="password"
                      value={formValues.password}
                      name="password"
                      onChange={handleInput}
                      className="sm:text-sm rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white outline-none focus:outline focus:outline-gray-500 focus:outline-1"
                      placeholder="Password"
                      required=""
                    />
                    {passwordError && (
                      <p className="text-[13px] text-red-400 -mb-4">
                        {passwordError}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-sky-800 hover:bg-sky-900  focus:ring-1 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Log In
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default LoginForm;

