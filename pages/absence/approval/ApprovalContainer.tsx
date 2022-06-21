import ApprovalView from "./ApprovalView";
import { useState, useEffect } from "react"

function ApprovalContainer() {

    const [props, setProps] = useState({
        data: [
            {
                id: 1,
                employee_name: '陳大文',
                reason_of_absence: '中咗 COVID',
                type_of_absence: '緊急',
                type_of_leave: '病假',
                storage: '',
                approval: ''
            },
            {
                id: 2,
                employee_name: '陳大文',
                reason_of_absence: '中咗 COVID',
                type_of_absence: '緊急',
                type_of_leave: '病假',
                storage: '',
                approval: ''
            },
        ]
    })

    return <ApprovalView {...props} />
}

export default ApprovalContainer;