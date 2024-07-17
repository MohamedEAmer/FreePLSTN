function get_num_question_for_each_colum(
  num_question,
  num_question_for_each_line
) {
  let num_question_for_each_colum = Math.floor(
    num_question / num_question_for_each_line
  )
  let rest_questions = num_question % num_question_for_each_line
  if (rest_questions != 0) {
    num_question_for_each_colum++
  }
  return [num_question_for_each_colum, rest_questions]
}

module.exports = {get_num_question_for_each_colum}
