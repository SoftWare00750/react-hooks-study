import { useState, useEffect, useRef } from 'react';
import useWindowSize from '../hooks/useWindowSize';

export default function HooksPlayground() {
  // 1. useState: Manages local reactive state
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);
  
  // 2. useRef: Persists values across renders without triggering a re-render, and accesses DOM elements
  const inputRef = useRef(null);
  const renderCount = useRef(1);
  
  // 3. Custom Hook usage
  const size = useWindowSize();

  // 4. useEffect: Handles side effects and lifecycle
  useEffect(() => {
    // This runs on mount and whenever 'count' changes
    setLogs(prev => [...prev, `Effect triggered: Count is ${count}`]);
    
    return () => {
      // Cleanup runs before the effect runs again, or on unmount
      console.log('Cleanup logic for count:', count);
    };
  }, [count]);

  // Track total component renders using useRef (does not cause infinite loops like useState would here)
  useEffect(() => {
    renderCount.current += 1;
  });

  const handleFocus = () => {
    // Directly manipulating the DOM using useRef
    inputRef.current.focus();
    inputRef.current.style.outline = '2px solid #3b82f6';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Interactive Hooks Playground</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* useState Section */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-bold text-blue-800 mb-2">1. useState</h3>
          <p className="text-sm text-blue-900 mb-4">Current state: <span className="font-bold text-xl">{count}</span></p>
          <button 
            onClick={() => setCount(c => c + 1)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
          >
            Increment Count
          </button>
        </div>

        {/* useRef Section */}
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <h3 className="font-bold text-purple-800 mb-2">2. useRef</h3>
          <p className="text-sm text-purple-900 mb-2">Component Renders: <span className="font-bold">{renderCount.current}</span></p>
          <input 
            ref={inputRef} 
            type="text" 
            placeholder="I can be focused via ref..." 
            className="w-full p-2 border border-purple-200 rounded mb-2"
          />
          <button 
            onClick={handleFocus}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 w-full"
          >
            Focus Input
          </button>
        </div>

        {/* Custom Hook Section */}
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 className="font-bold text-green-800 mb-2">3. Custom Hook</h3>
          <p className="text-sm text-green-900 mb-2"><code>useWindowSize()</code> output:</p>
          <ul className="text-sm font-mono bg-white p-2 rounded border border-green-200">
            <li>Width: {size.width}px</li>
            <li>Height: {size.height}px</li>
          </ul>
          <p className="text-xs text-green-700 mt-2">Resize your browser to see this update in real-time.</p>
        </div>

      </div>

      {/* useEffect Logging Section */}
      <div>
        <h3 className="font-bold text-slate-800 mb-2">useEffect Execution Log</h3>
        <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm h-40 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index}>{">"} {log}</div>
          ))}
        </div>
      </div>
    </div>
  );
}