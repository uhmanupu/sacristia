import React, { useState, useEffect, useRef } from 'react';
import { Cross, Calendar } from 'lucide-react';
import { AgendaEvent, LiturgicalInfo } from './types';

// ======================================================
// DADOS CONSTANTES (ATUALIZADOS)
// ======================================================

const AGENDA_DATA_RAW: AgendaEvent[] = [
    // 16 DEZ
    { "date": "16/Dec (Terça-feira)", "dayOfWeek": "TER", "time": "09:00", "title": "Confissões crismandos", "location": "Matriz (Pe. Erick)" },
    { "date": "16/Dec (Terça-feira)", "dayOfWeek": "TER", "time": "14:00", "title": "Atendimento", "location": "Paróquia (Pe. Edimilson)" },
    { "date": "16/Dec (Terça-feira)", "dayOfWeek": "TER", "time": "14:00", "title": "Confissões crismandos", "location": "Matriz (Pe. Erick)" },
    { "date": "16/Dec (Terça-feira)", "dayOfWeek": "TER", "time": "19:00", "title": "Santa Missa", "location": "Setor 1 – Bairro Mendes (Pe. Edimilson)" },
    { "date": "16/Dec (Terça-feira)", "dayOfWeek": "TER", "time": "19:00", "title": "Formação MESC", "location": "(Pe. Erick)" },

    // 17 DEZ
    { "date": "17/Dec (Quarta-feira)", "dayOfWeek": "QUA", "time": "09:00", "title": "Atendimento", "location": "Paróquia (Pe. Edimilson)" },
    { "date": "17/Dec (Quarta-feira)", "dayOfWeek": "QUA", "time": "09:00", "title": "Confissões crismandos", "location": "Matriz (Pe. Erick)" },
    { "date": "17/Dec (Quarta-feira)", "dayOfWeek": "QUA", "time": "14:00", "title": "Confissões crismandos", "location": "Matriz (Pe. Erick)" },

    // 18 DEZ
    { "date": "18/Dec (Quinta-feira)", "dayOfWeek": "QUI", "time": "09:00", "title": "Atendimento", "location": "Paróquia (Pe. Edimilson)" },
    { "date": "18/Dec (Quinta-feira)", "dayOfWeek": "QUI", "time": "09:00", "title": "Confissões crismandos", "location": "Matriz (Pe. Erick)" },
    { "date": "18/Dec (Quinta-feira)", "dayOfWeek": "QUI", "time": "14:00", "title": "Confissões crismandos", "location": "Matriz (Pe. Erick)" },
    { "date": "18/Dec (Quinta-feira)", "dayOfWeek": "QUI", "time": "17:00", "title": "Confissões", "location": "Igreja Matriz (Pe. Edimilson)" },
    { "date": "18/Dec (Quinta-feira)", "dayOfWeek": "QUI", "time": "18:00", "title": "Adoração", "location": "Igreja Matriz (Pe. Edimilson)" },
    { "date": "18/Dec (Quinta-feira)", "dayOfWeek": "QUI", "time": "19:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Edimilson)" },
    { "date": "18/Dec (Quinta-feira)", "dayOfWeek": "QUI", "time": "19:00", "title": "Santa Missa", "location": "Setor 1 – Bairro Muquém (Pe. Erick)" },

    // 19 DEZ
    { "date": "19/Dec (Sexta-feira)", "dayOfWeek": "SEX", "time": "09:00", "title": "Visita às obras", "location": "Externo (Pe. Erick)" },
    { "date": "19/Dec (Sexta-feira)", "dayOfWeek": "SEX", "time": "09:00", "title": "Santa Missa", "location": "Abrigo São Camilo (Pe. Edimilson)" },
    { "date": "19/Dec (Sexta-feira)", "dayOfWeek": "SEX", "time": "14:00", "title": "Atendimento", "location": "Paróquia (Pe. Edimilson)" },
    { "date": "19/Dec (Sexta-feira)", "dayOfWeek": "SEX", "time": "19:00", "title": "Santa Missa", "location": "Setor 2 – Bairro Porto (Pe. Edimilson)" },
    { "date": "19/Dec (Sexta-feira)", "dayOfWeek": "SEX", "time": "19:00", "title": "Santa Missa", "location": "Setor 5 – Bairro Pouso Frio (Pe. Erick)" },

    // 20 DEZ
    { "date": "20/Dec (Sábado)", "dayOfWeek": "SÁB", "time": "10:00", "title": "Crismas", "location": "(Pe. Erick)" },
    { "date": "20/Dec (Sábado)", "dayOfWeek": "SÁB", "time": "10:00", "title": "Santa Missa", "location": "Setor 1 – Bairro V. do Socorro (Pe. Erick)" },
    { "date": "20/Dec (Sábado)", "dayOfWeek": "SÁB", "time": "16:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Edimilson)" },
    { "date": "20/Dec (Sábado)", "dayOfWeek": "SÁB", "time": "19:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Erick)" },

    // 21 DEZ
    { "date": "21/Dec (Domingo)", "dayOfWeek": "DOM", "time": "07:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Erick)" },
    { "date": "21/Dec (Domingo)", "dayOfWeek": "DOM", "time": "09:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Edimilson)" },
    { "date": "21/Dec (Domingo)", "dayOfWeek": "DOM", "time": "10:00", "title": "Santa Missa", "location": "Setor 7 – Retiro dos Marins (Pe. Erick)" },
    { "date": "21/Dec (Domingo)", "dayOfWeek": "DOM", "time": "11:00", "title": "Santa Missa", "location": "Setor 1 – Bairro Retirinho (Pe. Edimilson)" },
    { "date": "21/Dec (Domingo)", "dayOfWeek": "DOM", "time": "18:00", "title": "Santa Missa", "location": "Setor 4 – Bairro Moreiras (Pe. Edimilson)" },
    { "date": "21/Dec (Domingo)", "dayOfWeek": "DOM", "time": "19:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Erick)" },

    // 22 DEZ
    { "date": "22/Dec (Segunda-feira)", "dayOfWeek": "SEG", "time": "--:--", "title": "Folga", "location": "(Pe. Edimilson)" },
    { "date": "22/Dec (Segunda-feira)", "dayOfWeek": "SEG", "time": "09:00", "title": "Santa Missa", "location": "Abrigo São Camilo (Pe. Erick)" },
    { "date": "22/Dec (Segunda-feira)", "dayOfWeek": "SEG", "time": "14:00", "title": "Visita às obras", "location": "(Pe. Erick)" },

    // 23 DEZ
    { "date": "23/Dec (Terça-feira)", "dayOfWeek": "TER", "time": "--:--", "title": "Folga", "location": "(Pe. Erick)" },
    { "date": "23/Dec (Terça-feira)", "dayOfWeek": "TER", "time": "14:00", "title": "Atendimento", "location": "Paróquia (Pe. Edimilson)" },
    { "date": "23/Dec (Terça-feira)", "dayOfWeek": "TER", "time": "19:00", "title": "Santa Missa", "location": "Setor 5 – Bairro Marques (Pe. Edimilson)" },

    // 24 DEZ
    { "date": "24/Dec (Quarta-feira)", "dayOfWeek": "QUA", "time": "17:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Erick)" },
    { "date": "24/Dec (Quarta-feira)", "dayOfWeek": "QUA", "time": "19:00", "title": "Santa Missa", "location": "Setor 6 – Bairro S. José da Mantiqueira (Pe. Edimilson)" },
    { "date": "24/Dec (Quarta-feira)", "dayOfWeek": "QUA", "time": "20:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Erick)" },
    { "date": "24/Dec (Quarta-feira)", "dayOfWeek": "QUA", "time": "21:00", "title": "Santa Missa", "location": "Setor 7 – Bairro Roseirinha (Pe. Edimilson)" },

    // 25 DEZ
    { "date": "25/Dec (Quinta-feira)", "dayOfWeek": "QUI", "time": "09:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Edimilson)" },
    { "date": "25/Dec (Quinta-feira)", "dayOfWeek": "QUI", "time": "10:00", "title": "Santa Missa", "location": "Setor 7 – Bairro Rio Acima II (Pe. Erick)" },
    { "date": "25/Dec (Quinta-feira)", "dayOfWeek": "QUI", "time": "11:00", "title": "Santa Missa", "location": "Setor 1 – Bairro Mendes (Pe. Edimilson)" },
    { "date": "25/Dec (Quinta-feira)", "dayOfWeek": "QUI", "time": "19:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Erick)" },

    // 26 DEZ
    { "date": "26/Dec (Sexta-feira)", "dayOfWeek": "SEX", "time": "09:00", "title": "Atendimento", "location": "Paróquia (Pe. Erick)" },
    { "date": "26/Dec (Sexta-feira)", "dayOfWeek": "SEX", "time": "14:00", "title": "Atendimento", "location": "Paróquia (Pe. Edimilson)" },
    { "date": "26/Dec (Sexta-feira)", "dayOfWeek": "SEX", "time": "19:00", "title": "Santa Missa", "location": "Sagrado Coração de Jesus (Pe. Erick)" },
    { "date": "26/Dec (Sexta-feira)", "dayOfWeek": "SEX", "time": "19:00", "title": "Santa Missa", "location": "Setor 5 – Bairro Roseira (Pe. Edimilson)" },

    // 27 DEZ
    { "date": "27/Dec (Sábado)", "dayOfWeek": "SÁB", "time": "16:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Erick)" },
    { "date": "27/Dec (Sábado)", "dayOfWeek": "SÁB", "time": "18:00", "title": "Santa Missa", "location": "Hotel (Pe. Erick)" },
    { "date": "27/Dec (Sábado)", "dayOfWeek": "SÁB", "time": "19:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Edimilson)" },

    // 28 DEZ
    { "date": "28/Dec (Domingo)", "dayOfWeek": "DOM", "time": "07:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Edimilson)" },
    { "date": "28/Dec (Domingo)", "dayOfWeek": "DOM", "time": "09:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Edimilson)" },
    { "date": "28/Dec (Domingo)", "dayOfWeek": "DOM", "time": "09:00", "title": "Santa Missa", "location": "Setor 3 – Bairro Corrêas (Pe. Erick)" },
    { "date": "28/Dec (Domingo)", "dayOfWeek": "DOM", "time": "18:00", "title": "Santa Missa", "location": "Setor 2 – Bairro Porto (Pe. Edimilson)" },
    { "date": "28/Dec (Domingo)", "dayOfWeek": "DOM", "time": "19:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Erick)" },

    // 29 DEZ
    { "date": "29/Dec (Segunda-feira)", "dayOfWeek": "SEG", "time": "--:--", "title": "Folga", "location": "(Pe. Edimilson)" },
    { "date": "29/Dec (Segunda-feira)", "dayOfWeek": "SEG", "time": "09:00", "title": "Visita às obras", "location": "(Pe. Erick)" },

    // 30 DEZ
    { "date": "30/Dec (Terça-feira)", "dayOfWeek": "TER", "time": "--:--", "title": "Folga", "location": "(Pe. Erick)" },
    { "date": "30/Dec (Terça-feira)", "dayOfWeek": "TER", "time": "14:00", "title": "Atendimento", "location": "Paróquia (Pe. Edimilson)" },
    { "date": "30/Dec (Terça-feira)", "dayOfWeek": "TER", "time": "19:00", "title": "Santa Missa", "location": "Setor 7 – Bairro Palmeiras (Pe. Edimilson)" },

    // 31 DEZ
    { "date": "31/Dec (Quarta-feira)", "dayOfWeek": "QUA", "time": "17:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Edimilson)" },
    { "date": "31/Dec (Quarta-feira)", "dayOfWeek": "QUA", "time": "18:30", "title": "Adoração", "location": "Igreja Matriz (Pe. Erick)" },
    { "date": "31/Dec (Quarta-feira)", "dayOfWeek": "QUA", "time": "19:30", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Erick)" },
    { "date": "31/Dec (Quarta-feira)", "dayOfWeek": "QUA", "time": "19:30", "title": "Santa Missa", "location": "Setor 7 – Bairro Vargem Alegre (Pe. Edimilson)" },

    // JANEIRO 2026
    { "date": "01/Jan (Quinta-feira)", "dayOfWeek": "QUI", "time": "09:00", "title": "Santa Missa", "location": "Setor 4 – Bairro Moreira (Pe. Edimilson)" },
    { "date": "01/Jan (Quinta-feira)", "dayOfWeek": "QUI", "time": "11:00", "title": "Santa Missa", "location": "Hotel? (Pe. Erick)" },
    { "date": "01/Jan (Quinta-feira)", "dayOfWeek": "QUI", "time": "16:00", "title": "Santa Missa", "location": "Setor 1 – Bairro Retirinho (Pe. Edimilson)" },
    { "date": "01/Jan (Quinta-feira)", "dayOfWeek": "QUI", "time": "18:00", "title": "Adoração", "location": "Igreja Matriz (Pe. Erick)" },
    { "date": "01/Jan (Quinta-feira)", "dayOfWeek": "QUI", "time": "19:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Erick)" },

    { "date": "02/Jan (Sexta-feira)", "dayOfWeek": "SEX", "time": "09:00", "title": "Atendimento", "location": "Paróquia (Pe. Erick)" },
    { "date": "02/Jan (Sexta-feira)", "dayOfWeek": "SEX", "time": "14:00", "title": "Atendimento", "location": "Paróquia (Pe. Edimilson)" },
    { "date": "02/Jan (Sexta-feira)", "dayOfWeek": "SEX", "time": "17:00", "title": "Confissões", "location": "Igreja Matriz (Pe. Edimilson)" },
    { "date": "02/Jan (Sexta-feira)", "dayOfWeek": "SEX", "time": "18:00", "title": "Adoração", "location": "Igreja Matriz (Pe. Edimilson)" },
    { "date": "02/Jan (Sexta-feira)", "dayOfWeek": "SEX", "time": "19:00", "title": "Santa Missa", "location": "Igreja Matriz (Pe. Edimilson)" },
    { "date": "02/Jan (Sexta-feira)", "dayOfWeek": "SEX", "time": "19:00", "title": "Santa Missa", "location": "Setor 5 – Bairro Morangal (Pe. Erick)" },
];

