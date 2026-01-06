import { useState } from 'react'
import './Bubble.css'
import { SourceEnum } from '../constants/sourceEnum'

function SourceBubble({ onChange, className = '' }) {
  const [selectedSources, setSelectedSources] = useState([])

  const handleSourceChange = (sourceValue) => {
    let newSources
    if (selectedSources.includes(sourceValue)) {
      newSources = selectedSources.filter(s => s !== sourceValue)
    } else {
      newSources = [...selectedSources, sourceValue]
    }
    setSelectedSources(newSources)
    onChange(newSources)
  }

  return (
    <div className={`bubble source-bubble ${className}`}>
      <div className="bubble-header">
        <h3>도구 선택</h3>
      </div>
      <div className="bubble-content">
        <div className="source-select-group">
          <button
            type="button"
            className={`source-select-button ${selectedSources.includes(SourceEnum.DISCORD) ? 'selected' : ''}`}
            onClick={() => handleSourceChange(SourceEnum.DISCORD)}
          >
            <img src="/discord_logo.jpeg" alt="Discord" className="source-icon" />
            <span>Discord</span>
          </button>
          <button
            type="button"
            className={`source-select-button ${selectedSources.includes(SourceEnum.SLACK) ? 'selected' : ''}`}
            onClick={() => handleSourceChange(SourceEnum.SLACK)}
          >
            <img src="/slack_logo.png" alt="Slack" className="source-icon" />
            <span>Slack</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SourceBubble

