function objectMap(obj, layer) {
    const addLayer = 4;
    if (!layer) {
        layer = 0;
    }
    if ("object" !== typeof obj) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(x => (layer ? " ".repeat(layer) : "") + objectMap(x, layer + addLayer)).join("\n");
    }
    let res = "";
    Object.keys(obj).map(key => {
        if ("object" == typeof obj[key]) {
            res += (layer ? " ".repeat(layer) : "") + key + " :\n" + objectMap(obj[key], layer + addLayer) + "\n";
        } else {
            res += (layer ? " ".repeat(layer) : "") + key + " : " + obj[key] + "\n";
        }
    }
    );
    return res.slice(0, -1);
}
