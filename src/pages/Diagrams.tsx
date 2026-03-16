import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Diagrams = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          🍽️ Dining Hall Management System - UML Diagrams
        </h1>
        
        <Tabs defaultValue="tables" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="tables">Tables</TabsTrigger>
            <TabsTrigger value="erd">ER Diagram</TabsTrigger>
            <TabsTrigger value="usecase">Use Case</TabsTrigger>
            <TabsTrigger value="class">Class</TabsTrigger>
            <TabsTrigger value="sequence">Sequence</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          {/* Database Tables */}
          <TabsContent value="tables">
            <Card>
              <CardHeader>
                <CardTitle>📊 Database Tables Structure</CardTitle>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Users Table */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-blue-600 text-white px-4 py-2 font-bold">users</div>
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left">Column</th>
                          <th className="px-3 py-2 text-left">Type</th>
                          <th className="px-3 py-2 text-left">Key</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t"><td className="px-3 py-2 font-medium">id</td><td>INT AUTO_INCREMENT</td><td className="text-yellow-600 font-bold">PK</td></tr>
                        <tr className="border-t bg-gray-50"><td className="px-3 py-2">full_name</td><td>VARCHAR(255)</td><td></td></tr>
                        <tr className="border-t"><td className="px-3 py-2">email</td><td>VARCHAR(255) UNIQUE</td><td></td></tr>
                        <tr className="border-t bg-gray-50"><td className="px-3 py-2">password</td><td>VARCHAR(255)</td><td></td></tr>
                        <tr className="border-t"><td className="px-3 py-2">role</td><td>ENUM</td><td></td></tr>
                        <tr className="border-t bg-gray-50"><td className="px-3 py-2">avatar_url</td><td>VARCHAR(500)</td><td></td></tr>
                        <tr className="border-t"><td className="px-3 py-2">created_at</td><td>TIMESTAMP</td><td></td></tr>
                        <tr className="border-t bg-gray-50"><td className="px-3 py-2">updated_at</td><td>TIMESTAMP</td><td></td></tr>
                      </tbody>
                    </table>
                    <div className="bg-gray-100 px-3 py-2 text-xs">
                      <strong>role:</strong> admin | staff | student
                    </div>
                  </div>

                  {/* Menu Items Table */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-orange-600 text-white px-4 py-2 font-bold">menu_items</div>
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left">Column</th>
                          <th className="px-3 py-2 text-left">Type</th>
                          <th className="px-3 py-2 text-left">Key</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t"><td className="px-3 py-2 font-medium">id</td><td>INT AUTO_INCREMENT</td><td className="text-yellow-600 font-bold">PK</td></tr>
                        <tr className="border-t bg-gray-50"><td className="px-3 py-2">name</td><td>VARCHAR(255)</td><td></td></tr>
                        <tr className="border-t"><td className="px-3 py-2">meal_type</td><td>ENUM</td><td></td></tr>
                        <tr className="border-t bg-gray-50"><td className="px-3 py-2">category</td><td>VARCHAR(100)</td><td></td></tr>
                        <tr className="border-t"><td className="px-3 py-2">description</td><td>TEXT</td><td></td></tr>
                        <tr className="border-t bg-gray-50"><td className="px-3 py-2">price</td><td>DECIMAL(10,2)</td><td></td></tr>
                        <tr className="border-t"><td className="px-3 py-2">quantity</td><td>INT</td><td></td></tr>
                        <tr className="border-t bg-gray-50"><td className="px-3 py-2">availability</td><td>BOOLEAN</td><td></td></tr>
                        <tr className="border-t"><td className="px-3 py-2">created_at</td><td>TIMESTAMP</td><td></td></tr>
                        <tr className="border-t bg-gray-50"><td className="px-3 py-2">updated_at</td><td>TIMESTAMP</td><td></td></tr>
                      </tbody>
                    </table>
                    <div className="bg-gray-100 px-3 py-2 text-xs">
                      <strong>meal_type:</strong> breakfast | lunch | dinner
                    </div>
                  </div>

                  {/* Bookings Table */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-purple-600 text-white px-4 py-2 font-bold">bookings</div>
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left">Column</th>
                          <th className="px-3 py-2 text-left">Type</th>
                          <th className="px-3 py-2 text-left">Key</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t"><td className="px-3 py-2 font-medium">id</td><td>INT AUTO_INCREMENT</td><td className="text-yellow-600 font-bold">PK</td></tr>
                        <tr className="border-t bg-gray-50"><td className="px-3 py-2">user_id</td><td>INT</td><td className="text-blue-600 font-bold">FK</td></tr>
                        <tr className="border-t"><td className="px-3 py-2">menu_item_id</td><td>INT</td><td className="text-blue-600 font-bold">FK</td></tr>
                        <tr className="border-t bg-gray-50"><td className="px-3 py-2">date</td><td>DATE</td><td></td></tr>
                        <tr className="border-t"><td className="px-3 py-2">meal_type</td><td>ENUM</td><td></td></tr>
                        <tr className="border-t bg-gray-50"><td className="px-3 py-2">status</td><td>ENUM</td><td></td></tr>
                        <tr className="border-t"><td className="px-3 py-2">created_at</td><td>TIMESTAMP</td><td></td></tr>
                        <tr className="border-t bg-gray-50"><td className="px-3 py-2">updated_at</td><td>TIMESTAMP</td><td></td></tr>
                      </tbody>
                    </table>
                    <div className="bg-gray-100 px-3 py-2 text-xs">
                      <strong>status:</strong> pending | confirmed | completed | cancelled
                    </div>
                  </div>

                  {/* Attendance Table */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-red-600 text-white px-4 py-2 font-bold">attendance</div>
                    <table className="w-full text-sm">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-3 py-2 text-left">Column</th>
                          <th className="px-3 py-2 text-left">Type</th>
                          <th className="px-3 py-2 text-left">Key</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t"><td className="px-3 py-2 font-medium">id</td><td>INT AUTO_INCREMENT</td><td className="text-yellow-600 font-bold">PK</td></tr>
                        <tr className="border-t bg-gray-50"><td className="px-3 py-2">booking_id</td><td>INT</td><td className="text-blue-600 font-bold">FK</td></tr>
                        <tr className="border-t"><td className="px-3 py-2">status</td><td>ENUM</td><td></td></tr>
                        <tr className="border-t bg-gray-50"><td className="px-3 py-2">marked_by</td><td>INT</td><td className="text-blue-600 font-bold">FK</td></tr>
                        <tr className="border-t"><td className="px-3 py-2">marked_at</td><td>TIMESTAMP</td><td></td></tr>
                      </tbody>
                    </table>
                    <div className="bg-gray-100 px-3 py-2 text-xs">
                      <strong>status:</strong> present | absent
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ER Diagram */}
          <TabsContent value="erd">
            <Card>
              <CardHeader>
                <CardTitle>🔗 Entity-Relationship Diagram</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
                  <svg viewBox="0 0 1000 600" className="w-full h-auto">
                    {/* Users Entity */}
                    <rect x="50" y="50" width="180" height="180" fill="#3B82F6" rx="8"/>
                    <text x="140" y="80" textAnchor="middle" fill="white" fontWeight="bold" fontSize="16">USERS</text>
                    <rect x="60" y="95" width="160" height="125" fill="white" rx="4"/>
                    <text x="75" y="115" fontSize="11" fontWeight="bold">id (PK) INT</text>
                    <text x="75" y="132" fontSize="11">full_name</text>
                    <text x="75" y="149" fontSize="11">email</text>
                    <text x="75" y="166" fontSize="11">password</text>
                    <text x="75" y="183" fontSize="11">role (ENUM)</text>
                    <text x="75" y="200" fontSize="11">created_at</text>

                    {/* Menu Items Entity */}
                    <rect x="300" y="50" width="180" height="220" fill="#F97316" rx="8"/>
                    <text x="390" y="80" textAnchor="middle" fill="white" fontWeight="bold" fontSize="16">MENU_ITEMS</text>
                    <rect x="310" y="95" width="160" height="165" fill="white" rx="4"/>
                    <text x="325" y="115" fontSize="11" fontWeight="bold">id (PK) INT</text>
                    <text x="325" y="132" fontSize="11">name</text>
                    <text x="325" y="149" fontSize="11">meal_type (ENUM)</text>
                    <text x="325" y="166" fontSize="11">category</text>
                    <text x="325" y="183" fontSize="11">description</text>
                    <text x="325" y="200" fontSize="11">price DECIMAL</text>
                    <text x="325" y="217" fontSize="11">quantity INT</text>
                    <text x="325" y="234" fontSize="11">availability BOOL</text>

                    {/* Meal Bookings Entity */}
                    <rect x="550" y="150" width="180" height="200" fill="#A855F7" rx="8"/>
                    <text x="640" y="180" textAnchor="middle" fill="white" fontWeight="bold" fontSize="16">MEAL_BOOKINGS</text>
                    <rect x="560" y="195" width="160" height="145" fill="white" rx="4"/>
                    <text x="575" y="215" fontSize="11" fontWeight="bold">id (PK)</text>
                    <text x="575" y="232" fontSize="11">user_id (FK)</text>
                    <text x="575" y="249" fontSize="11">menu_item_id (FK)</text>
                    <text x="575" y="266" fontSize="11">date</text>
                    <text x="575" y="283" fontSize="11">meal_type</text>
                    <text x="575" y="300" fontSize="11">status</text>
                    <text x="575" y="317" fontSize="11">created_at</text>

                    {/* Attendance Entity */}
                    <rect x="800" y="200" width="180" height="160" fill="#EF4444" rx="8"/>
                    <text x="890" y="230" textAnchor="middle" fill="white" fontWeight="bold" fontSize="16">ATTENDANCE</text>
                    <rect x="810" y="245" width="160" height="105" fill="white" rx="4"/>
                    <text x="825" y="265" fontSize="11" fontWeight="bold">id (PK)</text>
                    <text x="825" y="282" fontSize="11">booking_id (FK)</text>
                    <text x="825" y="299" fontSize="11">status</text>
                    <text x="825" y="316" fontSize="11">marked_by (FK)</text>
                    <text x="825" y="333" fontSize="11">marked_at</text>

                    {/* Relationships */}
                    {/* Profiles -> User Roles */}
                    <line x1="140" y1="230" x2="140" y2="280" stroke="#333" strokeWidth="2"/>
                    <text x="145" y="260" fontSize="10">1:N</text>

                    {/* Profiles -> Meal Bookings */}
                    <line x1="230" y1="140" x2="550" y2="220" stroke="#333" strokeWidth="2"/>
                    <text x="380" y="170" fontSize="10">1:N</text>

                    {/* Menu Items -> Meal Bookings */}
                    <line x1="480" y1="160" x2="550" y2="250" stroke="#333" strokeWidth="2"/>
                    <text x="500" y="195" fontSize="10">1:N</text>

                    {/* Meal Bookings -> Attendance */}
                    <line x1="730" y1="280" x2="800" y2="280" stroke="#333" strokeWidth="2"/>
                    <text x="755" y="270" fontSize="10">1:1</text>

                    {/* Profiles -> Attendance (marked_by) */}
                    <path d="M 230 120 Q 500 50 890 200" fill="none" stroke="#333" strokeWidth="2" strokeDasharray="5,5"/>
                    <text x="550" y="80" fontSize="10">marks (FK)</text>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Use Case Diagram */}
          <TabsContent value="usecase">
            <Card>
              <CardHeader>
                <CardTitle>👥 Use Case Diagram</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
                  <svg viewBox="0 0 900 550" className="w-full h-auto">
                    {/* System Boundary */}
                    <rect x="200" y="30" width="500" height="490" fill="none" stroke="#333" strokeWidth="2" rx="10"/>
                    <text x="450" y="60" textAnchor="middle" fontWeight="bold" fontSize="18">Dining Hall Management System</text>

                    {/* Actors */}
                    {/* Admin */}
                    <circle cx="80" cy="120" r="20" fill="none" stroke="#3B82F6" strokeWidth="2"/>
                    <line x1="80" y1="140" x2="80" y2="190" stroke="#3B82F6" strokeWidth="2"/>
                    <line x1="50" y1="160" x2="110" y2="160" stroke="#3B82F6" strokeWidth="2"/>
                    <line x1="80" y1="190" x2="50" y2="230" stroke="#3B82F6" strokeWidth="2"/>
                    <line x1="80" y1="190" x2="110" y2="230" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="80" y="255" textAnchor="middle" fontWeight="bold" fill="#3B82F6">Admin</text>

                    {/* Staff */}
                    <circle cx="80" cy="320" r="20" fill="none" stroke="#22C55E" strokeWidth="2"/>
                    <line x1="80" y1="340" x2="80" y2="390" stroke="#22C55E" strokeWidth="2"/>
                    <line x1="50" y1="360" x2="110" y2="360" stroke="#22C55E" strokeWidth="2"/>
                    <line x1="80" y1="390" x2="50" y2="430" stroke="#22C55E" strokeWidth="2"/>
                    <line x1="80" y1="390" x2="110" y2="430" stroke="#22C55E" strokeWidth="2"/>
                    <text x="80" y="455" textAnchor="middle" fontWeight="bold" fill="#22C55E">Staff</text>

                    {/* Student */}
                    <circle cx="820" cy="280" r="20" fill="none" stroke="#A855F7" strokeWidth="2"/>
                    <line x1="820" y1="300" x2="820" y2="350" stroke="#A855F7" strokeWidth="2"/>
                    <line x1="790" y1="320" x2="850" y2="320" stroke="#A855F7" strokeWidth="2"/>
                    <line x1="820" y1="350" x2="790" y2="390" stroke="#A855F7" strokeWidth="2"/>
                    <line x1="820" y1="350" x2="850" y2="390" stroke="#A855F7" strokeWidth="2"/>
                    <text x="820" y="415" textAnchor="middle" fontWeight="bold" fill="#A855F7">Student</text>

                    {/* Use Cases */}
                    {/* Login/Logout - shared */}
                    <ellipse cx="450" cy="100" rx="80" ry="30" fill="#E5E7EB" stroke="#333" strokeWidth="2"/>
                    <text x="450" y="105" textAnchor="middle" fontSize="12">Login / Logout</text>

                    {/* Admin Use Cases */}
                    <ellipse cx="320" cy="170" rx="70" ry="25" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="320" y="175" textAnchor="middle" fontSize="11">Manage Users</text>

                    <ellipse cx="320" cy="230" rx="70" ry="25" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="320" y="235" textAnchor="middle" fontSize="11">Manage Menu</text>

                    <ellipse cx="320" cy="290" rx="70" ry="25" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="320" y="295" textAnchor="middle" fontSize="11">Generate Reports</text>

                    {/* Staff Use Cases */}
                    <ellipse cx="450" cy="360" rx="70" ry="25" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2"/>
                    <text x="450" y="365" textAnchor="middle" fontSize="11">View Bookings</text>

                    <ellipse cx="450" cy="420" rx="70" ry="25" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2"/>
                    <text x="450" y="425" textAnchor="middle" fontSize="11">Mark Attendance</text>

                    {/* Student Use Cases */}
                    <ellipse cx="580" cy="200" rx="70" ry="25" fill="#F3E8FF" stroke="#A855F7" strokeWidth="2"/>
                    <text x="580" y="205" textAnchor="middle" fontSize="11">Book Meal</text>

                    <ellipse cx="580" cy="260" rx="70" ry="25" fill="#F3E8FF" stroke="#A855F7" strokeWidth="2"/>
                    <text x="580" y="265" textAnchor="middle" fontSize="11">View My Bookings</text>

                    <ellipse cx="580" cy="320" rx="70" ry="25" fill="#F3E8FF" stroke="#A855F7" strokeWidth="2"/>
                    <text x="580" y="325" textAnchor="middle" fontSize="11">Cancel Booking</text>

                    {/* Connections */}
                    {/* Admin connections */}
                    <line x1="110" y1="120" x2="370" y2="100" stroke="#3B82F6" strokeWidth="1"/>
                    <line x1="110" y1="140" x2="250" y2="170" stroke="#3B82F6" strokeWidth="1"/>
                    <line x1="110" y1="160" x2="250" y2="230" stroke="#3B82F6" strokeWidth="1"/>
                    <line x1="110" y1="180" x2="250" y2="290" stroke="#3B82F6" strokeWidth="1"/>

                    {/* Staff connections */}
                    <line x1="110" y1="340" x2="380" y2="360" stroke="#22C55E" strokeWidth="1"/>
                    <line x1="110" y1="380" x2="380" y2="420" stroke="#22C55E" strokeWidth="1"/>
                    <line x1="110" y1="320" x2="370" y2="100" stroke="#22C55E" strokeWidth="1"/>

                    {/* Student connections */}
                    <line x1="790" y1="280" x2="650" y2="200" stroke="#A855F7" strokeWidth="1"/>
                    <line x1="790" y1="290" x2="650" y2="260" stroke="#A855F7" strokeWidth="1"/>
                    <line x1="790" y1="300" x2="650" y2="320" stroke="#A855F7" strokeWidth="1"/>
                    <line x1="790" y1="260" x2="530" y2="100" stroke="#A855F7" strokeWidth="1"/>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Class Diagram */}
          <TabsContent value="class">
            <Card>
              <CardHeader>
                <CardTitle>📦 Class Diagram</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
                  <svg viewBox="0 0 1000 650" className="w-full h-auto">
                    {/* User Base Class */}
                    <rect x="400" y="20" width="200" height="120" fill="#E5E7EB" stroke="#333" strokeWidth="2"/>
                    <rect x="400" y="20" width="200" height="30" fill="#6B7280"/>
                    <text x="500" y="42" textAnchor="middle" fill="white" fontWeight="bold">User</text>
                    <line x1="400" y1="70" x2="600" y2="70" stroke="#333"/>
                    <text x="410" y="88" fontSize="11">- id: UUID</text>
                    <text x="410" y="103" fontSize="11">- email: string</text>
                    <text x="410" y="118" fontSize="11">- role: AppRole</text>
                    <line x1="400" y1="125" x2="600" y2="125" stroke="#333"/>
                    <text x="410" y="137" fontSize="11">+ login(): void</text>

                    {/* Admin Class */}
                    <rect x="100" y="200" width="180" height="110" fill="#DBEAFE" stroke="#3B82F6" strokeWidth="2"/>
                    <rect x="100" y="200" width="180" height="30" fill="#3B82F6"/>
                    <text x="190" y="222" textAnchor="middle" fill="white" fontWeight="bold">Admin</text>
                    <line x1="100" y1="250" x2="280" y2="250" stroke="#3B82F6"/>
                    <text x="110" y="268" fontSize="11">+ manageUsers(): void</text>
                    <text x="110" y="283" fontSize="11">+ manageMenu(): void</text>
                    <text x="110" y="298" fontSize="11">+ viewReports(): void</text>

                    {/* Staff Class */}
                    <rect x="400" y="200" width="180" height="95" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2"/>
                    <rect x="400" y="200" width="180" height="30" fill="#22C55E"/>
                    <text x="490" y="222" textAnchor="middle" fill="white" fontWeight="bold">Staff</text>
                    <line x1="400" y1="250" x2="580" y2="250" stroke="#22C55E"/>
                    <text x="410" y="268" fontSize="11">+ viewBookings(): void</text>
                    <text x="410" y="283" fontSize="11">+ markAttendance(): void</text>

                    {/* Student Class */}
                    <rect x="700" y="200" width="180" height="110" fill="#F3E8FF" stroke="#A855F7" strokeWidth="2"/>
                    <rect x="700" y="200" width="180" height="30" fill="#A855F7"/>
                    <text x="790" y="222" textAnchor="middle" fill="white" fontWeight="bold">Student</text>
                    <line x1="700" y1="250" x2="880" y2="250" stroke="#A855F7"/>
                    <text x="710" y="268" fontSize="11">+ bookMeal(): void</text>
                    <text x="710" y="283" fontSize="11">+ viewBookings(): void</text>
                    <text x="710" y="298" fontSize="11">+ cancelBooking(): void</text>

                    {/* MenuItem Class */}
                    <rect x="100" y="380" width="180" height="150" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
                    <rect x="100" y="380" width="180" height="30" fill="#F59E0B"/>
                    <text x="190" y="402" textAnchor="middle" fill="white" fontWeight="bold">MenuItem</text>
                    <line x1="100" y1="430" x2="280" y2="430" stroke="#F59E0B"/>
                    <text x="110" y="448" fontSize="11">- id: UUID</text>
                    <text x="110" y="463" fontSize="11">- mealType: MealType</text>
                    <text x="110" y="478" fontSize="11">- name: string</text>
                    <text x="110" y="493" fontSize="11">- price: number</text>
                    <line x1="100" y1="500" x2="280" y2="500" stroke="#F59E0B"/>
                    <text x="110" y="518" fontSize="11">+ create(): void</text>

                    {/* MealBooking Class */}
                    <rect x="400" y="380" width="180" height="165" fill="#FCE7F3" stroke="#EC4899" strokeWidth="2"/>
                    <rect x="400" y="380" width="180" height="30" fill="#EC4899"/>
                    <text x="490" y="402" textAnchor="middle" fill="white" fontWeight="bold">MealBooking</text>
                    <line x1="400" y1="430" x2="580" y2="430" stroke="#EC4899"/>
                    <text x="410" y="448" fontSize="11">- id: UUID</text>
                    <text x="410" y="463" fontSize="11">- userId: UUID</text>
                    <text x="410" y="478" fontSize="11">- menuItemId: UUID</text>
                    <text x="410" y="493" fontSize="11">- date: Date</text>
                    <text x="410" y="508" fontSize="11">- status: BookingStatus</text>
                    <line x1="400" y1="515" x2="580" y2="515" stroke="#EC4899"/>
                    <text x="410" y="533" fontSize="11">+ create(): void</text>

                    {/* Attendance Class */}
                    <rect x="700" y="380" width="180" height="135" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2"/>
                    <rect x="700" y="380" width="180" height="30" fill="#EF4444"/>
                    <text x="790" y="402" textAnchor="middle" fill="white" fontWeight="bold">Attendance</text>
                    <line x1="700" y1="430" x2="880" y2="430" stroke="#EF4444"/>
                    <text x="710" y="448" fontSize="11">- id: UUID</text>
                    <text x="710" y="463" fontSize="11">- bookingId: UUID</text>
                    <text x="710" y="478" fontSize="11">- status: AttendanceStatus</text>
                    <text x="710" y="493" fontSize="11">- markedBy: UUID</text>
                    <line x1="700" y1="500" x2="880" y2="500" stroke="#EF4444"/>
                    <text x="710" y="518" fontSize="11">+ mark(): void</text>

                    {/* Inheritance Arrows */}
                    <line x1="190" y1="200" x2="400" y2="140" stroke="#333" strokeWidth="1.5"/>
                    <polygon points="400,140 390,150 410,150" fill="white" stroke="#333"/>
                    
                    <line x1="490" y1="200" x2="500" y2="140" stroke="#333" strokeWidth="1.5"/>
                    <polygon points="500,140 490,150 510,150" fill="white" stroke="#333"/>
                    
                    <line x1="790" y1="200" x2="600" y2="140" stroke="#333" strokeWidth="1.5"/>
                    <polygon points="600,140 590,150 610,150" fill="white" stroke="#333"/>

                    {/* Association Lines */}
                    <line x1="280" y1="455" x2="400" y2="455" stroke="#333" strokeWidth="1" strokeDasharray="5,3"/>
                    <text x="340" y="445" fontSize="10">references</text>

                    <line x1="580" y1="460" x2="700" y2="460" stroke="#333" strokeWidth="1" strokeDasharray="5,3"/>
                    <text x="640" y="450" fontSize="10">tracks</text>

                    <line x1="790" y1="310" x2="580" y2="380" stroke="#333" strokeWidth="1" strokeDasharray="5,3"/>
                    <text x="680" y="335" fontSize="10">creates</text>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sequence Diagram */}
          <TabsContent value="sequence">
            <Card>
              <CardHeader>
                <CardTitle>🔄 Sequence Diagrams</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Login Sequence */}
                <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                  <h3 className="text-lg font-bold mb-4 text-blue-600">1. Login Flow</h3>
                  <svg viewBox="0 0 800 300" className="w-full h-auto">
                    {/* Lifelines */}
                    <rect x="60" y="30" width="80" height="40" fill="#3B82F6" rx="5"/>
                    <text x="100" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">User</text>
                    <line x1="100" y1="70" x2="100" y2="280" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5"/>

                    <rect x="210" y="30" width="80" height="40" fill="#22C55E" rx="5"/>
                    <text x="250" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">LoginPage</text>
                    <line x1="250" y1="70" x2="250" y2="280" stroke="#22C55E" strokeWidth="2" strokeDasharray="5,5"/>

                    <rect x="360" y="30" width="80" height="40" fill="#F59E0B" rx="5"/>
                    <text x="400" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">AuthService</text>
                    <line x1="400" y1="70" x2="400" y2="280" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5,5"/>

                    <rect x="510" y="30" width="80" height="40" fill="#EF4444" rx="5"/>
                    <text x="550" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Database</text>
                    <line x1="550" y1="70" x2="550" y2="280" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5"/>

                    <rect x="660" y="30" width="80" height="40" fill="#A855F7" rx="5"/>
                    <text x="700" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Dashboard</text>
                    <line x1="700" y1="70" x2="700" y2="280" stroke="#A855F7" strokeWidth="2" strokeDasharray="5,5"/>

                    {/* Messages */}
                    <line x1="100" y1="100" x2="250" y2="100" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                    <text x="175" y="95" textAnchor="middle" fontSize="10">1. Enter credentials</text>

                    <line x1="250" y1="130" x2="400" y2="130" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                    <text x="325" y="125" textAnchor="middle" fontSize="10">2. signIn(email, password)</text>

                    <line x1="400" y1="160" x2="550" y2="160" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                    <text x="475" y="155" textAnchor="middle" fontSize="10">3. Validate credentials</text>

                    <line x1="550" y1="190" x2="400" y2="190" stroke="#333" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrowhead)"/>
                    <text x="475" y="185" textAnchor="middle" fontSize="10">4. Return user + role</text>

                    <line x1="400" y1="220" x2="250" y2="220" stroke="#333" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrowhead)"/>
                    <text x="325" y="215" textAnchor="middle" fontSize="10">5. Auth success</text>

                    <line x1="250" y1="250" x2="700" y2="250" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                    <text x="475" y="245" textAnchor="middle" fontSize="10">6. Redirect to role-based dashboard</text>

                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#333"/>
                      </marker>
                    </defs>
                  </svg>
                </div>

                {/* Booking Sequence */}
                <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                  <h3 className="text-lg font-bold mb-4 text-purple-600">2. Meal Booking Flow</h3>
                  <svg viewBox="0 0 800 350" className="w-full h-auto">
                    {/* Lifelines */}
                    <rect x="60" y="30" width="80" height="40" fill="#A855F7" rx="5"/>
                    <text x="100" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Student</text>
                    <line x1="100" y1="70" x2="100" y2="330" stroke="#A855F7" strokeWidth="2" strokeDasharray="5,5"/>

                    <rect x="210" y="30" width="90" height="40" fill="#3B82F6" rx="5"/>
                    <text x="255" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">BookMealPage</text>
                    <line x1="255" y1="70" x2="255" y2="330" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5"/>

                    <rect x="360" y="30" width="90" height="40" fill="#22C55E" rx="5"/>
                    <text x="405" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">MenuService</text>
                    <line x1="405" y1="70" x2="405" y2="330" stroke="#22C55E" strokeWidth="2" strokeDasharray="5,5"/>

                    <rect x="510" y="30" width="100" height="40" fill="#F59E0B" rx="5"/>
                    <text x="560" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">BookingService</text>
                    <line x1="560" y1="70" x2="560" y2="330" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5,5"/>

                    <rect x="670" y="30" width="80" height="40" fill="#EF4444" rx="5"/>
                    <text x="710" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Database</text>
                    <line x1="710" y1="70" x2="710" y2="330" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,5"/>

                    {/* Messages */}
                    <line x1="100" y1="100" x2="255" y2="100" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                    <text x="177" y="95" textAnchor="middle" fontSize="10">1. Select date & meal type</text>

                    <line x1="255" y1="130" x2="405" y2="130" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                    <text x="330" y="125" textAnchor="middle" fontSize="10">2. getMenuItems(mealType)</text>

                    <line x1="405" y1="160" x2="710" y2="160" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                    <text x="557" y="155" textAnchor="middle" fontSize="10">3. SELECT from menu_items</text>

                    <line x1="710" y1="190" x2="405" y2="190" stroke="#333" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrowhead)"/>
                    <text x="557" y="185" textAnchor="middle" fontSize="10">4. Return menu items</text>

                    <line x1="405" y1="220" x2="255" y2="220" stroke="#333" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrowhead)"/>
                    <text x="330" y="215" textAnchor="middle" fontSize="10">5. Display menu</text>

                    <line x1="100" y1="250" x2="255" y2="250" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                    <text x="177" y="245" textAnchor="middle" fontSize="10">6. Confirm booking</text>

                    <line x1="255" y1="280" x2="560" y2="280" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                    <text x="407" y="275" textAnchor="middle" fontSize="10">7. createBooking(data)</text>

                    <line x1="560" y1="310" x2="255" y2="310" stroke="#333" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrowhead)"/>
                    <text x="407" y="305" textAnchor="middle" fontSize="10">8. Return success</text>
                  </svg>
                </div>

                {/* Attendance Sequence */}
                <div className="bg-white p-6 rounded-lg border-2 border-gray-200">
                  <h3 className="text-lg font-bold mb-4 text-green-600">3. Attendance Marking Flow</h3>
                  <svg viewBox="0 0 750 300" className="w-full h-auto">
                    {/* Lifelines */}
                    <rect x="60" y="30" width="80" height="40" fill="#22C55E" rx="5"/>
                    <text x="100" y="55" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Staff</text>
                    <line x1="100" y1="70" x2="100" y2="280" stroke="#22C55E" strokeWidth="2" strokeDasharray="5,5"/>

                    <rect x="200" y="30" width="110" height="40" fill="#3B82F6" rx="5"/>
                    <text x="255" y="55" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">AttendancePage</text>
                    <line x1="255" y1="70" x2="255" y2="280" stroke="#3B82F6" strokeWidth="2" strokeDasharray="5,5"/>

                    <rect x="370" y="30" width="110" height="40" fill="#F59E0B" rx="5"/>
                    <text x="425" y="55" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">BookingService</text>
                    <line x1="425" y1="70" x2="425" y2="280" stroke="#F59E0B" strokeWidth="2" strokeDasharray="5,5"/>

                    <rect x="540" y="30" width="120" height="40" fill="#A855F7" rx="5"/>
                    <text x="600" y="55" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold">AttendanceService</text>
                    <line x1="600" y1="70" x2="600" y2="280" stroke="#A855F7" strokeWidth="2" strokeDasharray="5,5"/>

                    {/* Messages */}
                    <line x1="100" y1="100" x2="255" y2="100" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                    <text x="177" y="95" textAnchor="middle" fontSize="10">1. Select date & meal type</text>

                    <line x1="255" y1="130" x2="425" y2="130" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                    <text x="340" y="125" textAnchor="middle" fontSize="10">2. getBookings(date, mealType)</text>

                    <line x1="425" y1="160" x2="255" y2="160" stroke="#333" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrowhead)"/>
                    <text x="340" y="155" textAnchor="middle" fontSize="10">3. Return student list</text>

                    <line x1="100" y1="190" x2="255" y2="190" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                    <text x="177" y="185" textAnchor="middle" fontSize="10">4. Mark Present/Absent</text>

                    <line x1="255" y1="220" x2="600" y2="220" stroke="#333" strokeWidth="1.5" markerEnd="url(#arrowhead)"/>
                    <text x="427" y="215" textAnchor="middle" fontSize="10">5. submitAttendance(records)</text>

                    <line x1="600" y1="250" x2="255" y2="250" stroke="#333" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrowhead)"/>
                    <text x="427" y="245" textAnchor="middle" fontSize="10">6. Return success</text>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Diagram */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <CardTitle>⚡ Activity Diagram</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white p-8 rounded-lg border-2 border-gray-200">
                  <svg viewBox="0 0 900 700" className="w-full h-auto">
                    {/* Start */}
                    <circle cx="450" cy="30" r="15" fill="#333"/>
                    
                    {/* Login Activity */}
                    <rect x="375" y="70" width="150" height="40" fill="#E5E7EB" stroke="#333" strokeWidth="2" rx="20"/>
                    <text x="450" y="95" textAnchor="middle" fontSize="12">Login</text>
                    <line x1="450" y1="45" x2="450" y2="70" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>

                    {/* Decision - Check Role */}
                    <polygon points="450,140 520,180 450,220 380,180" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
                    <text x="450" y="185" textAnchor="middle" fontSize="11">Check Role</text>
                    <line x1="450" y1="110" x2="450" y2="140" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>

                    {/* Swimlanes */}
                    {/* Admin Lane */}
                    <rect x="50" y="260" width="250" height="400" fill="#DBEAFE" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2"/>
                    <text x="175" y="285" textAnchor="middle" fontWeight="bold" fill="#3B82F6">Admin</text>

                    {/* Staff Lane */}
                    <rect x="325" y="260" width="250" height="400" fill="#DCFCE7" fillOpacity="0.3" stroke="#22C55E" strokeWidth="2"/>
                    <text x="450" y="285" textAnchor="middle" fontWeight="bold" fill="#22C55E">Staff</text>

                    {/* Student Lane */}
                    <rect x="600" y="260" width="250" height="400" fill="#F3E8FF" fillOpacity="0.3" stroke="#A855F7" strokeWidth="2"/>
                    <text x="725" y="285" textAnchor="middle" fontWeight="bold" fill="#A855F7">Student</text>

                    {/* Admin Activities */}
                    <line x1="380" y1="180" x2="175" y2="310" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    <text x="270" y="240" fontSize="10">[Admin]</text>
                    
                    <rect x="100" y="310" width="150" height="35" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" rx="17"/>
                    <text x="175" y="333" textAnchor="middle" fill="white" fontSize="11">Manage Users</text>

                    <line x1="175" y1="345" x2="175" y2="365" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    
                    <rect x="100" y="370" width="150" height="35" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" rx="17"/>
                    <text x="175" y="393" textAnchor="middle" fill="white" fontSize="11">Manage Menu</text>

                    <line x1="175" y1="405" x2="175" y2="425" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    
                    <rect x="100" y="430" width="150" height="35" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" rx="17"/>
                    <text x="175" y="453" textAnchor="middle" fill="white" fontSize="11">Generate Reports</text>

                    <line x1="175" y1="465" x2="175" y2="485" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    
                    <rect x="100" y="490" width="150" height="35" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" rx="17"/>
                    <text x="175" y="513" textAnchor="middle" fill="white" fontSize="11">Export Reports</text>

                    {/* Staff Activities */}
                    <line x1="450" y1="220" x2="450" y2="310" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    <text x="455" y="260" fontSize="10">[Staff]</text>
                    
                    <rect x="375" y="310" width="150" height="35" fill="#22C55E" stroke="#16A34A" strokeWidth="2" rx="17"/>
                    <text x="450" y="333" textAnchor="middle" fill="white" fontSize="11">View Bookings</text>

                    <line x1="450" y1="345" x2="450" y2="365" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    
                    <rect x="375" y="370" width="150" height="35" fill="#22C55E" stroke="#16A34A" strokeWidth="2" rx="17"/>
                    <text x="450" y="393" textAnchor="middle" fill="white" fontSize="11">Select Date & Meal</text>

                    <line x1="450" y1="405" x2="450" y2="425" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    
                    <rect x="375" y="430" width="150" height="35" fill="#22C55E" stroke="#16A34A" strokeWidth="2" rx="17"/>
                    <text x="450" y="453" textAnchor="middle" fill="white" fontSize="11">Mark Attendance</text>

                    <line x1="450" y1="465" x2="450" y2="485" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    
                    <rect x="375" y="490" width="150" height="35" fill="#22C55E" stroke="#16A34A" strokeWidth="2" rx="17"/>
                    <text x="450" y="513" textAnchor="middle" fill="white" fontSize="11">Submit Records</text>

                    {/* Student Activities */}
                    <line x1="520" y1="180" x2="725" y2="310" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    <text x="630" y="240" fontSize="10">[Student]</text>
                    
                    <rect x="650" y="310" width="150" height="35" fill="#A855F7" stroke="#7C3AED" strokeWidth="2" rx="17"/>
                    <text x="725" y="333" textAnchor="middle" fill="white" fontSize="11">View Menu</text>

                    <line x1="725" y1="345" x2="725" y2="365" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    
                    <rect x="650" y="370" width="150" height="35" fill="#A855F7" stroke="#7C3AED" strokeWidth="2" rx="17"/>
                    <text x="725" y="393" textAnchor="middle" fill="white" fontSize="11">Select Meal</text>

                    <line x1="725" y1="405" x2="725" y2="425" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>

                    {/* Decision - Valid Booking */}
                    <polygon points="725,430 780,460 725,490 670,460" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
                    <text x="725" y="465" textAnchor="middle" fontSize="10">Valid?</text>

                    <line x1="780" y1="460" x2="830" y2="460" stroke="#333" strokeWidth="2"/>
                    <text x="810" y="450" fontSize="9">[No]</text>
                    <line x1="830" y1="460" x2="830" y2="340" stroke="#333" strokeWidth="2"/>
                    <line x1="830" y1="340" x2="800" y2="340" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    
                    <line x1="725" y1="490" x2="725" y2="520" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                    <text x="730" y="510" fontSize="9">[Yes]</text>
                    
                    <rect x="650" y="525" width="150" height="35" fill="#A855F7" stroke="#7C3AED" strokeWidth="2" rx="17"/>
                    <text x="725" y="548" textAnchor="middle" fill="white" fontSize="11">Confirm Booking</text>

                    {/* End nodes */}
                    <circle cx="175" cy="560" r="12" fill="none" stroke="#333" strokeWidth="2"/>
                    <circle cx="175" cy="560" r="8" fill="#333"/>
                    <line x1="175" y1="525" x2="175" y2="548" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>

                    <circle cx="450" cy="560" r="12" fill="none" stroke="#333" strokeWidth="2"/>
                    <circle cx="450" cy="560" r="8" fill="#333"/>
                    <line x1="450" y1="525" x2="450" y2="548" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>

                    <circle cx="725" cy="600" r="12" fill="none" stroke="#333" strokeWidth="2"/>
                    <circle cx="725" cy="600" r="8" fill="#333"/>
                    <line x1="725" y1="560" x2="725" y2="588" stroke="#333" strokeWidth="2" markerEnd="url(#arrowhead)"/>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <p className="text-center text-gray-500 mt-8 text-sm">
          💡 Tip: Right-click on any diagram and select "Save image as..." to download for your submission document.
        </p>
      </div>
    </div>
  );
};

export default Diagrams;
