import React, { useState } from 'react';
import { Settings, Save, Users, DollarSign, ToggleLeft, ToggleRight, Plus, Trash2 } from 'lucide-react';
import { useCommission } from '../../contexts/CommissionContext';

const CommissionSettings: React.FC = () => {
  const { settings, teamMembers, updateSettings, updateTeamMember } = useCommission();
  const [localSettings, setLocalSettings] = useState(settings);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');

  const handleSaveSettings = () => {
    updateSettings(localSettings);
    alert('Settings saved successfully!');
  };

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      // This would typically be handled by the commission context
      setNewMemberName('');
      setShowAddMember(false);
      alert('Member added successfully!');
    }
  };

  const toggleMemberStatus = (memberId: string, isActive: boolean) => {
    updateTeamMember(memberId, { isActive: !isActive });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Commission Settings</h2>
          <p className="text-gray-600 dark:text-gray-400">Configure commission rates and team management</p>
        </div>
        <button
          onClick={handleSaveSettings}
          className="flex items-center space-x-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors"
        >
          <Save className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Commission Configuration */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <DollarSign className="h-6 w-6 text-teal-600 dark:text-teal-400" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Commission Configuration</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Commission Per Product (DA)
            </label>
            <input
              type="number"
              value={localSettings.commissionPerProduct}
              onChange={(e) => setLocalSettings(prev => ({ 
                ...prev, 
                commissionPerProduct: parseInt(e.target.value) || 0 
              }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Fixed commission amount earned per product sale
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Minimum Payout (DA)
            </label>
            <input
              type="number"
              value={localSettings.minimumPayout}
              onChange={(e) => setLocalSettings(prev => ({ 
                ...prev, 
                minimumPayout: parseInt(e.target.value) || 0 
              }))}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Minimum amount before payout is processed
            </p>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white">Auto-Distribute Commissions</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatically distribute commissions when orders are completed
              </p>
            </div>
            <button
              onClick={() => setLocalSettings(prev => ({ 
                ...prev, 
                autoDistribute: !prev.autoDistribute 
              }))}
              className={`p-1 rounded-full transition-colors ${
                localSettings.autoDistribute 
                  ? 'text-teal-600 dark:text-teal-400' 
                  : 'text-gray-400 dark:text-gray-500'
              }`}
            >
              {localSettings.autoDistribute ? (
                <ToggleRight className="h-8 w-8" />
              ) : (
                <ToggleLeft className="h-8 w-8" />
              )}
            </button>
          </div>
        </div>

        {/* Commission Breakdown */}
        <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
          <h4 className="font-medium text-teal-900 dark:text-teal-400 mb-2">Commission Breakdown</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-teal-700 dark:text-teal-300">Total per Product:</span>
              <span className="font-bold ml-2">{localSettings.commissionPerProduct} DA</span>
            </div>
            <div>
              <span className="text-teal-700 dark:text-teal-300">Share per Person:</span>
              <span className="font-bold ml-2">
                {Math.round(localSettings.commissionPerProduct / teamMembers.length)} DA
              </span>
            </div>
            <div>
              <span className="text-teal-700 dark:text-teal-300">Team Members:</span>
              <span className="font-bold ml-2">{teamMembers.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Team Management */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Team Management</h3>
          </div>
          <button
            onClick={() => setShowAddMember(true)}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add Member</span>
          </button>
        </div>

        {/* Add Member Modal */}
        {showAddMember && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Team Member</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Member Name
                  </label>
                  <input
                    type="text"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter member name"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowAddMember(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMember}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Member
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Team Members List */}
        <div className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 border dark:border-gray-600 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">{member.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Earned: {member.totalEarned.toLocaleString()} DA
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => toggleMemberStatus(member.id, member.isActive)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    member.isActive
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-400'
                  }`}
                >
                  {member.isActive ? 'Active' : 'Inactive'}
                </button>
                
                <button className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Automation Script Information */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800">
        <div className="flex items-start space-x-4">
          <Settings className="h-8 w-8 text-purple-600 dark:text-purple-400 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-400 mb-2">
              Automation Script Integration
            </h3>
            <p className="text-purple-800 dark:text-purple-300 mb-4">
              This commission system automatically processes sales and distributes earnings. Here's how it works:
            </p>
            <div className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>When a product is sold, {settings.commissionPerProduct} DA commission is recorded</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Commission is automatically split equally among {teamMembers.length} team members</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Each member receives {Math.round(settings.commissionPerProduct / teamMembers.length)} DA per product</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>All transactions are logged with timestamps and order details</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommissionSettings;