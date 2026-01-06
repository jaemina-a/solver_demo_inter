import { useState, useEffect } from 'react'
import './Bubble.css'

function NeedBubble({ value = '', onChange, className = '' }) {
  const [need, setNeed] = useState(value)

  // formData가 변경되면 내부 state도 동기화
  useEffect(() => {
    setNeed(value)
  }, [value])

  const handleNeedChange = (e) => {
    const value = e.target.value
    setNeed(value)
    onChange(value)
  }

  return (
    <div className={`need-bubble ${className}`}>
      <div className="bubble-header">
        <h3>필요사항</h3>
      </div>
      <div className="bubble-content">
        <textarea
          className="need-textarea"
          placeholder="필요사항을 입력하세요..."
          value={need}
          onChange={handleNeedChange}
          rows={4}
        />
      </div>
    </div>
  )
}

export default NeedBubble

