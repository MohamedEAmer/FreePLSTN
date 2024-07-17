const { doc, margin_border_x, margin_x } = require('../utils/sharedParameters')

let radios = 10
let distance_btn_circle = 8

function draw_circles(
  isColored,
  color,
  num_q_for_this_rect,
  num_question_for_each_line,
  num_question_for_each_colum_of_this_rect,
  rest_questions,
  start_of_this_rect,
  lst,
  step_x,
  for_const_center_x
) {
  let x = 1
  let count = 1
  let i
  let const_center_y =
    start_of_this_rect + (radios * 4 + distance_btn_circle * 2)
  let center_y = 0
  let center_x = 0
  let const_center_x = margin_border_x + margin_x + radios * for_const_center_x
  let temp = num_question_for_each_colum_of_this_rect - 1

  while (x <= num_question_for_each_line) {
    if (x > rest_questions && rest_questions != 0)
      num_question_for_each_colum_of_this_rect = temp

    for (
      i = 0;
      i < num_question_for_each_colum_of_this_rect &&
      count <= num_q_for_this_rect;
      i++
    ) {
      center_y = const_center_y + i * (2 * radios + distance_btn_circle)
      for (let j = 0; j < lst.length; j++) {
        center_x = const_center_x + j * (2 * radios + distance_btn_circle)
        doc.circle(center_x, center_y, radios)
        if (isColored) {
          doc.fillColor(color).fill()
          doc.stroke()
        }
        doc.fontSize(8)

        doc.stroke()
      }

      count++
    }
    const_center_x += step_x

    x++
  }
}
module.exports = { draw_circles }
