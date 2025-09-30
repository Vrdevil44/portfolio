import './ColorPicker.css'

const ColorPicker = ({ label, value, onChange }) => {
  return (
    <div className="color-picker-group">
      <label htmlFor={`color-${label}`}>{label}:</label>
      <div className="color-input-group">
        <input
          type="color"
          id={`color-${label}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="color-text-input"
        />
      </div>
    </div>
  )
}

export default ColorPicker 