import { PaperAirplaneIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import HeaderBreadCrumb from '../../../../components/common/Widget/HeaderBreadCrumb';
import SingleActionModel from '../../../../components/common/Widget/SingleActionModel';

interface ViewProps {
    chatbot: any;
    open: boolean;
    setOpen: any;
    actionContent: string;
    assistive_questions: any;
    set_assistive_questions: any;
    handleUpdate: any;
}
export default function AssistiveQuestionView(props: ViewProps) {
    const {
        chatbot,
        open,
        setOpen,
        actionContent,
        assistive_questions,
        set_assistive_questions,
        handleUpdate
    } = props;

    const router = useRouter();

    const addAssistiveQuestions = () => {
        const newData = [...assistive_questions, ''];
        set_assistive_questions(newData);
    };

    const updateAssistiveQuestions = (index: number, value: string) => {
        assistive_questions[index] = value;
        const newData = [...assistive_questions];
        set_assistive_questions(newData);
    };

    const removeAssistiveQuestions = (index: number) => {
        assistive_questions.splice(index, 1);
        const newData = [...assistive_questions];
        set_assistive_questions(newData);
    };
    return (
        <>
            <SingleActionModel
                open={open}
                setOpen={setOpen}
                title={'正在進行...'}
                content={actionContent}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />
            <div className="mx-auto max-w-7xl">
                <div className="mx-auto max-w-7xl pb-12">
                    <HeaderBreadCrumb
                        title={'編輯輔助問題'}
                        back={() => {
                            router.back();
                        }}
                        save={() => {
                            handleUpdate();
                        }}
                    />
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                        {chatbot?.name}
                    </h2>

                    <div className="col-span-full">
                        <div className="flex flex-row justify-between items-center">
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                輔助問題
                            </label>
                            <a
                                className="block cursor-pointer p-2 text-xl font-medium leading-6  text-indigo-600"
                                onClick={addAssistiveQuestions}
                            >
                                +
                            </a>
                        </div>

                        <div className="mt-2">
                            {assistive_questions?.map((question: any, index: number) => (
                                <div key={index} className="my-1 flex flex-row items-center">
                                    <input
                                        type={'text'}
                                        className="block flex-1 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={question}
                                        placeholder="輔助問題"
                                        onChange={(e) => {
                                            updateAssistiveQuestions(index, e.target.value);
                                        }}
                                    />
                                    <div
                                        className="flex-0 p-2 cursor-pointer "
                                        onClick={() => {
                                            removeAssistiveQuestions(index);
                                        }}
                                    >
                                        <XCircleIcon className="w-5 hover:text-red-500 " />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
