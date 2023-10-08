import { ArrowLongDownIcon } from '@heroicons/react/24/outline';
import useAxios from 'axios-hooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Api from '../../../../apis';
import useAlert from '../../../../hooks/useAlert';
import TaskRow from '../task/TaskRow';

interface StepsListViewProps {
    tasks: any;
    setTasks: any;
    showArrow?: boolean;
    showProjectName?: boolean;
    users?: [];
}
const apiSetting = new Api();
export default function StepsListView(props: StepsListViewProps) {
    const { tasks, setTasks, showArrow = true, showProjectName = false, users } = props;
    const router = useRouter();
    const { setAlert } = useAlert()
    const [currentTask, setCurrentTask] = useState<any>(null);
    const [currectPosition, setCurrectPosition] = useState(-1);

    const [
        { data: updateProjectWorkflowStepByIdData, loading: updateProjectWorkflowStepByIdLoading },
        updateProjectWorkflowStepById
    ] = useAxios(apiSetting.ProjectWorkflow.updateProjectWorkflowStepById(''), { manual: true });

    const [
        { data: deleteProjectWorkflowStepByIdData, loading: deleteProjectWorkflowStepByIdLoading },
        deleteProjectWorkflowStepById
    ] = useAxios(apiSetting.ProjectWorkflow.deleteProjectWorkflowStepById(''), { manual: true });

    const updateProjectStepHandler = useCallback(
        async (data) => {
            console.log(data);
            const { id, name, meta, deadline, status } = data;
            updateProjectWorkflowStepById({
                ...apiSetting.ProjectWorkflow.updateProjectWorkflowStepById(id),
                data: {
                    name: name,
                    description: meta.description,
                    deadline: deadline,
                    assignee_id: '',
                    status: status
                }
            });
        },
        [updateProjectWorkflowStepById]
    );

    const updateProjectStepStatusHandler = useCallback(
        async (data) => {
            // console.log(data);
            const { id, status } = data;
            updateProjectWorkflowStepById({
                ...apiSetting.ProjectWorkflow.updateProjectWorkflowStepById(id),
                data: {
                    status: status
                }
            });
        },
        [updateProjectWorkflowStepById]
    );

    useEffect(() => {
        if (updateProjectWorkflowStepByIdData && updateProjectWorkflowStepByIdData.success) {
            console.log('updateProjectWorkflowStepByIdData', updateProjectWorkflowStepByIdData);
        } else if (updateProjectWorkflowStepByIdData && !updateProjectWorkflowStepByIdData.success) {
            setAlert({ title: '更新失敗，請重試', type: 'error' })
            console.log('updateProjectWorkflowStepByIdData', updateProjectWorkflowStepByIdData);
        }
    }, [updateProjectWorkflowStepByIdData])

    const deleteProjectStepHandler = useCallback(
        async (data) => {
            // console.log(data);
            const { id } = data;
            deleteProjectWorkflowStepById({
                ...apiSetting.ProjectWorkflow.deleteProjectWorkflowStepById(id)
            });
        },
        [deleteProjectWorkflowStepById]
    );

    const updateTask = (task: any, position: number) => {
        setCurrentTask(task);
        setCurrectPosition(position);
    };

    const updateLocalData = () => {
        const newTasks = [...tasks];
        setTasks(newTasks);
    };

    const removeTask = (task: any, position: number) => {
        tasks.splice(position, 1);
        updateLocalData();
        // console.log(task);
        if (task.id) {
            deleteProjectStepHandler(task);
        }
    };

    return (
        <>
            <div className="flex flex-row w-full">
                <div
                    // className={` h-fit border rounded-md ${visibleEditStep && currentTask ? 'w-2/3' : 'w-full'
                    //     }`}
                    className={` h-fit   rounded-md w-full`}
                >
                    {tasks?.map((task: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col justify-center items-center"
                            // onClick={() => {
                            //     setCurrentTask(task);
                            //     setCurrectPosition(index);
                            //     setVisibleEditStep(true);
                            // }}
                            >
                                <TaskRow
                                    task={task}
                                    users={users}
                                    completeTask={() => {
                                        task.status = "completed"
                                        tasks.splice(index, 1, task);
                                        updateLocalData();
                                        updateProjectStepStatusHandler(task);
                                    }}
                                    visiableMore={false}
                                    showProjectName={showProjectName}
                                    updateTask={() => updateTask(task, index)}
                                    removeTask={() => removeTask(task, index)}
                                />

                                {index != tasks.length - 1 && showArrow &&
                                    (task?.is_process_workflow ? (
                                        <ArrowLongDownIcon className="  h-6 text-gray-500  " />
                                    ) : (
                                        <div className="h-6 w-0.5"></div>
                                    ))}
                                {/* <StepRow
                                    task={task}
                                    currentTask={currentTask}
                                    completeTask={() => { }}
                                    updateTask={(task: any) => {
                                        tasks.splice(index, 1, task);
                                        updateLocalData();
                                        updateProjectStepHandler(task);
                                    }}
                                    removeTask={() => removeTask(task, index)}
                                /> */}
                            </div>
                        );
                    })}
                </div>
                {/* {visibleEditStep && currentTask && (
                    <EditStepView
                        step={currentTask}
                        setStep={setCurrentTask}
                        setVisibleEditStep={setVisibleEditStep}
                        updateTask={(data: never) => {
                            tasks.splice(currectPosition, 1, data);
                            updateLocalData();
                            updateProjectStepHandler(data);
                        }}
                        removeTask={() => removeTask(currentTask, currectPosition)}
                    />
                )} */}
            </div>
        </>
    );
}
