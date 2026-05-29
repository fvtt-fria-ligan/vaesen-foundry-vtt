export function registerDefaultFonts() {
    CONFIG.fontDefinitions["Acme"] = {
      editor: true,
      fonts:[
        {urls: ["systems/vaesen/fonts/Acme-Regular.ttf"]},
      ]
    };
    CONFIG.fontDefinitions["Baskerville"] = {
        editor: true,
        fonts:[
            {urls: ["systems/vaesen/fonts/LibreBaskerville-Regular.ttf"]},
            {urls: ["systems/vaesen/fonts/LibreBaskerville-Italic.ttf"], style: "italic"},
            {urls: ["systems/vaesen/fonts/LibreBaskerville-Bold.ttf"], weight: "700"},
        ]
    };
    CONFIG.fontDefinitions["Beth Ellen"] = {
      editor: true,
      fonts:[
        {urls: ["systems/vaesen/fonts/BethEllen-Regular.ttf"]},
      ]
    };
    CONFIG.fontDefinitions["Berolina"] = {
      editor: true,
      fonts:[
        {urls: ["systems/vaesen/fonts/Berolina.ttf"]},
      ]
    };
    CONFIG.fontDefinitions["Libertine"] = {
      editor: true,
      fonts:[
        {urls: ["systems/vaesen/fonts/LinLibertine_R.ttf"]},
      ]
    };
    CONFIG.fontDefinitions["Poppins"] = {
      editor: true,
      fonts:[
        {urls: ["systems/vaesen/fonts/Poppins-Regular.ttf"]},
        {urls: ["systems/vaesen/fonts/Poppins-Italic.ttf"], style: "italic"},
        {urls: ["systems/vaesen/fonts/Poppins-Bold.ttf"], weight: "700"},
        {urls: ["systems/vaesen/fonts/Poppins-BoldItalic.ttf"], weight: "700", style: "italic"},
      ]
    };
    CONFIG.fontDefinitions["Pica"] = {
        editor: true,
        fonts:[
            {urls: ["systems/vaesen/fonts/IMFellDoublePica-Regular.ttf"], style: "normal"},
            {urls: ["systems/vaesen/fonts/IMFellDoublePica-Italic.ttf"], style: "italic"},
        ]
    };
    
  }
  