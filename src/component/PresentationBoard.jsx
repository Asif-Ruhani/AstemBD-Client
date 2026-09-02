import React, { useEffect, useState } from 'react'
import { 
  Home, Plus, Menu, ChevronDown, Save, 
  Maximize2, Minimize2, Trash2, Copy, Edit3, 
  Lock, Palette, Type, Layout as LayoutIcon, Eye 
} from 'lucide-react';

const PresentationBoard = () => {
 // State Management
  const [activeSection, setActiveSection] = useState('HOME');
  const [presentationWidth, setPresentationWidth] = useState(100);
  const [isMinimized, setIsMinimized] = useState(false);
  const [sheets, setSheets] = useState(['Sheet1']);
  const [activeSheet, setActiveSheet] = useState('Sheet1');
  const [showContextMenu, setShowContextMenu] = useState(null);

  // Security: Detect PrintScreen or Blur content on focus loss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText(""); // Clear clipboard
        alert("Screenshots are disabled for security.");
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Animation logic for Minimize/Maximize
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    setPresentationWidth(isMinimized ? 100 : 30);
  };

  return (
    <div className="flex flex-col h-screen w-full bg-gray-100 overflow-hidden select-none" 
         style={{ userSelect: 'none', WebkitUserSelect: 'none' }}>
      
      {/* 1. SIDEBAR NAVIGATION (Left Bar) */}
      <div className="flex h-full overflow-hidden">
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col z-50 shadow-lg">
          <div className="p-4 border-b font-bold text-blue-600 flex justify-between items-center">
            TOOLBAR
            <button onClick={() => alert('Saving...')} className="hover:text-blue-800"><Save size={18}/></button>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-2 space-y-4">
            <ToolbarSection title="HOME" active={activeSection} setActive={setActiveSection}>
              <div className="grid grid-cols-5 gap-1 mb-2">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="w-5 h-5 rounded-full border border-gray-300" style={{backgroundColor: `hsl(${i * 36}, 70%, 50%)`}} />
                ))}
              </div>
              <div className="flex gap-2 mb-2 italic">
                <Type size={16} className="font-bold border p-1" />
                <span className="font-serif border px-2">B</span>
                <span className="italic border px-2">I</span>
                <span className="underline border px-2">U</span>
              </div>
              <input type="number" placeholder="Size" className="w-full border rounded p-1 text-xs" />
            </ToolbarSection>

            <ToolbarSection title="INSERT" active={activeSection} setActive={setActiveSection}>
              <button className="w-full text-left text-sm p-1 hover:bg-gray-100 border-b">Table</button>
              <button className="w-full text-left text-sm p-1 hover:bg-gray-100 border-b">Image</button>
              <button className="w-full text-left text-sm p-1 hover:bg-gray-100 border-b">Equation (Σ)</button>
              <div className="grid grid-cols-4 gap-1 mt-2">
                {['⬠', '▭', '→', '♢', '▱', '◯'].map(s => <span key={s} className="text-center border cursor-pointer hover:bg-blue-50">{s}</span>)}
              </div>
            </ToolbarSection>

            <ToolbarSection title="LAYOUT" active={activeSection} setActive={setActiveSection}>
              <div className="text-xs space-y-2">
                <div className="flex justify-between"><span>Orientation</span> <span className="text-blue-500 cursor-pointer">Portrait</span></div>
                <div className="flex justify-between"><span>Columns</span> <span className="text-blue-500 cursor-pointer">One</span></div>
                <div className="flex justify-between"><span>Page Border</span> <Palette size={14}/></div>
              </div>
            </ToolbarSection>

            <ToolbarSection title="VIEW" active={activeSection} setActive={setActiveSection}>
              <div className="flex justify-around items-center py-2">
                <Eye size={16} /> <input type="range" className="w-20" />
              </div>
              <button className="w-full text-sm p-1 bg-gray-50 border mt-2">Scientific Calc</button>
            </ToolbarSection>
          </nav>
        </aside>

        {/* WORKSPACE AREA */}
        <main className="flex-1 flex flex-col relative overflow-hidden bg-black">
          {/* Security Overlay: Hinders screen recording software */}
          <div className="absolute inset-0 pointer-events-none z-[999] opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          
          {/* 2. ABOVE SURFACE (Presentation Area) */}
          <section 
            className="transition-all duration-1000 ease-in-out bg-white overflow-y-scroll relative shadow-inner"
            style={{ 
              height: '50%', 
              width: `${presentationWidth}%`,
              borderBottom: '4px solid #333'
            }}
          >
            <div className="sticky top-0 right-0 p-2 z-10 flex justify-end">
              <button onClick={toggleMinimize} className="bg-gray-200 p-1 rounded hover:bg-gray-300">
                {isMinimized ? <Maximize2 size={16}/> : <Minimize2 size={16}/>}
              </button>
            </div>
            {/* Height simulated as 100 A4 pages */}
            <div className="p-10" style={{ height: '29700mm' }}>
              <h1 className="text-2xl font-bold text-gray-800 border-b pb-4">Presentation Surface (A4 x 100)</h1>
              <p className="mt-4 text-gray-600">Content here is protected by security layers.</p>
            </div>
          </section>

          {/* 3. BELOW SURFACE (Artboard Area) */}
          <section className="flex-1 bg-[#004d40] overflow-y-scroll">
            <div className="p-10 text-white" style={{ height: '29700mm' }}>
               <h1 className="text-2xl font-bold border-b border-green-700 pb-4">Artboard Surface</h1>
               <div className="grid grid-cols-3 gap-4 mt-10">
                  <div className="h-32 border-2 border-dashed border-green-400 rounded flex items-center justify-center">Drawing Zone</div>
                  <div className="h-32 border-2 border-dashed border-green-400 rounded flex items-center justify-center">Drawing Zone</div>
               </div>
            </div>
          </section>
        </main>
      </div>

      {/* 4. BOTTOM NAVIGATION BAR */}
      <footer className="h-12 bg-gray-50 border-t border-gray-300 flex items-center px-4 z-50">
        <div className="flex items-center space-x-2 border-r pr-4 mr-4">
          <button title="Add Sheet" className="p-1 hover:bg-gray-200 rounded group relative">
            <Plus size={20} />
            <span className="absolute -top-10 left-0 bg-gray-800 text-white text-xs px-2 py-1 rounded hidden group-hover:block">Add Sheet</span>
          </button>
          <Menu size={20} className="cursor-pointer hover:text-gray-600" />
        </div>

        <div className="flex space-x-1 items-end h-full">
          {sheets.map(sheet => (
            <div 
              key={sheet}
              className={`px-4 py-1 flex items-center space-x-2 rounded-t-lg cursor-pointer text-sm border-t border-x transition-colors ${
                activeSheet === sheet ? 'bg-white text-blue-600 border-gray-300' : 'bg-gray-100 text-gray-500 border-transparent'
              }`}
              onClick={() => setActiveSheet(sheet)}
            >
              <span>{sheet}</span>
              <ChevronDown size={14} onClick={(e) => {
                 e.stopPropagation();
                 setShowContextMenu(sheet === showContextMenu ? null : sheet);
              }} />
            </div>
          ))}
        </div>

        {/* Context Menu Popup */}
        {showContextMenu && (
          <div className="absolute bottom-14 left-40 bg-white shadow-2xl border border-gray-200 py-2 w-48 rounded-md text-sm z-[100]">
            <ContextMenuItem icon={<Trash2 size={14}/>} label="Delete" />
            <ContextMenuItem icon={<Copy size={14}/>} label="Duplicate" />
            <ContextMenuItem icon={<Edit3 size={14}/>} label="Rename" />
            <div className="border-t my-1" />
            <ContextMenuItem label="Copy to" hasSub />
            <ContextMenuItem label="Change color" hasSub />
            <div className="border-t my-1" />
            <ContextMenuItem label="Hide sheet" disabled />
            <ContextMenuItem label="Move right" disabled />
          </div>
        )}
      </footer>
    </div>
  );
};

// --- Helper Components ---

const ToolbarSection = ({ title, children, active, setActive }) => (
  <div className="mb-2 border rounded overflow-hidden">
    <button 
      onClick={() => setActive(active === title ? null : title)}
      className={`w-full p-2 text-left text-xs font-bold flex justify-between items-center ${active === title ? 'bg-blue-500 text-white' : 'bg-gray-50'}`}
    >
      {title}
      <span>{active === title ? '-' : '+'}</span>
    </button>
    {active === title && <div className="p-3 bg-white border-t">{children}</div>}
  </div>
);

const ContextMenuItem = ({ icon, label, hasSub, disabled }) => (
  <div className={`px-4 py-2 flex items-center justify-between hover:bg-gray-100 cursor-pointer ${disabled ? 'opacity-30 cursor-not-allowed' : ''}`}>
    <div className="flex items-center space-x-3">
      {icon}
      <span>{label}</span>
    </div>
    {hasSub && <span className="text-[10px]">▶</span>}
  </div>
);

export default PresentationBoard