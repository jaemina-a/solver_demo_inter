import { useState } from 'react'
import './Bubble.css'
import { PositionLabels } from '../constants/positionEnum'

function PositionBubble({ onChange, className = '' }) {
  const [selectedPosition, setSelectedPosition] = useState(null)

  const handlePositionChange = (positionValue) => {
    setSelectedPosition(positionValue)
    onChange(positionValue)
  }

  return (
    <div className={`bubble position-bubble ${className}`}>
      <div className="bubble-header">
        <h3>직무 선택</h3>
      </div>
      <div className="bubble-content">
        <select
          className="position-select"
          value={selectedPosition ?? ''}
          onChange={(e) => handlePositionChange(Number(e.target.value))}
        >
          <option value="">직무를 선택하세요</option>
          {Object.entries(PositionLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default PositionBubble

