function headless_stringify(obj) {
    let text = "{";
    let keys = Object.keys(obj);
    keys.forEach((key, int) => {
        let value = obj[key];
        if (Array.isArray(value)) {
            value = headless_array(value);
        } else {
            if ("object" == typeof value) {
                if (value.low !== void 0 && value.high !== void 0 && value.unsigned === false) {
                    value = String(value);
                } else {
                    value = headless_stringify(value);
                }
            } else {
                if ("string" == typeof value) {
                    value = `"${value.replace(/\n/g, "\\n").replace(/"/g, "\\\"")}"`;
                }
            }
        }
        text += `"${key}":${value}${keys[int + 1] ? "," : ""}`;
    }
    );
    text += "}";
    return text;
}

function headless_array(array) {
    let text = "[";
    array.forEach((value, int) => {
        if (Array.isArray(value)) {
            value = headless_array(value);
        } else {
            if ("object" == typeof value) {
                if (value.low !== void 0 && value.high !== void 0) {
                    value = String(value);
                } else {
                    value = headless_stringify(value);
                }
            } else {
                if ("string" == typeof value) {
                    value = `"${value.replace(/\n/g, "\\n").replace(/"/g, "\\\"")}"`;
                }
            }
        }
        text += `${value}${array[int + 1] ? "," : ""}`;
    }
    );
    text += "]";
    return text;
}
