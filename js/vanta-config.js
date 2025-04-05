const vantaSettings = {
    DOTS: {
      color: { type: 'color', default: '#ff20a3' },
      color2: { type: 'color', default: '#435cb3' },
      backgroundColor: { type: 'color', default: '#200000' },
      size: { type: 'slider', min: 0, max: 5, step: 0.1, default: 1.9 },
      spacing: { type: 'slider', min: 0, max: 10, step: 1, default: 5 },
      mouseControls: { type: 'checkbox', default: true },
      touchControls: { type: 'checkbox', default: true },
      gyroControls: { type: 'checkbox', default: false },
      minHeight: { type: 'hidden', default: 200 },  // we can skip GUI for static ones
      minWidth: { type: 'hidden', default: 200 },
      scale: { type: 'hidden', default: 1 },
      scaleMobile: { type: 'hidden', default: 1 }
    },
    FOG: {
        highlightColor: { type: "color", default: "#ffc300" },
        midtoneColor: { type: "color", default: "#ff1f00" },
        lowlightColor: { type: "color", default: "#2d00ff" },
        baseColor: { type: "color", default: "#ffebeb" },
        blurFactor: { type: "slider", min: 0, max: 1, step: 0.01, default: 0.625 },
        zoom: { type: "slider", min: 0, max: 2, step: 0.01, default: 0.31 },
        speed: { type: "slider", min: 0, max: 2, step: 0.01, default: 0.2 },
        mouseControls: { type: "checkbox", default: true },
        touchControls: { type: "checkbox", default: true },
        gyroControls: { type: "checkbox", default: false },
        minHeight: { type: "hidden", default: 200 }, // fixed minimum, no need to expose
        minWidth: { type: "hidden", default: 200 }
      },
      WAVES: {
        color: { type: "color", default: "#005588" }, // rgb(0, 85, 136)
        shininess: { type: "slider", min: 0, max: 100, step: 1, default: 20 },
        waveHeight: { type: "slider", min: 0, max: 100, step: 1, default: 37.5 },
        waveSpeed: { type: "slider", min: 0, max: 2, step: 0.01, default: 1 },
        zoom: { type: "slider", min: 0, max: 2, step: 0.01, default: 0.3182 },
        mouseControls: { type: "checkbox", default: true },
        touchControls: { type: "checkbox", default: true },
        gyroControls: { type: "checkbox", default: false },
        minHeight: { type: "hidden", default: 200 },
        minWidth: { type: "hidden", default: 200 },
        scale: { type: "hidden", default: 1 },
        scaleMobile: { type: "hidden", default: 1 }
      },
      CLOUDS: {
        backgroundColor: { type: "color", default: "#000000" },
        skyColor: { type: "color", default: "#000000" },
        cloudColor: { type: "color", default: "#0058fa" },
        cloudShadowColor: { type: "color", default: "#000000" },
        sunColor: { type: "color", default: "#000000" },
        sunGlareColor: { type: "color", default: "#000000" },
        sunlightColor: { type: "color", default: "#000000" },
        speed: { type: "slider", min: 0, max: 2, step: 0.01, default: 0.7 },
        mouseControls: { type: "checkbox", default: true },
        touchControls: { type: "checkbox", default: true },
        gyroControls: { type: "checkbox", default: false },
        minHeight: { type: "hidden", default: 200 },
        minWidth: { type: "hidden", default: 200 }
      },
      GLOBE: {
        backgroundColor: { type: "color", default: "#000000" },
        color: { type: "color", default: "#ffffff" },
        color2: { type: "color", default: "#ff0000" },
        size: { type: "slider", min: 0, max: 5, step: 0.1, default: 0.5 },
        mouseControls: { type: "checkbox", default: true },
        touchControls: { type: "checkbox", default: true },
        gyroControls: { type: "checkbox", default: false },
        minHeight: { type: "hidden", default: 200 },
        minWidth: { type: "hidden", default: 200 },
        scale: { type: "hidden", default: 1 },
        scaleMobile: { type: "hidden", default: 1 }
      },
      NET: {
        color: { type: "color", default: "#ff3f81" },             // rgb(255, 63, 129)
        backgroundColor: { type: "color", default: "#23153c" },   // rgb(35, 21, 60)
        points: { type: "slider", min: 0, max: 50, step: 1, default: 24 }, // 47.3684% mapped approx to 24
        maxDistance: { type: "slider", min: 0, max: 50, step: 1, default: 16 }, // 33.3333% ≈ 16
        spacing: { type: "slider", min: 0, max: 100, step: 1, default: 50 },
        showDots: { type: "checkbox", default: true },
        mouseControls: { type: "checkbox", default: true },
        touchControls: { type: "checkbox", default: true },
        gyroControls: { type: "checkbox", default: false },
        minHeight: { type: "hidden", default: 200 },
        minWidth: { type: "hidden", default: 200 },
        scale: { type: "hidden", default: 1 },
        scaleMobile: { type: "hidden", default: 1 }
      },
      CELLS: {
        color1: { type: "color", default: "#008c8c" },       // rgb(0, 140, 140)
        color2: { type: "color", default: "#f2e735" },       // rgb(242, 231, 53)
        size: { type: "slider", min: 0, max: 10, step: 0.1, default: 2.7 },  // ~27.0833%
        speed: { type: "slider", min: 0, max: 2, step: 0.01, default: 0.2 },
        mouseControls: { type: "checkbox", default: true },
        touchControls: { type: "checkbox", default: true },
        gyroControls: { type: "checkbox", default: false },
        minHeight: { type: "hidden", default: 200 },
        minWidth: { type: "hidden", default: 200 },
        scale: { type: "hidden", default: 1 }
      },
      TOPOLOGY: {
        backgroundColor: { type: "color", default: "#002222" }, // rgb(0, 34, 34)
        color: { type: "color", default: "#89964e" },           // rgb(137, 150, 78)
        mouseControls: { type: "checkbox", default: true },
        touchControls: { type: "checkbox", default: true },
        gyroControls: { type: "checkbox", default: false },
        minHeight: { type: "hidden", default: 200 },
        minWidth: { type: "hidden", default: 200 },
        scale: { type: "hidden", default: 1 },
        scaleMobile: { type: "hidden", default: 1 }
      },
      RINGS: {
        color: { type: "color", default: "#88ff00" },               // rgb(136, 255, 0)
        backgroundColor: { type: "color", default: "#202428" },     // rgb(32, 36, 40)
        backgroundAlpha: { type: "slider", min: 0, max: 1, step: 0.01, default: 1.0 },
        mouseControls: { type: "checkbox", default: true },
        touchControls: { type: "checkbox", default: true },
        gyroControls: { type: "checkbox", default: false },
        minHeight: { type: "hidden", default: 200 },
        minWidth: { type: "hidden", default: 200 },
        scale: { type: "hidden", default: 1 },
        scaleMobile: { type: "hidden", default: 1 }
      },
      HALO: {
        backgroundColor: { type: "color", default: "#131a43" },         // rgb(19, 26, 67)
        baseColor: { type: "color", default: "#001a59" },               // rgb(0, 26, 89)
        size: { type: "slider", min: 0, max: 5, step: 0.01, default: 1.0 },
        amplitudeFactor: { type: "slider", min: 0, max: 2, step: 0.01, default: 0.66 },
        xOffset: { type: "slider", min: -2, max: 2, step: 0.01, default: 0.5 },
        yOffset: { type: "slider", min: -2, max: 2, step: 0.01, default: 0.5 },
        mouseControls: { type: "checkbox", default: true },
        touchControls: { type: "checkbox", default: true },
        gyroControls: { type: "checkbox", default: false },
        minHeight: { type: "hidden", default: 200 },
        minWidth: { type: "hidden", default: 200 }
      } 
  }
  