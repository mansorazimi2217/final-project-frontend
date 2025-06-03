import {
  MdOutlineAttachMoney,
  MdOutlineAccountBalance,
  MdPayments,
} from "react-icons/md";

const ExpenseSummaryCards = ({ filteredExpenses }) => {
  const totals = {
    all: filteredExpenses.reduce((sum, e) => sum + e.amount, 0),
    cash: filteredExpenses
      .filter((e) => e.paymentMethod === "Cash")
      .reduce((sum, e) => sum + e.amount, 0),
    bank: filteredExpenses
      .filter((e) => e.paymentMethod === "Bank")
      .reduce((sum, e) => sum + e.amount, 0),
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-[1.02] transition-transform">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Total Expenses</p>
            <p className="text-2xl font-bold">{formatCurrency(totals.all)}</p>
            <p className="text-xs mt-1 opacity-80">
              {filteredExpenses.length} transactions
            </p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            {/* <MdOutlineAttachMoney className="text-2xl" /> */}
            <MdOutlineAttachMoney className="text-2xl text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-[1.02] transition-transform">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Paid by Cash</p>
            <p className="text-2xl font-bold">{formatCurrency(totals.cash)}</p>
            <p className="text-xs mt-1 opacity-80">
              {
                filteredExpenses.filter((e) => e.paymentMethod === "Cash")
                  .length
              }{" "}
              transactions
            </p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <MdPayments className="text-2xl text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6 rounded-2xl shadow-lg text-white transform hover:scale-[1.02] transition-transform">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-80">Paid by Bank</p>
            <p className="text-2xl font-bold">{formatCurrency(totals.bank)}</p>
            <p className="text-xs mt-1 opacity-80">
              {
                filteredExpenses.filter((e) => e.paymentMethod === "Bank")
                  .length
              }{" "}
              transactions
            </p>
          </div>
          <div className="bg-white bg-opacity-20 p-3 rounded-full">
            <MdOutlineAccountBalance className="text-2xl text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummaryCards;
