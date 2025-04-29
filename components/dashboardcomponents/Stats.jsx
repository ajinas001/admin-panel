export default function Stats() {
    const stats = [
      {
        title: 'Active Users',
        value: '40,689',
        change: '+8.5% Up from yesterday',
        icon: 'users',
        iconBg: 'bg-blue-100',
        changeColor: 'text-green-500'
      },
      {
        title: 'Total Buyers',
        value: '10293',
        change: '+1.3% Up from past week',
        icon: 'shopping-bag',
        iconBg: 'bg-yellow-100',
        changeColor: 'text-green-500'
      },
      {
        title: 'Total Sellers',
        value: '2040',
        change: '+1.8% Up from yesterday',
        icon: 'users',
        iconBg: 'bg-red-100',
        changeColor: 'text-green-500'
      },
      {
        title: 'Total Sales',
        value: '$89,000',
        change: '-4.3% Down from yesterday',
        icon: 'trending-up',
        iconBg: 'bg-green-100',
        changeColor: 'text-red-500'
      }
    ];
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between">
              <div>
                <div className="text-sm text-gray-500">{stat.title}</div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`text-xs flex items-center ${stat.changeColor}`}>
                  {stat.change.includes('Up') ? (
                    <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                  ) : (
                    <svg className="h-3 w-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                  {stat.change}
                </div>
              </div>
              <div className={`p-3 rounded-full ${stat.iconBg}`}>
                <svg className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }