.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
}

header {
  margin-bottom: 1.5rem;
  text-align: center;
  animation: fadeInDown 0.8s ease-out;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

header h1 {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #60a5fa, #c084fc);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
  line-height: 1.2;
}

header p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.search-section {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 50;
}

.search-box {
  display: flex;
  align-items: center;
  background: var(--panel-bg);
  border: 1px solid var(--border-color);
  border-radius: 9999px;
  padding: 0.75rem 1.25rem;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.search-box:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
}

.search-icon {
  color: var(--text-secondary);
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.search-input {
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-size: 1rem;
  width: 100%;
  outline: none;
  min-width: 0;
}

.search-input::placeholder {
  color: #475569;
  font-size: 0.9rem;
}

.search-results {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  background: var(--panel-bg);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  margin-top: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.5);
}

.search-result-item {
  padding: 0.85rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.search-result-item:last-child {
  border-bottom: none;
}

.search-result-item:hover, .search-result-item:active {
  background: rgba(59, 130, 246, 0.1);
}

.search-result-name {
  font-weight: 600;
  font-size: 0.95rem;
}

.search-result-code {
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.chart-card {
  background: var(--panel-bg);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 1.25rem;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  animation: fadeIn 0.5s ease-out;
  min-width: 0;
  overflow: hidden;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.chart-header {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.75rem;
}

.stock-title h2 {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
}

.stock-title span {
  color: var(--text-secondary);
  margin-left: 0.4rem;
  font-weight: 500;
  font-size: 1rem;
}

.legend-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 3px;
  flex-shrink: 0;
}

.chart-header-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.fullscreen-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.4rem;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.fullscreen-btn:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: var(--accent);
  color: var(--text-primary);
}

/* Fullscreen mode */
.chart-card--fullscreen {
  border-radius: 0 !important;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chart-wrapper--fullscreen {
  flex: 1;
  height: auto !important;
}

.chart-card:fullscreen {
  background: var(--panel-bg);
  padding: 1.25rem;
}

.chart-card:-webkit-full-screen {
  background: var(--panel-bg);
  padding: 1.25rem;
}

.chart-wrapper {
  width: 100%;
  height: 360px;
}

.loading, .error-msg, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 280px;
  color: var(--text-secondary);
  text-align: center;
  padding: 1rem;
}

.loading p, .error-msg p, .empty-state p {
  margin-top: 1rem;
  font-size: 0.95rem;
}

.empty-state h2 {
  font-size: 1.1rem;
  margin-top: 0.5rem;
}

.loading-spinner {
  width: 44px;
  height: 44px;
  border: 4px solid rgba(255,255,255,0.05);
  border-radius: 50%;
  border-top-color: var(--accent);
  animation: spin 1s cubic-bezier(0.5, 0.1, 0.4, 0.9) infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.error-msg {
  color: #f87171;
}

.error-icon {
  margin-bottom: 1rem;
  color: #ef4444;
}

.icon {
  margin-bottom: 0.5rem;
}

/* Tablet and up */
@media (min-width: 640px) {
  .app-container {
    padding: 2rem;
  }

  header h1 {
    font-size: 2.5rem;
  }

  header p {
    font-size: 1.1rem;
  }

  .chart-card {
    padding: 2rem;
    border-radius: 24px;
  }

  .chart-wrapper {
    height: 500px;
  }

  .stock-title h2 {
    font-size: 2rem;
  }

  .loading, .error-msg, .empty-state {
    height: 400px;
  }

  .search-input::placeholder {
    font-size: 1rem;
  }
}
