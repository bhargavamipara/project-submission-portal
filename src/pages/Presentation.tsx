import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, Maximize2 } from "lucide-react";

const TOTAL_SLIDES = 15;

const SlideWrapper = ({ children, slideNumber }: { children: React.ReactNode; slideNumber?: number }) => (
  <div className="relative w-full h-full bg-white" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
    {children}
    {slideNumber && (
      <div className="absolute bottom-4 right-8 text-gray-400 text-sm">{slideNumber}</div>
    )}
  </div>
);

// ─── Slide 1: Title ───
const Slide1 = () => (
  <SlideWrapper>
    <div className="flex flex-col items-center justify-center h-full p-12 text-center">
      <div className="mb-4">
        <div className="text-3xl font-bold text-blue-900 tracking-wide">DU</div>
        <div className="text-lg font-semibold text-blue-800">Darshan University</div>
      </div>
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white px-12 py-6 rounded-lg mb-6 w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-2">🍽️ Dining Hall Management System</h1>
        <p className="text-lg opacity-90">Capstone Project (2304CS600)</p>
        <p className="text-base opacity-80">BCA/BSc.IT SEMESTER-6</p>
      </div>
      <div className="text-xl text-gray-700 mb-2">
        <span className="font-semibold">&lt;Your Name&gt;</span> - <span>&lt;Enrollment No.&gt;</span>
      </div>
      <div className="mt-6 text-gray-600">
        <p className="font-semibold">Internal Guide:</p>
        <p>Prof. &lt;Guide Name&gt;</p>
      </div>
      <div className="mt-4 text-gray-500 text-sm">Darshan University</div>
    </div>
  </SlideWrapper>
);

