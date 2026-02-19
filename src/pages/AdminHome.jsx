import React, { useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin.jsx";
import { useNavigate } from 'react-router-dom';

import {
    TrendingUp,
    ShoppingCart,
    Store,
    DollarSign,
    PlusCircle,
    Filter,
    CheckCircle,
    AlertTriangle,
    XCircle,
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

export default function Home() {
    const [chartType, setChartType] = useState("line");
    const navigate = useNavigate();

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
            <HeaderAdmin/>
            <div className="mb-6 pt-16">
                <h1 className="text-3xl font-bold text-[#001C63]">Dashboard Global</h1>
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
                            <card.icon className="w-6 h-6" style={{ color: card.color }} />
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
                        <button className="mt-4 bg-[#bfdbfe] text-[#001C63] py-2 rounded-lg hover:bg-[#9ec5ff] transition" onClick={() => navigate('/detailtienda')}>
                            Ver Detalles
                        </button>
                    </div>
                ))}
            </div>

            {/* SECCIÓN DE GRÁFICAS */}
            <div className="mt-10 bg-white rounded-xl shadow-md p-6" id="graficas">
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

            {/* SECCIÓN DE ACTIVIDAD Y SERVICIOS */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ACTIVIDAD RECIENTE */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-[#001C63] mb-4">
                        Actividad Reciente
                    </h2>
                    <table className="w-full text-left text-gray-700">
                        <thead>
                            <tr className="border-b">
                                <th className="py-2">ID Transacción</th>
                                <th className="py-2">Punto de Venta</th>
                                <th className="py-2">Monto</th>
                                <th className="py-2">Hora</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { id: "#8A34F9", punto: "Sucursal Centro", monto: "$45.50", hora: "14:32" },
                                { id: "#2B87D1", punto: "Tienda Norte", monto: "$12.00", hora: "14:28" },
                                { id: "#C5E1A0", punto: "Sucursal Centro", monto: "$89.99", hora: "14:25" },
                                { id: "#F7B4C6", punto: "Sucursal Centro", monto: "$23.75", hora: "14:19" },
                                { id: "#9D0F5E", punto: "Tienda Norte", monto: "$5.50", hora: "14:15" },
                            ].map((tx, i) => (
                                <tr key={i} className="border-b hover:bg-[#f1f5f9] transition">
                                    <td className="py-2 font-medium">{tx.id}</td>
                                    <td className="py-2">{tx.punto}</td>
                                    <td className="py-2">{tx.monto}</td>
                                    <td className="py-2">{tx.hora}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ESTADO DE LOS SERVICIOS */}
                <div className="bg-white shadow-md rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-[#001C63] mb-4">
                        Estado de los Servicios
                    </h2>
                    <ul className="space-y-4">
                        {[
                            {
                                name: "API de Pagos",
                                status: "Operacional",
                                icon: CheckCircle,
                                color: "text-green-500",
                                updated: "hace 2 min",
                            },
                            {
                                name: "Servidor de Autenticación",
                                status: "Operacional",
                                icon: CheckCircle,
                                color: "text-green-500",
                                updated: "hace 2 min",
                            },
                            {
                                name: "Base de Datos Principal",
                                status: "Degradado",
                                icon: AlertTriangle,
                                color: "text-yellow-500",
                                updated: "hace 5 min",
                            },
                            {
                                name: "Servicio de Reportes",
                                status: "Caído",
                                icon: XCircle,
                                color: "text-red-500",
                                updated: "hace 15 min",
                            },
                        ].map((srv, i) => (
                            <li key={i} className="flex items-center justify-between border-b pb-2">
                                <div>
                                    <p className="font-medium">{srv.name}</p>
                                    <p className="text-sm text-gray-500">
                                        Actualizado {srv.updated}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <srv.icon className={`w-5 h-5 ${srv.color}`} />
                                    <span
                                        className={`font-medium ${srv.status === "Operacional"
                                                ? "text-green-600"
                                                : srv.status === "Degradado"
                                                    ? "text-yellow-600"
                                                    : "text-red-600"
                                            }`}
                                    >
                                        {srv.status}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
