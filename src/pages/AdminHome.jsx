import React, { useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin.jsx";
import {
    TrendingUp,
    ShoppingCart,
    Store,
    DollarSign,
    PlusCircle,
    Filter,
} from "lucide-react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

export default function AdminHome() {
    const [chartType, setChartType] = useState("line");

    const data = [
        { name: "Lun", ventas: 2400, transacciones: 320 },
        { name: "Mar", ventas: 1398, transacciones: 280 },
        { name: "Mie", ventas: 9800, transacciones: 400 },
        { name: "Jue", ventas: 3908, transacciones: 500 },
        { name: "Vie", ventas: 4800, transacciones: 460 },
        { name: "Sab", ventas: 3800, transacciones: 350 },
        { name: "Dom", ventas: 4300, transacciones: 380 },
    ];

    const pieData = [
        { name: "Sucursal Centro", value: 1850.2 },
        { name: "Tienda Norte", value: 975.5 },
        { name: "Almacén Sur", value: 0 },
    ];

    const COLORS = ["#3b82f6", "#60a5fa", "#001C63"];

    return (
        <div className="min-h-screen bg-[#f8fafc] text-gray-800 px-6 py-6 md:px-12">
            {/* HEADER */}
            <HeaderAdmin />
            <div className="mb-6 pt-15">
                <h1 className="text-3xl font-bold text-[#001C63]">
                    Dashboard Global
                </h1>
            </div>

            {/* CARDS DE MÉTRICAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                    {
                        title: "Ingresos Totales",
                        value: "$12,450.00",
                        icon: DollarSign,
                        color: "#3b82f6",
                        change: "+5%",
                    },
                    {
                        title: "Número de Transacciones",
                        value: "852",
                        icon: ShoppingCart,
                        color: "#2563eb",
                        change: "+2.1%",
                    },
                    {
                        title: "Puntos de Venta Activos",
                        value: "23",
                        icon: Store,
                        color: "#1d4ed8",
                        change: "+1",
                    },
                    {
                        title: "Ticket Promedio",
                        value: "$14.61",
                        icon: TrendingUp,
                        color: "#60a5fa",
                        change: "-0.5%",
                    },
                ].map((card, i) => (
                    <div
                        key={i}
                        className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-xl p-5 flex flex-col justify-between border border-gray-100"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="font-semibold">{card.title}</h2>
                            <card.icon
                                className="w-6 h-6"
                                style={{ color: card.color }}
                            />
                        </div>
                        <p className="text-2xl font-bold mt-2">{card.value}</p>
                        <span
                            className={`text-sm ${card.change.startsWith("+")
                                    ? "text-green-500"
                                    : "text-red-500"
                                }`}
                        >
                            {card.change}
                        </span>
                    </div>
                ))}
            </div>

            {/* SECCIÓN DE PUNTOS DE VENTA */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                <h2 className="text-xl font-semibold text-[#001C63]">
                    Gestión de Puntos de Venta
                </h2>
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 bg-[#bfdbfe] text-[#001C63] px-3 py-2 rounded-lg hover:bg-[#9ec5ff] transition">
                        <Filter className="w-4 h-4" /> Filtros
                    </button>
                    <button className="flex items-center gap-2 bg-[#3b82f6] text-white px-3 py-2 rounded-lg hover:bg-[#2563eb] transition">
                        <PlusCircle className="w-4 h-4" /> Añadir Nuevo Punto
                    </button>
                </div>
            </div>

            {/* BUSCADOR */}
            <input
                type="text"
                placeholder="Buscar punto de venta..."
                className="w-full mb-6 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3b82f6] outline-none"
            />

            {/* CARDS DE SUCURSALES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[
                    {
                        name: "Sucursal Centro",
                        city: "Madrid, España",
                        sales: "$1,850.20",
                        status: "Online",
                        color: "bg-green-100 text-green-700",
                    },
                    {
                        name: "Tienda Norte",
                        city: "Barcelona, España",
                        sales: "$975.50",
                        status: "Online",
                        color: "bg-green-100 text-green-700",
                    },
                    {
                        name: "Almacén Sur",
                        city: "Sevilla, España",
                        sales: "$0.00",
                        status: "Offline",
                        color: "bg-red-100 text-red-700",
                    },
                ].map((store, i) => (
                    <div
                        key={i}
                        className="bg-white shadow-md rounded-xl p-5 hover:shadow-lg transition-shadow flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <h3 className="font-bold text-lg">{store.name}</h3>
                                <p className="text-sm text-gray-500">{store.city}</p>
                            </div>
                            <span
                                className={`text-sm font-medium px-3 py-1 rounded-full ${store.color}`}
                            >
                                {store.status}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">Ventas del día</p>
                        <p className="text-xl font-bold">{store.sales}</p>
                        <button className="mt-4 bg-[#bfdbfe] text-[#001C63] py-2 rounded-lg hover:bg-[#9ec5ff] transition">
                            Ver Detalles
                        </button>
                    </div>
                ))}
            </div>

            {/* SECCIÓN DE GRÁFICAS */}
            <div className="mt-10 bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
                    <h2 className="text-xl font-semibold text-[#001C63]">
                        Análisis de Ventas
                    </h2>
                    <div className="flex gap-3">
                        {["line", "bar", "pie"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setChartType(type)}
                                className={`px-4 py-1 rounded-lg border ${chartType === type
                                        ? "bg-[#3b82f6] text-white"
                                        : "bg-[#e0edff] text-[#001C63]"
                                    } hover:bg-[#9ec5ff] transition`}
                            >
                                {type.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-full h-80">
                    <ResponsiveContainer>
                        {chartType === "line" && (
                            <LineChart data={data}>
                                <Line
                                    type="monotone"
                                    dataKey="ventas"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                />
                                <Tooltip />
                                <Legend />
                            </LineChart>
                        )}
                        {chartType === "bar" && (
                            <BarChart data={data}>
                                <Bar dataKey="transacciones" fill="#2563eb" />
                                <Tooltip />
                                <Legend />
                            </BarChart>
                        )}
                        {chartType === "pie" && (
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={COLORS[index % COLORS.length]}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        )}
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
