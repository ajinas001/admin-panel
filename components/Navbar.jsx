import { useState } from "react";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaEnvelope,
} from "react-icons/fa";
import {  Key, RefreshCcw, LogOut } from "lucide-react";
import { Settings, CalendarDays, User, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] =
    useState(false);

  return (
    <header className="bg-white me-0 md:me-20">
      <div className="flex items-center justify-between px-4 py-3">
     
        <div className="text-lg font-bold text-gray-800 lg:hidden ms-8">
          Dashboard
        </div>

       
        <div className="flex-1 max-w-md mx-auto hidden md:flex justify-center">
          <div className="relative w-90">
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-10 bg-[#eaeaeb] pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute left-3 top-2.5 text-gray-400 ">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right side elements */}
        <div className="flex items-center space-x-12">
         
          <div className="relative">
            <button
              onClick={() =>
                setIsNotificationDropdownOpen(!isNotificationDropdownOpen)
              }
              className="relative"
            >
              <FaBell className="h-6 w-6 text-blue-500" />
              <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                6
              </span>
            </button>
            {isNotificationDropdownOpen && (
              <div className="absolute  right-0  ms-40 md:me-0 mt-2 w-66 z-40 bg-white  rounded-xl border border-gray-200">
                <div className="px-4 py-2 font-semibold text-gray-800 border-b border-gray-100">
                  Notification
                </div>
                <ul className="py-2 text-sm text-gray-600">
                  <li className="px-4 py-2 flex items-start space-x-3 hover:bg-gray-100 cursor-pointer">
                    <div className="p-1 rounded-full bg-blue-100">
                      <Settings className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <div className="font-medium">Settings</div>
                      <div className="text-xs text-gray-500">
                        Update Dashboard
                      </div>
                    </div>
                  </li>
                  <li className="px-4 py-2 flex items-start space-x-3 hover:bg-gray-100 cursor-pointer">
                    <div className="p-1 rounded-full bg-pink-100">
                      <CalendarDays className="h-5 w-5 text-pink-500" />
                    </div>
                    <div>
                      <div className="font-medium">Event Update</div>
                      <div className="text-xs text-gray-500">
                        An event date update again
                      </div>
                    </div>
                  </li>
                  <li className="px-4 py-2 flex items-start space-x-3 hover:bg-gray-100 cursor-pointer">
                    <div className="p-1 rounded-full bg-purple-100">
                      <User className="h-5 w-5 text-purple-500" />
                    </div>
                    <div>
                      <div className="font-medium">Profile</div>
                      <div className="text-xs text-gray-500">
                        Update your profile
                      </div>
                    </div>
                  </li>
                  <li className="px-4 py-2 flex items-start space-x-3 hover:bg-gray-100 cursor-pointer">
                    <div className="p-1 rounded-full bg-red-100">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                    <div>
                      <div className="font-medium">Application Error</div>
                      <div className="text-xs text-gray-500">
                        Check your running application
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="px-4 py-2 text-center text-sm text-gray-500 hover:underline cursor-pointer">
                  See all notification
                </div>
              </div>
            )}
          </div>

        
          <div className="relative">
            <button
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              className="flex items-center"
            >
              <img
                src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="User Avatar"
                className="h-8 w-8 rounded-full object-cover border-2 border-gray-200"
              />
              <div className="ml-2 hidden md:block">
                <div className="text-sm font-medium">Kalyani Kumar</div>
                <div className="text-xs text-gray-500">Admin</div>
              </div>
              <svg
                className="h-6 w-6 ml-2 text-gray-500 border border-gray-700 p-1 rounded-full"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 z-40 bg-white shadow-lg rounded-md border border-gray-200">
                <ul className="py-2 text-sm text-gray-700">
                  <li className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
                    <User className="h-4 w-4 text-blue-500" />
                    <span>Manage Account</span>
                  </li>
                  <li className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
                    <Key className="h-4 w-4 text-pink-500" />
                    <span>Change Password</span>
                  </li>
                  <li className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
                    <RefreshCcw className="h-4 w-4 text-purple-500" />
                    <span>Activity Log</span>
                  </li>
                  <Link href={'/'}>
                  <li className="px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 cursor-pointer">
                    <LogOut className="h-4 w-4 text-red-500" />
                    <span>Log out</span>
                  </li>
                  </Link>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

     
      <div className="p-2 md:hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
