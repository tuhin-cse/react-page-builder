import {FiArrowDown, FiArrowUp, FiMonitor, FiSmartphone, FiTablet, FiTrash} from "react-icons/fi";
import {Fragment, useState} from "react";
import {useBuilder} from "../context/builder";
import {components} from "../plugins";


const EditorPane = () => {
    const [monitor, setMonitor] = useState('pc')
    const width = {
        pc: 'w-full',
        tablet: 'w-[660px] editor-tablet',
        phone: 'w-[400px] editor-phone'
    }
    const {blocks, current, setCurrent, refresh} = useBuilder()

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
                onDrop={(e) => {
                    let index = -1
                    let editor = document.querySelector("#block-editor-pane")
                    editor.childNodes?.forEach((node, ind) => {
                        let top = node.offsetTop + (node.clientHeight / 2)
                        if (top > e.clientY && index === -1) {
                            index = ind
                        }
                    })
                    let item = {
                        name: current?.name,
                        component: current?.key,
                        props: current?.props?.reduce((acc, d) => ({
                            ...acc,
                            [d.name]: d.default
                        }), {})
                    }
                    if (index === -1) {
                        blocks.push(item)
                    } else {
                        blocks.splice(index, 0, item)
                    }
                    refresh()
                }} onDragOver={e => e.preventDefault()}
            >
                <div className="block-editor" id="block-editor-pane">
                    {blocks?.map((block, index) => {
                        return (
                            <div className="relative" key={index}>
                                <div className="absolute right-6 top-6"
                                     style={{display: JSON.stringify([index]) === JSON.stringify(current?.block_ids || []) ? 'block' : 'none'}}>
                                    <div className="flex">
                                        {index > 0 && (
                                            <div className="bg-gray-200 p-2 rounded mr-2" onClick={() => {
                                                let data = blocks.splice(index, 1)
                                                blocks.splice(index - 1, 0, ...data)
                                                setCurrent(undefined)
                                                refresh()
                                            }}>
                                                <FiArrowUp className="text-gray-900" size={12} role="button"/>
                                            </div>
                                        )}

                                        {index < blocks.length - 1 && (
                                            <div className="bg-gray-200 p-2 rounded mr-2" onClick={() => {
                                                let data = blocks.splice(index, 1)
                                                blocks.splice(index + 1, 0, ...data)
                                                setCurrent(undefined)
                                                refresh()
                                            }}>
                                                <FiArrowDown className="text-gray-900" size={12} role="button"/>
                                            </div>
                                        )}
                                        <div className="bg-gray-200 p-2 rounded" onClick={() => {
                                            blocks.splice(index, 1)
                                            setCurrent(undefined)
                                            refresh()
                                        }}>
                                            <FiTrash className="text-red-500" size={12} role="button"/>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={() => {
                                    setCurrent({
                                        ...block,
                                        block_ids: [index]
                                    })
                                }}>
                                    <Block Component={components[block?.component]} blockIds={[index]}
                                           pageProps={block.props} style={block.style}/>
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}
export default EditorPane

export const Block = ({Component = Fragment, pageProps, blockIds, style}) => {
    return (
        <div className="p-4" style={style}>
            <Component {...pageProps} blockIds={blockIds}/>
        </div>
    )
}

const Icon = ({icon: Icon, name, current, setCurrent}) => {
    return (
        <Icon size={20} className={`mx-2 ${name === current ? 'text-blue-500' : ''}`} onClick={() => setCurrent(name)}
              role="button"/>
    )
}