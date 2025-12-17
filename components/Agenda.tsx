import React from 'react';
import { Calendar, Clock, Video, Briefcase, User } from 'lucide-react';
import { DashboardEvent } from '../types';

const Agenda: React.FC = () => {
  // Simulação de dados
  const events: DashboardEvent[] = [
    { id: '1', title: 'Daily com o time', time: '10:00', type: 'work' },
    { id: '2', title: 'Almoço com Sarah', time: '12:30', type: 'personal' },
    { id: '3', title: 'Apresentação de Projeto', time: '15:00', type: 'meeting' },
    { id: '4', title: 'Academia', time: '18:00', type: 'personal' },
  ];

  const getIcon = (type: string) => {
    switch(type) {
        case 'meeting': return <Video size={14} className="text-blue-400" />;
        case 'work': return <Briefcase size={14} className="text-purple-400" />;
        default: return <User size={14} className="text-pink-400" />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#1e212d] border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-white/30 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] group">
        <div className="bg-gradient-to-r from-blue-900/40 to-transparent p-4 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-bold text-gray-100 tracking-wide flex items-center gap-2">
                <Calendar size={18} className="text-blue-400" />
                Agenda Hoje
            </h3>
            <span className="text-xs text-gray-400">{new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric' })}</span>
        </div>
        
        <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-4 bottom-4 w-px bg-white/5"></div>

            {events.map((evt, idx) => (
                <div key={evt.id} className="relative pl-8 group/event">
                    {/* Dot on timeline */}
                    <div className="absolute left-[20px] top-3 w-2 h-2 rounded-full bg-[#1A1D29] border-2 border-gray-600 group-hover/event:border-blue-400 group-hover/event:scale-125 transition-all z-10"></div>
                    
                    <div className="bg-[#252833] p-3 rounded-lg border border-white/5 hover:bg-[#2a2d3a] hover:border-white/10 transition-colors">
                        <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-gray-200 text-sm truncate">{evt.title}</span>
                            {getIcon(evt.type)}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock size={10} />
                            {evt.time}
                        </div>
                    </div>
                </div>
            ))}
            
            <button className="w-full mt-2 py-2 text-xs text-center text-gray-500 hover:text-blue-400 hover:bg-white/5 rounded border border-dashed border-white/10 hover:border-blue-400/30 transition-all">
                + Adicionar evento
            </button>
        </div>
    </div>
  );
};

export default Agenda;