import {Fragment, useState} from "react";
import {FiArrowDown, FiArrowUp, FiEdit, FiPlus, FiTrash} from "react-icons/fi";
import {Form, Modal} from "antd";
import {parseUrl} from "next/dist/shared/lib/router/utils/parse-url";

const PageBuilder = () => {

    const [blocks, setBlocks] = useState([])
    const [reload, setReload] = useState(false)
    const refresh = () => setReload(!reload)

    const [current, setCurrent] = useState()
    const [edit, setEdit] = useState()

    const plugins = [
        {
            name: 'Text',
            key: "text",
            component: (props) => {
                return (
                    <div className="p-4">
                        <h1 className="text-4xl">{props.title}</h1>
                        <p>This is a test component</p>
                    </div>
                )
            },
            props: [{
                type: "input",
                name: 'title',
                label: "Title",
                default: "This is Title"
            }]
        }
    ]

    const components = plugins?.reduce((acc, d) => ({...acc, [d.key]: d.component}), {})
    let editProps = plugins.find(d => d.key === edit?.component)?.props

    return (
        <>
            <div className="flex bg-gray-200 w-full min-h-screen justify-between">
                <div className="w-20 bg-white p-3">
                    {plugins?.map((d, index) => (
                        <div key={index} className="p-2 bg-gray-200" role="button" onDragStart={() => setCurrent(d)}
                             draggable>
                            {d?.name}
                        </div>
                    ))}
                </div>
                <div className="p-4">
                    <div className="w-[1200px] bg-white min-h-screen mx-auto block-editor">
                        {blocks?.map((block, index) => {
                            return (
                                <div className="editor-block" key={index}>
                                    <div className="absolute hover-item right-6 top-6">
                                        <div className="flex">
                                            <div className="bg-gray-200 p-2 rounded mr-2" onClick={() => {
                                                blocks.splice(index, 0, {})
                                                refresh()
                                            }}>
                                                <FiPlus className="text-gray-900" size={12} role="button"/>
                                            </div>
                                            <div className="bg-gray-200 p-2 rounded mr-2" onClick={() => {
                                                setEdit({
                                                    ...block,
                                                    block_id: index
                                                })
                                            }}>
                                                <FiEdit className="text-gray-900" size={12} role="button"/>
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
                                    {block?.component ? (
                                        <Block Component={components[block?.component]} pageProps={block.props}/>
                                    ) : (
                                        <div className="p-4">
                                            <div
                                                className="border border-dashed h-48 flex items-center justify-center rounded"
                                                onDrop={() => {
                                                    blocks[index] = {
                                                        name: current?.name,
                                                        component: current?.key,
                                                        props: current?.props?.reduce((acc, d) => ({
                                                            ...acc,
                                                            [d.name]: d.default
                                                        }), {})
                                                    }
                                                    refresh()
                                                }} onDragOver={e => e.preventDefault()}>
                                                <p className="text-center text-gray-700">Drag And Drop Your Block
                                                    Here</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}


                        <AddBlock onClick={() => setBlocks([...blocks, {}])}/>
                    </div>
                </div>
                <div>

                </div>
            </div>
            <Modal visible={!!edit} onCancel={() => {
                setEdit(undefined)
            }} title={edit?.name || "Title"} mask={false} footer={null}>
                {editProps?.map((d, index) => (
                    <>
                        <Inputs key={index} value={blocks[edit?.block_id].props[d?.name]} onChange={value => {
                            blocks[edit?.block_id].props[d?.name] = value
                            refresh()
                        }}/>
                    </>
                ))}
            </Modal>
        </>
    )
}

export default PageBuilder


export const Block = ({Component = Fragment, pageProps}) => {
    return <Component {...pageProps}/>
}

const Inputs = ({type, value, onChange}) => {
    return (
        <input value={value} onChange={e => onChange(e.target.value)}/>
    )
}

const AddBlock = ({onClick}) => {
    return (
        <>
            <div className="pb-6">
                <div className="border-b border-dashed w-full h-8 flex justify-center relative">
                    <div className="bg-gray-400 p-2 absolute -bottom-4 rounded-full" role="button" onClick={onClick}>
                        <FiPlus className="text-white"/>
                    </div>
                </div>
            </div>

        </>
    )
}