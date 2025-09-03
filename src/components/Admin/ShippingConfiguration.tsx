import React, { useState } from 'react';
import { Truck, MapPin, Package, Settings } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';
import { algerianStates } from '../../data/mockData';

const ShippingConfiguration: React.FC = () => {
  const { shippingZones, updateShippingZone } = useApp();
  const [activeZone, setActiveZone] = useState(shippingZones[0]?.id || '');
  const [shippingModes, setShippingModes] = useState({
    freeShipping: true,
    shippingByChoices: false,
    shippingByRate: false,
    shippingByProvince: true
  });

  const currentZone = shippingZones.find(zone => zone.id === activeZone);

  const handleZoneUpdate = (updates: any) => {
    if (currentZone) {
      updateShippingZone(currentZone.id, updates);
    }
  };

  const handleStateRateUpdate = (stateName: string, rate: number) => {
    console.log(`Updating ${stateName} rate to ${rate}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Shipping Configuration</h3>
        
        {/* Shipping Mode Selection */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between p-4 border dark:border-gray-600 rounded-lg">
            <div className="flex items-center space-x-3">
              <Truck className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">Free shipping</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={shippingModes.freeShipping}
                onChange={(e) => setShippingModes(prev => ({ ...prev, freeShipping: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border dark:border-gray-600 rounded-lg">
            <div className="flex items-center space-x-3">
              <Settings className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">Shipping by Choices</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={shippingModes.shippingByChoices}
                onChange={(e) => setShippingModes(prev => ({ ...prev, shippingByChoices: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border dark:border-gray-600 rounded-lg">
            <div className="flex items-center space-x-3">
              <Package className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">Shipping by Rate</span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={shippingModes.shippingByRate}
                onChange={(e) => setShippingModes(prev => ({ ...prev, shippingByRate: e.target.checked }))}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 border dark:border-gray-600 rounded-lg">
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-900 dark:text-white">Shipping by Province</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400 px-2 py-1 rounded-full font-medium">
                ENABLED
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={shippingModes.shippingByProvince}
                  onChange={(e) => setShippingModes(prev => ({ ...prev, shippingByProvince: e.target.checked }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
              </label>
            </div>
          </div>
        </div>

        {/* Shipping Mode Priority */}
        {shippingModes.shippingByProvince && (
          <div className="mb-8">
            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4">Prioritise Shipping mode by:</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="home_delivery"
                  name="shipping_priority"
                  className="w-4 h-4 text-teal-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-teal-500"
                />
                <label htmlFor="home_delivery" className="text-sm text-gray-700 dark:text-gray-300">
                  توصيل للبيت (Home Delivery)
                </label>
                <input
                  type="text"
                  placeholder="توصيل للبيت"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              <div className="flex items-center space-x-3">
                <input
                  type="radio"
                  id="office_delivery"
                  name="shipping_priority"
                  defaultChecked
                  className="w-4 h-4 text-teal-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-teal-500"
                />
                <label htmlFor="office_delivery" className="text-sm text-gray-700 dark:text-gray-300">
                  توصيل للمكتب (Office Delivery)
                </label>
                <input
                  type="text"
                  placeholder="توصيل للمكتب"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* All 58 Wilayas Pricing */}
        {shippingModes.shippingByProvince && (
          <div>
            <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200 mb-4">Manage pricings for all 58 Wilayas</h4>
            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-gray-50 dark:bg-gray-700">
                  <tr className="border-b dark:border-gray-600">
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Wilaya</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Arabic Name</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Zone</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Door Delivery (DZD)</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700 dark:text-gray-300">Stop Desk (DZD)</th>
                  </tr>
                </thead>
                <tbody>
                  {algerianStates.map((state) => {
                    const basePrice = state.zone === 'north' ? 400 : 
                                    state.zone === 'south' ? 1200 : 
                                    state.zone === 'east' ? 600 : 700;
                    const stopDeskPrice = Math.round(basePrice * 0.7);
                    
                    return (
                      <tr key={state.id} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">{state.name}</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300" dir="rtl">{state.nameAr}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            state.zone === 'north' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-400' :
                            state.zone === 'south' ? 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-400' :
                            state.zone === 'east' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400' :
                            'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-400'
                          }`}>
                            {state.zone}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              defaultValue={basePrice}
                              className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                              onChange={(e) => handleStateRateUpdate(state.name, parseInt(e.target.value))}
                            />
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked className="sr-only peer" />
                              <div className="w-9 h-5 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                            </label>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <input
                              type="number"
                              defaultValue={stopDeskPrice}
                              className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked className="sr-only peer" />
                              <div className="w-9 h-5 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 dark:peer-focus:ring-teal-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-teal-600"></div>
                            </label>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShippingConfiguration;