const { jsPDF } = window.jspdf;

document.getElementById('save-pdf').addEventListener('click', function() {
    // Get the text from the textarea and filename input
    const text = document.getElementById('notepad').value;
    const filename = document.getElementById('filename').value || 'notepad';

    // Create a new jsPDF instance with A4 page size
    const doc = new jsPDF({
        unit: 'pt', // points
        format: 'a4',
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
    doc.text(dateStr, pageWidth - textWidth - 40, 40);

    // Add the user input text to the PDF with margins
    const marginLeft = 40;
    const marginTop = 60;
    const marginBottom = 40;
    const pageHeight = doc.internal.pageSize.getHeight();

    // Split text into lines to fit within the page margins
    const lines = doc.splitTextToSize(text, pageWidth - marginLeft * 2);

    let yPosition = marginTop;

    // Add the lines to the PDF, handling page breaks
    lines.forEach(line => {
        if (yPosition + 12 > pageHeight - marginBottom) {
            doc.addPage();
            yPosition = marginTop;
        }
        doc.text(line, marginLeft, yPosition);
        yPosition += 12; // Line height
    });

    // Save the PDF with the specified filename
    doc.save(`${filename}.pdf`);
});

