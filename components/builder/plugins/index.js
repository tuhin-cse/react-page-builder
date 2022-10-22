import textPlugin from "./basics/text";
import imagePlugin from "./basics/image";
import columnsPlugin from "./basics/columns";

const plugins = [
    textPlugin,
    imagePlugin,
    columnsPlugin,
]

export default plugins
export const components = plugins?.reduce((acc, d) => ({...acc, [d.key]: d.component}), {}) || {}