import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import seller from "./images/seller.png";
import logo from "./images/logo.png";
import accreditation from "./images/accreditation.jpg";

export default function MaintenanceReport() {
  const pdfRef = useRef(null);

  // 🔧 Replace inputs with text for PDF
  const replaceInputsWithText = (container) => {
    const fields = container.querySelectorAll("input, textarea");

    fields.forEach((field) => {
      const span = document.createElement("span");
      span.innerText = field.value || "";
      span.className = field.className;
      span.style.display = "inline-block";
      span.style.minHeight = "14px";
      span.style.fontSize = "12px";
      span.style.verticalAlign = "middle";
      field.replaceWith(span);
    });
  };

  const downloadPDF = async () => {
    const element = pdfRef.current;
    if (!element) return;

    // clone so UI remains editable
    const clonedElement = element.cloneNode(true);
    replaceInputsWithText(clonedElement);

    clonedElement.style.position = "absolute";
    clonedElement.style.left = "-9999px";
    document.body.appendChild(clonedElement);

    const canvas = await html2canvas(clonedElement, {
      scale: 2,
      backgroundColor: "#ffffff",
    });

    document.body.removeChild(clonedElement);

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
    heightLeft -= pdfHeight;

    while (heightLeft > 0) {
      position += pdfHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, -position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    pdf.save("Ares-Maintenance-Report.pdf");
  };

  return (
    <>
      <div style={{ background: "#f5f5f5", padding: 20 }}>
        <div ref={pdfRef} className="report">

          {/* HEADER */}
          <div className="header">
            <div className="logo">
              <img src={logo} alt="ARES Logo" className="logo-img" />
            </div>

            <div className="title">ARES ENERGY PTY LTD</div>

            <div>
              <div className="report-title">MAINTENANCE REPORT</div>
              <div className="job-ref">
                Job Ref No - <input className="job-input" />
              </div>
            </div>
          </div>

          <div className="orange-dots" />

          <div className="two-col">
            <div>
              <strong>System Details</strong>
              <div className="line-field"><span>Panels:</span><input className="line-input" /></div>
              <div className="line-field"><span>Battery:</span><input className="line-input" /></div>
              <div className="line-field"><span>Inverter:</span><input className="line-input" /></div>
            </div>

            <div>
              <strong>Customer Details</strong>
              <div className="line-field"><span>N:</span><input className="line-input" /></div>
              <div className="line-field"><span>A:</span><input className="line-input" /></div>
              <div className="line-field"><span>P:</span><input className="line-input" /></div>
              <div className="line-field"><span>E:</span><input className="line-input" /></div>
            </div>
          </div>

          <div className="bar">SOLAR SERVICE REPORT</div>
          <div className="line-field"><span>Attendance Date:</span><input className="line-input" /></div>
          <div className="line-field"><span>Attendance Time:</span><input className="line-input" /></div>

          <div className="two-col">
            <div>
              <div className="bar small">AC Voltages</div>
              <div className="line-field"><span>Active - Neutral:</span><input className="line-input" /></div>
              <div className="line-field"><span>Active - Earth:</span><input className="line-input" /></div>
              <div className="line-field"><span>Neutral - Earth:</span><input className="line-input" /></div>
            </div>

            <div>
              <div className="bar small">DC Voltages</div>
              <div className="line-field"><span>Positive - Negative:</span><input className="line-input" /></div>
              <div className="line-field"><span>Positive - Earth:</span><input className="line-input" /></div>
              <div className="line-field"><span>Negative - Earth:</span><input className="line-input" /></div>
            </div>
          </div>

          <div className="bar">Fault Details</div>
          <div className="line-field"><span>Fault Reported:</span><input className="line-input" /></div>
          <div className="line-field"><span>Fault Found:</span><input className="line-input" /></div>

          <div className="line-field tall">
            <span>Repairs / Actions / Suggestions:</span>
            <textarea className="line-textarea" />
          </div>

          {/* FOOTER */}
          <div className="footer">
            <div className="footer-top">
              <div>CALL US TODAY</div>
              <div className="footer-phone">1300 717 583</div>
              <div className="footer-logos">
                <img src={seller} alt="Seller" />
                <img src={accreditation} alt="Accreditation" />
              </div>
            </div>

            <div className="footer-divider" />

            <div className="footer-bottom">
              <div>INFO@ARESENERGY.COM.AU<br />WWW.ARESENERGY.COM.AU</div>
              <div>276 KARGOTICH RD, OAKFORD<br />6121</div>
              <div className="footer-abn">ABN 78 631 734 506</div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={downloadPDF} style={{ marginTop: 20 }}>
        Download PDF
      </button>

      <style>{`
        .report { width: 794px; background: #fff; padding: 20px; font-family: Arial; margin: auto; }
        .header { display: grid; grid-template-columns: 1fr 2fr 1fr; align-items: center; }
        .logo { display: flex; align-items: center; gap: 10px; }
        .logo-img { height: 48px; object-fit: contain; }
        .logo-text { font-size: 10px; font-weight: bold; color: #1f3a5f; }
        .title { font-size: 24px; font-weight: bold; text-align: center; color: #1f3a5f; }
        .orange-dots { border-bottom: 2px dotted #f58220; margin: 10px 0; }
        .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .bar { background: #bfc9d2; padding: 6px 10px; font-weight: bold; margin: 12px 0 6px; }
        .line-field { border-bottom: 1px solid #aaa; padding: 6px 0; font-size: 12px; }
        .line-input, .job-input { border: none; outline: none; font-size: 12px; width: 70%; }
        .line-textarea { border: none; outline: none; width: 100%; height: 50px; resize: none; }
        .footer { margin-top: 25px; font-size: 12px; }
        .footer-top { display: grid; grid-template-columns: 1fr 1fr 1fr; text-align: center; }
        .footer-phone { font-size: 20px; }
        .footer-logos { display: flex; justify-content: center; gap: 12px; }
        .footer-logos img { height: 45px; background: #fff; padding: 4px; }
        .footer-divider { height: 2px; background: #f58220; margin: 8px 0; }
        .footer-bottom { display: grid; grid-template-columns: 1fr 1fr 1fr; text-align: center; font-size: 11px; }
        .footer-abn { font-weight: bold; }
      `}</style>
    </>
  );
}
