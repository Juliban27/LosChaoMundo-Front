import React, { useState } from "react";
import {
    TrendingUp,
    DollarSign,
    ShoppingCart,
    Package,
    ArrowUpRight,
    ArrowDownRight,
} from "lucide-react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
} from "recharts";
import HeaderAdmin from "../components/HeaderAdmin";

const ventasData = [
    { name: "Lun", ventas: 720 },
    { name: "Mar", ventas: 690 },
    { name: "Mié", ventas: 770 },
    { name: "Jue", ventas: 540 },
    { name: "Vie", ventas: 910 },
    { name: "Sáb", ventas: 680 },
    { name: "Dom", ventas: 820 },
];

const categoriasData = [
    { name: "Electrónica", value: 720 },
    { name: "Ropa", value: 430 },
    { name: "Otros", value: 380 },
];

const COLORS = ["#3b82f6", "#2563eb", "#001C63"];

export default function Home() {
    const [activeChart, setActiveChart] = useState("ventas");

    return (
        <div className="min-h-screen bg-[#f5f8ff] text-[#001C63] px-6 py-8">
            {/* Header */}
            <HeaderAdmin/>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pt-11">
                <h1 className="text-2xl font-bold text-[#001C63]">
                    Detalle de Sucursal Centro
                </h1>

                <div className="flex gap-3 mt-4 md:mt-0">
                    {["Hoy", "Últimos 7 días", "Mes Actual", "Personalizado"].map(
                        (btn) => (
                            <button
                                key={btn}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${btn === "Hoy"
                                        ? "bg-[#3b82f6] text-white shadow-md"
                                        : "bg-white hover:bg-[#e0edff] text-[#001C63] border border-[#bfdbfe]"
                                    }`}
                            >
                                {btn}
                            </button>
                        )
                    )}
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard
                    icon={<DollarSign size={20} />}
                    title="Ventas Totales"
                    value="$12,845.50"
                    change="+5.2% vs ayer"
                    isPositive
                />
                <StatCard
                    icon={<TrendingUp size={20} />}
                    title="Ticket Promedio"
                    value="$45.88"
                    change="-1.1% vs ayer"
                />
                <StatCard
                    icon={<ShoppingCart size={20} />}
                    title="Total Transacciones"
                    value="280"
                    change="+8.0% vs ayer"
                    isPositive
                />
                <StatCard
                    icon={<Package size={20} />}
                    title="Artículos por Ticket"
                    value="3.2"
                    change="+2.3% vs ayer"
                    isPositive
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold text-lg">Tendencia de Ventas</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setActiveChart("ventas")}
                                className={`text-sm px-3 py-1 rounded-md ${activeChart === "ventas"
                                        ? "bg-[#3b82f6] text-white"
                                        : "bg-[#e0edff] text-[#001C63] hover:bg-[#bfdbfe]"
                                    }`}
                            >
                                Ventas
                            </button>
                            <button
                                onClick={() => setActiveChart("categorias")}
                                className={`text-sm px-3 py-1 rounded-md ${activeChart === "categorias"
                                        ? "bg-[#3b82f6] text-white"
                                        : "bg-[#e0edff] text-[#001C63] hover:bg-[#bfdbfe]"
                                    }`}
                            >
                                Categorías
                            </button>
                        </div>
                    </div>

                    {activeChart === "ventas" ? (
                        <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={ventasData}>
                                <XAxis dataKey="name" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="ventas"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ r: 4 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                                <Pie
                                    data={categoriasData}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={80}
                                    label
                                    dataKey="value"
                                >
                                    {categoriasData.map((entry, index) => (
                                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Legend />
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Productos más vendidos */}
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                    <h2 className="font-semibold text-lg mb-4">Productos más Vendidos</h2>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[#2563eb] border-b">
                                <th className="pb-2">Producto</th>
                                <th className="pb-2">Unidades</th>
                                <th className="pb-2">Ingresos</th>
                            </tr>
                        </thead>
                        <tbody className="text-[#001C63]/90">
                            {[
                                ["Audífonos Inalámbricos Pro", 45, "$2,245.50"],
                                ["Teclado Mecánico RGB", 32, "$1,596.80"],
                                ["Monitor Curvo 27”", 21, "$4,179.00"],
                                ["Mouse Gamer X2", 58, "$1,734.20"],
                            ].map(([producto, unidades, ingresos], i) => (
                                <tr
                                    key={i}
                                    className="border-b hover:bg-[#eff6ff] transition-colors"
                                >
                                    <td className="py-2">{producto}</td>
                                    <td className="py-2">{unidades}</td>
                                    <td className="py-2">{ingresos}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, title, value, change, isPositive }) {
    return (
        <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all cursor-pointer">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-sm text-[#2563eb]">{title}</p>
                    <h3 className="text-2xl font-bold mt-1">{value}</h3>
                    <div
                        className={`flex items-center gap-1 text-sm mt-1 ${isPositive ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        {isPositive ? (
                            <ArrowUpRight size={16} />
                        ) : (
                            <ArrowDownRight size={16} />
                        )}
                        {change}
                    </div>
                </div>
                <div className="p-3 rounded-xl bg-[#e0edff] text-[#2563eb]">{icon}</div>
            </div>
        </div>
    );
}
