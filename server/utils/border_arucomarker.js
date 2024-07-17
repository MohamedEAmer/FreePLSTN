const path = require('path') // Import the 'path' module

const {
  doc,
  width_of_A4,
  high_of_A4,
  margin_border_x,
  margin_border_y,
} = require('./sharedParameters')

function border_arucomarker() {
  // Construct the image file paths relative to the current file
  const aruco1Path = path.join(__dirname, 'aruco1.jpeg')
  const aruco2Path = path.join(__dirname, 'aruco2.jpg')

  // Draw the squares on the sides
  doc.lineWidth(10)
  doc.image(aruco1Path, 3, 6, { width: 40 })
  doc.image(aruco1Path, width_of_A4 - 43, 6, { width: 40 })
  doc.image(aruco2Path, 3, high_of_A4 - 46, { width: 40 })
  doc.image(aruco2Path, width_of_A4 - 43, high_of_A4 - 46, { width: 40 })

  // Draw the border for the entire PDF
  doc.lineWidth(1)
  doc.rect(
    margin_border_x,
    margin_border_y,
    width_of_A4 - margin_border_x * 2,
    high_of_A4 - margin_border_y * 2
  )
  doc.stroke()
}

module.exports = { border_arucomarker }
