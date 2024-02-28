"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/whoAmI";
exports.ids = ["pages/api/whoAmI"];
exports.modules = {

/***/ "cookies-next":
/*!*******************************!*\
  !*** external "cookies-next" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("cookies-next");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "(api)/./pages/api/whoAmI.ts":
/*!*****************************!*\
  !*** ./pages/api/whoAmI.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! cookies-next */ \"cookies-next\");\n/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(cookies_next__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\");\n/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);\n\n\nasync function handler(req, res) {\n    if (req.method !== \"GET\") return res.status(404).json({\n        ok: false,\n        message: \"Invalid HTTP method\"\n    });\n    const token = (0,cookies_next__WEBPACK_IMPORTED_MODULE_0__.getCookie)(\"cmu-oauth-example-token\", {\n        req,\n        res\n    });\n    //validate token\n    if (typeof token !== \"string\") return res.status(401).json({\n        ok: false,\n        message: \"Invalid token\"\n    });\n    try {\n        const decoded = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().verify(token, process.env.JWT_SECRET);\n        return res.json({\n            ok: true,\n            cmuAccount: decoded.cmuAccount,\n            firstName: decoded.firstName,\n            lastName: decoded.lastName,\n            studentId: decoded.studentId\n        });\n    } catch (error) {\n        return res.status(401).json({\n            ok: false,\n            message: \"Invalid token\"\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvd2hvQW1JLnRzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQXlDO0FBQ1Y7QUFtQmhCLGVBQWVFLFFBQzVCQyxHQUFtQixFQUNuQkMsR0FBb0MsRUFDcEM7SUFDQSxJQUFJRCxJQUFJRSxNQUFNLEtBQUssT0FDakIsT0FBT0QsSUFBSUUsTUFBTSxDQUFDLEtBQUtDLElBQUksQ0FBQztRQUFFQyxJQUFJLEtBQUs7UUFBRUMsU0FBUztJQUFzQjtJQUUxRSxNQUFNQyxRQUFRVix1REFBU0EsQ0FBQywyQkFBMkI7UUFBRUc7UUFBS0M7SUFBSTtJQUU5RCxnQkFBZ0I7SUFDaEIsSUFBSSxPQUFPTSxVQUFVLFVBQ25CLE9BQU9OLElBQUlFLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7UUFBRUMsSUFBSSxLQUFLO1FBQUVDLFNBQVM7SUFBZ0I7SUFDcEUsSUFBSTtRQUNGLE1BQU1FLFVBQVVWLDBEQUFVLENBQ3hCUyxPQUNBRyxRQUFRQyxHQUFHLENBQUNDLFVBQVU7UUFHeEIsT0FBT1gsSUFBSUcsSUFBSSxDQUFDO1lBQ2RDLElBQUksSUFBSTtZQUNSUSxZQUFZTCxRQUFRSyxVQUFVO1lBQzlCQyxXQUFXTixRQUFRTSxTQUFTO1lBQzVCQyxVQUFVUCxRQUFRTyxRQUFRO1lBQzFCQyxXQUFXUixRQUFRUSxTQUFTO1FBQzlCO0lBQ0YsRUFBRSxPQUFPQyxPQUFPO1FBQ2QsT0FBT2hCLElBQUlFLE1BQU0sQ0FBQyxLQUFLQyxJQUFJLENBQUM7WUFBRUMsSUFBSSxLQUFLO1lBQUVDLFNBQVM7UUFBZ0I7SUFDcEU7QUFDRixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vY211LW9hdXRoLW5leHRqcy8uL3BhZ2VzL2FwaS93aG9BbUkudHM/MGE3ZiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRDb29raWUgfSBmcm9tIFwiY29va2llcy1uZXh0XCI7XG5pbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcbmltcG9ydCB0eXBlIHsgTmV4dEFwaVJlcXVlc3QsIE5leHRBcGlSZXNwb25zZSB9IGZyb20gXCJuZXh0XCI7XG5pbXBvcnQgeyBKV1RQYXlsb2FkIH0gZnJvbSBcIi4uLy4uL3R5cGVzL0pXVFBheWxvYWRcIjtcblxudHlwZSBTdWNjZXNzUmVzcG9uc2UgPSB7XG4gIG9rOiB0cnVlO1xuICBjbXVBY2NvdW50OiBzdHJpbmc7XG4gIGZpcnN0TmFtZTogc3RyaW5nO1xuICBsYXN0TmFtZTogc3RyaW5nO1xuICBzdHVkZW50SWQ/OiBzdHJpbmc7XG59O1xuXG50eXBlIEVycm9yUmVzcG9uc2UgPSB7XG4gIG9rOiBmYWxzZTtcbiAgbWVzc2FnZTogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgV2hvQW1JUmVzcG9uc2UgPSBTdWNjZXNzUmVzcG9uc2UgfCBFcnJvclJlc3BvbnNlO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKFxuICByZXE6IE5leHRBcGlSZXF1ZXN0LFxuICByZXM6IE5leHRBcGlSZXNwb25zZTxXaG9BbUlSZXNwb25zZT5cbikge1xuICBpZiAocmVxLm1ldGhvZCAhPT0gXCJHRVRcIilcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLmpzb24oeyBvazogZmFsc2UsIG1lc3NhZ2U6IFwiSW52YWxpZCBIVFRQIG1ldGhvZFwiIH0pO1xuXG4gIGNvbnN0IHRva2VuID0gZ2V0Q29va2llKFwiY211LW9hdXRoLWV4YW1wbGUtdG9rZW5cIiwgeyByZXEsIHJlcyB9KTtcblxuICAvL3ZhbGlkYXRlIHRva2VuXG4gIGlmICh0eXBlb2YgdG9rZW4gIT09IFwic3RyaW5nXCIpXG4gICAgcmV0dXJuIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgb2s6IGZhbHNlLCBtZXNzYWdlOiBcIkludmFsaWQgdG9rZW5cIiB9KTtcbiAgdHJ5IHtcbiAgICBjb25zdCBkZWNvZGVkID0gand0LnZlcmlmeShcbiAgICAgIHRva2VuLFxuICAgICAgcHJvY2Vzcy5lbnYuSldUX1NFQ1JFVCBhcyBzdHJpbmdcbiAgICApIGFzIEpXVFBheWxvYWQ7XG5cbiAgICByZXR1cm4gcmVzLmpzb24oe1xuICAgICAgb2s6IHRydWUsXG4gICAgICBjbXVBY2NvdW50OiBkZWNvZGVkLmNtdUFjY291bnQsXG4gICAgICBmaXJzdE5hbWU6IGRlY29kZWQuZmlyc3ROYW1lLFxuICAgICAgbGFzdE5hbWU6IGRlY29kZWQubGFzdE5hbWUsXG4gICAgICBzdHVkZW50SWQ6IGRlY29kZWQuc3R1ZGVudElkLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJldHVybiByZXMuc3RhdHVzKDQwMSkuanNvbih7IG9rOiBmYWxzZSwgbWVzc2FnZTogXCJJbnZhbGlkIHRva2VuXCIgfSk7XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJnZXRDb29raWUiLCJqd3QiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwic3RhdHVzIiwianNvbiIsIm9rIiwibWVzc2FnZSIsInRva2VuIiwiZGVjb2RlZCIsInZlcmlmeSIsInByb2Nlc3MiLCJlbnYiLCJKV1RfU0VDUkVUIiwiY211QWNjb3VudCIsImZpcnN0TmFtZSIsImxhc3ROYW1lIiwic3R1ZGVudElkIiwiZXJyb3IiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./pages/api/whoAmI.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/whoAmI.ts"));
module.exports = __webpack_exports__;

})();