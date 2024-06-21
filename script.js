const { jsPDF } = window.jspdf;

document.getElementById('save-pdf').addEventListener('click', function() {
    // Get the text from the textarea and filename input
    const text = document.getElementById('notepad').value;
    const filename = document.getElementById('filename').value || 'notepad';

    // Create a new jsPDF instance with default margins
    const doc = new jsPDF({
        unit: 'in',
        format: 'letter',
        orientation: 'portrait'
    });

    // Set font to Times New Roman, size 12
    doc.setFont('Times-Roman');
    doc.setFontSize(12);

    // Add the date and time at the top right corner
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    // Measure width of the date string to align it to the right margin
    const pageWidth = doc.internal.pageSize.getWidth();
    const textWidth = doc.getTextWidth(dateStr);
    doc.text(dateStr, pageWidth - textWidth - 1, 0.5);

    // Add the user input text to the PDF
    doc.text(text, 1, 1);

    // Save the PDF with the specified filename
    doc.save(`${filename}.pdf`);
});
