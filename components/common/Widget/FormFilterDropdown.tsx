/* This example requires Tailwind CSS v2.0+ */
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Theme as Bootstrap4Theme } from '@rjsf/bootstrap-4';
import { FieldProps, WidgetProps, withTheme } from '@rjsf/core';
import { Fragment, useRef } from 'react';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

interface FormFilterDropdownProps {
    formSchema: any;
    formData: any;
    title: string | null;
    filterKey: string;
    filterData: any;
    setFilterData: (filterData: any) => void;
    // onChange: (data: any) => void | null;
    // onSwitch: (value: string) => void | null;
}

const Form = withTheme(Bootstrap4Theme);

// eslint-disable-next-line react-hooks/rules-of-hooks

export default function FormFilterDropdown(props: FormFilterDropdownProps) {
    const { formSchema, formData, title = '', filterKey, filterData = {}, setFilterData } = props;

    const uiSchema = useRef({
        'ui:submitButtonOptions': {
            submitText: '確定',
            props: {
                className: 'leading-none p-3 bg-blue-500 cursor-pointer text-white rounded mt-2'
            }
        }
    });

    const fields = useRef({
        TitleField: (props: FieldProps) => (
            <div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
            </div>
        )
    });

    const widgets = useRef({
        TextWidget: (props: WidgetProps) => (
            <label>
                <h3 className="font-bold">{`${props.label}${props.required ? '*' : ''}`}</h3>
                <input
                    type="text"
                    value={props.value || ''}
                    className="mt-1 border p-2 rounded-md shadow-sm border-gray-200 focus:border-gray-400 focus:ring-2 focus:ring-slate-300 w-full"
                    onChange={(e) => {
                        props.onChange(e.target.value);
                    }}
                />
            </label>
        ),
        CheckboxWidget: (props: WidgetProps) => (
            <label className="flex flex-row items-center">
                <input
                    className="rounded-md p-2 checked:text-slate-500 focus:ring-3 focus:ring-offset-0 focus:ring-slate-300 shadow"
                    type="checkbox"
                    checked={props.value || false}
                    onChange={(e) => {
                        props.onChange(e.target.checked);
                    }}
                />
                <div className="ml-1">{props.label}</div>
            </label>
        )
    });

    return (
        <Popover className="relative inline-block text-left z-10 mr-4">
            {({ close }) => (
                <>
                    <Popover.Button className="inline-flex text-sm items-center justify-center w-full rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-white text-gray-500 font-medium  focus:outline-none focus:ring-0 focus:ring-offset-2 focus:ring-offset-gray-500 focus:ring-gray-500">
                        <span className="mr-2">{title}</span>
                        <ChevronDownIcon
                            className="h-5 w-5 ml-0 text-gray-500"
                            aria-hidden="true"
                        />
                    </Popover.Button>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel className="z-100 origin-top-left absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                            <div className="py-1">
                                <Form
                                    className="w-full p-2"
                                    schema={formSchema}
                                    formData={filterData[filterKey] || formData}
                                    uiSchema={uiSchema.current}
                                    widgets={widgets.current}
                                    fields={fields.current}
                                    onSubmit={(res) => {
                                        Object.keys(res.formData).forEach((key) => {
                                            if (res.formData[key] === '') {
                                                res.formData[key] = null;
                                            }
                                        });
                                        setFilterData({ ...filterData, [filterKey]: res.formData });
                                        close();
                                    }}
                                />
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            )}
        </Popover>
    );
}
