const fs = require('fs')
class Data {
    constructor() {}


    set(data, value) {
        if (!fs.existsSync(`database.json`)) {
            fs.writeFileSync(`database.json`, "{}");

            if (!data) throw new TypeError("The data is not defined!")
            const file = JSON.parse(fs.readFileSync(`database.json`, "utf8"))
            file[data] = value
            return fs.writeFileSync(`database.json`, JSON.stringify(file, null, 1))
        } else {
            if (!data) throw new TypeError("The data is not defined!")
            const file = JSON.parse(fs.readFileSync(`database.json`, "utf8"))
            file[data] = value
            return fs.writeFileSync(`database.json`, JSON.stringify(file, null, 1))
        }
    }

    fetch(data) {
        if (!fs.existsSync(`database.json`)) {
            fs.writeFileSync(`database.json`, "{}");

            if (!data) throw new TypeError("The data is not defined!")
            const file = JSON.parse(fs.readFileSync("database.json", "utf8"))
            return file[data]
        } else {
            if (!data) throw new TypeError("The data is not defined!")
            const file = JSON.parse(fs.readFileSync("database.json", "utf8"))
            return file[data]
        }
    }
    has(data) {
        if (!fs.existsSync(`database.json`)) {
            fs.writeFileSync(`database.json`, "{}");
            if (!data) throw new TypeError("The data is not defined!")
            const file = JSON.parse(fs.readFileSync("database.json", "utf8"))
            return file[data] ? true : false
        } else {
            if (!data) throw new TypeError("The data is not defined!")
            const file = JSON.parse(fs.readFileSync("database.json", "utf8"))
            return file[data] ? true : false
        }
    }
    fetchAll() {
        const fetchall = JSON.parse(fs.readFileSync("database.json", "utf8"))
        return fetchall
    }
    delete(data) {
        if (!fs.existsSync(`database.json`)) {
            fs.writeFileSync(`database.json`, "{}");
            if (!data) throw new TypeError("The data is not defined!")
            const file = JSON.parse(fs.readFileSync("database.json", "utf8"))
            if (!file[data]) throw new TypeError('Theres no data to add to database! \n' + __dirname)
            delete file[data]
            return fs.writeFileSync("database.json", JSON.stringify(file, null, 1))
        } else {
            if (!data) throw new TypeError("The data is not defined!")
            const file = JSON.parse(fs.readFileSync("database.json", "utf8"))
            if (!file[data]) throw new TypeError('Theres no data to add to database! \n' + __dirname)
            delete file[data]
            return fs.writeFileSync("database.json", JSON.stringify(file, null, 1))
        }
    }
    backup(fileName) {
        if (!fs.existsSync(`database.json`)) {
            fs.writeFileSync(`database.json`, "{}");
            if (!fileName) throw new TypeError("Filename not defined!")
            const file = JSON.parse(fs.readFileSync("database.json", "utf8"))
            return fs.writeFileSync(`${fileName}.json`, JSON.stringify(file, null, 1))
        } else {
            if (!fileName) throw new TypeError("Filename not defined!")
            const file = JSON.parse(fs.readFileSync("database.json", "utf8"))
            return fs.writeFileSync(`${fileName}.json`, JSON.stringify(file, null, 1))
        }
    }
    add(data, value) {
        if (!fs.existsSync(`database.json`)) {
            fs.writeFileSync(`database.json`, "{}");
            if (!data) throw new TypeError("The data is not defined!")
            if (isNaN(value)) throw new TypeError("The value must be a number!")
            if (!this.has(data)) {
                this.set(data, 0)
            }

            const file = JSON.parse(fs.readFileSync("database.json", "utf8"))
            file[data] += value
            return fs.writeFileSync("database.json", JSON.stringify(file, null, 1))
        } else {
            if (!data) throw new TypeError("The data is not defined!")
            if (isNaN(value)) throw new TypeError("The value must be a number!")
            if (!this.has(data)) {
                this.set(data, 0)
            }
            const file = JSON.parse(fs.readFileSync("database.json", "utf8"))
            file[data] += value
            return fs.writeFileSync("database.json", JSON.stringify(file, null, 1))

        }
    }
    subtract(data, value) {
        if (!fs.existsSync(`database.json`)) {
            fs.writeFileSync(`database.json`, "{}");
            if (!data) throw new TypeError("The data is not defined!")
            if (typeof value !== "number") throw new TypeError("The value must be a number!")
            if (!this.has(data)) throw new TypeError("The data is not defined!")
            if (typeof this.fetch(data) !== "number") throw new TypeError("The value must be number!")
            const file = JSON.parse(fs.readFileSync("database.json", "utf8"))
            file[data] -= value
            return fs.writeFileSync("database.json", JSON.stringify(file, null, 1))
        } else {
            if (!data) throw new TypeError("The data is not defined!")
            if (typeof value !== "number") throw new TypeError("The value must be a number!")
            if (!this.has(data)) throw new TypeError("The data is not defined!")
            if (typeof this.fetch(data) !== "number") throw new TypeError("The value must be number!")
            const file = JSON.parse(fs.readFileSync("database.json", "utf8"))
            file[data] -= value
            return fs.writeFileSync("database.json", JSON.stringify(file, null, 1))
        }
    }
    reset() {
        const file = JSON.parse(fs.readFileSync("database.json", "utf8"))
        return fs.writeFileSync("database.json", JSON.stringify({}, null, 1))
    }
    all(sınır = 0) {
        if (!fs.existsSync(`database.json`)) {
            fs.writeFileSync(`database.json`, "{}");
            const object = JSON.parse(fs.readFileSync("database.json", "utf8"));

            var result = [];
            for (var i in object)
                result.push([`DATA = ${i}`, `VALUE = ${object [i]}`]);
            return result
        } else {
            const object = JSON.parse(fs.readFileSync("database.json", "utf8"));

            var result = [];
            for (var i in object)
                result.push([`DATA = ${i}`, `VALUE = ${object [i]}`]);
            return result
        }
    }
    push(key, value) {
        if (!fs.existsSync(`database.json`)) {
            fs.writeFileSync(`database.json`, "{}");
            const veri = this.fetch(key);
            if (!veri) {

                return this.set(key, [value]);
            }
            if (Array.isArray(veri)) {
                veri.push(value);
                return this.set(key, veri);
            } else {

                return this.set(key, [value]);
            }
        } else {
            const veri = this.fetch(key);
            if (!veri) {

                return this.set(key, [value]);
            }
            if (Array.isArray(veri)) {
                veri.push(value);
                return this.set(key, veri);
            } else {

                return this.set(key, [value]);
            }
        }
    }
    math(data, limit, value) {
        if (!fs.existsSync(`database.json`)) {
            fs.writeFileSync(`database.json`, "{}");
            const file = JSON.parse(fs.readFileSync("database.json", "utf8"))
            if (!data) throw new TypeError("Theres no data founded!")
            if (!limit) throw new TypeError("The process not defined!")
            if (!value) throw new TypeError("Theres no value entered!")
            if (!file[data]) throw new TypeError('couldnt get the data!')
            if (isNaN(value)) throw new TypeError("The value must be number!")
            if (isNaN(this.fetch(data))) throw new TypeError("The value must be number!")
            switch (limit) {
                case "+":
                    file[data] += value
                    return fs.writeFileSync("database.json", JSON.stringify(file, null, 1))
                    break;
                case "-":
                    file[data] -= value
                    return fs.writeFileSync("database.json", JSON.stringify(file, null, 1))
                    break;
                case "*":
                    file[data] *= value
                    return fs.writeFileSync("database.json", JSON.stringify(file, null, 1))
                    break;
                case "/":
                    file[data] /= value
                    return fs.writeFileSync("database.json", JSON.stringify(file, null, 1))
                    break;
                case "%":
                    file[data] %= value
                    return fs.writeFileSync("database.json", JSON.stringify(file, null, 1))
                    break;
                default:
                    return undefined
                    break;
            }
        } else {
            const file = JSON.parse(fs.readFileSync("database.json", "utf8"))
            if (!data) throw new TypeError("Theres no data founded!")
            if (!limit) throw new TypeError("The process not defined!")
            if (!value) throw new TypeError("Theres no value entered!")
            if (!file[data]) throw new TypeError('couldnt get the data!')
            if (isNaN(value)) throw new TypeError("The value must be number!")
            if (isNaN(this.fetch(data))) throw new TypeError("The data must be number!")
            switch (limit) {
                case "+":
                    file[data] += value
                    return fs.writeFileSync("database.json", JSON.stringify(file, null, 1))
                    break;
                case "-":
                    file[data] -= value
                    return fs.writeFileSync("database.json", JSON.stringify(file, null, 1))
                    break;
                case "*":
                    file[data] *= value
                    return fs.writeFileSync("database.json", JSON.stringify(file, null, 1))
                    break;
                case "/":
                    file[data] /= value
                    return fs.writeFileSync("database.json", JSON.stringify(file, null, 1))
                    break;
                case "%":
                    file[data] %= value
                    return fs.writeFileSync("database.json", JSON.stringify(file, null, 1))
                    break;
                default:
                    return undefined
                    break;
            }
        }


    }

    get(data) {
        if (!fs.existsSync(`database.json`)) {
            fs.writeFileSync(`database.json`, "{}");

            if (!data) throw new TypeError("The data is not defined!")
            const file = JSON.parse(fs.readFileSync("database.json", "utf8"))
            return file[data]
        } else {
            if (!data) throw new TypeError("The data is not defined!")
            const file = JSON.parse(fs.readFileSync("database.json", "utf8"))
            return file[data]
        }
    }
}
module.exports = new Data();