import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, isWithinInterval } from "date-fns";
import { DollarSign, TrendingUp, AlertTriangle } from "lucide-react";

export default function EarningReportPage() {
  const [dateRange, setDateRange] = useState({ from: null, to: null });
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [totalDueFromCustomers, setTotalDueFromCustomers] = useState(0); // 🔧 Added
  const { user } = useAuthContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const [billRes, customerRes] = await Promise.all([
          axios.get("http://localhost:3000/api/bills/", {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
          axios.get("http://localhost:3000/api/customers/", {
            headers: { Authorization: `Bearer ${user.token}` },
          }),
        ]);

        const bills = billRes.data;
        const customers = customerRes.data;

        // 🔧 Calculate total due from customers
        const totalDue = customers.reduce(
          (acc, customer) => acc + (customer.remainValue || 0),
          0
        );
        setTotalDueFromCustomers(totalDue);

        // Group bills by date and aggregate earnings/profit
        const earningsMap = {};

        bills.forEach((bill) => {
          const dateKey = bill.date
            ? bill.date
            : format(new Date(bill.createdAt), "yyyy-MM-dd");

          if (!earningsMap[dateKey]) {
            earningsMap[dateKey] = {
              date: dateKey,
              earnings: 0,
              profit: 0,
            };
          }
          earningsMap[dateKey].earnings += bill.total || 0;
          earningsMap[dateKey].profit += bill.profit || 0;
        });

        const aggregatedData = Object.values(earningsMap).sort((a, b) =>
          a.date.localeCompare(b.date)
        );

        setAllData(aggregatedData);
      } catch (error) {
        console.error("Error fetching bills or customers:", error);
      }
    }

    if (user) {
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (allData.length === 0) return;

    if (dateRange.from && dateRange.to) {
      const filtered = allData.filter(({ date }) => {
        const currentDate = new Date(date);
        return isWithinInterval(currentDate, {
          start: dateRange.from,
          end: dateRange.to,
        });
      });
      setFilteredData(filtered);
    } else {
      const lastDate = new Date(allData[allData.length - 1].date);
      const last7Days = subDays(lastDate, 6);

      const filtered = allData.filter(
        ({ date }) => new Date(date) >= last7Days
      );
      setFilteredData(filtered);
    }
  }, [dateRange, allData]);

  const totalEarningsAllTime = allData.reduce(
    (acc, cur) => acc + cur.earnings,
    0
  );
  const totalProfitAllTime = allData.reduce((acc, cur) => acc + cur.profit, 0);

  const totalEarningsFiltered = filteredData.reduce(
    (acc, cur) => acc + cur.earnings,
    0
  );
  const totalProfitFiltered = filteredData.reduce(
    (acc, cur) => acc + cur.profit,
    0
  );

  return (
    <div className="px-1 py-2 space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
        <div className="flex items-center gap-3 bg-white border rounded-lg p-4 shadow">
          <DollarSign className="text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Total Earnings</p>
            <p className="text-lg font-semibold text-gray-800">
              {totalEarningsAllTime.toFixed(2)} AFN
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white border rounded-lg p-4 shadow">
          <TrendingUp className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Total Profit</p>
            <p className="text-lg font-semibold text-gray-800">
              {totalProfitAllTime.toFixed(2)} AFN
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-white border rounded-lg p-4 shadow">
          <AlertTriangle className="text-red-600" />
          <div>
            <p className="text-sm text-gray-500">Total Due</p>
            <p className="text-lg font-semibold text-gray-800">
              {totalDueFromCustomers.toFixed(2)} AFN
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow border space-y-6">
        {/* Date Range Filter */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <input
            type="date"
            value={dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : ""}
            onChange={(e) => {
              const to = new Date(e.target.value);
              setDateRange((prev) => ({ from: prev.from || to, to }));
            }}
            className=" border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={dateRange.from ? format(dateRange.from, "yyyy-MM-dd") : ""}
            onChange={(e) => {
              const from = new Date(e.target.value);
              setDateRange((prev) => ({ from, to: prev.to || from }));
            }}
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="text-gray-600 text-sm">
            {dateRange.from && dateRange.to ? (
              <>
                Showing from <strong>{format(dateRange.from, "PPP")}</strong> to{" "}
                <strong>{format(dateRange.to, "PPP")}</strong>
              </>
            ) : (
              <>
                Showing results for the <strong>last 7 days</strong>
              </>
            )}
          </div>
        </div>

        {/* Filtered Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-green-50 text-green-800 border border-green-200 p-4 rounded-md">
            <p className="text-sm">Filtered Earnings</p>
            <p className="text-xl font-bold mt-1">
              {totalEarningsFiltered.toFixed(2)} AFN
            </p>
          </div>
          <div className="bg-blue-50 text-blue-800 border border-blue-200 p-4 rounded-md">
            <p className="text-sm">Filtered Profit</p>
            <p className="text-xl font-bold mt-1">
              {totalProfitFiltered.toFixed(2)} AFN
            </p>
          </div>
          <div className="bg-red-50 text-red-800 border border-red-200 p-4 rounded-md">
            <p className="text-sm">Total Due (All Customers)</p>
            <p className="text-xl font-bold mt-1">
              {totalDueFromCustomers.toFixed(2)} AFN
            </p>
          </div>
        </div>

        {/* Chart */}
        <div>
          <h2 className="text-base font-semibold text-gray-700 mb-3">
            Earnings & Profit Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={filteredData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(dateStr) => format(new Date(dateStr), "MMM d")}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(label) => format(new Date(label), "PPP")}
              />
              <Line
                type="monotone"
                dataKey="earnings"
                stroke="#22c55e"
                strokeWidth={2}
                name="Earnings"
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="border-t border-gray-200 my-6"></div>
    </div>
  );
}
