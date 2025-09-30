import './OpacitySettings.css'

const OpacitySettings = ({ value, onChange }) => {
  return (
    <div className="slider-group">
      <label htmlFor="overlayOpacity">
        Overlay Opacity: {Math.round(value * 100)}%
      </label>
      <input
        type="range"
        id="overlayOpacity"
        min="0"
        max="1"
        step="0.01"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-input"
      />
    </div>
  )
}

export default OpacitySettings 