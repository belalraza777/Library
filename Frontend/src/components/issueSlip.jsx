// IssueSlip.jsx - Displays and generates a PDF for a book issue transaction.
// This component is a modal that shows details of a borrowed book and allows the user to download an issue slip as a PDF.
import jsPDF from 'jspdf'; // Importing jsPDF library for PDF generation

export default function IssueSlip({ issued, onClose }) {
  // If no issued data is provided, display an error message
  if (!issued) {
    return <p className="text-red-500 font-medium">⚠️ No slip data found</p>;
  }

  //PDF genrateing
  const generatePDF = () => {

    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: [100, 160] // A taller, receipt-like format
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 6;
    let yPos = margin;

    // ---- HELPER FUNCTIONS ----
    const setFont = (style, size) => {
      doc.setFont('helvetica', style);
      doc.setFontSize(size);
    };

    const drawLine = (y) => {
      doc.setDrawColor(200, 200, 200);
      doc.line(margin, y, pageWidth - margin, y);
    };

    // Get the page width to calculate the center
    const centerX = pageWidth / 2;

    // --- HEADER SECTION (Properly Centered) ---
    setFont('bold', 12);
    doc.text("THE LIBRARY", centerX, yPos, { align: 'center' });
    yPos += 5; // Move down for the next line

    setFont('normal', 8);
    doc.text("BOOK ISSUE RECEIPT", centerX, yPos, { align: 'center' });
    yPos += 7; // Add space before the line

    drawLine(yPos);
    yPos += 5;

    // ---- 2. TRANSACTION SECTION (with proper alignment) ----
    const sectionLineHeight = 5; // Consistent vertical spacing for this section
    const labelX = margin;       // X-position for labels
    const valueX = margin + 25;  // X-position for values, creating a column

    // --- Row 1: Transaction ID ---
    setFont('bold', 7);
    doc.setTextColor(100, 100, 100);
    doc.text("Transaction ID:", labelX, yPos);

    setFont('normal', 8);
    doc.setTextColor(0, 0, 0);
    // Assuming the ID should be `transactionId`, not `_id`, based on your data structure
    doc.text(issued.issued._id, valueX, yPos);

    yPos += sectionLineHeight; // Move down for the next line

    // --- Row 2: Issued On ---
    setFont('bold', 7);
    doc.setTextColor(100, 100, 100);
    doc.text("Issued On:", labelX, yPos);

    setFont('normal', 8);
    doc.setTextColor(0, 0, 0);
    const formattedDate = new Date(issued.issued.issueDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    doc.text(formattedDate, valueX, yPos);

    yPos += sectionLineHeight + 2; // Move down and add a little extra padding
    drawLine(yPos);
    yPos += 5;


    // ---- 3. PROMINENT DUE DATE SECTION ----
    setFont('bold', 8);
    doc.setTextColor(231, 76, 60); // An alert color
    doc.text("!! IMPORTANT: RETURN BY !!", pageWidth / 2, yPos, { align: 'center' });
    yPos += 4;

    const dueDateBoxWidth = 40;
    doc.setFillColor(44, 62, 80); // Dark background
    doc.roundedRect((pageWidth - dueDateBoxWidth) / 2, yPos, dueDateBoxWidth, 12, 2, 2, 'F');

    setFont('bold', 12);
    doc.setTextColor(255, 255, 255);
    const dueDateText = new Date(issued.issued.dueDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase();
    doc.text(dueDateText, pageWidth / 2, yPos + 8, { align: 'center' });

    yPos += 18;
    drawLine(yPos);
    yPos += 5;


    // ---- 4. TWO-COLUMN INFO SECTION ----
    const col1X = margin;
    const col2X = pageWidth / 2;

    // Column 1: Borrower
    setFont('bold', 8);
    doc.setTextColor(0, 0, 0);
    doc.text("BORROWER", col1X, yPos);
    drawLine(yPos + 2);

    setFont('normal', 7);
    doc.text(`Name: ${issued.user.username}`, col1X, yPos + 6);
    doc.text(`Email: ${issued.user.email}`, col1X, yPos + 10);

    // Column 2: Book Details
    setFont('bold', 8);
    doc.text(" BOOK DETAILS", col2X, yPos);
    drawLine(yPos + 2);

    setFont('normal', 7);
    let bookTitle = issued.book.title;
    // Truncate long titles to fit the column
    if (bookTitle.length > 20) {
      bookTitle = bookTitle.substring(0, 18) + '...';
    }
    doc.text(`Title: ${bookTitle}`, col2X, yPos + 6);
    doc.text(`Author: ${issued.book.author}`, col2X, yPos + 10);
    doc.text(`ID: ${issued.book.id}`, col2X, yPos + 14);

    yPos += 20;
    drawLine(yPos);
    yPos += 8;


    // ---- 5. RETURN & ADMIN SECTION (Fine field added) ----
    setFont('bold', 9);
    doc.text(" RETURN CONFIRMATION (Admin Use)", pageWidth / 2, yPos, { align: 'center' });
    yPos += 8;

    setFont('normal', 8);
    doc.text("Return Date: ______________________", margin, yPos);
    yPos += 7; // Space for the new field

    // --- ADDED FIELD ---
    doc.text("Fine Amount: _____________________", margin, yPos);
    yPos += 7;
    // --- END ADDED FIELD ---

    doc.text("Signature: _______________________", margin, yPos);

    const stampSize = 18;
    doc.setDrawColor(150, 150, 150);
    doc.rect(pageWidth - margin - stampSize, yPos - 12, stampSize, stampSize, 'S'); // Adjusted stamp Y position
    setFont('normal', 6);
    doc.text("STAMP", pageWidth - margin - stampSize / 2, yPos - 3, { align: 'center' });
    yPos += 10;


    // ---- 6. FOOTER ----
    drawLine(yPos);
    yPos += 4;
    setFont('normal', 7);
    doc.setTextColor(150, 150, 150);
    doc.text("Thank you!", margin, yPos);
    doc.text("www.yourlibrary.com", pageWidth - margin, yPos, { align: 'right' });


    // ---- SAVE THE DOCUMENT ----
    doc.save(`receipt_${issued.issued._id}.pdf`);
  };

  return (
    // Fixed overlay for the modal, covering the entire screen with a semi-transparent background
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center z-50">
      {/* Modal content container with styling for maximum width, padding, border, shadow, and background */}
      <div className="max-w-sm mx-auto p-6 border rounded-lg shadow-md bg-white relative">
        {/* Close button for the modal with an icon */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          aria-label="Close"
        >
          <i className="fas fa-times h-6 w-6"></i>
        </button>
        {/* Title of the issue slip with an icon */}
        <h3 className="text-xl text-black font-semibold text-center mb-4 flex items-center justify-center">
          <i className="fas fa-file-alt mr-2"></i> Library Issue Slip
        </h3>

        {/* Display area for various issue details */}
        <div className="space-y-2 text-gray-700">
          {/* Book title with an icon */}
          <p className="flex items-center"><span className="font-medium"><i className="fas fa-book mr-2"></i>Book:</span> {issued.book.title}</p>
          {/* User name with an icon */}
          <p className="flex items-center"><span className="font-medium"><i className="fas fa-user mr-2"></i>User:</span> {issued.user.username}</p>
          {/* Issue date with an icon */}
          <p className="flex items-center"><span className="font-medium"><i className="fas fa-calendar-alt mr-2"></i>Issued On:</span> {new Date(issued.issued.issueDate).toLocaleDateString()}</p>
          {/* Due date with an icon */}
          <p className="flex items-center"><span className="font-medium"><i className="fas fa-hourglass-half mr-2"></i>Due Date:</span> {new Date(issued.issued.dueDate).toLocaleDateString()}</p>
          {/* Return date with an icon, conditionally displayed if returned */}
          <p className="flex items-center">
            <span className="font-medium"><i className="fas fa-check-circle mr-2"></i>Return Date:</span>{" "}
            {issued.issued.returnDate
              ? new Date(issued.issued.returnDate).toLocaleDateString()
              : "Not yet returned"}
          </p>
        </div>

        {/* Button to trigger PDF download with an icon */}
        <button
          onClick={generatePDF}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <i className="fas fa-download mr-2"></i> Download as PDF
        </button>
      </div>
    </div>
  );
}