// ─── Slide 2: Outline ───
const Slide2 = () => (
  <SlideWrapper slideNumber={2}>
    <div className="flex flex-col h-full">
      <div className="bg-blue-800 text-white px-10 py-4">
        <div className="text-xs opacity-70">Darshan University • #2304CS600 (Capstone Project / Internship)</div>
      </div>
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-8">Outline</h2>
        <ul className="space-y-3 text-lg text-gray-700">
          {["Abstract", "Problems of Existing System", "Scope & Advantage", "System Requirement", "Module List", "Module Detailing", "Database Schema", "System Design", "Implementation Screenshots", "Limitations", "Conclusion", "Reference"].map((item, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-sm font-bold">{i + 1}</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </SlideWrapper>
);

// ─── Slide 3: Abstract ───
const Slide3 = () => (
  <SlideWrapper slideNumber={3}>
    <div className="flex flex-col h-full">
      <div className="bg-blue-800 text-white px-10 py-4">
        <div className="text-xs opacity-70">Darshan University • #2304CS600 (Capstone Project / Internship)</div>
      </div>
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Abstract</h2>
        <div className="text-gray-700 leading-relaxed text-lg space-y-4">
          <p>
            The <strong>Dining Hall Management System</strong> is a full-stack web application designed to automate and streamline university dining hall operations. It provides role-based access for three user types: <strong>Admin</strong>, <strong>Staff</strong>, and <strong>Student</strong>.
          </p>
          <p>
            The system allows students to browse daily menus, book meals in advance, and track their booking history. Staff members can mark attendance for booked students during meal times. Administrators have complete control over user management, menu configuration, and report generation with export capabilities (PDF, Excel, CSV).
          </p>
          <p>
            Built using <strong>React.js</strong> for the frontend and <strong>Node.js</strong> with <strong>Express.js</strong> for the backend, connected to a <strong>MySQL</strong> database. Authentication is handled via <strong>JWT</strong> tokens with <strong>bcrypt</strong> password hashing, and role-based middleware ensures secure access control.
          </p>
        </div>
      </div>
    </div>
  </SlideWrapper>
);

// ─── Slide 4: Problems of Existing System ───
const Slide4 = () => (
  <SlideWrapper slideNumber={4}>
    <div className="flex flex-col h-full">
      <div className="bg-blue-800 text-white px-10 py-4">
        <div className="text-xs opacity-70">Darshan University • #2304CS600 (Capstone Project / Internship)</div>
      </div>
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Problems of Existing System</h2>
        <ul className="space-y-4 text-lg text-gray-700">
          {[
            "Manual meal booking process using paper registers leading to errors and delays",
            "No real-time tracking of meal attendance, causing food wastage",
            "Difficult to manage menus across breakfast, lunch, and dinner manually",
            "No centralized system for admins to monitor bookings and generate reports",
            "Students cannot view meal availability or book in advance",
            "Staff has no efficient way to mark attendance for large groups",
            "No role-based access control — anyone can modify records",
            "Report generation requires manual data compilation in spreadsheets",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 w-3 h-3 rounded-full bg-red-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </SlideWrapper>
);

// ─── Slide 5: Scope & Advantage ───
const Slide5 = () => (
  <SlideWrapper slideNumber={5}>
    <div className="flex flex-col h-full">
      <div className="bg-blue-800 text-white px-10 py-4">
        <div className="text-xs opacity-70">Darshan University • #2304CS600 (Capstone Project / Internship)</div>
      </div>
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Scope & Advantage</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-green-700 mb-4">📌 Scope</h3>
            <ul className="space-y-3 text-gray-700">
              {[
                "Applicable to any university or college dining facility",
                "Scalable to support multiple dining halls",
                "Can be extended with payment gateway integration",
                "Future scope: Mobile app, nutrition tracking, feedback system",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2"><span className="text-green-500">✓</span>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-blue-700 mb-4">⭐ Advantages</h3>
            <ul className="space-y-3 text-gray-700">
              {[
                "Eliminates manual paper-based processes",
                "Real-time attendance tracking reduces food wastage",
                "Role-based security ensures data protection",
                "Automated report generation saves admin time",
                "Modern UI for better user experience",
                "Cloud-based — accessible from anywhere",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2"><span className="text-blue-500">✓</span>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </SlideWrapper>
);

// ─── Slide 6: System Requirement ───
const Slide6 = () => (
  <SlideWrapper slideNumber={6}>
    <div className="flex flex-col h-full">
      <div className="bg-blue-800 text-white px-10 py-4">
        <div className="text-xs opacity-70">Darshan University • #2304CS600 (Capstone Project / Internship)</div>
      </div>
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">System Requirement</h2>
        <div className="grid grid-cols-2 gap-10">
          <div className="bg-gray-50 rounded-xl p-6 border">
            <h3 className="text-xl font-bold text-orange-600 mb-4">🖥️ Hardware Requirements</h3>
            <table className="w-full text-gray-700">
              <tbody>
                {[
                  ["Processor", "Intel i3 or above"],
                  ["RAM", "4 GB minimum"],
                  ["Storage", "256 GB SSD"],
                  ["Internet", "Broadband connection"],
                  ["Display", "1366×768 or higher"],
                ].map(([k, v], i) => (
                  <tr key={i} className="border-b"><td className="py-2 font-semibold">{k}</td><td className="py-2">{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 rounded-xl p-6 border">
            <h3 className="text-xl font-bold text-purple-600 mb-4">💻 Software Requirements</h3>
            <table className="w-full text-gray-700">
              <tbody>
                {[
                  ["Frontend", "React.js, Tailwind CSS, Vite"],
                  ["Backend", "Node.js, Express.js"],
                  ["Database", "MySQL with mysql2 driver"],
                  ["Auth", "JWT (jsonwebtoken) + bcryptjs"],
                  ["Libraries", "shadcn/ui, jspdf, xlsx, date-fns"],
                  ["Browser", "Chrome / Firefox / Edge"],
                  ["OS", "Windows / macOS / Linux"],
                  ["IDE", "VS Code"],
                ].map(([k, v], i) => (
                  <tr key={i} className="border-b"><td className="py-2 font-semibold">{k}</td><td className="py-2">{v}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </SlideWrapper>
);

// ─── Slide 7: Module List ───
const Slide7 = () => (
  <SlideWrapper slideNumber={7}>
    <div className="flex flex-col h-full">
      <div className="bg-blue-800 text-white px-10 py-4">
        <div className="text-xs opacity-70">Darshan University • #2304CS600 (Capstone Project / Internship)</div>
      </div>
      <div className="flex-1 p-10" style={{ backgroundColor: '#1a1a2e' }}>
        <h2 className="text-3xl font-bold text-white mb-8">Module List</h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: "🔐", title: "Authentication Module", desc: "Login / Signup with role-based routing" },
            { icon: "👨‍💼", title: "Admin Dashboard", desc: "Overview stats, quick actions, activity feed" },
            { icon: "👥", title: "User Management", desc: "CRUD users, assign roles, search & filter" },
            { icon: "🍔", title: "Menu Management", desc: "Add/edit menu items, toggle availability" },
            { icon: "📊", title: "Reports & Export", desc: "Filter reports, export PDF/Excel/CSV" },
            { icon: "✅", title: "Attendance Marking", desc: "Staff marks present/absent for bookings" },
            { icon: "📅", title: "Meal Booking", desc: "Students book meals by date & type" },
            { icon: "📋", title: "My Bookings", desc: "View, filter, and cancel bookings" },
            { icon: "🎓", title: "Student Dashboard", desc: "Personal stats, recent bookings overview" },
          ].map((mod, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 text-center flex flex-col items-center justify-center"
              style={{
                backgroundColor: '#16213e',
                border: '1px solid #1a1a4e',
                minHeight: '140px',
              }}
            >
              <span className="text-4xl mb-3">{mod.icon}</span>
              <h4 className="font-bold text-white text-lg mb-1">{mod.title}</h4>
              <p className="text-sm text-gray-400">{mod.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </SlideWrapper>
);

// ─── Slide 8: Module Detailing ───
const Slide8 = () => (
  <SlideWrapper slideNumber={8}>
    <div className="flex flex-col h-full">
      <div className="bg-blue-800 text-white px-10 py-4">
        <div className="text-xs opacity-70">Darshan University • #2304CS600 (Capstone Project / Internship)</div>
      </div>
      <div className="flex-1 p-10 overflow-auto">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Module Detailing</h2>
        <div className="space-y-5 text-gray-700 text-[15px]">
          <div>
          <h4 className="font-bold text-blue-800">1. Authentication Module</h4>
            <p>Handles user login with email/password. Uses JWT tokens issued by the Express backend with role-based redirect — Admin → /admin, Staff → /staff, Student → /student. Session persists via localStorage tokens. Protected routes and Express middleware guard against unauthorized access.</p>
          </div>
          <div>
            <h4 className="font-bold text-green-800">2. Admin Module (Dashboard + User Management + Menu + Reports)</h4>
            <p>Admin dashboard shows stats: total users, today's bookings, menu items, active staff. User Management provides full CRUD with role assignment. Menu Management allows adding/editing items with meal type, category, price, and availability toggle. Reports page supports date range and meal type filters with PDF, Excel, and CSV export.</p>
          </div>
          <div>
            <h4 className="font-bold text-teal-800">3. Staff Module (Attendance)</h4>
            <p>Staff selects a date and meal type to see all confirmed bookings. Each student can be marked Present or Absent. A summary bar shows total, present, and absent counts. Attendance is recorded with the staff member's ID and timestamp.</p>
          </div>
          <div>
            <h4 className="font-bold text-purple-800">4. Student Module (Dashboard + Book Meal + My Bookings)</h4>
            <p>Student dashboard displays personal stats and recent bookings. Book Meal page has a calendar (past dates blocked), meal type selector, and menu preview. Duplicate bookings are prevented. My Bookings shows all bookings with status badges and cancellation option for upcoming ones.</p>
          </div>
        </div>
      </div>
    </div>
  </SlideWrapper>
);

// ─── Slide 9: Database Schema ───
const Slide9 = () => (
  <SlideWrapper slideNumber={9}>
    <div className="flex flex-col h-full">
      <div className="bg-blue-800 text-white px-10 py-4">
        <div className="text-xs opacity-70">Darshan University • #2304CS600 (Capstone Project / Internship)</div>
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Database Schema (MySQL)</h2>
        <div className="grid grid-cols-3 gap-4 text-sm">
          {/* Users */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-blue-600 text-white px-3 py-1.5 font-bold text-sm">users</div>
            <table className="w-full text-xs">
              <thead className="bg-gray-100"><tr><th className="px-2 py-1 text-left">Column</th><th className="px-2 py-1 text-left">Type</th><th className="px-2 py-1">Key</th></tr></thead>
              <tbody>
                <tr className="border-t"><td className="px-2 py-1 font-medium">id</td><td>INT AUTO_INCREMENT</td><td className="text-yellow-600 font-bold text-center">PK</td></tr>
                <tr className="border-t bg-gray-50"><td className="px-2 py-1">full_name</td><td>VARCHAR(255)</td><td></td></tr>
                <tr className="border-t"><td className="px-2 py-1">email</td><td>VARCHAR(255) UNIQUE</td><td></td></tr>
                <tr className="border-t bg-gray-50"><td className="px-2 py-1">password</td><td>VARCHAR(255)</td><td></td></tr>
                <tr className="border-t"><td className="px-2 py-1">role</td><td>ENUM</td><td></td></tr>
                <tr className="border-t bg-gray-50"><td className="px-2 py-1">created_at</td><td>TIMESTAMP</td><td></td></tr>
              </tbody>
            </table>
          </div>
          {/* Menu Items */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-orange-600 text-white px-3 py-1.5 font-bold text-sm">menu_items</div>
            <table className="w-full text-xs">
              <thead className="bg-gray-100"><tr><th className="px-2 py-1 text-left">Column</th><th className="px-2 py-1 text-left">Type</th><th className="px-2 py-1">Key</th></tr></thead>
              <tbody>
                <tr className="border-t"><td className="px-2 py-1 font-medium">id</td><td>INT AUTO_INCREMENT</td><td className="text-yellow-600 font-bold text-center">PK</td></tr>
                <tr className="border-t bg-gray-50"><td className="px-2 py-1">name</td><td>VARCHAR(255)</td><td></td></tr>
                <tr className="border-t"><td className="px-2 py-1">meal_type</td><td>ENUM</td><td></td></tr>
                <tr className="border-t bg-gray-50"><td className="px-2 py-1">category</td><td>VARCHAR(100)</td><td></td></tr>
                <tr className="border-t"><td className="px-2 py-1">price</td><td>DECIMAL(10,2)</td><td></td></tr>
                <tr className="border-t bg-gray-50"><td className="px-2 py-1">quantity</td><td>INT</td><td></td></tr>
                <tr className="border-t"><td className="px-2 py-1">availability</td><td>BOOLEAN</td><td></td></tr>
              </tbody>
            </table>
          </div>
          {/* Bookings */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-purple-600 text-white px-3 py-1.5 font-bold text-sm">bookings</div>
            <table className="w-full text-xs">
              <thead className="bg-gray-100"><tr><th className="px-2 py-1 text-left">Column</th><th className="px-2 py-1 text-left">Type</th><th className="px-2 py-1">Key</th></tr></thead>
              <tbody>
                <tr className="border-t"><td className="px-2 py-1 font-medium">id</td><td>INT AUTO_INCREMENT</td><td className="text-yellow-600 font-bold text-center">PK</td></tr>
                <tr className="border-t bg-gray-50"><td className="px-2 py-1">user_id</td><td>INT</td><td className="text-blue-600 font-bold text-center">FK</td></tr>
                <tr className="border-t"><td className="px-2 py-1">menu_item_id</td><td>INT</td><td className="text-blue-600 font-bold text-center">FK</td></tr>
                <tr className="border-t bg-gray-50"><td className="px-2 py-1">date</td><td>DATE</td><td></td></tr>
                <tr className="border-t"><td className="px-2 py-1">meal_type</td><td>ENUM</td><td></td></tr>
                <tr className="border-t bg-gray-50"><td className="px-2 py-1">status</td><td>ENUM</td><td></td></tr>
              </tbody>
            </table>
          </div>
          {/* Attendance */}
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-red-600 text-white px-3 py-1.5 font-bold text-sm">attendance</div>
            <table className="w-full text-xs">
              <thead className="bg-gray-100"><tr><th className="px-2 py-1 text-left">Column</th><th className="px-2 py-1 text-left">Type</th><th className="px-2 py-1">Key</th></tr></thead>
              <tbody>
                <tr className="border-t"><td className="px-2 py-1 font-medium">id</td><td>INT AUTO_INCREMENT</td><td className="text-yellow-600 font-bold text-center">PK</td></tr>
                <tr className="border-t bg-gray-50"><td className="px-2 py-1">booking_id</td><td>INT</td><td className="text-blue-600 font-bold text-center">FK</td></tr>
                <tr className="border-t"><td className="px-2 py-1">status</td><td>ENUM</td><td></td></tr>
                <tr className="border-t bg-gray-50"><td className="px-2 py-1">marked_by</td><td>INT</td><td className="text-blue-600 font-bold text-center">FK</td></tr>
                <tr className="border-t"><td className="px-2 py-1">marked_at</td><td>TIMESTAMP</td><td></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </SlideWrapper>
);

// ─── Slide 10: System Design (ER Diagram + Use Case) ───
const Slide10 = () => (
  <SlideWrapper slideNumber={10}>
    <div className="flex flex-col h-full">
      <div className="bg-blue-800 text-white px-10 py-4">
        <div className="text-xs opacity-70">Darshan University • #2304CS600 (Capstone Project / Internship)</div>
      </div>
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">System Design — ER Diagram (MySQL)</h2>
        <div className="bg-white border-2 rounded-lg p-4">
          <svg viewBox="0 0 900 400" className="w-full h-auto">
            <rect x="30" y="30" width="150" height="140" fill="#3B82F6" rx="6"/>
            <text x="105" y="55" textAnchor="middle" fill="white" fontWeight="bold" fontSize="13">USERS</text>
            <rect x="38" y="65" width="134" height="98" fill="white" rx="3"/>
            <text x="50" y="82" fontSize="10" fontWeight="bold">id (PK) INT</text>
            <text x="50" y="96" fontSize="10">full_name</text>
            <text x="50" y="110" fontSize="10">email</text>
            <text x="50" y="124" fontSize="10">password</text>
            <text x="50" y="138" fontSize="10">role (ENUM)</text>
            <text x="50" y="152" fontSize="10">created_at</text>

            <rect x="250" y="30" width="150" height="160" fill="#F97316" rx="6"/>
            <text x="325" y="55" textAnchor="middle" fill="white" fontWeight="bold" fontSize="13">MENU_ITEMS</text>
            <rect x="258" y="65" width="134" height="118" fill="white" rx="3"/>
            <text x="270" y="82" fontSize="10" fontWeight="bold">id (PK) INT</text>
            <text x="270" y="96" fontSize="10">name, meal_type</text>
            <text x="270" y="110" fontSize="10">category</text>
            <text x="270" y="124" fontSize="10">price, quantity</text>
            <text x="270" y="138" fontSize="10">availability</text>

            <rect x="470" y="100" width="160" height="150" fill="#A855F7" rx="6"/>
            <text x="550" y="125" textAnchor="middle" fill="white" fontWeight="bold" fontSize="13">BOOKINGS</text>
            <rect x="478" y="135" width="144" height="108" fill="white" rx="3"/>
            <text x="490" y="152" fontSize="10" fontWeight="bold">id (PK) INT</text>
            <text x="490" y="166" fontSize="10">user_id (FK)</text>
            <text x="490" y="180" fontSize="10">menu_item_id (FK)</text>
            <text x="490" y="194" fontSize="10">date, meal_type</text>
            <text x="490" y="208" fontSize="10">status</text>
            <text x="490" y="222" fontSize="10">created_at</text>

            <rect x="700" y="130" width="150" height="130" fill="#EF4444" rx="6"/>
            <text x="775" y="155" textAnchor="middle" fill="white" fontWeight="bold" fontSize="13">ATTENDANCE</text>
            <rect x="708" y="165" width="134" height="88" fill="white" rx="3"/>
            <text x="720" y="182" fontSize="10" fontWeight="bold">id (PK) INT</text>
            <text x="720" y="196" fontSize="10">booking_id (FK)</text>
            <text x="720" y="210" fontSize="10">status</text>
            <text x="720" y="224" fontSize="10">marked_by (FK)</text>
            <text x="720" y="238" fontSize="10">marked_at</text>

            <line x1="105" y1="170" x2="105" y2="200" stroke="#333" strokeWidth="2"/>
            <text x="115" y="190" fontSize="9" fill="#666">1:N</text>
            <line x1="180" y1="100" x2="470" y2="175" stroke="#333" strokeWidth="2"/>
            <text x="320" y="130" fontSize="9" fill="#666">1:N</text>
            <line x1="400" y1="110" x2="470" y2="165" stroke="#333" strokeWidth="2"/>
            <text x="425" y="128" fontSize="9" fill="#666">1:N</text>
            <line x1="630" y1="195" x2="700" y2="195" stroke="#333" strokeWidth="2"/>
            <text x="658" y="188" fontSize="9" fill="#666">1:1</text>
          </svg>
        </div>
      </div>
    </div>
  </SlideWrapper>
);

// ─── Slide 11: Screenshots ───
const Slide11 = () => (
  <SlideWrapper slideNumber={11}>
    <div className="flex flex-col h-full">
      <div className="bg-blue-800 text-white px-10 py-4">
        <div className="text-xs opacity-70">Darshan University • #2304CS600 (Capstone Project / Internship)</div>
      </div>
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Implementation Screenshots</h2>
        <div className="grid grid-cols-2 gap-6">
          {[
            { title: "Login Page", desc: "Clean login with email/password and role-based redirect" },
            { title: "Admin Dashboard", desc: "Stats cards, user count, today's bookings overview" },
            { title: "Menu Management", desc: "Add/edit menu items with meal type and pricing" },
            { title: "Student — Book Meal", desc: "Calendar picker, meal type, menu preview cards" },
            { title: "Staff — Attendance", desc: "Mark present/absent with summary counters" },
            { title: "Reports & Export", desc: "Filter by date/meal type, export PDF/Excel/CSV" },
          ].map((item, i) => (
            <div key={i} className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center min-h-[120px]">
              <p className="font-bold text-gray-700 mb-1">{item.title}</p>
              <p className="text-sm text-gray-500 text-center">{item.desc}</p>
              <p className="text-xs text-gray-400 mt-2 italic">(Add screenshot here)</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </SlideWrapper>
);

// ─── Slide 12: Limitations ───
const Slide12 = () => (
  <SlideWrapper slideNumber={12}>
    <div className="flex flex-col h-full">
      <div className="bg-blue-800 text-white px-10 py-4">
        <div className="text-xs opacity-70">Darshan University • #2304CS600 (Capstone Project / Internship)</div>
      </div>
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Limitations</h2>
        <ul className="space-y-4 text-lg text-gray-700">
          {[
            "No payment gateway integration — meal booking is free of charge currently",
            "No mobile native app — only accessible via web browser",
            "No push notifications for booking reminders",
            "Does not support multi-campus or multi-dining-hall setup",
            "No nutritional information or calorie tracking for menu items",
            "No student feedback or rating system for meals",
            "Attendance must be marked manually by staff — no QR code or biometric integration",
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-1 w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </SlideWrapper>
);

// ─── Slide 13: Conclusion ───
const Slide13 = () => (
  <SlideWrapper slideNumber={13}>
    <div className="flex flex-col h-full">
      <div className="bg-blue-800 text-white px-10 py-4">
        <div className="text-xs opacity-70">Darshan University • #2304CS600 (Capstone Project / Internship)</div>
      </div>
      <div className="flex-1 p-10 flex items-center">
        <div>
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Conclusion</h2>
          <div className="text-lg text-gray-700 leading-relaxed space-y-4">
            <p>
              The <strong>Dining Hall Management System</strong> successfully addresses the inefficiencies of manual dining hall operations in universities. By providing role-based access for Admins, Staff, and Students, it ensures secure and organized management of meals, bookings, and attendance.
            </p>
            <p>
              The system demonstrates practical application of modern web technologies including <strong>React.js</strong> for the frontend, <strong>Node.js</strong> with <strong>Express.js</strong> for the REST API backend, and <strong>MySQL</strong> for relational data storage. JWT-based authentication and role-based middleware ensure data protection.
            </p>
            <p>
              Key achievements include automated report generation with multi-format export, real-time meal booking with duplicate prevention, and efficient attendance tracking. The application follows the MVC architecture pattern and is ready for deployment in any educational institution's dining facility.
            </p>
          </div>
        </div>
      </div>
    </div>
  </SlideWrapper>
);

// ─── Slide 14: Reference ───
const Slide14 = () => (
  <SlideWrapper slideNumber={14}>
    <div className="flex flex-col h-full">
      <div className="bg-blue-800 text-white px-10 py-4">
        <div className="text-xs opacity-70">Darshan University • #2304CS600 (Capstone Project / Internship)</div>
      </div>
      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">References</h2>
        <ol className="space-y-4 text-gray-700 list-decimal list-inside text-lg">
          <li>React.js Official Documentation — <span className="text-blue-600">https://react.dev</span></li>
          <li>Node.js Documentation — <span className="text-blue-600">https://nodejs.org/docs</span></li>
          <li>Express.js Documentation — <span className="text-blue-600">https://expressjs.com</span></li>
          <li>MySQL Documentation — <span className="text-blue-600">https://dev.mysql.com/doc</span></li>
          <li>Tailwind CSS Documentation — <span className="text-blue-600">https://tailwindcss.com/docs</span></li>
          <li>shadcn/ui Component Library — <span className="text-blue-600">https://ui.shadcn.com</span></li>
          <li>JSON Web Tokens (JWT) — <span className="text-blue-600">https://jwt.io</span></li>
          <li>jsPDF Library — <span className="text-blue-600">https://github.com/parallax/jsPDF</span></li>
          <li>SheetJS (xlsx) — <span className="text-blue-600">https://sheetjs.com</span></li>
          <li>Lucide Icons — <span className="text-blue-600">https://lucide.dev</span></li>
        </ol>
      </div>
    </div>
  </SlideWrapper>
);

// ─── Slide 15: Thank You ───
const Slide15 = () => (
  <SlideWrapper>
    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-800 to-blue-950 text-white text-center p-12">
      <div className="text-6xl mb-8">🙏</div>
      <h1 className="text-5xl font-bold mb-4">Thank You</h1>
      <p className="text-xl opacity-80 mb-8">Questions & Suggestions are welcome</p>
      <div className="mt-4">
        <div className="text-2xl font-bold">DU</div>
        <div className="text-lg opacity-70">Darshan University</div>
      </div>
    </div>
  </SlideWrapper>
);

const slides = [Slide1, Slide2, Slide3, Slide4, Slide5, Slide6, Slide7, Slide8, Slide9, Slide10, Slide11, Slide12, Slide13, Slide14, Slide15];

const Presentation = () => {
  const [current, setCurrent] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const goFullscreen = () => {
    containerRef.current?.requestFullscreen?.();
  };

  const SlideComponent = slides[current];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Toolbar */}
      <div className="bg-gray-800 text-white px-6 py-3 flex items-center justify-between">
        <h1 className="text-lg font-semibold">📽️ Project Presentation — Phase 1 Evaluation</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Slide {current + 1} / {TOTAL_SLIDES}</span>
          <Button variant="outline" size="sm" onClick={goFullscreen} className="text-white border-gray-600 hover:bg-gray-700">
            <Maximize2 className="h-4 w-4 mr-1" /> Fullscreen
          </Button>
        </div>
      </div>

      {/* Slide Area */}
      <div ref={containerRef} className="flex-1 flex items-center justify-center p-8 bg-gray-900">
        <div className="w-full max-w-5xl aspect-[16/9] bg-white rounded-lg shadow-2xl overflow-hidden">
          <SlideComponent />
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-gray-800 px-6 py-3 flex items-center justify-center gap-4">
        <Button variant="outline" size="sm" onClick={() => setCurrent(Math.max(0, current - 1))} disabled={current === 0} className="text-white border-gray-600 hover:bg-gray-700">
          <ChevronLeft className="h-4 w-4 mr-1" /> Previous
        </Button>
        <div className="flex gap-1">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-colors ${i === current ? 'bg-blue-500' : 'bg-gray-600 hover:bg-gray-500'}`} />
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={() => setCurrent(Math.min(TOTAL_SLIDES - 1, current + 1))} disabled={current === TOTAL_SLIDES - 1} className="text-white border-gray-600 hover:bg-gray-700">
          Next <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default Presentation;