// Mapa Litúrgico Atualizado
const LITURGICAL_INFO_MAP: {[key: string]: {color: string, title: string}} = { 
    "16/Dec": { color: "ROXO", title: "3ª Semana do Advento" },
    "17/Dec": { color: "ROXO", title: "3ª Semana do Advento" },
    "18/Dec": { color: "ROXO", title: "4ª Semana do Advento (Grandes Antífonas)" },
    "19/Dec": { color: "ROXO", title: "4ª Semana do Advento" },
    "20/Dec": { color: "ROXO", title: "4ª Semana do Advento" },
    "21/Dec": { color: "ROXO", title: "4º Domingo do Advento" },
    "22/Dec": { color: "ROXO", title: "4ª Semana do Advento" },
    "23/Dec": { color: "ROXO", title: "São João de Kety" },
    "24/Dec": { color: "BRANCO", title: "Véspera de Natal" },
    "25/Dec": { color: "BRANCO", title: "Natal do Senhor (Solenidade)" },
    "26/Dec": { color: "VERMELHO", title: "Santo Estêvão (Mártir)" },
    "27/Dec": { color: "BRANCO", title: "São João Apóstolo" },
    "28/Dec": { color: "BRANCO", title: "Sagrada Família (Festa)" },
    "29/Dec": { color: "BRANCO", title: "São Tomás Becket (Oitava de Natal)" },
    "30/Dec": { color: "BRANCO", title: "6º Dia da Oitava de Natal" },
    "31/Dec": { color: "BRANCO", title: "São Silvestre I (Oitava de Natal)" },
    "01/Jan": { color: "BRANCO", title: "Mãe de Deus (Solenidade)" },
    "02/Jan": { color: "BRANCO", title: "Santos Basílio e Gregório" }
};

