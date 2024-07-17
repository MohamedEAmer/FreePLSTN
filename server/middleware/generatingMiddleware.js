const fs = require('fs');
const path = require('path');
const { draw_text_box } = require('../utils/text_question');
const { checkAndDrawTF } = require('../utils/tf');
const { checkAndDrawMSQ } = require('../utils/msq');
const { addCoverToDoc } = require('../utils/cover');
const { doc } = require('../utils/sharedParameters');
const { add_new_page } = require('../utils/newPage');


const generateExamAndMask = async (user , name, MCQs, TFs, Text, textLines, examCode ,isColored = false) => {
  try {
    const drawTextBoxes = (textLines, isColored) => {
      textLines.forEach((lines, index) => {
        draw_text_box(isColored, lines * 4, `Q${index + 1}`);
      });
    };

    // Determine the correct output folder and filename based on isColored flag
    let folderPath, filename;
    if (!isColored) {
      folderPath = path.join(__dirname, '../MyExams');
      filename = `${user}-${name}-MCQs${MCQs}TFs${TFs}Text${Text}.pdf`;
    } else {
      folderPath = path.join(__dirname, '../MyMasks');
      filename = `Mask-${user}-${name}-MCQs${MCQs}TFs${TFs}Text${Text}.pdf`;
    }

    const filePath = path.join(folderPath, filename);

    // Ensure the folder exists
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    
    const fileStream = fs.createWriteStream(filePath);

    
    fileStream.on('error', (err) => {
      console.error('Error writing PDF:', err);
    });


    await doc.pipe(fileStream);
    // Initialize the PDF document
    await doc.initForm();
    await addCoverToDoc(isColored, 'Tanta University', `${name}`, 3, `${examCode}`);
    await add_new_page(isColored);
    await checkAndDrawMSQ(isColored, MCQs);
    await checkAndDrawTF(isColored, TFs);
    await drawTextBoxes(textLines, isColored);
    // Finalize the PDF and end the document
    await doc.end();
    console.log(`PDF generated successfully at: ${filePath}`);
    return filePath;
  } catch (err) {
    console.error('Error generating PDF:', err);
    throw err; // Propagate the error further
  }
};

module.exports = generateExamAndMask;
