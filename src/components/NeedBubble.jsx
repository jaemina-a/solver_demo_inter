import { useState } from 'react'
import './Bubble.css'

function NeedBubble({ onChange, className = '' }) {
  const [need, setNeed] = useState('')

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

