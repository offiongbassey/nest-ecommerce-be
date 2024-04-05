"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.urlGenerator = void 0;
function urlGenerator(name) {
    return name.replace(/\s+/g, '-').replace(/:/g, "-").replace("/", "-").replace(",", "").toLowerCase();
}
exports.urlGenerator = urlGenerator;
