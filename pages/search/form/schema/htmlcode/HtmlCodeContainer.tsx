import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HtmlCodeView from "./HtmlCodeView";

export default function HtmlCodeContainer() {


    const htmlText = `
    <html>\n  <head>\n    <script src=\"https://code.highcharts.com/highcharts.js\"></script>\n  </head>\n  <body>\n    <div id=\"container\" style=\"width:100%; height:500px;\"></div>\n  </body>\n\n  <script>\n    document.addEventListener(\"DOMContentLoaded\", function () {\n      // Reference data\n      var data = [\n        { Department: \"TSB5\", \"Number of Leaves\": 2 },\n        { Department: \"CUN\", \"Number of Leaves\": 1 },\n        { Department: \"TSB28\", \"Number of Leaves\": 2 },\n        { Department: \"MGM\", \"Number of Leaves\": 1 },\n        { Department: \"CPG20\", \"Number of Leaves\": 1 },\n        { Department: \"GLP\", \"Number of Leaves\": 1 },\n        { Department: \"OFF\", \"Number of Leaves\": 1 },\n        { Department: \"FTY\", \"Number of Leaves\": 1 },\n        { Department: \"HZM\", \"Number of Leaves\": 1 },\n        { Department: \"SML\", \"Number of Leaves\": 1 },\n        { Department: \"TPA\", \"Number of Leaves\": 1 },\n        { Department: \"TSB5\", \"Number of Leaves\": 1 },\n        { Department: \"BGA\", \"Number of Leaves\": 0 },\n        { Department: \"CPG\", \"Number of Leaves\": 0 },\n        { Department: \"CUN\", \"Number of Leaves\": 0 },\n        { Department: \"FTY\", \"Number of Leaves\": 0 },\n        { Department: \"GLP\", \"Number of Leaves\": 0 },\n        { Department: \"HZM\", \"Number of Leaves\": 0 },\n        { Department: \"MGM\", \"Number of Leaves\": 0 },\n        { Department: \"OFF\", \"Number of Leaves\": 0 },\n        { Department: \"SML\", \"Number of Leaves\": 0 },\n        { Department: \"TFT\", \"Number of Leaves\": 0 },\n        { Department: \"TPA\", \"Number of Leaves\": 0 },\n        { Department: \"YAO\", \"Number of Leaves\": 0 },\n        { Department: \"TSB28\", \"Number of Leaves\": 0 },\n        { Department: \"CPG20\", \"Number of Leaves\": 0 },\n      ];\n\n      // Prepare the data for charting\n      var chartData = data.map(function (entry) {\n        return [entry.Department, entry[\"Number of Leaves\"]];\n      });\n\n      // Configure the chart\n      Highcharts.chart(\"container\", {\n        chart: {\n          type: \"column\",\n        },\n        title: {\n          text: \"Number of Leaves by Department\",\n        },\n        xAxis: {\n          type: \"category\",\n        },\n        yAxis: {\n          min: 0,\n          title: {\n            text: \"Number of Leaves\",\n          },\n        },\n        legend: {\n          enabled: false,\n        },\n        tooltip: {\n          pointFormat: \"Number of Leaves: <b>{point.y}</b>\",\n        },\n        series: [\n          {\n            name: \"Number of Leaves\",\n            data: chartData,\n            dataLabels: {\n              enabled: true,\n              color: \"#FFFFFF\",\n              align: \"center\",\n              format: \"{point.y}\", // Display the value on top of each column\n              y: 15, // Adjust the position of the data label\n              style: {\n                fontSize: \"13px\",\n                fontFamily: \"Verdana, sans-serif\",\n                textOutline: \"1px 1px contrast\",\n              },\n            },\n          },\n        ],\n      });\n    });\n  </script>\n</html>
    `
    const htmlText2 = `<html>
    <head>
        <script src="https://code.highcharts.com/highcharts.js"></script>
    </head>
    <body>
        <div id="container" style="width:100%; height:500px;"></div>
        <script>
            Highcharts.chart('container', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'Leave Summary by Department'
                },
                series: [{
                    name: 'Number of Leaves',
                    colorByPoint: true,
                    data: [{
                        name: 'MGM',
                        y: 1
                    }, {
                        name: 'CPG20',
                        y: 1
                    }]
                }]
            });
        </script>
    </body>
    </html>
    `
    const router = useRouter()
    const [content, setContent] = useState('')
    useEffect(() => {

        if (router.query.content) {
            console.log(router.query.content.toString());
            setContent(JSON.parse(router.query.content.toString()))
        }

    }, [router])
    if (content != '')
        return <HtmlCodeView content={content} />;
    else return <></>
}
