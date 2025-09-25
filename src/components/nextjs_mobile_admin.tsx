"use client";
import React, { useState, useEffect } from "react";
import {
  Calendar,
  Home,
  Users,
  Settings,
  Menu,
  X,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const MobileAdminPanel = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(25);
  const [activeNavItem, setActiveNavItem] = useState("home");
  const [currentMonth, setCurrentMonth] = useState({
    month: "wrzesień",
    year: "2025",
  });

  const navItems = [
    { id: "domek1", name: "Domek_1", icon: "🏠", active: true },
    { id: "domek2", name: "Domek_2", icon: "🏡", active: false },
    { id: "domek3", name: "Domek_3", icon: "🏘️", active: false },
    { id: "logout", name: "Wyloguj", icon: "🚪", active: false },
  ];

  const reservations = [
    {
      id: 1,
      name: "Jan Kowalski",
      type: "Konsultacja",
      date: "2024-09-25 14:00",
      status: "confirmed",
      avatar: "JK",
    },
    {
      id: 2,
      name: "Anna Nowak",
      type: "Sesja zdjęciowa",
      date: "2024-09-26 10:30",
      status: "pending",
      avatar: "AN",
    },
    {
      id: 3,
      name: "Piotr Wiśniewski",
      type: "Spotkanie biznesowe",
      date: "2024-09-27 16:15",
      status: "confirmed",
      avatar: "PW",
    },
  ];

  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);
  const prevMonthDays = [29, 30, 31];
  const nextMonthDays = [1, 2, 3, 4, 5];

  const bottomNavItems = [
    { id: "home", name: "Główna", icon: Home },
    { id: "calendar", name: "Kalendarz", icon: Calendar },
    { id: "users", name: "Klienci", icon: Users },
    { id: "settings", name: "Ustawienia", icon: Settings },
  ];

  const handleDateClick = (day) => {
    setSelectedDate(day);
  };

  const handleNewReservation = () => {
    alert("Dodawanie nowej rezerwacji");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="fixed top-0 right-0 left-0 z-50 bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          <div className="text-xl font-bold">AdminPanel</div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="rounded-lg p-2 transition-colors duration-200 hover:bg-white/10"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-6 p-4 pt-20 pb-20">
        {/* Navigation Section */}
        <section className="transform rounded-2xl bg-white p-4 shadow-lg transition-all duration-500 hover:shadow-xl">
          <h3 className="mb-4 text-lg font-semibold text-blue-800">Obiekty</h3>
          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`flex items-center rounded-xl p-3 transition-all duration-300 ${
                  item.active
                    ? "-translate-y-1 transform bg-blue-500 text-white shadow-lg"
                    : "bg-gray-50 text-gray-700 hover:-translate-y-0.5 hover:bg-blue-50"
                }`}
              >
                <span className="mr-2 text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Calendar Section */}
        <section className="transform rounded-2xl bg-white p-4 shadow-lg transition-all duration-500 hover:shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="flex items-center text-lg font-semibold text-blue-800">
              <Calendar className="mr-2" size={20} />
              Kalendarz rezerwacji
            </h3>
            <button
              onClick={handleNewReservation}
              className="flex transform animate-pulse items-center space-x-2 rounded-xl bg-blue-500 px-4 py-2 text-white transition-all duration-300 hover:scale-105 hover:bg-blue-600 hover:shadow-lg"
            >
              <Plus size={16} />
              <span>Nowa</span>
            </button>
          </div>

          {/* Calendar Navigation */}
          <div className="mb-4 flex items-center justify-between">
            <button className="rounded-lg bg-gray-100 p-2 transition-colors duration-200 hover:bg-gray-200">
              <ChevronLeft size={20} />
            </button>
            <span className="font-semibold text-gray-800">
              {currentMonth.month} {currentMonth.year}
            </span>
            <button className="rounded-lg bg-gray-100 p-2 transition-colors duration-200 hover:bg-gray-200">
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 rounded-lg bg-gray-100 p-1">
            {/* Calendar Headers */}
            {["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Niedz"].map((day) => (
              <div
                key={day}
                className="bg-blue-500 py-2 text-center text-sm font-semibold text-white first:rounded-tl-lg last:rounded-tr-lg"
              >
                {day}
              </div>
            ))}

            {/* Previous Month Days */}
            {prevMonthDays.map((day) => (
              <button
                key={`prev-${day}`}
                className="bg-white p-3 text-center text-gray-400 transition-colors duration-200 hover:bg-blue-50"
              >
                {day}
              </button>
            ))}

            {/* Current Month Days */}
            {calendarDays.map((day) => (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                className={`bg-white p-3 text-center transition-all duration-200 ${
                  selectedDate === day
                    ? "bg-yellow-100 font-semibold text-yellow-800 shadow-inner"
                    : "hover:bg-blue-50"
                }`}
              >
                {day}
              </button>
            ))}

            {/* Next Month Days */}
            {nextMonthDays.slice(0, 2).map((day) => (
              <button
                key={`next-${day}`}
                className="bg-white p-3 text-center text-gray-400 transition-colors duration-200 last:rounded-br-lg hover:bg-blue-50"
              >
                {day}
              </button>
            ))}
          </div>
        </section>

        {/* Reservations Section */}
        <section className="transform rounded-2xl bg-white p-4 shadow-lg transition-all duration-500 hover:shadow-xl">
          <h3 className="mb-4 flex items-center text-lg font-semibold text-blue-800">
            <Users className="mr-2" size={20} />
            Ostatnie rezerwacje
          </h3>

          <div className="space-y-3">
            {reservations.map((reservation, index) => (
              <div
                key={reservation.id}
                className="flex items-center rounded-xl border border-gray-200 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{
                  animation: `slideIn 0.5s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-semibold text-white">
                  {reservation.avatar}
                </div>

                <div className="flex-1">
                  <div className="font-semibold text-gray-800">
                    {reservation.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    {reservation.type} • {reservation.date}
                  </div>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    reservation.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {reservation.status === "confirmed"
                    ? "Potwierdzone"
                    : "Oczekujące"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed right-0 bottom-0 left-0 border-t border-gray-200 bg-white shadow-lg">
        <div className="flex justify-around py-3">
          {bottomNavItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNavItem(item.id)}
                className={`flex flex-col items-center space-y-1 p-2 transition-colors duration-200 ${
                  activeNavItem === item.id
                    ? "text-blue-500"
                    : "text-gray-400 hover:text-gray-600"
                }`}
              >
                <IconComponent size={20} />
                <span className="text-xs font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MobileAdminPanel;
