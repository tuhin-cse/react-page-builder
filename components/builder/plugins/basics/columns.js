import {FiColumns, FiTrash} from "react-icons/fi";
import {useBuilder} from "../../context/builder";
import {Block} from "../../components/editor_pane";
import DropZone from "../../components/dropzone";
import {components} from "../index";

const width = {
    "1/1": ["w-full"],
    "1/2": ["w-full md:w-1/2", "w-full md:w-1/2"],
    "1/3": ["w-full md:w-1/3", "w-full md:w-1/3", "w-full md:w-1/3"],
    "1/4": ["w-full md:w-1/4", "w-full md:w-1/4", "w-full md:w-1/4", "w-full md:w-1/4"],
    "2/1/3": ["w-full md:w-2/3", "w-full md:w-1/3"],
    "1/2/3": ["w-full md:w-1/3", "w-full md:w-2/3"],
}

const names = {
    "1/1": ["1/1"],
    "1/2": ["1/2", "1/2"],
    "1/3": ["1/3", "1/3", "1/3"],
    "1/4": ["1/4", "1/4", "1/4", "1/4"],
    "2/1/3": ["2/3", "1/3"],
    "1/2/3": ["1/3", "2/3"],
}

const Columns = (props) => {
    const builder = useBuilder()

    return (
        <div className={`flex flex-wrap`}>
            {width[props?.columns]?.map((width, index) => (
                <div className={`${width}`} key={index}>
                    <div className="">
                        {props?.childList && props?.childList[index] ? (
                            <div className="editor-block relative" onClick={e => {
                                e.stopPropagation()
                                if (builder?.setCurrent) {
                                    builder.setCurrent({
                                        ...props?.childList[index],
                                        block_ids: [...props.blockIds, index]
                                    })
                                }
                            }}>
                                {!!builder && JSON.stringify(builder.current?.block_ids || []) === JSON.stringify([...props.blockIds, index]) && (
                                    <div className="absolute right-4 top-4">
                                        <div className="bg-gray-200 p-2 rounded" onClick={(e) => {
                                            e.stopPropagation()
                                            let blocks = builder.blocks
                                            for (let i = 0; i < props?.blockIds?.length; i++) {
                                                blocks = blocks[props?.blockIds[i]].props.childList
                                            }
                                            blocks[index] = undefined
                                            builder.setCurrent(undefined)
                                        }}>
                                            <FiTrash className="text-red-500" size={12} role="button"/>
                                        </div>
                                    </div>
                                )}
                                <Block Component={components[props?.childList[index]?.component]}
                                       blockIds={[...props.blockIds, index]}
                                       pageProps={props?.childList[index]?.props} style={props?.childList[index]?.style}/>
                            </div>
                        ) : (
                            <div className="px-2">
                                <DropZone index={index} props={props} blockIds={props.blockIds}/>
                            </div>

                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}


const columnsPlugin = {
    name: 'Columns',
    key: "columns",
    icon: <FiColumns size={22}/>,
    category: "Basics",
    component: Columns,
    props: [{
        type: "select",
        name: 'columns',
        label: "Columns",
        default: "1/2",
        customInput: ({value, onChange}) => {
            return (
                <div className="flex flex-wrap -mx-2">
                    {Object.keys(width)?.map((key, index) => (
                        <div key={index} className="p-2 w-1/2">
                            <div className="flex -mx-0.5">
                                {width[key]?.map((width, index) => (
                                    <div className={`${width}`} key={index}>
                                        <div className="px-0.5" onClick={() => onChange(key)}>
                                            <div role="button"
                                                 className={`${value === key ? "bg-indigo-400 text-white" : "bg-gray-200"}  h-10 flex justify-center items-center rounded-sm`}>
                                                {names[key][index]}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
    }]
}

export default columnsPlugin