const LITURGICAL_COLORS: {[key: string]: string[]} = {
    "VERMELHO": ["#EF4444", "#991B1B", "#FEF2F2"], // Red-500, Red-800
    "BRANCO": ["#F59E0B", "#B45309", "#FFFBEB"],   // Amber-500, Amber-700 (Ouro para Branco/Festivo)
    "VERDE": ["#10B981", "#065F46", "#ECFDF5"],    // Emerald-500, Emerald-800
    "ROXO": ["#A855F7", "#6B21A8", "#FAF5FF"],     // Purple-500, Purple-800
    "ROSEO": ["#EC4899", "#9D174D", "#FDF2F8"]      // Pink-500, Pink-800
};

// ======================================================
// HELPER FUNCTIONS
// ======================================================

function getRgbFromHex(hex: string): string {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
        r = parseInt(hex.substring(1, 3), 16);
        g = parseInt(hex.substring(3, 5), 16);
        b = parseInt(hex.substring(5, 7), 16);
    }
    return `${r}, ${g}, ${b}`;
}

const getTodayAgendaString = () => {
    const today = new Date();
    const day = today.getDate().toString().padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthAbbr = monthNames[today.getMonth()];
    // Retorna apenas a parte da data para match inicial
    return `${day}/${monthAbbr}`;
};

