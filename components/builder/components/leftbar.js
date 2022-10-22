import {useEffect, useState} from "react";
import {FiLayers, FiPlusCircle, FiTrash} from "react-icons/fi";
import plugins from "../plugins";
import {useBuilder} from "../context/builder";

const LeftBar = () => {
    const [section, setSection] = useState("add")

    const categories = plugins.reduce((acc, d) => {
        let plugins = acc[d?.category] || []
        return {
            ...acc,
            [d?.category]: [...plugins, d]
        }
    }, {})

    const {blocks, current} = useBuilder()
    useEffect(() => {
        setSection(!!current?.block_ids ? 'layers' : 'add')
    }, [current])


    return (
        <>
            <div className="h-[50px] bg-gray-100 border-b border-gray-300 flex">
                <Option icon={FiPlusCircle} name="add" current={section} setCurrent={setSection}/>
                <Option icon={FiLayers} name="layers" current={section} setCurrent={setSection}/>
            </div>
            <div className="bg-white w-full h-[calc(100vh-115px)] overflow-auto">
                <div className={`${section === 'add' ? '' : 'hidden'}`}>
                    {Object.keys(categories)?.map((key, index) => (
                        <Category category={key} options={categories[key]} index={index} key={index}/>
                    ))}
                </div>
                <div className={`${section === 'layers' ? '' : 'hidden'}`}>
                    {blocks?.map((block, index) => (
                        <Layer block={block} key={index} ids={[index]}/>
                    ))}
                </div>
            </div>
        </>
    )
}
export default LeftBar


const Layer = ({block, level = 0, ids}) => {

    const {current, setCurrent, refresh, blocks} = useBuilder()
    let active = JSON.stringify(ids) === JSON.stringify(current?.block_ids || [])

    return (
        <div>
            <div onClick={() => {
                setCurrent({
                    ...block,
                    block_ids: ids
                })
            }} role="button"
                 className={`px-4 py-2 border-b flex justify-between items-center ${active ? 'bg-indigo-400 text-white' : ''}`}
                 style={{paddingLeft: 20 + (20 * level)}}>
                <p>{block?.name || "Drop a block"}</p>
                <div style={{display: active ? 'flex' : 'none'}}>
                    <FiTrash className="text-white" size={16} onClick={(e) => {
                        e.stopPropagation()
                        if (ids?.length > 1) {
                            let items = blocks
                            let i
                            for (i = 0; i < ids?.length - 1; i++) {
                                items = items[ids[i]].props.childList
                            }
                            items[ids[i]] = undefined
                        }
                        if (ids.length === 1) {
                            blocks.splice(ids[0], 1)
                        }
                        setCurrent(undefined)
                        refresh()
                    }} role="button"/>
                </div>
            </div>
            {block?.props?.childList && (
                <>
                    {block?.props?.childList?.map((block, index) => (
                        <Layer block={block} level={level + 1} ids={[...ids, index]} key={index}/>
                    ))}
                </>
            )}
        </div>
    )
}

const Category = ({category, options, index}) => {
    const [show, setShow] = useState(index === 0)
    const {setCurrent, setAction} = useBuilder()

    return (
        <div className="p-4">
            <span className="text-lg">{category}</span>
            <div className="flex flex-wrap -mx-2">
                {options?.map((option, index) => (
                    <div className="w-1/3 p-2" key={index}>
                        <div className="bg-gray-100 rounded shadow-sm h-16 flex flex-col justify-center items-center"
                             role="button" onDragStart={() => {
                            setAction('add')
                            setCurrent(option)
                        }} draggable>
                            {option.icon}
                            <span className="text-gray-600 text-xs mt-1">{option.name}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div></div>
        </div>
    )
}


export const Option = ({icon: Icon, name, current, setCurrent}) => {
    return (
        <div
            className={`w-1/2 h-[50px] flex justify-center pt-4 ${current === name ? 'text-blue-500 border-b-2 border-blue-500' : ''}`}
            role="button" onClick={() => setCurrent(name)}>
            <Icon size={20}/>
        </div>
    )
}