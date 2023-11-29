import { getImageFills } from "../utils";
import { processImages } from "./images";
import { getMatchingFont } from "./getFont";
import { assign } from "./helpers";
import { LayerNode, PlainLayerNode, WithRef } from "../types";

const processDefaultElement = (
    layer: LayerNode,
    node: SceneNode
): SceneNode => {
    node.x = layer.x as number;
    node.y = layer.y as number;
    node.resize(layer.width || 1, layer.height || 1);
    assign(node, layer);
    // rects.push(frame);
    return node;
};

const createNodeFromLayer = (layer: LayerNode) => {
    if (layer.type === 'FRAME' || layer.type === 'GROUP') {
        return figma.createFrame();
    }

    if (layer.type === 'SVG' && layer.svg) {
        if(layer.svg.startsWith('<svg')){
            return figma.createNodeFromSvg(layer.svg);
        }else{
            let tempSvgData = decodeBase64(layer.svg);
            if(tempSvgData.startsWith('<svg')){
                return figma.createNodeFromSvg(tempSvgData);
            }else{
                console.warn('weird svg');
                console.warn(layer.svg);
            }
            return figma.createNodeFromSvg(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="100%" height="100%" fill="#DDDDDD"/><path fill="#999999" d="m155.52 171.08-17.16 21-2 2.48q1.68-.84 3.62-1.3 1.94-.46 4.18-.46 3.28 0 6.38 1.08t5.46 3.26q2.36 2.18 3.8 5.42 1.44 3.24 1.44 7.56 0 4.04-1.48 7.58t-4.16 6.18q-2.68 2.64-6.46 4.16t-8.34 1.52q-4.64 0-8.32-1.48-3.68-1.48-6.28-4.14-2.6-2.66-3.98-6.4t-1.38-8.3q0-4.08 1.66-8.38 1.66-4.3 5.14-8.94l13.8-18.52q.72-.96 2.1-1.64 1.38-.68 3.18-.68h8.8Zm-14.92 50.4q2.36 0 4.34-.8t3.4-2.24q1.42-1.44 2.22-3.38.8-1.94.8-4.22 0-2.48-.76-4.46t-2.16-3.36q-1.4-1.38-3.36-2.1-1.96-.72-4.32-.72-2.36 0-4.28.8-1.92.8-3.28 2.22-1.36 1.42-2.12 3.36t-.76 4.18q0 2.4.66 4.38t1.96 3.38q1.3 1.4 3.22 2.18 1.92.78 4.44.78ZM208.28 200q0 7.56-1.62 13.14-1.62 5.58-4.48 9.22-2.86 3.64-6.76 5.42-3.9 1.78-8.42 1.78t-8.38-1.78q-3.86-1.78-6.7-5.42-2.84-3.64-4.44-9.22-1.6-5.58-1.6-13.14 0-7.6 1.6-13.16 1.6-5.56 4.44-9.2 2.84-3.64 6.7-5.42 3.86-1.78 8.38-1.78 4.52 0 8.42 1.78 3.9 1.78 6.76 5.42 2.86 3.64 4.48 9.2 1.62 5.56 1.62 13.16Zm-10.2 0q0-6.28-.92-10.4t-2.46-6.56q-1.54-2.44-3.54-3.42t-4.16-.98q-2.12 0-4.1.98-1.98.98-3.5 3.42t-2.42 6.56q-.9 4.12-.9 10.4t.9 10.4q.9 4.12 2.42 6.56 1.52 2.44 3.5 3.42t4.1.98q2.16 0 4.16-.98t3.54-3.42q1.54-2.44 2.46-6.56.92-4.12.92-10.4Zm56.6 0q0 7.56-1.62 13.14-1.62 5.58-4.48 9.22-2.86 3.64-6.76 5.42-3.9 1.78-8.42 1.78t-8.38-1.78q-3.86-1.78-6.7-5.42-2.84-3.64-4.44-9.22-1.6-5.58-1.6-13.14 0-7.6 1.6-13.16 1.6-5.56 4.44-9.2 2.84-3.64 6.7-5.42 3.86-1.78 8.38-1.78 4.52 0 8.42 1.78 3.9 1.78 6.76 5.42 2.86 3.64 4.48 9.2 1.62 5.56 1.62 13.16Zm-10.2 0q0-6.28-.92-10.4t-2.46-6.56q-1.54-2.44-3.54-3.42t-4.16-.98q-2.12 0-4.1.98-1.98.98-3.5 3.42t-2.42 6.56q-.9 4.12-.9 10.4t.9 10.4q.9 4.12 2.42 6.56 1.52 2.44 3.5 3.42t4.1.98q2.16 0 4.16-.98t3.54-3.42q1.54-2.44 2.46-6.56.92-4.12.92-10.4Zm73.72 15.68-5.24 5.16-13.56-13.56-13.68 13.64-5.24-5.16 13.68-13.72L281.12 189l5.2-5.2 13.04 13.04 12.96-12.96 5.28 5.2-13 13 13.6 13.6Zm34.64-8.56h17.6V188.2q0-2.68.36-5.92l-17.96 24.84Zm26.2 0h7.28v5.72q0 .8-.52 1.38-.52.58-1.48.58h-5.28v14.12h-8.6V214.8h-24.4q-1 0-1.76-.62t-.96-1.54l-1.04-5 27.4-36.6h9.36v36.08Zm53.72-7.12q0 7.56-1.62 13.14-1.62 5.58-4.48 9.22-2.86 3.64-6.76 5.42-3.9 1.78-8.42 1.78t-8.38-1.78q-3.86-1.78-6.7-5.42-2.84-3.64-4.44-9.22-1.6-5.58-1.6-13.14 0-7.6 1.6-13.16 1.6-5.56 4.44-9.2 2.84-3.64 6.7-5.42 3.86-1.78 8.38-1.78 4.52 0 8.42 1.78 3.9 1.78 6.76 5.42 2.86 3.64 4.48 9.2 1.62 5.56 1.62 13.16Zm-10.2 0q0-6.28-.92-10.4t-2.46-6.56q-1.54-2.44-3.54-3.42t-4.16-.98q-2.12 0-4.1.98-1.98.98-3.5 3.42t-2.42 6.56q-.9 4.12-.9 10.4t.9 10.4q.9 4.12 2.42 6.56 1.52 2.44 3.5 3.42t4.1.98q2.16 0 4.16-.98t3.54-3.42q1.54-2.44 2.46-6.56.92-4.12.92-10.4Zm56.6 0q0 7.56-1.62 13.14-1.62 5.58-4.48 9.22-2.86 3.64-6.76 5.42-3.9 1.78-8.42 1.78t-8.38-1.78q-3.86-1.78-6.7-5.42-2.84-3.64-4.44-9.22-1.6-5.58-1.6-13.14 0-7.6 1.6-13.16 1.6-5.56 4.44-9.2 2.84-3.64 6.7-5.42 3.86-1.78 8.38-1.78 4.52 0 8.42 1.78 3.9 1.78 6.76 5.42 2.86 3.64 4.48 9.2 1.62 5.56 1.62 13.16Zm-10.2 0q0-6.28-.92-10.4t-2.46-6.56q-1.54-2.44-3.54-3.42t-4.16-.98q-2.12 0-4.1.98-1.98.98-3.5 3.42t-2.42 6.56q-.9 4.12-.9 10.4t.9 10.4q.9 4.12 2.42 6.56 1.52 2.44 3.5 3.42t4.1.98q2.16 0 4.16-.98t3.54-3.42q1.54-2.44 2.46-6.56.92-4.12.92-10.4Z"/></svg>`);
        }
    }

    if (layer.type === 'RECTANGLE') {
        return figma.createRectangle();
    }

    if (layer.type === 'TEXT') {
        return figma.createText();
    }

    if (layer.type === 'COMPONENT') {
        return figma.createComponent();
    }
};

const SIMPLE_TYPES = ['FRAME', 'GROUP', 'SVG', 'RECTANGLE', 'COMPONENT'];

export const processLayer = async (
    layer: PlainLayerNode,
    parent: WithRef<LayerNode> | null,
    baseFrame: PageNode | FrameNode
) => {
    const parentFrame = (parent?.ref as FrameNode) || baseFrame;

    if (typeof layer.x !== 'number' || typeof layer.y !== 'number') {
        throw Error('Layer coords not defined');
    }

    const node = createNodeFromLayer(layer);

    if (!node) {
        throw Error(`${layer.type} not implemented`);
    }

    if (layer.type === 'RECTANGLE' || layer.type === 'FRAME') {
        if (getImageFills(layer as RectangleNode)) {
            console.warn('processImages');
            await processImages(layer as RectangleNode);
        }
    }

    if (SIMPLE_TYPES.includes(layer.type as string)) {
        parentFrame.appendChild(processDefaultElement(layer, node));
    }
    // @ts-expect-error
    layer.ref = node;

    

    if (layer.type === 'TEXT') {
        const text = node as TextNode;

        if (layer.fontFamily) {
            text.fontName = await getMatchingFont(layer.fontFamily);

            delete layer.fontFamily;
        }

        assign(text, layer);
        text.resize(layer.width || 1, layer.height || 1);

        text.textAutoResize = 'HEIGHT';
        
        let adjustments = 0;
        if (layer.lineHeight) {
            text.lineHeight = layer.lineHeight;
        }
        // Adjust text width
        while (
            typeof layer.height === 'number' &&
            text.height > layer.height
        ) {

            if (adjustments++ > 5) {
                console.warn('Too many font adjustments', text, layer);

                break;
            }

            try {
                text.resize(text.width + 1, text.height);
            } catch (err) {
                console.warn('Error on resize text:', layer, text, err);
            }
        }

        parentFrame.appendChild(text);
    }

    return node;
};

function decodeBase64(input: string) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
    let str = '';
    let i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');

    while (i < input.length) {
        const enc1 = chars.indexOf(input.charAt(i++));
        const enc2 = chars.indexOf(input.charAt(i++));
        const enc3 = chars.indexOf(input.charAt(i++));
        const enc4 = chars.indexOf(input.charAt(i++));

        const chr1 = (enc1 << 2) | (enc2 >> 4);
        const chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        const chr3 = ((enc3 & 3) << 6) | enc4;

        str = str + String.fromCharCode(chr1);

        if (enc3 != 64) {
            str = str + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
            str = str + String.fromCharCode(chr3);
        }
    }

    return str;
}
