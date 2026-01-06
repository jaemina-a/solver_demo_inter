import { useState } from 'react'
import './App.css'
import SourceBubble from './components/SourceBubble'
import PositionBubble from './components/PositionBubble'
import NeedBubble from './components/NeedBubble'
import { turnOn, turnOff } from './api/exampleApi'
import { submitForm } from './api/formApi'

function App() {
  const [formData, setFormData] = useState({
    source: [],
    position: null,
    needs: ''
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleSourceChange = (sources) => {
    setFormData(prev => ({ ...prev, source: sources }))
  }

  const handlePositionChange = (position) => {
    setFormData(prev => ({ ...prev, position }))
  }

  const handleNeedChange = (needs) => {
    setFormData(prev => ({ ...prev, needs }))
  }
  const handleButtonClick = async (form) => {
    console.log(form)
    setIsLoading(true)
    try {
      // 1. turnOn() 먼저 호출
      await turnOn();
      
      // 2. submitForm() 호출
      const response = await submitForm(form);
      
      // 3. submitForm 응답이 오면 turnOff() 호출
      try {
        const turnOffResponse = await turnOff();
        console.log('turnOff 응답:', turnOffResponse);
      } catch (turnOffError) {
        console.error('turnOff API 호출 오류:', turnOffError);
      }
      
      // 4. submitForm 결과에 따른 처리
      if (response.status === 'success') {
        alert('WAYO에게 양식이 제출되었습니다.');
      } else {
        const errorMsg = response.msg || `서버 응답 오류: status=${response.status}, code=${response.code}`;
        console.error('폼 제출 실패:', errorMsg);
        alert(`제출 실패: ${errorMsg}`);
      }
    } catch (error) {
      const errorMessage = error.message || error.toString() || '알 수 없는 오류가 발생했습니다.';
      console.error('폼 제출 오류:', error);
      alert(`제출 오류: ${errorMessage}`);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      <SourceBubble onChange={handleSourceChange} className="bubble-top" />
      <NeedBubble onChange={handleNeedChange} className="bubble-left" />
      <PositionBubble onChange={handlePositionChange} className="bubble-right" />
      
      {/* 연결될 점들 */}
      <div className="point point-top"></div>
      <div className="point point-left"></div>
      <div className="point point-right"></div>
      
      {/* 연결선 - 왼쪽 */}
      <svg className="connection-line connection-left" viewBox="0 0 200 300" preserveAspectRatio="none">
        {/* 가로선: 말풍선 오른쪽 끝에서 시작 (오른쪽으로) */}
        <line 
          x1="0" 
          y1="150" 
          x2="60" 
          y2="150" 
          stroke="#333333" 
          strokeWidth="1" 
        />
        {/* 대각선: 가로선 끝에서 point-left로 (좌측 상단에서 우측 하단) */}
        <line 
          x1="60" 
          y1="150" 
          x2="166" 
          y2="260" 
          stroke="#333333" 
          strokeWidth="1" 
        />
      </svg>
      
      {/* 연결선 - 상단 */}
      <svg className="connection-line connection-top" viewBox="0 0 300 200" preserveAspectRatio="none">
        {/* 가로선: 말풍선 아래쪽 끝에서 시작 (아래로) */}
        <line 
          x1="166" 
          y1="20" 
          x2="218" 
          y2="20" 
          stroke="#333333" 
          strokeWidth="1" 
        />
        {/* 대각선: 가로선 끝에서 point-top으로 (좌측 상단에서 우측 하단) */}
        <line 
          x1="107" 
          y1="117" 
          x2="166" 
          y2="20" 
          stroke="#333333" 
          strokeWidth="1" 
        />
      </svg>
      
      {/* 연결선 - 오른쪽 */}
      <svg className="connection-line connection-right" viewBox="0 0 200 300" preserveAspectRatio="none">
        {/* 가로선: 말풍선 왼쪽 끝에서 시작 (왼쪽으로) */}
        <line 
          x1="60" 
          y1="210" 
          x2="138" 
          y2="210" 
          stroke="#333333" 
          strokeWidth="1" 
        />
        {/* 대각선: 가로선 끝에서 point-right로 (우측 상단에서 좌측 하단) */}
        <line 
          x1="17" 
          y1="14" 
          x2="60" 
          y2="210" 
          stroke="#333333" 
          strokeWidth="1" 
        />
      </svg>
      
      {/* 선택 완료 버튼 */}
      <button className="submit-button" onClick={() => handleButtonClick(formData)} disabled={isLoading}>
        {isLoading ? '제출 중...' : '선택 완료'}
      </button>
      
      {/* 로딩 오버레이 */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p className="loading-text">제출 중...</p>
        </div>
      )}
    </div>
  )
}

export default App
