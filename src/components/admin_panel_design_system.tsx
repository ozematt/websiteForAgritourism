"use client";
import React, { useState } from "react";
import {
  Calendar,
  Image,
  Users,
  Settings,
  Bell,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Upload,
  X,
  Check,
  Clock,
  User,
  Phone,
  Mail,
} from "lucide-react";

export const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Sample data
  const reservations = [
    {
      id: 1,
      date: "2024-09-25",
      time: "14:00",
      client: "Jan Kowalski",
      phone: "+48 123 456 789",
      email: "jan@example.com",
      service: "Konsultacja",
      status: "confirmed",
    },
    {
      id: 2,
      date: "2024-09-26",
      time: "10:30",
      client: "Anna Nowak",
      phone: "+48 987 654 321",
      email: "anna@example.com",
      service: "Sesja zdjęciowa",
      status: "pending",
    },
    {
      id: 3,
      date: "2024-09-27",
      time: "16:15",
      client: "Piotr Wiśniewski",
      phone: "+48 555 666 777",
      email: "piotr@example.com",
      service: "Spotkanie biznesowe",
      status: "confirmed",
    },
  ];

  const images = [
    {
      id: 1,
      name: "projekt-logo-2024.jpg",
      size: "2.4 MB",
      date: "2024-09-20",
      category: "Logo",
      url: "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Logo+Design",
    },
    {
      id: 2,
      name: "sesja-produktowa-01.jpg",
      size: "5.1 MB",
      date: "2024-09-18",
      category: "Produkty",
      url: "https://via.placeholder.com/300x200/059669/FFFFFF?text=Product+Photo",
    },
    {
      id: 3,
      name: "banner-reklamowy.png",
      size: "1.8 MB",
      date: "2024-09-15",
      category: "Marketing",
      url: "https://via.placeholder.com/300x200/DC2626/FFFFFF?text=Banner+Ad",
    },
    {
      id: 4,
      name: "portret-klienta.jpg",
      size: "3.2 MB",
      date: "2024-09-12",
      category: "Portrety",
      url: "https://via.placeholder.com/300x200/7C3AED/FFFFFF?text=Portrait",
    },
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("pl-PL", { month: "long", year: "numeric" });
  };

  const getReservationForDate = (day) => {
    if (!day) return [];
    const dateStr = `2024-09-${day.toString().padStart(2, "0")}`;
    return reservations.filter((res) => res.date === dateStr);
  };

  const StatusBadge = ({ status }) => {
    const colors = {
      confirmed: "bg-green-500",
      pending: "bg-yellow-500",
      cancelled: "bg-red-500",
    };

    const labels = {
      confirmed: "Potwierdzona",
      pending: "Oczekująca",
      cancelled: "Anulowana",
    };

    return (
      <span
        className={`rounded-full px-2 py-1 text-xs text-white ${colors[status]}`}
      >
        {labels[status]}
      </span>
    );
  };

  const Sidebar = () => (
    <div className="bg-sidebar-bg min-h-screen w-64 p-6 text-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">AdminPanel</h1>
        <p className="text-sm text-slate-400">System zarządzania</p>
      </div>

      <nav className="space-y-2">
        {[
          { id: "dashboard", icon: Settings, label: "Dashboard" },
          { id: "calendar", icon: Calendar, label: "Kalendarz" },
          { id: "images", icon: Image, label: "Zdjęcia" },
          { id: "users", icon: Users, label: "Użytkownicy" },
        ].map(({ id, icon: Icon, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex w-full items-center gap-3 rounded-lg p-3 transition-colors ${
              activeTab === id
                ? "bg-blue-600 text-white"
                : "text-slate-300 hover:bg-slate-800"
            }`}
          >
            <Icon size={20} />
            {label}
          </button>
        ))}
      </nav>
    </div>
  );

  const Header = () => (
    <div className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search
              className="absolute top-1/2 left-3 -translate-y-1/2 transform text-slate-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Szukaj..."
              className="w-80 rounded-lg border border-slate-300 py-2 pr-4 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative rounded-lg p-2 hover:bg-slate-100">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500"></span>
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
            <User size={16} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="p-6">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Dashboard</h2>
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Dzisiejsze rezerwacje",
            value: "5",
            color: "bg-blue-500",
            icon: Calendar,
          },
          {
            title: "Wszystkie zdjęcia",
            value: "248",
            color: "bg-green-500",
            icon: Image,
          },
          {
            title: "Aktywni użytkownicy",
            value: "42",
            color: "bg-purple-500",
            icon: Users,
          },
          {
            title: "Oczekujące",
            value: "8",
            color: "bg-yellow-500",
            icon: Clock,
          },
        ].map(({ title, value, color, icon: Icon }) => (
          <div
            key={title}
            className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600">{title}</p>
                <p className="text-2xl font-bold text-slate-900">{value}</p>
              </div>
              <div className={`p-3 ${color} rounded-lg`}>
                <Icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Ostatnie rezerwacje
        </h3>
        <div className="space-y-3">
          {reservations.slice(0, 3).map((res) => (
            <div
              key={res.id}
              className="flex items-center justify-between rounded-lg bg-slate-50 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500">
                  <User size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-slate-900">{res.client}</p>
                  <p className="text-sm text-slate-600">
                    {res.service} • {res.date} {res.time}
                  </p>
                </div>
              </div>
              <StatusBadge status={res.status} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CalendarView = () => (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          Kalendarz rezerwacji
        </h2>
        <button className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
          <Plus size={20} />
          Nowa rezerwacja
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-900">
                {formatDate(currentMonth)}
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() - 1,
                        1,
                      ),
                    )
                  }
                  className="rounded-lg p-2 hover:bg-slate-100"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() =>
                    setCurrentMonth(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth() + 1,
                        1,
                      ),
                    )
                  }
                  className="rounded-lg p-2 hover:bg-slate-100"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="mb-4 grid grid-cols-7 gap-2">
              {["Nd", "Pn", "Wt", "Śr", "Czw", "Pt", "Sb"].map((day) => (
                <div
                  key={day}
                  className="p-3 text-center text-sm font-medium text-slate-600"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {getDaysInMonth(currentMonth).map((day, index) => {
                const dayReservations = getReservationForDate(day);
                return (
                  <div
                    key={index}
                    className={`min-h-[80px] cursor-pointer rounded-lg border border-slate-200 p-2 hover:bg-slate-50 ${
                      day ? "bg-white" : "bg-slate-100"
                    }`}
                    onClick={() => day && setSelectedDate(day)}
                  >
                    {day && (
                      <>
                        <div className="mb-1 text-sm font-medium text-slate-900">
                          {day}
                        </div>
                        {dayReservations.map((res) => (
                          <div
                            key={res.id}
                            className="mb-1 truncate rounded bg-blue-100 px-2 py-1 text-xs text-blue-800"
                          >
                            {res.time}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-slate-900">
            Dzisiejsze rezerwacje
          </h3>
          <div className="space-y-4">
            {reservations.map((res) => (
              <div
                key={res.id}
                className="rounded-lg border border-slate-200 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-medium text-slate-900">{res.time}</span>
                  <StatusBadge status={res.status} />
                </div>
                <p className="font-medium text-slate-900">{res.client}</p>
                <p className="text-sm text-slate-600">{res.service}</p>
                <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
                  <Phone size={14} />
                  {res.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Mail size={14} />
                  {res.email}
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex items-center gap-1 rounded bg-green-100 px-3 py-1 text-sm text-green-700 hover:bg-green-200">
                    <Check size={14} />
                    Potwierdź
                  </button>
                  <button className="flex items-center gap-1 rounded bg-blue-100 px-3 py-1 text-sm text-blue-700 hover:bg-blue-200">
                    <Edit size={14} />
                    Edytuj
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ImagesView = () => (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">
          Zarządzanie zdjęciami
        </h2>
        <button
          onClick={() => setShowImageModal(true)}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
        >
          <Upload size={20} />
          Dodaj zdjęcie
        </button>
      </div>

      <div className="mb-6">
        <div className="flex gap-4">
          <select className="rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option>Wszystkie kategorie</option>
            <option>Logo</option>
            <option>Produkty</option>
            <option>Marketing</option>
            <option>Portrety</option>
          </select>
          <select className="rounded-lg border border-slate-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option>Sortuj według daty</option>
            <option>Sortuj według nazwy</option>
            <option>Sortuj według rozmiaru</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <div className="relative aspect-video overflow-hidden bg-slate-100">
              <img
                src={image.url}
                alt={image.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-105"
              />
              <div className="bg-opacity-0 group-hover:bg-opacity-20 absolute inset-0 flex items-center justify-center bg-black transition-opacity">
                <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => setSelectedImage(image)}
                    className="rounded-lg bg-white p-2 hover:bg-slate-100"
                  >
                    <Eye size={16} />
                  </button>
                  <button className="rounded-lg bg-white p-2 hover:bg-slate-100">
                    <Edit size={16} />
                  </button>
                  <button className="rounded-lg bg-white p-2 text-red-600 hover:bg-slate-100">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-1 truncate font-medium text-slate-900">
                {image.name}
              </h3>
              <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
                <span>{image.category}</span>
                <span>{image.size}</span>
              </div>
              <p className="text-xs text-slate-500">{image.date}</p>
            </div>
          </div>
        ))}
      </div>

      {showImageModal && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="mx-4 w-full max-w-md rounded-xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Dodaj nowe zdjęcie</h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Nazwa pliku
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="nazwa-pliku.jpg"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Kategoria
                </label>
                <select className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option>Wybierz kategorię</option>
                  <option>Logo</option>
                  <option>Produkty</option>
                  <option>Marketing</option>
                  <option>Portrety</option>
                </select>
              </div>

              <div className="rounded-lg border-2 border-dashed border-slate-300 p-8 text-center">
                <Upload size={32} className="mx-auto mb-2 text-slate-400" />
                <p className="text-slate-600">
                  Przeciągnij pliki tutaj lub kliknij aby wybrać
                </p>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  accept="image/*"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowImageModal(false)}
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
                >
                  Anuluj
                </button>
                <button className="flex-1 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                  Dodaj
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedImage && (
        <div className="bg-opacity-75 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="mx-4 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{selectedImage.name}</h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="rounded-lg p-2 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <img
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  className="h-auto w-full rounded-lg"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Nazwa pliku
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedImage.name}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Kategoria
                  </label>
                  <select
                    defaultValue={selectedImage.category}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option>Logo</option>
                    <option>Produkty</option>
                    <option>Marketing</option>
                    <option>Portrety</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Opis
                  </label>
                  <textarea
                    className="h-24 w-full resize-none rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Dodaj opis zdjęcia..."
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">Rozmiar:</span>
                    <p className="text-slate-600">{selectedImage.size}</p>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">
                      Data dodania:
                    </span>
                    <p className="text-slate-600">{selectedImage.date}</p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                    <Check size={16} />
                    Zapisz zmiany
                  </button>
                  <button className="flex items-center justify-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
                    <Trash2 size={16} />
                    Usuń
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main>
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "calendar" && <CalendarView />}
          {activeTab === "images" && <ImagesView />}
          {activeTab === "users" && (
            <div className="p-6">
              <h2 className="mb-6 text-2xl font-bold text-slate-900">
                Użytkownicy
              </h2>
              <p className="text-slate-600">
                Moduł zarządzania użytkownikami w przygotowaniu...
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
