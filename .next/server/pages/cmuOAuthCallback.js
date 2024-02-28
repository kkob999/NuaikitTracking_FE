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
exports.id = "pages/cmuOAuthCallback";
exports.ids = ["pages/cmuOAuthCallback"];
exports.modules = {

/***/ "./pages/cmuOAuthCallback.tsx":
/*!************************************!*\
  !*** ./pages/cmuOAuthCallback.tsx ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ CMUOAuthCallback)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"axios\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_1__]);\naxios__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nfunction CMUOAuthCallback() {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const { code  } = router.query;\n    const [message, setMessage] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(\"\");\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        //Next.js takes sometime to read parameter from URL\n        //So we'll check if \"code\" is ready before calling sign-in api\n        if (!code) return;\n        axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post(\"/api/signIn\", {\n            authorizationCode: code\n        }).then((resp)=>{\n            if (resp.data.ok) {\n                router.push(\"/Dashboard\");\n            }\n        }).catch((error)=>{\n            if (!error.response) {\n                setMessage(\"Cannot connect to CMU OAuth Server. Please try again later.\");\n            } else if (!error.response.data.ok) {\n                setMessage(error.response.data.message);\n            } else {\n                setMessage(\"Unknown error occurred. Please try again later.\");\n            }\n        });\n    }, [\n        code\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"p-3\",\n        children: message || \"Redirecting ...\"\n    }, void 0, false, {\n        fileName: \"/Users/chmmn/Documents/NuaikitTracking_FE/pages/cmuOAuthCallback.tsx\",\n        lineNumber: 36,\n        columnNumber: 10\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9jbXVPQXV0aENhbGxiYWNrLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQTBDO0FBQ0Y7QUFDSTtBQUc3QixTQUFTSSxtQkFBbUI7SUFDekMsTUFBTUMsU0FBU0osc0RBQVNBO0lBQ3hCLE1BQU0sRUFBRUssS0FBSSxFQUFFLEdBQUdELE9BQU9FLEtBQUs7SUFDN0IsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUdOLCtDQUFRQSxDQUFDO0lBRXZDRCxnREFBU0EsQ0FBQyxJQUFNO1FBQ2QsbURBQW1EO1FBQ25ELDhEQUE4RDtRQUM5RCxJQUFJLENBQUNJLE1BQU07UUFFWE4sa0RBQ08sQ0FBaUIsZUFBZTtZQUFFVyxtQkFBbUJMO1FBQUssR0FDOURNLElBQUksQ0FBQyxDQUFDQyxPQUFTO1lBQ2QsSUFBSUEsS0FBS0MsSUFBSSxDQUFDQyxFQUFFLEVBQUU7Z0JBQ2hCVixPQUFPVyxJQUFJLENBQUM7WUFDZCxDQUFDO1FBQ0gsR0FDQ0MsS0FBSyxDQUFDLENBQUNDLFFBQXNDO1lBQzVDLElBQUksQ0FBQ0EsTUFBTUMsUUFBUSxFQUFFO2dCQUNuQlYsV0FDRTtZQUVKLE9BQU8sSUFBSSxDQUFDUyxNQUFNQyxRQUFRLENBQUNMLElBQUksQ0FBQ0MsRUFBRSxFQUFFO2dCQUNsQ04sV0FBV1MsTUFBTUMsUUFBUSxDQUFDTCxJQUFJLENBQUNOLE9BQU87WUFDeEMsT0FBTztnQkFDTEMsV0FBVztZQUNiLENBQUM7UUFDSDtJQUNKLEdBQUc7UUFBQ0g7S0FBSztJQUVULHFCQUFPLDhEQUFDYztRQUFJQyxXQUFVO2tCQUFPYixXQUFXOzs7Ozs7QUFDMUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2NtdS1vYXV0aC1uZXh0anMvLi9wYWdlcy9jbXVPQXV0aENhbGxiYWNrLnRzeD9hZWIyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBheGlvcywgeyBBeGlvc0Vycm9yIH0gZnJvbSBcImF4aW9zXCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFNpZ25JblJlc3BvbnNlIH0gZnJvbSBcIi4vYXBpL3NpZ25JblwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBDTVVPQXV0aENhbGxiYWNrKCkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgY29uc3QgeyBjb2RlIH0gPSByb3V0ZXIucXVlcnk7XG4gIGNvbnN0IFttZXNzYWdlLCBzZXRNZXNzYWdlXSA9IHVzZVN0YXRlKFwiXCIpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy9OZXh0LmpzIHRha2VzIHNvbWV0aW1lIHRvIHJlYWQgcGFyYW1ldGVyIGZyb20gVVJMXG4gICAgLy9TbyB3ZSdsbCBjaGVjayBpZiBcImNvZGVcIiBpcyByZWFkeSBiZWZvcmUgY2FsbGluZyBzaWduLWluIGFwaVxuICAgIGlmICghY29kZSkgcmV0dXJuO1xuXG4gICAgYXhpb3NcbiAgICAgIC5wb3N0PFNpZ25JblJlc3BvbnNlPihcIi9hcGkvc2lnbkluXCIsIHsgYXV0aG9yaXphdGlvbkNvZGU6IGNvZGUgfSlcbiAgICAgIC50aGVuKChyZXNwKSA9PiB7XG4gICAgICAgIGlmIChyZXNwLmRhdGEub2spIHtcbiAgICAgICAgICByb3V0ZXIucHVzaChcIi9EYXNoYm9hcmRcIik7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yOiBBeGlvc0Vycm9yPFNpZ25JblJlc3BvbnNlPikgPT4ge1xuICAgICAgICBpZiAoIWVycm9yLnJlc3BvbnNlKSB7XG4gICAgICAgICAgc2V0TWVzc2FnZShcbiAgICAgICAgICAgIFwiQ2Fubm90IGNvbm5lY3QgdG8gQ01VIE9BdXRoIFNlcnZlci4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci5cIlxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSBpZiAoIWVycm9yLnJlc3BvbnNlLmRhdGEub2spIHtcbiAgICAgICAgICBzZXRNZXNzYWdlKGVycm9yLnJlc3BvbnNlLmRhdGEubWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2V0TWVzc2FnZShcIlVua25vd24gZXJyb3Igb2NjdXJyZWQuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfSwgW2NvZGVdKTtcblxuICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwLTNcIj57bWVzc2FnZSB8fCBcIlJlZGlyZWN0aW5nIC4uLlwifTwvZGl2Pjtcbn1cbiJdLCJuYW1lcyI6WyJheGlvcyIsInVzZVJvdXRlciIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiQ01VT0F1dGhDYWxsYmFjayIsInJvdXRlciIsImNvZGUiLCJxdWVyeSIsIm1lc3NhZ2UiLCJzZXRNZXNzYWdlIiwicG9zdCIsImF1dGhvcml6YXRpb25Db2RlIiwidGhlbiIsInJlc3AiLCJkYXRhIiwib2siLCJwdXNoIiwiY2F0Y2giLCJlcnJvciIsInJlc3BvbnNlIiwiZGl2IiwiY2xhc3NOYW1lIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/cmuOAuthCallback.tsx\n");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = import("axios");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/cmuOAuthCallback.tsx"));
module.exports = __webpack_exports__;

})();