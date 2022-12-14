import { useState } from 'react';

import { API } from '../../config/api';

export default function Register(props) {
  const { setIsRegister } = props;

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setMessage(null);
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const response = await API.post(
        '/register',
        JSON.stringify(form),
        config
      );

      const { error } = response.data;

      if (error) {
        return setMessage(error.message);
      }

      setIsRegister(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-4/12 p-4 rounded text-white">
      <div className="text-3xl font-bold text-center mb-14">Register</div>
      {message && (
        <div className="bg-yellow-600	text-center rounded mb-6 py-1">
          {message}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              name="firstName"
              onChange={onChange}
              value={form.firstName}
              className="w-full text-black rounded p-2 focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              name="lastName"
              onChange={onChange}
              value={form.lastName}
              className="w-full text-black rounded p-2 focus:outline-none"
            />
          </div>
        </div>
        <div className="mb-6">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={onChange}
            value={form.email}
            className="w-full text-black rounded p-2 focus:outline-none"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={onChange}
            value={form.password}
            className="w-full text-black rounded p-2 focus:outline-none"
          />
        </div>
        <div className="mt-10">
          <button className="bg-neutral-800 w-full rounded text-lg font-bold py-1 hover:bg-neutral-500">
            Submit
          </button>
          <div className="text-center mt-2 font-thin">
            Already have Account?{' '}
            <span
              className="font-bold cursor-pointer hover:text-neutral-500"
              onClick={() => setIsRegister(false)}
            >
              Login
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
