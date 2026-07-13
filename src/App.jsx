import Header from './components/Header';
import HooksPlayground from './components/HooksPlayground';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 pb-12">
      <Header />
      <main className="max-w-5xl mx-auto px-4">
        <div className="mb-8 p-4 bg-white rounded border border-slate-200 shadow-sm">
          <h2 className="text-xl font-bold mb-2">Core Definitions</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-700">
            <li><strong>useState:</strong> Lets you add a state variable to your component.</li>
            <li><strong>useEffect:</strong> Lets you synchronize a component with an external system or trigger code after renders.</li>
            <li><strong>useRef:</strong> Lets you reference a value that’s not needed for rendering (like DOM nodes or render counts).</li>
            <li><strong>Custom Hooks:</strong> JavaScript functions starting with "use" that call other hooks to share stateful logic.</li>
          </ul>
        </div>
        
        <HooksPlayground />
      </main>
    </div>
  );
}

export default App;