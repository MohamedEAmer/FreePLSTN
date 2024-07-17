// Assuming this code is in a file named addNewPage.js

const { doc } = require('./sharedParameters.js')
const { student_number } = require('./studentNumber.js')
const { border_arucomarker } = require('./border_arucomarker.js')
const { addBarcodeToPage } = require('./barcode.js')

let page_num = 2

function create_page_num(isColored) {
  doc.fillColor('black').fontSize(20).text(page_num, 280, 15)
  doc.stroke()
  page_num += 1
}
function add_new_page(isColored) {
  doc.addPage({ size: 'A4' })
  create_page_num(isColored)
  student_number(isColored)
  border_arucomarker()
  //addBarcodeToPage(png);
}

module.exports = { add_new_page }
