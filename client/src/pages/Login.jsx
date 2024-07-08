import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import Auth from "../utils/auth";

function Login(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/signup">← Go to Signup</Link>

      <h2 className="text-center font-bold text-2xl">Login</h2>
      <div className="flex justify-center items-start min-h-screen pt-20">
        <form
          onSubmit={handleFormSubmit}
          className="border-2 border-red-500 p-10 w-full max-w-4xl rounded-lg space-y-6 shadow-custom"
        >
          <div className="flex flex-col">
            <label htmlFor="email">Email address:</label>
            <input
              placeholder="youremail@test.com"
              name="email"
              type="email"
              id="email"
              onChange={handleChange}
              className="mt-2 p-2 border rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="pwd">Password:</label>
            <input
              placeholder="******"
              name="password"
              type="password"
              id="pwd"
              onChange={handleChange}
              className="mt-2 p-2 border rounded"
            />
          </div>
          {error ? (
            <div>
              <p className="error-text text-red-500">
                The provided credentials are incorrect
              </p>
            </div>
          ) : null}
          <div className="flex justify-end">
            <button
              type="submit"
              className="mt-2 p-2 bg-red-500 text-white rounded transition duration-300 ease-in-out transform hover:bg-red-600 hover:shadow-2xl hover:scale-105"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .shadow-custom {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25),
            0 15px 50px rgba(0, 0, 0, 0.35);
        }
      `}</style>
    </div>
  );
}

export default Login;
