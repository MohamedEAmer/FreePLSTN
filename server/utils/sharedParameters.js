const PDFDocument = require('pdfkit')

module.exports = {
  high_of_A4: 841.89,
  width_of_A4: 595.28,
  margin_x: 10,
  margin_y: 20,
  margin_border_x: 41,
  margin_border_y: 40,
  id_color: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF'],
  quesColors: [,
    "#FF00FF",
    "#000000",
    "#FFFFFF",
    "#808080",
    "#800000",
    "#808000",
    "#000080",
    "#008080",
    "#800080",
    "#C0C0C0",
    "#00FF00",
    "#00FFFF",
    "#FF00FF",
    "#8B0000",
    "#006400",
    "#00008B",
    "#FFD700",
    "#D3D3D3",
    "#A9A9A9",
    "#4B0082",
    "#40E0D0",
    "#DA70D6",
    "#FF6347",
    "#FFA500",
    "#DC143C",
    "#FF7F50",
    "#F0E68C",
    "#8B0000",//10
    "#A52A2A",//q9
    "#FF6347",//q8
    "#FFA500",//q7
    "#4B0082",//q6
    "#000080",//q5
    "#008080",//q4
    "#008000",//q3
    "#800080",//q2
    "#808000",//q1begin fot text question
    "#B22222",
    "#FF8C00",
    "#F08080",
    "#3CB371",
    "#7B68EE",
    "#4169E1",
    "#1E90FF"
  ],
  doc: new PDFDocument({ size: 'A4' }),
  end_of_sections: [0],
}
