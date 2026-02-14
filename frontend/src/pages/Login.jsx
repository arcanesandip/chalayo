import React, { useState } from 'react';

export default function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your login logic here
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        {/* Login Container */}
        <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-8 text-center text-white">
            <h1 className="mb-2 flex items-center justify-center gap-2 text-3xl font-bold">
              <i className="fas fa-file-invoice-dollar"></i>
              <span>InvoicePro</span>
            </h1>
            <p className="text-sm text-blue-100">
              Access your billing dashboard
            </p>
          </div>

          {/* Body */}
          <div className="p-8">
            {/* Error Message Example - Uncomment to show */}
            {/* <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-800">
              <i className="fas fa-exclamation-circle text-red-500 mt-0.5"></i>
              <span className="text-sm">
                Your username and password didn't match. Please try again.
              </span>
            </div> */}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field */}
              <div>
                <label
                  htmlFor="id_username"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  <i className="fas fa-user mr-2 text-gray-500"></i>
                  Username
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <i className="fas fa-user text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    name="username"
                    id="id_username"
                    className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 transition duration-200 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    autoFocus
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="id_password"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  <i className="fas fa-key mr-2 text-gray-500"></i>
                  Password
                </label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <i className="fas fa-key text-gray-400"></i>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    id="id_password"
                    className="w-full rounded-lg border border-gray-300 py-3 pr-12 pl-10 transition duration-200 outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition duration-200 hover:text-gray-600"
                    aria-label="Toggle password visibility"
                  >
                    <i
                      className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                    ></i>
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-white shadow-lg transition duration-200 hover:from-blue-700 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
              >
                <i className="fas fa-sign-in-alt"></i>
                <span>Sign In</span>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center">
              <a
                href="/admin/"
                className="inline-flex items-center gap-2 text-sm text-gray-600 transition duration-200 hover:text-blue-600"
              >
                <i className="fas fa-cog"></i>
                <span>Admin Access</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