// ======================================================
// COMPONENTE APP
// ======================================================

const App: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [liturgicalInfo, setLiturgicalInfo] = useState<LiturgicalInfo>({
    colorName: "VERDE", title: "Tempo Comum", colors: LITURGICAL_COLORS["VERDE"]
  });
  const [showIntro, setShowIntro] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Intro Logic
  useEffect(() => {
    const timer = setTimeout(() => {
        setShowIntro(false);
    }, 2800); // 2.8s de intro
    return () => clearTimeout(timer);
  }, []);

  // Selecionar Data Inicial (Dia Atual)
  useEffect(() => {
    const dates = [...new Set(AGENDA_DATA_RAW.map(item => item.date.trim()))];
    const todayPartial = getTodayAgendaString();
    
    // Tenta encontrar a data de hoje exata
    const todayFull = dates.find(d => d.includes(todayPartial));
    
    if (todayFull) {
        handleSelectDate(todayFull);
        // Tenta rolar o scroll para o dia atual após um breve delay para renderização
        setTimeout(() => {
            const todayBtn = document.getElementById(`date-btn-${todayFull}`);
            if (todayBtn && scrollRef.current) {
                const scrollLeft = todayBtn.offsetLeft - (scrollRef.current.clientWidth / 2) + (todayBtn.clientWidth / 2);
                scrollRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });
            }
        }, 500);
    } else {
        // Se não encontrar hoje (ex: data futura ou passada fora da lista), seleciona o primeiro
        handleSelectDate(dates[0]);
    }

  }, []);

  const handleSelectDate = (dateStr: string) => {
      setSelectedDate(dateStr);
      
      const dayMonth = dateStr.split(' ')[0];
      const info = LITURGICAL_INFO_MAP[dayMonth];
      let newInfo;
      
      if (info) {
          const colors = LITURGICAL_COLORS[info.color] || LITURGICAL_COLORS["VERDE"];
          newInfo = { colorName: info.color, title: info.title, colors: colors };
      } else {
          newInfo = { colorName: "VERDE", title: "Féria (Tempo Comum)", colors: LITURGICAL_COLORS["VERDE"] };
      }
      setLiturgicalInfo(newInfo);
      applyThemeColors(newInfo.colors);
  };

  const applyThemeColors = (colors: string[]) => {
      const [mainColorHex] = colors;
      const rgb = getRgbFromHex(mainColorHex);
      
      document.documentElement.style.setProperty('--primary-accent', mainColorHex);
      document.documentElement.style.setProperty('--primary-accent-rgb', rgb);
      document.documentElement.style.setProperty('--accent-glow', `rgba(${rgb}, 0.5)`);
      
      // Fundo "dark almost black" com tintura da cor
      document.body.style.background = `
        radial-gradient(circle at 50% 0%, rgba(${rgb}, 0.15) 0%, rgba(2, 6, 23, 1) 70%),
        #020617
      `;
      document.body.style.backgroundAttachment = 'fixed';
      
      const metaTheme = document.querySelector('meta[name="theme-color"]');
      if (metaTheme) metaTheme.setAttribute('content', '#020617');
  };

  const renderAgendaEvents = () => {
      const events = AGENDA_DATA_RAW.filter(e => e.date.trim() === selectedDate);
      
      if (events.length === 0) {
          return (
              <div className="glass-card p-8 rounded-xl text-center mt-4">
                  <div className="text-4xl mb-2">😴</div>
                  <p className="text-lg font-serif">Sem eventos agendados.</p>
                  <p className="text-xs opacity-50 mt-1">Sacristia em descanso.</p>
              </div>
          );
      }

      return (
        <div className="space-y-4">
            {events.map((event, idx) => {
                const isFolga = event.title.includes("Folga");

                return (
                    // Alterado de <details> para <div> para remover expansão
                    <div key={idx} className="glass-card agenda-item group">
                        <div className="p-4 flex justify-between items-center hover:bg-white/5 transition-colors">
                            <div className="flex gap-4 items-center">
                                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 shrink-0">
                                    <span className="text-lg font-bold">{event.time.split(':')[0]}</span>
                                    <span className="text-[10px] opacity-60">{event.time.split(':')[1]}</span>
                                </div>
                                <div>
                                    <h3 className={`font-bold text-base ${isFolga ? 'text-gray-400 italic' : ''}`}>{event.title}</h3>
                                    <p className="text-xs text-[var(--primary-accent)] uppercase tracking-wider font-semibold mt-0.5">
                                        {event.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
      );
  };

  const uniqueDates = [...new Set(AGENDA_DATA_RAW.map(item => item.date.trim()))];

  if (showIntro) {
      return (
          <div className="fixed inset-0 bg-[#020617] flex items-center justify-center z-[100] animate-fade-out-intro" style={{ animationDelay: '2s' }}>
              <div className="text-center">
                  <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter animate-unfold-slow uppercase">
                      Sacristia
                  </h1>
                  <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.5em] mt-4 animate-pulse">
                      Digital
                  </p>
              </div>
          </div>
      );
  }

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden animate-fade-in-content">
      
      {/* HEADER */}
      <header className="header-glass">
        <div className="max-w-xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--primary-accent)] to-purple-600 flex items-center justify-center shadow-lg shadow-[var(--accent-glow)]">
                    <Cross size={20} className="text-white" />
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-tight leading-none">SACRISTIA</h1>
                    <div className="flex items-center gap-1.5 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary-accent)] animate-pulse"></span>
                        <p className="text-xs font-medium opacity-70 uppercase tracking-wide">{liturgicalInfo.title}</p>
                    </div>
                </div>
            </div>
            <div className="text-right hidden sm:block opacity-60">
                <p className="text-[10px] font-bold uppercase tracking-[0.2em]">Jubileu</p>
                <p className="text-sm font-serif italic">1866 – 2026</p>
            </div>
        </div>
      </header>

      <main className="flex-1 max-w-xl mx-auto px-4 py-6 w-full pb-24 relative z-10">
        
        {/* DATE PICKER */}
        <div className="mb-8 relative">
            {/* Sombras laterais removidas conforme solicitado */}
            
            <div className="overflow-x-auto date-picker-scroll pb-2 -mx-4 px-8" ref={scrollRef}>
                <div className="flex gap-3 w-max">
                    {uniqueDates.map(fullDate => {
                        const [dayNumber, ...rest] = fullDate.split('/');
                        const dayText = fullDate.split('(')[1].replace(')', '').substring(0, 3).toUpperCase();
                        const isActive = fullDate === selectedDate;

                        return (
                            <button 
                                key={fullDate}
                                id={`date-btn-${fullDate}`}
                                onClick={() => handleSelectDate(fullDate)}
                                className={`date-button w-[64px] h-[72px] flex flex-col items-center justify-center flex-shrink-0
                                    ${isActive ? 'active' : ''}`}
                            >
                                <span className="text-xl font-bold leading-none mb-1 serif-font">{dayNumber}</span>
                                <span className="text-[10px] font-semibold tracking-wider opacity-80">{dayText}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>

        {/* CONTENT */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-2 mb-4 px-1 opacity-80">
                <Calendar size={16} className="text-[var(--primary-accent)]" />
                <h2 className="text-xs font-bold uppercase tracking-widest">Agenda do Dia</h2>
            </div>
            
            {renderAgendaEvents()}
        </div>

      </main>

      <footer className="text-center py-6 text-[10px] opacity-40 uppercase tracking-widest relative z-10">
        Sacristia Digital • 2026
      </footer>
    </div>
  );
};

export default App;