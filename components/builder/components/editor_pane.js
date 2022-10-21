import {FiArrowDown, FiArrowUp, FiMonitor, FiPlus, FiSmartphone, FiTablet, FiTrash} from "react-icons/fi";
import {Fragment, useState} from "react";
import {useBuilder} from "../context/builder";
import plugins from "../plugins";

const EditorPane = () => {
    const [monitor, setMonitor] = useState('pc')
    const width = {
        pc: 'w-full',
        tablet: 'w-[660px]',
        phone: 'w-[400px]'
    }

    const components = plugins?.reduce((acc, d) => ({...acc, [d.key]: d.component}), {})
    const {blocks, current, setCurrent, action, setAction, refresh} = useBuilder()

    return (
        <>
            <div className="h-[50px] bg-gray-100 border-b border-gray-300 flex justify-between items-center">
                <div/>
                <div className="flex items-center">
                    <Icon icon={FiMonitor} name="pc" current={monitor} setCurrent={setMonitor}/>
                    <Icon icon={FiTablet} name="tablet" current={monitor} setCurrent={setMonitor}/>
                    <Icon icon={FiSmartphone} name="phone" current={monitor} setCurrent={setMonitor}/>
                </div>
                <div/>
            </div>
            <div
                className={`bg-white ${width[monitor] || ""} mx-auto h-[calc(100vh-115px)] transition-all overflow-auto`}
                onDrop={() => {
                    if (action === 'add') {
                        blocks.push({
                            name: current?.name,
                            component: current?.key,
                            props: current?.props?.reduce((acc, d) => ({
                                ...acc,
                                [d.name]: d.default
                            }), {})
                        })
                        refresh()
                    }
                }} onDragOver={e => e.preventDefault()}
            >
                <div className="block-editor">
                    {blocks?.map((block, index) => {
                        return (
                            <div className="editor-block" key={index} onClick={() => {
                                setCurrent({
                                    ...block,
                                    block_id: index
                                })
                            }}>
                                <div className="absolute hover-item right-6 top-6">
                                    <div className="flex">
                                        <div className="bg-gray-200 p-2 rounded mr-2" onClick={() => {
                                            blocks.splice(index, 0, {})
                                            refresh()
                                        }}>
                                            <FiPlus className="text-gray-900" size={12} role="button"/>
                                        </div>
                                        {index > 0 && (
                                            <div className="bg-gray-200 p-2 rounded mr-2" onClick={() => {
                                                let data = blocks.splice(index, 1)
                                                blocks.splice(index - 1, 0, ...data)
                                                refresh()
                                            }}>
                                                <FiArrowUp className="text-gray-900" size={12} role="button"/>
                                            </div>
                                        )}

                                        {index < blocks.length - 1 && (
                                            <div className="bg-gray-200 p-2 rounded mr-2" onClick={() => {
                                                let data = blocks.splice(index, 1)
                                                blocks.splice(index + 1, 0, ...data)
                                                refresh()
                                            }}>
                                                <FiArrowDown className="text-gray-900" size={12} role="button"/>
                                            </div>
                                        )}
                                        <div className="bg-gray-200 p-2 rounded" onClick={() => {
                                            blocks.splice(index, 1)
                                            refresh()
                                        }}>
                                            <FiTrash className="text-red-500" size={12} role="button"/>
                                        </div>
                                    </div>
                                </div>
                                <Block Component={components[block?.component]} pageProps={block.props}/>
                            </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}
export default EditorPane

export const Block = ({Component = Fragment, pageProps}) => {
    return (
        <div className="p-4">
            <Component {...pageProps}/>
        </div>
    )
}

const Icon = ({icon: Icon, name, current, setCurrent}) => {
    return (
        <Icon size={20} className={`mx-2 ${name === current ? 'text-blue-500' : ''}`} onClick={() => setCurrent(name)}
              role="button"/>
    )
}