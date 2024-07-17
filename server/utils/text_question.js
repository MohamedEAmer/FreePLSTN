const {
  quesColors,
  doc,
  end_of_sections,
  margin_y,
  margin_border_y,
  width_of_A4,
  high_of_A4,
  margin_border_x,
  margin_x,
} = require('./sharedParameters.js')
const { add_new_page } = require('./newPage.js')

function draw_text_box(isColored, num_of_lines, ques_name) {
  let color = quesColors.pop()
  let perivious_element = end_of_sections[end_of_sections.length - 1]

  //doc.text(ques_name, 280, perivious_element + margin_y / 2);
  let start_of_rect = perivious_element + margin_y
  console.log(start_of_rect)

  let hight_of_rect = 10 * num_of_lines

  let rest_high_for_page =
    high_of_A4 - start_of_rect - margin_y - margin_border_y

  if (hight_of_rect <= rest_high_for_page) {
    doc
      .fillColor('black')
      .text(ques_name, 280, perivious_element + margin_y / 2)
    doc.rect(
      margin_border_x + margin_x,
      start_of_rect,
      width_of_A4 - margin_border_x * 2 - margin_x * 2,
      hight_of_rect
    )
    if (isColored) {
      doc.fillColor(color).fill()
    }
    doc.stroke()
    if (hight_of_rect == rest_high_for_page) {
      end_of_sections.push(0)
    } else {
      end_of_sections.push(start_of_rect + hight_of_rect + margin_y)
      doc
        .moveTo(margin_border_x, end_of_sections[end_of_sections.length - 1]) // set the current point
        .lineTo(
          width_of_A4 - margin_border_x,
          end_of_sections[end_of_sections.length - 1]
        )
        .stroke()
    }
  } else {
    let temp = true

    let higt_of_first_rect = rest_high_for_page - margin_y

    if (higt_of_first_rect >= 10) {
      doc
        .fillColor('black')
        .text(ques_name, 280, perivious_element + margin_y / 2)
      temp = false
      doc.rect(
        margin_border_x + margin_x,
        start_of_rect,
        width_of_A4 - margin_border_x * 2 - margin_x * 2,
        higt_of_first_rect
      )
      if (isColored) {
        doc.fillColor(color).fill()
      }
      doc.stroke()
    } else {
      end_of_sections.pop()
      end_of_sections.push(margin_border_y + margin_y + 9)

      higt_of_first_rect = 0
      perivious_element = end_of_sections[end_of_sections.length - 1]
    }

    let rest_high = hight_of_rect - higt_of_first_rect
    let high_of_box_for_all_page =
      high_of_A4 - margin_border_y * 2 - margin_y * 3.5 - 9

    while (rest_high >= high_of_box_for_all_page) {
      add_new_page(isColored)
      if (temp) {
        temp = false
        doc.text(ques_name, 280, perivious_element + margin_y / 2)
      }
      doc.rect(
        margin_border_x + margin_x,
        end_of_sections[end_of_sections.length - 1] + margin_y,
        width_of_A4 - margin_border_x * 2 - margin_x * 2,
        high_of_box_for_all_page
      )
      if (isColored) {
        doc.fillColor(color).fill()
      }
      doc.stroke()
      rest_high -= high_of_box_for_all_page
    }
    if (rest_high) {
      add_new_page(isColored)
      if (temp) {
        temp = false
        doc
          .fillColor('black')
          .text(ques_name, 280, perivious_element + margin_y / 2)
      }

      //doc.text(ques_name, 280, perivious_element + margin_y / 2);
      doc.rect(
        margin_border_x + margin_x,
        end_of_sections[end_of_sections.length - 1] + margin_y,
        width_of_A4 - margin_border_x * 2 - margin_x * 2,
        rest_high
      )
      if (isColored) {
        doc.fillColor(color).fill()
      }
      doc.stroke()

      end_of_sections.push(
        rest_high + end_of_sections[end_of_sections.length - 1] + margin_y * 1.5
      )
      doc
        .moveTo(margin_border_x, end_of_sections[end_of_sections.length - 1]) // set the current point
        .lineTo(
          width_of_A4 - margin_border_x,
          end_of_sections[end_of_sections.length - 1]
        ) // draw a line
        .stroke()
    } else {
      end_of_sections.push(0)
    }
  }
}
module.exports = { draw_text_box }
