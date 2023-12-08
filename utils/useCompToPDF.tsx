import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CompToPDFProps {
    fileName: string;
}
const PDFFile = {
    A4: [592.28, 841.89]
};

//自定义的hooks函数
const useCompToPDF = (props: CompToPDFProps) => {
    const { fileName } = props;
    const exportPDf = (element: HTMLElement | null) => {
        if (element) {
            const opts = {
                scale: 2,
                useCORS: true,
                margin: 10,
                padding: 10,
                image: { type: 'jpeg', quality: 0.95 },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            html2canvas(element, opts).then((canvas) => {
                //获取画布的宽高
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;
                //一页PDF显示html生成的canvas高度
                const pdfPageHeight = (PDFFile.A4[1] / PDFFile.A4[0]) * canvasWidth;
                //未生成pdf的html页面内高度
                let pdfAllHeight = canvasHeight;

                let position = 0; //页面偏移

                //转换图片为dataURL，参数：图片格式和清晰度(0-1)
                const pageData = canvas.toDataURL('image/jpeg', 1.0);

                //html页面生成的canvas在pdf中图片的宽高
                const imgWidth = PDFFile.A4[0] - 60; //减去边距宽度
                const imgHeight = (canvasHeight / canvasWidth) * PDFFile.A4[0];
                //方向p竖直 l横向，尺寸ponits，格式a4
                const pdf = new jsPDF('p', 'pt', PDFFile.A4);

                //当内容未超过pdf一页显示的范围，无需分页
                if (pdfAllHeight < pdfPageHeight) {
                    // 从图片顶部开始打印   30 左右边距, 0 上下边距
                    pdf.addImage(pageData, 'jpeg', 30, 10, imgWidth, imgHeight);
                } else {
                    while (pdfAllHeight > 0) {
                        pdf.addImage(pageData, 'jpeg', 30, position, imgWidth, imgHeight);
                        pdfAllHeight -= pdfPageHeight;
                        position -= PDFFile.A4[1];
                        //避免添加空白页
                        if (pdfAllHeight > 0) {
                            pdf.addPage();
                        }
                    }
                }
                pdf.save(`${fileName}.pdf`);
            });
        }
    };
    return {
        exportPDf
    };
};
export default useCompToPDF;
