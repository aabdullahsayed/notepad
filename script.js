// Load the jsPDF library
const { jsPDF } = window.jspdf;

document.getElementById('save-pdf').addEventListener('click', function() {
    // Get the text from the textarea
    const text = document.getElementById('notepad').value;
    
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add the text to the PDF
    doc.text(text, 10, 10);

    // Save the PDF with a default filename
    doc.save('notepad.pdf');
});
