import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Line } from 'recharts';
import { Search, AlertCircle, Activity, Maximize2, Minimize2 } from 'lucide-react';
import './App.css';

const baseUrl = import.meta.env.VITE_API_URL || '';
const API_BASE_URL = baseUrl ? `${baseUrl.replace(/\/$/, '')}/api` : '/api';

function App() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const [selectedStock, setSelectedStock] = useState(null);
  const [stockData, setStockData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const searchRef = useRef(null);
  const chartCardRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    const el = chartCardRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen?.() || el.webkitRequestFullscreen?.();
    } else {
      document.exitFullscreen?.() || document.webkitExitFullscreen?.();
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    document.addEventListener('webkitfullscreenchange', handleFsChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFsChange);
      document.removeEventListener('webkitfullscreenchange', handleFsChange);
    };
  }, []);

  useEffect(() => {
    // Close search results when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
      try {
        const res = await axios.get(`${API_BASE_URL}/search?q=${query}`);
        setSearchResults(res.data.results);
      } catch (err) {
        console.error("Search error", err);
      }
    };

    const debounce = setTimeout(() => {
      fetchSearchResults();
    }, 300);

    return () => clearTimeout(debounce);
  }, [query]);

  const handleSelectStock = async (stock) => {
    setQuery(stock.name);
    setShowResults(false);
    setSelectedStock(stock);
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await axios.get(`${API_BASE_URL}/stock/${stock.code}`);
      setStockData(res.data.data);
      setSelectedStock({ code: res.data.code, name: res.data.name });
    } catch (err) {
      console.error(err);
      setError("데이터를 불러오는데 실패했습니다. 종목 코드나 네트워크 상태를 확인해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#1e293b', padding: '1rem', border: '1px solid #334155', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
          <p style={{ color: '#e2e8f0', marginBottom: '0.5rem', fontWeight: 'bold' }}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color, margin: 0, padding: '0.2rem 0' }}>
              {entry.name}: {entry.name === '주가' ? `${entry.value.toLocaleString()}원` : `${entry.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="app-container">
      <header>
        <h1>Foreign Ownership vs Price</h1>
        <p>외국인 보유율과 주가의 상관관계 분석 (최근 10년)</p>
      </header>

      <main>
        <div className="search-section" ref={searchRef}>
          <div className="search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="종목명 또는 종목 코드를 입력하세요 (예: 삼성전자, 005930)"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
            />
          </div>
          
          {showResults && searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((stock) => (
                <div 
                  key={stock.code} 
                  className="search-result-item"
                  onClick={() => handleSelectStock(stock)}
                >
                  <span className="search-result-name">{stock.name}</span>
                  <span className="search-result-code">{stock.code}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`chart-card${isFullscreen ? ' chart-card--fullscreen' : ''}`} ref={chartCardRef}>
          {isLoading ? (
            <div className="loading">
              <div className="loading-spinner"></div>
              <p>최근 10년(약 2600일) 치 데이터를 가져오고 있습니다. 잠시만 기다려주세요...</p>
            </div>
          ) : error ? (
            <div className="error-msg">
              <AlertCircle size={48} className="error-icon" />
              <p>{error}</p>
            </div>
          ) : selectedStock && stockData.length > 0 ? (
            <>
              <div className="chart-header">
                <div className="stock-title">
                  <h2>{selectedStock.name}</h2>
                  <span>({selectedStock.code})</span>
                </div>
                <div className="chart-header-right">
                  <div className="legend-container">
                    <div className="legend-item">
                      <div className="legend-color price"></div>
                      <span>종가 (원)</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color foreign"></div>
                      <span>외국인 보유율 (%)</span>
                    </div>
                  </div>
                  <button className="fullscreen-btn" onClick={toggleFullscreen} title={isFullscreen ? '전체화면 종료' : '전체화면'}>
                    {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
                  </button>
                </div>
              </div>
              
              <div className={`chart-wrapper${isFullscreen ? ' chart-wrapper--fullscreen' : ''}`}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={stockData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      stroke="#94a3b8" 
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      tickFormatter={(val) => val.substring(2)} // 2021.02.18 -> 21.02.18
                      minTickGap={50}
                    />
                    <YAxis 
                      yAxisId="left" 
                      orientation="left" 
                      stroke="#10b981"
                      tickFormatter={(val) => val.toLocaleString()}
                      tick={{ fill: '#10b981' }}
                      domain={['dataMin', 'dataMax']}
                    />
                    <YAxis 
                      yAxisId="right" 
                      orientation="right" 
                      stroke="#8b5cf6"
                      tickFormatter={(val) => `${val}%`}
                      tick={{ fill: '#8b5cf6' }}
                      domain={['dataMin - 1', 'dataMax + 1']}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    
                    <Area 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="price" 
                      name="주가" 
                      stroke="#10b981" 
                      fill="rgba(16, 185, 129, 0.1)"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6, fill: '#10b981', stroke: '#0b0f19', strokeWidth: 2 }}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="foreignRate" 
                      name="외국인 보유율" 
                      stroke="#8b5cf6" 
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#0b0f19', strokeWidth: 2 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <Activity size={64} className="icon" />
              <h2>종목을 검색하여 분석을 시작하세요</h2>
              <p>주가와 외국인 수급의 패턴을 장기적으로 비교할 수 있습니다.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
