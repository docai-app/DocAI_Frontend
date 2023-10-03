import useAxios from "axios-hooks";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import Api from "../../../../apis";
import EditStepView from "./EditStepView";
import StepRow from "./StepRow";

interface StepsListViewProps {
    tasks: any;
    setTasks: any;
}
const apiSetting = new Api();
export default function StepsListView(props: StepsListViewProps) {
    const {
        tasks,
        setTasks
    } = props
    const router = useRouter()
    const [currentTask, setCurrentTask] = useState<any>(null);
    const [currectPosition, setCurrectPosition] = useState(-1);
    const [visibleEditStep, setVisibleEditStep] = useState(false)

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
            // console.log(data);
            const { id, name, meta, deadline } = data;
            updateProjectWorkflowStepById({
                ...apiSetting.ProjectWorkflow.updateProjectWorkflowStepById(id),
                data: {
                    name: name,
                    description: meta.description,
                    deadline: deadline,
                    assignee_id: 18
                }
            });
        },
        [updateProjectWorkflowStepById]
    );

    const deleteProjectStepHandler = useCallback(
        async (data) => {
            // console.log(data);
            const { id } = data;
            deleteProjectWorkflowStepById({
                ...apiSetting.ProjectWorkflow.deleteProjectWorkflowStepById(id),
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
        console.log(task);
        if (task.id) {
            deleteProjectStepHandler(task)
        }
    };

    return (
        <>
            <div className='flex flex-row w-full'>
                <div className={` h-fit border rounded-md ${visibleEditStep && currentTask ? 'w-2/3' : 'w-full'}`}>
                    {tasks?.map((task: any, index: number) => {
                        return (
                            <div
                                key={index}
                                className="flex flex-col justify-center items-center"
                                onClick={() => {
                                    setCurrentTask(task)
                                    setCurrectPosition(index)
                                    setVisibleEditStep(true)
                                }}
                            >
                                <StepRow
                                    task={task}
                                    currentTask={currentTask}
                                    completeTask={() => { }}
                                    updateTask={() => updateTask(task, index)}
                                    removeTask={() => removeTask(task, index)}
                                />
                            </div>
                        );
                    })}
                </div>
                {visibleEditStep && currentTask &&
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
                }
            </div>
        </>
    )
}