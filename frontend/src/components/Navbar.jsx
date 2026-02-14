import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from './ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className="glass-morphism fixed top-0 right-0 left-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-600">
                {/* Replace with your <img> tag if you have the file */}
                <span className="text-sm font-bold text-white">C</span>
              </div>
              <span className="text-xl font-semibold tracking-tight text-gray-900">
                CHALAYO
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden items-center space-x-8 lg:flex">
              <a
                href="#features"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Features
              </a>
              <a
                href="#solutions"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Solutions
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Pricing
              </a>
              <a
                href="#resources"
                className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
              >
                Resources
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              {/* changed to Link for client-side navigation, using reusable Button */}
              <Button
                to="/login"
                className="hidden items-center justify-center px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:text-blue-700 lg:inline-flex"
              >
                Sign In
              </Button>
              <a
                href="#start-free"
                className="inline-flex items-center justify-center rounded-lg bg-linear-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:shadow-lg"
              >
                Start Free Trial
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-600 focus:outline-none lg:hidden"
              >
                {isOpen ? (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Logic matching your HTML */}
      <div
        className={`fixed inset-0 z-40 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
      >
        {/* Backdrop */}
        <div
          className="bg-opacity-50 fixed inset-0 bg-black"
          onClick={toggleMenu}
        ></div>

        {/* Menu Panel */}
        <div
          className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs transform bg-white shadow-xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b p-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                  C
                </div>
                <span className="text-xl font-semibold text-gray-900">
                  CHALAYO
                </span>
              </div>
              <button
                onClick={toggleMenu}
                className="p-2 text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 space-y-6 p-6">
              <a
                href="#features"
                onClick={toggleMenu}
                className="block text-lg font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                Features
              </a>
              <a
                href="#solutions"
                onClick={toggleMenu}
                className="block text-lg font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                Solutions
              </a>
              <a
                href="#pricing"
                onClick={toggleMenu}
                className="block text-lg font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                Pricing
              </a>
              <a
                href="#resources"
                onClick={toggleMenu}
                className="block text-lg font-medium text-gray-700 transition-colors hover:text-blue-600"
              >
                Resources
              </a>

              <div className="mt-12 space-y-4">
                <Button
                  to="/login"
                  className="block w-full rounded-lg bg-linear-to-r from-blue-500 to-purple-600 px-4 py-3 text-center font-medium text-white"
                >
                  Sign In
                </Button>
                <a
                  href="#start-free"
                  className="block w-full rounded-lg border-2 border-gray-200 px-4 py-3 text-center font-medium text-gray-700"
                >
                  Start Free Trial
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
