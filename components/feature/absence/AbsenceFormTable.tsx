import React, { useCallback, useEffect } from 'react';
import _get from 'lodash/get';
import _findKey from 'lodash/findKey';

const people = [
    {
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        email: 'lindsay.walton@example.com',
        role: 'Member'
    }
];

interface AbsenceFormsProps {
    form_data: any;
    form_schema: any;
}

interface AbsenceFormTableProps {
    absenceForms: AbsenceFormsProps;
}

export default function AbsenceFormTable(props: AbsenceFormTableProps) {
    const { absenceForms } = props;
    const getTypeOfAbsence = useCallback(
        (typeOfAbsence: any, formSchema: any) => {
            console.log(typeOfAbsence);
            for (const key in typeOfAbsence) {
                if (typeOfAbsence[key] === true) {
                    return absenceForms.form_schema.form_schema.properties.type_of_absence
                        .properties[key].title;
                }
            }
        },
        [absenceForms]
    );
    const getTypeOfLeave = useCallback(
        (typeOfLeave: any, formSchema: any) => {
            console.log(absenceForms);
            for (const key in typeOfLeave) {
                if (typeOfLeave[key] === true) {
                    return formSchema.form_schema.properties.type_of_leave.properties[key].title;
                }
            }
        },
        [absenceForms]
    );
    useEffect(() => {
        console.log(absenceForms);
    });
    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">請假表</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        系統根據您所選擇的日期來查詢所有員工的請假表，包括他們的姓名、請假理由、請假類型和假期類型。
                    </p>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                        >
                                            員工姓名
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            請假理由
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            請假類型
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                                        >
                                            假期類型
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                                        >
                                            <span className="sr-only">下載</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {absenceForms.form_data.map((absenceForm: any) => (
                                        <tr key={absenceForm.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {_get(absenceForm, 'data.employee_name')}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {_get(absenceForm, 'data.reason_of_absence')}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {getTypeOfAbsence(
                                                    _get(absenceForm, 'data.type_of_absence'),
                                                    absenceForm.form_schema
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                {getTypeOfLeave(
                                                    _get(absenceForm, 'data.type_of_leave'),
                                                    absenceForm.form_schema
                                                )}
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <a
                                                    href={_get(absenceForm, 'document.storage_url')}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                    target="_blank"
                                                    rel="noreferrer"
                                                >
                                                    下載
                                                </a>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
