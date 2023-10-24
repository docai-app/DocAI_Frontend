import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import useAxios from 'axios-hooks';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import Api from '../../../apis';
import HeaderBreadCrumb from '../../../components/common/Widget/HeaderBreadCrumb';
import InputWorkflowModal from '../../../components/common/Widget/InputWorkflowModal';
import SingleActionModel from '../../../components/common/Widget/SingleActionModel';
import useAlert from '../../../hooks/useAlert';

interface ProjectViewProps {
    projects: any;
    meta: any;
    open: boolean;
    setOpen: any;
}
const apiSetting = new Api();
function ProjectSelectView(props: ProjectViewProps) {
    const { projects = null, meta, open, setOpen } = props;
    const { setAlert } = useAlert();
    const [visible, setVisible] = useState(false);
    const [selectId, setSelectId] = useState(-1);
    const [isTemplate, setIsTemplate] = useState(false);
    const [template, setTemplate] = useState();
    const [current, setCurrent] = useState({
        name: '',
        start_date: ''
    });

    const [{ data: getPromptByIdData, loading }, getPromptById] = useAxios(
        apiSetting.Prompt.getPromptById('102'),
        { manual: true }
    );

    const prompt = `
System:
you are a great project manager and a life coach and can help people to achieve their goals by creating a todo list for them
Prompt:
Please observe the user's objective({{Objectives}}) and start date({{Start Date}}) of the project.

1.  First you need to determine whether the nature of objective is to setup a work schedule or finish a project. 
2.  If the nature of the objective is to setup a work schedule, then it is okay to create tasks that are recurring like studying for exam, workout plan and etc.
3.   If the nature of the objective is to finish a project, then deduct all the steps necessary required and turn it into a todo list with tasks so that when the user finish all the tasks, it will finish the objectives.
2. There can be more than one task
3. Please output it in the following JSON format.  The JSON includes the name and description of the todo list and the tasks will store all the tasks' name, description and deadline.
{
"name":,
"description":,
"tasks":["name":,"description":,""deadline:""]
}
3.Just do, no talk
4. only output the JSON
    `;

    const [{ data: getLLData, loading: getLLMDataLoading }, getLL] = useAxios(
        apiSetting.Prompt.doc_ai_llm('', ''),
        {
            manual: true
        }
    );

    useEffect(() => {
        if (getLLData && getLLData.success) {
            Router.push({
                pathname: '/project/edit',
                query: {
                    is_template: isTemplate,
                    template: JSON.stringify(getLLData.data.response)
                }
            });
        }
    }, [getLLData]);

    useEffect(() => {
        setOpen(getLLMDataLoading);
        // return () => {
        //     setOpen(false);
        // };
    }, [getLLMDataLoading]);

    const handleClickAdd = () => {
        if (selectId == -1) {
            setVisible(true);
        } else {
            Router.push({
                pathname: '/project/edit',
                query: { is_template: isTemplate, template: JSON.stringify(template) }
            });
        }
    };

    const handleClickProject = (id: any) => {
        setSelectId(id);
    };
    return (
        <>
            <SingleActionModel
                open={open}
                setOpen={setOpen}
                title={'進行中......'}
                content={'正在加載數據...'}
                icon={<PaperAirplaneIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
            />
            <div className="max-w-7xl mx-auto h-[calc(100vh-18.5rem)] px-4 py-4 sm:px-6 lg:px-8">
                <HeaderBreadCrumb
                    title={'新增工作流'}
                    back={() => {
                        Router.back()
                    }}
                    next={handleClickAdd}
                />
                <div className="my-2">
                    <label className="text-xl ml-4">選擇新增工作流方式</label>
                </div>
                <div className="my-2">
                    <div className="flex flex-row items-center my-2">
                        <input
                            type={'radio'}
                            value={-1}
                            defaultChecked
                            name="project"
                            onChange={(e) => {
                                setIsTemplate(false);
                                handleClickProject(e.target.value);
                            }}
                        />
                        <div className="flex flex-row items-center ml-2 py-2 px-2 border text-sm rounded-sm bg-white w-full">
                            <label className="flex flex-1 items-center">
                                <img src={'../intelligent.png'} className="w-6 mr-2" />
                                電腦根據目標創建工作流
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-row items-center my-2">
                        <input
                            type={'radio'}
                            value={0}
                            name="project"
                            onChange={(e) => {
                                setIsTemplate(false);
                                handleClickProject(e.target.value);
                            }}
                        />
                        <div className="flex flex-row items-center ml-2 py-2 px-2 border text-sm rounded-sm bg-white w-full">
                            <label className="flex flex-1"> 空白工作流</label>
                        </div>
                    </div>
                    <div className="flex flex-row items-center my-2 hidden">
                        <input
                            type={'radio'}
                            value={0}
                            name="project"
                            onChange={(e) => {
                                setIsTemplate(true);
                                handleClickProject(e.target.value);
                            }}
                        />
                        <div className="flex flex-row items-center ml-2 py-2 px-2 border text-sm rounded-sm bg-white w-full">
                            <label className="flex flex-1"> 新工作流範本 </label>
                        </div>
                    </div>
                    {projects?.map((project: any, index: number) => {
                        return (
                            <div key={index} className="flex flex-row items-center my-2">
                                <input
                                    value={project.id}
                                    type={'radio'}
                                    name="project"
                                    onChange={(e) => {
                                        setTemplate(project);
                                        handleClickProject(e.target.value);
                                    }}
                                />
                                <div className="flex flex-row items-center ml-2 py-2 px-2 border text-sm rounded-sm bg-white w-full">
                                    <label className="flex flex-1">{project?.name}</label>
                                    <a
                                        href={`/project/${project?.id}?from=template`}
                                        className="text-blue-500 underline"
                                    >
                                        查看
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <InputWorkflowModal
                visable={visible}
                setCurrent={setCurrent}
                current={current}
                name={'目標'}
                description={`輸入您的目標`}
                cancelClick={() => {
                    setVisible(false);
                }}
                confirmClick={() => {
                    if (!current.name) {
                        setAlert({ title: '請輸入目標', type: 'info' });
                        return;
                    }
                    setVisible(false);
                    getLL({
                        ...apiSetting.Prompt.doc_ai_llm(
                            prompt
                                .replaceAll('{{Objectives}}', current.name)
                                .replaceAll('{{Start Date}}', current.start_date),
                            'gpt-3.5-turbo-16k'
                        )
                    });
                }}
            />
        </>
    );
}
export default ProjectSelectView;
