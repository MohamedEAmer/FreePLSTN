const { doc, margin_border_x, margin_x } = require('../utils/sharedParameters')
let radios = 10
let distance_btn_circle = 8

function draw_ABCDE_TF(
  num_question_for_each_line,
  start_of_this_rect,
  lst,
  step_x,
  for_const_center_x
) {
  let y = start_of_this_rect + radios + distance_btn_circle
  let const_center_x = margin_border_x + margin_x + radios * for_const_center_x
  let center_x = 0

  for (let i = 0; i < num_question_for_each_line; i++) {
    for (let j = 0; j < lst.length; j++) {
      center_x = const_center_x + j * (2 * radios + distance_btn_circle)
      doc.fontSize(18).text(`${lst[j]}`, center_x - 7, y)
      doc.stroke()
    }
    const_center_x += step_x
  }
}

module.exports = { draw_ABCDE_TF }
