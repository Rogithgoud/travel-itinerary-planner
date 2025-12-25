import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ExportPDF() {
const handleExport = async () => {
  const element = document.getElementById("itinerary-content");
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2, // improves quality
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  // First page
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  // Additional pages
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save("itinerary.pdf");
};


  return (
    <button onClick={handleExport} style={{ marginTop: "20px" }}>
      Export as PDF
    </button>
  );
}

export default ExportPDF;
