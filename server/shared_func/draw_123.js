const { doc, margin_border_x, margin_x } = require('../utils/sharedParameters')

let radios = 10
let distance_btn_circle = 8

function draw_123(
  num_q_for_this_rect,
  num_question_for_each_line,
  num_question_for_each_colum_of_this_rect,
  rest_questions,
  start_of_this_rect,
  start_of_counting,
  step_x
) {
  let count = 1
  let i
  let x = 1
  let temp = num_question_for_each_colum_of_this_rect - 1
  let center_x = margin_border_x + margin_x + radios + 1
  let const_center_y = start_of_this_rect + (radios * 2 + distance_btn_circle)
  while (x <= num_question_for_each_line) {
    if (x > rest_questions && rest_questions != 0)
      num_question_for_each_colum_of_this_rect = temp
    for (
      i = 1;
      i <= num_question_for_each_colum_of_this_rect &&
      count <= num_q_for_this_rect;
      i++
    ) {
      let center_y = const_center_y + i * (radios * 2 + distance_btn_circle)

      doc.fontSize(10)
      doc.text(
        `${count + start_of_counting}`,
        count + start_of_counting < 100 ? center_x : center_x - 7,
        center_y - 5
      )
      count++
    }
    center_x += step_x //هننغير في حاله الصح والغلط
    x++
  }
}

module.exports = { draw_123 }
