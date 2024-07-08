import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
      <Link to="/login">← Go to Login</Link>

      <h2 className="text-center font-bold text-2xl">Signup</h2>
      <form
        onSubmit={handleFormSubmit}
        className="border-2 border-red-500 p-6 w-full max-w-xl mx-auto rounded-lg shadow-custom mt-6"
      >
        <div className="flex flex-col my-4">
          <label htmlFor="firstName" className="text-gray-700">
            First Name:
          </label>
          <input
            placeholder="First"
            name="firstName"
            type="text"
            id="firstName"
            onChange={handleChange}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="lastName" className="text-gray-700">
            Last Name:
          </label>
          <input
            placeholder="Last"
            name="lastName"
            type="text"
            id="lastName"
            onChange={handleChange}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="email" className="text-gray-700">
            Email:
          </label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex flex-col my-4">
          <label htmlFor="pwd" className="text-gray-700">
            Password:
          </label>
          <input
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
            className="mt-2 p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="mt-2 p-2 bg-red-500 text-white rounded transition duration-300 ease-in-out transform hover:bg-red-600 hover:shadow-2xl hover:scale-105"
          >
            Submit
          </button>
        </div>
      </form>
      <style jsx>{`
        .shadow-custom {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2),
            0 16px 48px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}

export default Signup;
