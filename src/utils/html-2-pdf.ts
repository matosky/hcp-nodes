export const loadHtml2Pdf = () => {
  return new Promise((resolve, reject) => {
    if ((window as any).html2pdf) {
      resolve((window as any).html2pdf)
      return
    }

    const script = document.createElement("script")
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
    script.onload = () => resolve((window as any).html2pdf)
    script.onerror = reject

    document.body.appendChild(script)
  })
}
