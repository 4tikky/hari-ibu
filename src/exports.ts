import { mothersDay as data } from './data/mothersDay'
import { colors } from './art'

export const eventDate = new Date(data.date)
export const dateLabel = new Intl.DateTimeFormat('id-ID', {dateStyle:'long', timeZone:'Asia/Jakarta'}).format(eventDate)

export async function saveImage(kind: 'kartu' | 'buket', selected: number[] = []) {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 1500
  const ctx = canvas.getContext('2d')
  if (!ctx) throw Error()
  ctx.fillStyle = '#f7efe4'
  ctx.fillRect(0, 0, 1200, 1500)
  ctx.strokeStyle = '#b68a6b'
  ctx.lineWidth = 3
  ctx.strokeRect(65, 65, 1070, 1370)
  ctx.strokeRect(79, 79, 1042, 1342)
  ctx.textAlign = 'center'
  function line(text: string, y: number, size: number, color = '#49362e') {
    ctx!.font = size + 'px Georgia'
    ctx!.fillStyle = color
    ctx!.fillText(text, 600, y, 990)
  }
  const flowers = kind === 'buket' ? selected : [0,1,2,3,4,5]
  flowers.forEach((index, position) => {
    const x = 600 + (position - (flowers.length - 1) / 2) * 125
    const y = 410 + Math.abs(x - 600) * .30
    ctx.beginPath()
    ctx.moveTo(600, 770)
    ctx.quadraticCurveTo(x, 655, x, y)
    ctx.strokeStyle = '#687a56'
    ctx.lineWidth = 7
    ctx.stroke()
    for (let j = 0; j < 6; j++) {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(j * Math.PI / 3)
      ctx.fillStyle = colors[index % colors.length]
      ctx.beginPath()
      ctx.ellipse(0, 33, 26, 37, 0, 0, 2*Math.PI)
      ctx.fill()
      ctx.restore()
    }
    ctx.fillStyle = '#f4d497'
    ctx.beginPath()
    ctx.arc(x, y, 20, 0, 2*Math.PI)
    ctx.fill()
  })
  if (flowers.length) {
    ctx.strokeStyle = '#ae685b'
    ctx.lineWidth = 12
    ctx.beginPath()
    ctx.moveTo(560, 746)
    ctx.quadraticCurveTo(475, 660, 600, 730)
    ctx.quadraticCurveTo(725, 660, 640, 746)
    ctx.lineTo(560, 746)
    ctx.stroke()
  }
  line(kind === 'buket' ? 'Sebuket Doa untuk Ibu' : 'Selamat Hari Ibu', 915, 75)
  line(data.motherName ? 'Untuk ' + data.motherName : 'Untuk Ibu tersayang', 1010, 46)
  line(kind === 'buket' ? 'Dengan seluruh doa dan kasih sayangku.' : data.title, 1100, 42)
  line(dateLabel, 1225, 36, '#795244')
  line(data.daughterName ? 'Dari ' + data.daughterName : 'Dari anak perempuanmu', 1310, 36)
  const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/png'))
  if (!blob) throw Error()
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = kind === 'buket' ? 'buket-doa-untuk-ibu.png' : 'kartu-hari-ibu.png'
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 30000)
}

export async function saveLetter() {
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF()
  const page = () => {
    pdf.setFillColor('#fffaF3')
    pdf.rect(0, 0, 210, 297, 'F')
    pdf.setDrawColor('#b68a6b')
    pdf.rect(12, 12, 186, 273)
    pdf.setTextColor('#49362e')
  }
  page()
  pdf.setFont('times','bold')
  pdf.setFontSize(27)
  pdf.text('Surat untuk Ibu', 105, 33, {align:'center'})
  pdf.setFont('times','normal')
  pdf.setFontSize(12)
  pdf.text(dateLabel, 105, 44, {align:'center'})
  let y = 60
  const paragraphs = [...data.letter]
  if (data.motherName) paragraphs[0] = 'Untuk ' + data.motherName + ' tersayang,'
  if (data.daughterName) paragraphs.push(data.daughterName)
  for (const paragraph of paragraphs) {
    const lines: string[] = pdf.splitTextToSize(paragraph, 158)
    for (const line of lines) {
      if (y > 268) { pdf.addPage(); page(); y = 29 }
      pdf.text(line, 26, y)
      y += 5.4
    }
    y += 3.2
  }
  pdf.save('surat-untuk-ibu.pdf')
}
