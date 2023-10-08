import { useEffect, useRef, useState } from 'react';
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet';
import 'react-spring-bottom-sheet/dist/style.css';
import IframeView from './IframeView';

interface ViewProps {
    chain_feature_id: string;
    open: boolean;
    setOpen: any;
    title?: string;
    selectDocument: any;
    setContent?: any;
}

export default function ChainFeatureDetail(props: ViewProps) {
    const { chain_feature_id, open, setOpen, title, selectDocument, setContent } = props;
    const sheetRef = useRef<BottomSheetRef>(null);
    const [maxHeight, setMaxHeight] = useState(500);

    useEffect(() => {
        setMaxHeight(document.body.offsetHeight * 0.8);
    }, []);

    const renderHeader = () => {
        return (
            <div className="w-full  relative items-center">

                <label className=" absolute right-0" onClick={back}>
                    {'關閉'}
                </label>
                <label>{title || 'Chain Feature'}</label>
            </div>
        );
    };
    const back = () => {
        setOpen(false);
    };

    //回调函数
    function receiveMessageFromIndex(event: any) {
        if (event != undefined && event.data?.from == 'chain_feature') {
            const message = event.data;
            switch (message.type) {
                case 'output':
                    setContent(message.content)
                    break;
                case 'finish':
                    setOpen(false);
                    break;
            }
        }
    }
    //监听来自chain feature run完事件
    useEffect(() => {
        window.addEventListener('message', receiveMessageFromIndex, false);
        return () => {
            window.removeEventListener('message', receiveMessageFromIndex, false);
        };
    }, []);

    return (
        <>
            <BottomSheet
                open={open}
                ref={sheetRef}
                onDismiss={() => {
                    setOpen(false);
                }}
                maxHeight={maxHeight}
                header={renderHeader()}
            >
                <IframeView content={selectDocument} type="document" aiadmin_link={`${process.env.NEXT_PUBLIC_AIADMIN_SERVER}/chainfeature/${chain_feature_id}?showChatbot=true`} />
            </BottomSheet>
        </>
    );
}
