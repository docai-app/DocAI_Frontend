import { useState, useEffect } from 'react';
import { MailIcon, CheckIcon, XIcon } from '@heroicons/react/solid';
import { Document, Page } from 'react-pdf';
import _get from 'lodash/get';
import AmendLabel from '../../../components/feature/classification/AmendLabel';

interface LastestPredictionDataProps {
    document: Array<any>;
    prediction: Array<any>;
}

interface ValidateViewProps {
    formUrl: string;
    result: any;
}

function ValidateView(props: ValidateViewProps) {
    const { formUrl, result } = props;
    return (
        <>
            <div className="min-h-full bg-slate-50">
                <header className="shadow bg-white">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">請假表識別</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                        <div className="px-4 py-6 sm:px-0">
                            <p className="mb-2 text-lg">DocAI的分析結果</p>
                            <div className="flex justify-center items-center p-4 border-4 border-dashed border-gray-200 bg-white rounded-lg h-80vh">
                                <div className="left-side flex-1 flex justify-center items-center object-contain object-center">
                                    <div className="w-5/6 border-4 border-dashed border-gray-200 bg-white rounded-lg object-cover">
                                        {formUrl ? (
                                            <img
                                                className="object-cover shadow-lg rounded-lg"
                                                alt={formUrl}
                                                src={formUrl}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                                <div className="right-side flex-1">
                                    {Object.keys(result).map(function (key) {
                                        return (
                                            <p key={key} className="mb-4">
                                                <span className="font-bold">{key}: </span>
                                                {result[key]}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default ValidateView;
