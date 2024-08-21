import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '../App.css';

function OrderList() {
  const [activeTab, setActiveTab] = useState('myOrders');

  const orders = [
    { id: 1, timeLeft: '10 min', amount: '1', token: 'ETH', chain: 'ETH', output: '4.5 BNB', status: 'active' },
    { id: 2, timeLeft: '7 min', amount: '1', token: 'ETH', chain: 'ETH', output: '4.55 BNB', status: 'active' },
    { id: 3, timeLeft: '5 min', amount: '1', token: 'ETH', chain: 'ETH', output: '4.56 BNB', status: 'expired' },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <div className="order-list">
      {/* <h2>Order List</h2> */}
      <Tabs 
        value={activeTab} 
        onChange={handleTabChange} 
        sx={{ 
          borderBottom: 1, 
          borderColor: 'divider', 
          color: '#fff',
          '& .MuiTabs-flexContainer': { 
            justifyContent: 'flex-start', 
          }, 
        }}
        TabIndicatorProps={{
          style: {
            backgroundColor: '#ff7f50', 
          },
        }}
      >
        <Tab 
          label="My Orders" 
          value="myOrders" 
          sx={{ 
            color: '#ccc', 
            '&.Mui-selected': { color: '#ff7f50' }
          }}
        />
        <Tab 
          label="All Orders" 
          value="allOrders" 
          sx={{ 
            color: '#ccc', 
            '&.Mui-selected': { color: '#ff7f50' }
          }}
        />
      </Tabs>
      <div className="orders">
        {orders.map(order => (
          <div key={order.id} className={`order ${order.status}`}>
            <div>Expires in {order.timeLeft}</div>
            <div>Offering {order.amount} {order.token} from {order.chain} for {order.output}</div>
            <button className="order-action-btn">
              {order.status === 'expired' ? 'Reclaim' : 'Fill order'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderList;
