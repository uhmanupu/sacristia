import React from 'react';
import { Home, ListTodo, CalendarDays, Search, Plus, Settings, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
    return (
        <div className="w-16 md:w-20 bg-[#0f1014] flex flex-col items-center py-6 border-r border-white/5 z-20">
            {/* Logo area */}
            <div className="mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/40">
                    <span className="font-bold text-white text-xl">G+</span>
                </div>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 flex flex-col gap-6 w-full items-center">
                <NavItem icon={<Home size={22} />} active />
                <NavItem icon={<Search size={22} />} />
                <NavItem icon={<ListTodo size={22} />} />
                <NavItem icon={<CalendarDays size={22} />} />
                <div className="h-px w-8 bg-white/10 my-2"></div>
                <NavItem icon={<Plus size={22} />} />
            </nav>

            {/* Bottom */}
            <div className="flex flex-col gap-6 w-full items-center">
                <button className="text-gray-500 hover:text-white transition-colors duration-200 hover:scale-110">
                    <Settings size={22} />
                </button>
                <div className="w-8 h-8 rounded-full bg-indigo-500 overflow-hidden border-2 border-transparent hover:border-white transition-all cursor-pointer">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
                </div>
            </div>
        </div>
    );
};

const NavItem: React.FC<{icon: React.ReactNode, active?: boolean}> = ({ icon, active }) => (
    <button className={`p-3 rounded-xl transition-all duration-300 relative group
        ${active ? 'text-white' : 'text-gray-500 hover:text-white'}`}>
        {icon}
        {active && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-l-full shadow-[0_0_10px_#3b82f6]"></div>
        )}
        <div className="absolute inset-0 bg-white/10 rounded-xl scale-0 group-hover:scale-100 transition-transform duration-200"></div>
    </button>
);

export default Sidebar;