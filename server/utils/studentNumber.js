// Assuming this code is in a file named studentNumber.js

const {
  doc,
  end_of_sections,
  margin_y,
  margin_border_y,
  width_of_A4,
  margin_border_x,
  id_color,
} = require('./sharedParameters')

const squareSize = 9
const gap = 0 // Gap between squares
const rows = 1 // Number of rows of grids
const cols = 5 // Number of columns of grids
const squaresPerRow = 10 // Number of squares in each row
const squaresPerCol = 1 // Number of squares in each column
const rowGap = 10 // Gap between rows of grids
const colGap = 10 // Gap between columns of grids
const offsetX = 50 // X-offset for the starting position
const offsetY = 50 // Y-offset for the starting position

function student_number(isColored) {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const startX =
        offsetX +
        col * (squaresPerRow * squareSize + (squaresPerRow - 1) * gap + colGap)
      const startY =
        offsetY +
        row * (squaresPerCol * squareSize + (squaresPerCol - 1) * gap + rowGap)

      for (let i = 0; i < squaresPerCol; i++) {
        for (let j = 0; j < squaresPerRow; j++) {
          const x = startX + j * (squareSize + gap)
          const y = startY + i * (squareSize + gap)
          doc.rect(x, y, squareSize, squareSize)
          if (isColored) {
            doc.fillColor(id_color[col]).fill()
            doc.stroke()
          }
          doc
            .fontSize(8)
            .text(j, x + squareSize / 2 - 4, y + squareSize / 2 - 3, {
              width: squareSize,
              height: squareSize,
              align: 'center',
              valign: 'center',
            })
        }
      }
    }
  }
  end_of_sections.push(margin_border_y + margin_y + 9)
  doc
    .moveTo(margin_border_x, end_of_sections[end_of_sections.length - 1]) // set the current point
    .lineTo(
      width_of_A4 - margin_border_x,
      end_of_sections[end_of_sections.length - 1]
    ) // draw a line
    .stroke()
}

module.exports = { student_number }
