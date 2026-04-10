export default function DashboardHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-5">Dashboard Stats</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white shadow-md rounded-lg p-5 text-center sm:text-left">
          <h3 className="text-gray-600 mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-gray-800">126</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5 text-center sm:text-left">
          <h3 className="text-gray-600 mb-2">Total Sales</h3>
          <p className="text-3xl font-bold text-gray-800">$3,560</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5 text-center sm:text-left">
          <h3 className="text-gray-600 mb-2">No. of Customers</h3>
          <p className="text-3xl font-bold text-gray-800">98</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-5 text-center sm:text-left">
          <h3 className="text-gray-600 mb-2">Products in Stock</h3>
          <p className="text-3xl font-bold text-gray-800">35</p>
        </div>
      </div>
    </div>
  );
}
