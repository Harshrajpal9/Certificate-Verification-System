const PDFDocument = require("pdfkit");
const path = require("path");

const generateCertificate = async (res, cert, inline = false) => {
  const doc = new PDFDocument({
    size: "A4",
    layout: "landscape",
    margin: 0,
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `${inline ? "inline" : "attachment"}; filename=${cert.certificateId}.pdf`
  );

  doc.pipe(res);

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  // ===== TEMPLATE IMAGE =====
  const templatePath = path.join(
    __dirname,
    "../assets/certificate-template.jpg"
  );

  doc.image(templatePath, 0, 0, {
    fit: [pageWidth, pageHeight],
    align: "center",
    valign: "center",
  });

  // ===== DATE FORMAT =====
  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;
  };

  // ===== NAME =====
  doc
    .font("Helvetica-Bold")
    .fontSize(42)
    .fillColor("#1e3a8a")
    .text(cert.name, 0, 250, {
      width: pageWidth,
      align: "center",
    });

  // ===== COURSE =====
  doc
    .font("Helvetica")
    .fontSize(18)
    .fillColor("#000")
    .text(`Course: ${cert.domain}`, 0, 305, {
      width: pageWidth,
      align: "center",
    });

  // ===== DESCRIPTION (moved DOWN) =====
  doc
    .fontSize(14)
    .fillColor("#333")
    .text(
      "For successfully completing the internship program with dedication and excellence.",
      pageWidth / 2 - 300,
      380,
      {
        width: 600,
        align: "center",
        lineGap: 4,
      }
    );

  // ===== DURATION (moved UP) =====
  doc
    .fontSize(14)
    .fillColor("#000")
    .text(
      `Duration: ${formatDate(cert.startDate)} - ${formatDate(cert.endDate)}`,
      0,
      405,
      {
        width: pageWidth,
        align: "center",
      }
    );

  // ===== ISSUE DATE (shifted LEFT) =====
  doc
    .fontSize(12)
    .fillColor("#000")
    .text(
      `Issue Date: ${formatDate(cert.issueDate)}`,
      pageWidth - 300,
      pageHeight - 120,
      {
        width: 200,
        align: "right",
      }
    );

  // ===== CERTIFICATE ID =====
  doc
    .fontSize(10)
    .fillColor("gray")
    .text(
      `Certificate ID: ${cert.certificateId}`,
      pageWidth - 300,
      pageHeight - 90,
      {
        width: 200,
        align: "right",
      }
    );

  doc.end();
};

module.exports = generateCertificate;