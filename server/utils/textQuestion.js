const {
  doc,
  end_of_sections,
  margin_y,
  margin_border_y,
  width_of_A4,
  high_of_A4,
  margin_border_x,
  margin_x,
  quesColors,
} = require('./sharedParameters')
const { addNewPage } = require('./newPage')

exports.drawTextBox = (doc, isColored, num_of_lines, ques_name) => {
  let color = quesColors.pop()
  let previous_element = end_of_sections[end_of_sections.length - 1]
  let start_of_rect = previous_element + margin_y
  let height_of_rect = 10 * num_of_lines

  let rest_height_for_page =
    high_of_A4 - start_of_rect - margin_y - margin_border_y

  if (height_of_rect <= rest_height_for_page) {
    doc.text(ques_name, 280, previous_element + margin_y / 2)
    doc.rect(
      margin_border_x + margin_x,
      start_of_rect,
      width_of_A4 - margin_border_x * 2 - margin_x * 2,
      height_of_rect
    )
    if (isColored) {
      doc.fillColor(color).fill()
    }
    doc.stroke()
    if (height_of_rect == rest_height_for_page) {
      end_of_sections.push(0)
    } else {
      end_of_sections.push(start_of_rect + height_of_rect + margin_y)
      doc
        .moveTo(margin_border_x, end_of_sections[end_of_sections.length - 1])
        .lineTo(
          width_of_A4 - margin_border_x,
          end_of_sections[end_of_sections.length - 1]
        )
        .stroke()
    }
  } else {
    let temp = true
    let height_of_first_rect = rest_height_for_page - margin_y

    if (height_of_first_rect >= 10) {
      doc.text(ques_name, 280, previous_element + margin_y / 2)
      temp = false
      doc.rect(
        margin_border_x + margin_x,
        start_of_rect,
        width_of_A4 - margin_border_x * 2 - margin_x * 2,
        height_of_first_rect
      )
      if (isColored) {
        doc.fillColor(color).fill()
      }
      doc.stroke()
    } else {
      end_of_sections.pop()
      end_of_sections.push(margin_border_y + margin_y + 9)
      height_of_first_rect = 0
      previous_element = end_of_sections[end_of_sections.length - 1]
    }

    let rest_height = height_of_rect - height_of_first_rect
    let height_of_box_for_all_page =
      high_of_A4 - margin_border_y * 2 - margin_y * 3.5 - 9

    while (rest_height >= height_of_box_for_all_page) {
      addNewPage(doc)
      if (temp) {
        temp = false
        doc.text(ques_name, 280, previous_element + margin_y / 2)
      }
      doc.rect(
        margin_border_x + margin_x,
        end_of_sections[end_of_sections.length - 1] + margin_y,
        width_of_A4 - margin_border_x * 2 - margin_x * 2,
        height_of_box_for_all_page
      )
      if (isColored) {
        doc.fillColor(color).fill()
      }
      doc.stroke()
      rest_height -= height_of_box_for_all_page
    }
    if (rest_height) {
      addNewPage(doc)
      if (temp) {
        temp = false
        doc.text(ques_name, 280, previous_element + margin_y / 2)
      }
      doc.rect(
        margin_border_x + margin_x,
        end_of_sections[end_of_sections.length - 1] + margin_y,
        width_of_A4 - margin_border_x * 2 - margin_x * 2,
        rest_height
      )
      if (isColored) {
        doc.fillColor(color).fill()
      }
      doc.stroke()
      end_of_sections.push(
        rest_height +
          end_of_sections[end_of_sections.length - 1] +
          margin_y * 1.5
      )
      doc
        .moveTo(margin_border_x, end_of_sections[end_of_sections.length - 1])
        .lineTo(
          width_of_A4 - margin_border_x,
          end_of_sections[end_of_sections.length - 1]
        )
        .stroke()
    } else {
      end_of_sections.push(0)
    }
  }
}
