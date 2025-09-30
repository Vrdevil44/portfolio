import './BlurSettings.css'

const BlurSettings = ({ value, onChange }) => {
  return (
    <div className="slider-group">
      <label htmlFor="blurIntensity">
        Blur Intensity: {value}px
      </label>
      <input
        type="range"
        id="blurIntensity"
        min="0"
        max="20"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-input"
      />
    </div>
  )
}

export default BlurSettings 