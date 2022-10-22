import {IoTextOutline} from "react-icons/io5";

const Text = (props) => {
    return (
        <div dangerouslySetInnerHTML={{__html: props.content}}/>
    )
}


const textPlugin = {
    name: 'Text',
    key: "text",
    icon: <IoTextOutline size={22}/>,
    category: "Basics",
    component: Text,
    props: [{
        type: "rich-text",
        name: 'content',
        label: "Content",
        default: "<h1>Heading</h1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>"
    }]
}

export default textPlugin