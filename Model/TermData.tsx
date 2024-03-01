import axios from "axios";
import { MarkerType } from "reactflow";
// import catData from "../Model/NodeDB.json";
import { fetchNuikitData, mjelec } from "../pages/NuikitView";
import { start } from "repl";
import { Set } from "typescript";

const mockjSon = {
  "list of course": {
    "001101": {
      courseNo: "001101",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "001102": {
      courseNo: "001102",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["001101"],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "001201": {
      courseNo: "001201",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["001102"],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "001225": {
      courseNo: "001225",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["001102"],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "011100": {
      courseNo: "011100",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "",
      credits: 3,
      GroupName: "Elective",
    },
    "140104": {
      courseNo: "140104",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "203100": {
      courseNo: "203100",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "",
      credits: 3,
      GroupName: "Elective",
    },
    "206161": {
      courseNo: "206161",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "206162": {
      courseNo: "206162",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["206161"],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "206261": {
      courseNo: "206261",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["206162"],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "207105": {
      courseNo: "207105",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "207106": {
      courseNo: "207106",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["207105"],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "207115": {
      courseNo: "207115",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "",
      credits: 1,
      GroupName: "",
    },
    "207116": {
      courseNo: "207116",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["207115"],
      corequisite: "",
      credits: 1,
      GroupName: "",
    },
    "252281": {
      courseNo: "252281",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "259104": {
      courseNo: "259104",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "259106": {
      courseNo: "259106",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "",
      credits: 1,
      GroupName: "",
    },
    "259191": {
      courseNo: "259191",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "",
      credits: 1,
      GroupName: "",
    },
    "259192": {
      courseNo: "259192",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "",
      credits: 1,
      GroupName: "",
    },
    "261102": {
      courseNo: "261102",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "261103": {
      courseNo: "261103",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "261200": {
      courseNo: "261200",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["261102"],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "261207": {
      courseNo: "261207",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["261103"],
      corequisite: "",
      credits: 2,
      GroupName: "",
    },
    "261208": {
      courseNo: "261208",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["206261"],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "261210": {
      courseNo: "261210",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["207106"],
      corequisite: "261212",
      credits: 3,
      GroupName: "",
    },
    "261212": {
      courseNo: "261212",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "261210",
      credits: 1,
      GroupName: "",
    },
    "261214": {
      courseNo: "261214",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["261210", "252281"],
      corequisite: "261215",
      credits: 3,
      GroupName: "",
    },
    "261215": {
      courseNo: "261215",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "261214",
      credits: 1,
      GroupName: "",
    },
    "261216": {
      courseNo: "261216",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "261217": {
      courseNo: "261217",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["261102"],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "261218": {
      courseNo: "261218",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["261217", "261216"],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "261304": {
      courseNo: "261304",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["261214"],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "261305": {
      courseNo: "261305",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["261304"],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "261306": {
      courseNo: "261306",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["206261"],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "261332": {
      courseNo: "261332",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["207106"],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "261335": {
      courseNo: "261335",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["261332"],
      corequisite: "261336",
      credits: 3,
      GroupName: "",
    },
    "261336": {
      courseNo: "261336",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "261335",
      credits: 1,
      GroupName: "",
    },
    "261342": {
      courseNo: "261342",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["261218"],
      corequisite: "261343",
      credits: 3,
      GroupName: "",
    },
    "261343": {
      courseNo: "261343",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "261342",
      credits: 1,
      GroupName: "",
    },
    "261361": {
      courseNo: "261361",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["261200"],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "261405": {
      courseNo: "261405",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["261361"],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
    "261491": {
      courseNo: "261491",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: [],
      corequisite: "",
      credits: 1,
      GroupName: "",
    },
    "261492": {
      courseNo: "261492",
      recommendSemester: 0,
      recommendYear: 0,
      prerequisites: ["261491"],
      corequisite: "",
      credits: 3,
      GroupName: "",
    },
  },
  "study term": [2, 2],
  template: [
    [
      "000000",
      "206161",
      "000000",
      "000000",
      "207105",
      "000000",
      "000000",
      "207115",
      "259104",
      "000000",
      "259106",
      "000000",
      "261103",
      "000000",
      "001101",
      "140104",
      "259191",
      "000000",
      "000000",
      "000000",
    ],
    [
      "000000",
      "206162",
      "000000",
      "000000",
      "207106",
      "000000",
      "252281",
      "207116",
      "000000",
      "000000",
      "261102",
      "000000",
      "111111",
      "000000",
      "001102",
      "000000",
      "000000",
      "203100",
      "Elective",
      "000000",
    ],
    [
      "000000",
      "206261",
      "111111",
      "000000",
      "261210",
      "261212",
      "111111",
      "000000",
      "000000",
      "111111",
      "261217",
      "261216",
      "261207",
      "111111",
      "001201",
      "000000",
      "000000",
      "011100",
      "Elective",
      "000000",
    ],
    [
      "111111",
      "261208",
      "261332",
      "000000",
      "261214",
      "261215",
      "000000",
      "000000",
      "000000",
      "261200",
      "261218",
      "000000",
      "000000",
      "001225",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
    ],
    [
      "111111",
      "000000",
      "261335",
      "261336",
      "261304",
      "000000",
      "000000",
      "000000",
      "000000",
      "111111",
      "261342",
      "261343",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "Co-Creator",
      "Major Elective",
      "000000",
    ],
    [
      "261306",
      "000000",
      "000000",
      "000000",
      "261305",
      "000000",
      "000000",
      "000000",
      "000000",
      "261361",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "Learner Person",
      "Elective",
      "Major Elective",
    ],
    [
      "261491",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "111111",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "Major Elective",
      "Major Elective",
      "Major Elective",
    ],
    [
      "261492",
      "259192",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "261405",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "000000",
      "Major Elective",
      "000000",
      "000000",
    ],
  ],
};

// const urlTerm =
//   "http://localhost:8080/termView?year=2563&curriculumProgram=CPE&isCOOP=false&mockData=mockData2";

function fetchTermData(url: string) {
  return new Promise(function (resolve, reject) {
    axios
      .get(url, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          mode: "no-cors",
        },
      })
      .then((response) => {
        console.log("fetch term data");
        resolve(response.data);
        return response.data;
      })
      .catch((error) => {
        // handle errors
        console.log(error);
        reject(error);
        // return testfail1
      });
  });
}

//
var termNode: any[] = [];
var edArr: any[] = [];
var creditArr: number[] = [];
var startNode: any[] = [];
var have2pre: any[] = [];
var lab: any[] = [];
var labIndex: any = [];

// const majorE = mjelec;

var spNode: any[] = [];

var havelab: any[] = [];

var typeNode = "free";

var fetchData: any = [];
var categoryData: any = [];

var allTerm = 8;
var allyear = 4;
var summerArr = [0, 0, 0, 0];

let showPre = new Set<string>();

var totalSubColumn = 0;

var isCoop_api: string = "false";

var arrTogglePrereq: any[] = [];

// var width = 100
// console.log(edArr);

// var

async function processData(year: string, isCoop: string) {
  termNode = [];
  edArr = [];
  creditArr = []
  startNode = [];
  spNode = [];
  havelab = [];
  lab = [];
  have2pre = [];
  labIndex = [];

  summerArr = [];

  var termURL =
    "http://localhost:8080/termView?year=" +
    year +
    "&curriculumProgram=CPE&isCOOP=" +
    isCoop +
    "&mockData=mockData5";
  var nuikitURL =
    "http://localhost:8080/categoryView?year=" +
    year +
    "&curriculumProgram=CPE&isCOOP=" +
    isCoop +
    "&mockData=mockData5";

  // &mockData=mockData5
  // &studentId=630610727

  console.log(termURL);

  // console.log('in termdata.tsx '+window.innerWidth)
  var currXPos = (window.innerWidth * 21) / 1440;
  var currYPos = (window.innerHeight * 74) / 779;

  var xpos = currXPos;
  var ypos = currYPos;
  var subid = 1;

  var tempi = 0;

  //Edge
  // console.log(edArr);
  // console.log(lab)

  fetchData = await fetchTermData(termURL);
  categoryData = await fetchNuikitData(nuikitURL);

  var major: any = [];
  var majorCredit: any = [];
  var core: any = [];
  var coreCredit: any = [];
  var free: any = [];
  var freeCredit: any = [];
  var gen: any = [];
  var genCredit: any = [];

  // console.log(fetchData);

  var stdTerm = fetchData["study term"];

  // console.log(stdTerm)
  // console.log(fetchData["template"].length)

  allTerm = fetchData["template"].length;

  totalSubColumn = fetchData["template"][0].length;

  // console.log('total subject column ' + totalSubColumn)
  console.log("is coop plan " + fetchData["isCoop"])
  isCoop_api = fetchData["isCoop"];

  for (let i = 0; i < fetchData["study term"].length; i++) {
    if (fetchData["study term"][i] === 3) {
      summerArr.push(1);
      summerArr.push(1);
      summerArr.push(2);
    } else {
      summerArr.push(0);
      summerArr.push(0);
    }
  }

  var countTwo = 0;
  for (let i = summerArr.length; i < fetchData["template"].length; i++) {
    if (countTwo == 2) {
      countTwo = 0;
    }
    summerArr.push(0);
    countTwo++;
  }

  // console.log("term arr " + summerArr);

  //gen
  for (let i = 0; i < categoryData["geCategory"].length; i++) {
    if (categoryData["geCategory"][i]["requiredCreditsNeed"] > 0) {
      gen = gen.concat(categoryData["geCategory"][i]["requiredCourseList"]);
    }
    if (categoryData["geCategory"][i]["electiveCreditsNeed"] > 0) {
      gen = gen.concat(categoryData["geCategory"][i]["electiveCourseList"]);
    }
  }

  // console.log("console log gen")
  // console.log(gen)

  //major
  for (let i = 0; i < categoryData["majorCategory"].length; i++) {
    if (categoryData["majorCategory"][i]["requiredCreditsNeed"] > 0) {
      major = major.concat(
        categoryData["majorCategory"][i]["requiredCourseList"]
      );
    }
    if (categoryData["majorCategory"][i]["electiveCreditsNeed"] > 0) {
      major = major.concat(
        categoryData["majorCategory"][i]["electiveCourseList"]
      );
    }
  }
  //core
  for (let i = 0; i < categoryData["coreCategory"].length; i++) {
    if (categoryData["coreCategory"][i]["requiredCreditsNeed"] > 0) {
      core = core.concat(categoryData["coreCategory"][i]["requiredCourseList"]);
    }
    if (categoryData["coreCategory"][i]["electiveCreditsNeed"] > 0) {
      core = core.concat(categoryData["coreCategory"][i]["electiveCourseList"]);
    }
  }

  //free
  for (let i = 0; i < categoryData["freeCategory"].length; i++) {
    if (categoryData["freeCategory"][i]["requiredCreditsNeed"] > 0) {
      free = free.concat(categoryData["freeCategory"][i]["requiredCourseList"]);
    }
    if (categoryData["freeCategory"][i]["electiveCreditsNeed"] > 0) {
      free = free.concat(categoryData["freeCategory"][i]["electiveCourseList"]);
    }
  }
  // console.log("print gen");
  // console.log(gen);

  // console.log("print core");
  // console.log(core);

  // console.log("print major");
  // console.log(major);

  // console.log("print free");
  // console.log(free);
  // console.log(fetchData["template"])

  var currData = fetchData["template"];
  var shiftX = fetchData["template"][0].length + 1; //18

  const subjId = Object.keys(fetchData["list of course"]);
  const subData: any = Object.values(fetchData["list of course"]);

  // console.log(fetchData);

  Object.values(fetchData["list of course"]).map((d: any) => {
    if (d.prerequisites.length === 0) {
      startNode.push(d.courseNo);
    }
  });

  console.log("wait finish");

  var test_arr: any = [];

  for (let i = 0; i < currData[0].length; i++) {
    test_arr.push(new Set());
  }

  // Edge Calculation
  for (let index = 0; index < subData.length; index++) {
    if (subData[index].prerequisites.length >= 1) {
      if (subData[index].prerequisites.length == 1) {
        edArr.push({
          id: "" + (index + 1),
          source: "" + subData[index].prerequisites,
          target: subData[index].courseNo,
          type: "custom-edge",

          data: { sp: false, edPos: {} },
          hidden: true,
        });
        showPre.add("" + subData[index].prerequisites);
        showPre.add("" + subData[index].courseNo);
      }
      if (subData[index].prerequisites.length == 2) {
        edArr.push({
          id: "" + (index + 1) + "_1",
          source: "" + subData[index].prerequisites[0],
          target: subData[index].courseNo,
          type: "custom-edge",
          // markerEnd: {
          //   type: MarkerType.ArrowClosed,
          //   width: 10,
          //   height: 12,
          //   color: "#000000",
          // },
          // sourceHandle: "a",
          data: { sp: false, edPos: {} },
          hidden: true,
        });
        edArr.push({
          id: "" + (index + 1) + "_2",
          source: "" + subData[index].prerequisites[1],
          target: subData[index].courseNo,
          type: "custom-edge",
          targetHandle: "b",
          data: { sp: false, edPos: {} },
          hidden: true,
        });
        have2pre.push({
          node: subData[index].courseNo,
          pre: subData[index].prerequisites[1],
          edId: "" + (index + 1) + "_2",
          l: edArr.length - 1,
        });
        showPre.add("" + subData[index].prerequisites[0]);
        showPre.add("" + subData[index].prerequisites[1]);
        showPre.add("" + subData[index].courseNo);
      }
    }
    if (subData[index].corequisite != "") {
      lab.push({
        index: index,
        havelab: subData[index].courseNo,
        lab: subData[index].corequisite,
      });
      showPre.add("" + subData[index].courseNo);
      showPre.add("" + subData[index].corequisite);
    }
  }

  console.log("this is test mobile width. Now width is " + window.innerWidth);

  // Config Position of Node
  var y = 58;
  var moveY = 74;

  var x = 133.5;
  var x_sum = 27.2;
  var xx = 27.5;

  if (window.innerWidth == 1024) {
    x = 133.5 + 30;
    x_sum = 27.2 + 30;
    xx = 27.5 + 30;
  }
  if (window.innerWidth > 600 && window.innerWidth < 900) {
    x = 133.5 + 40;
    x_sum = 27.2 + 40;
    xx = 27.5 + 40;
  }

  if (window.innerWidth > 900 && window.innerWidth < 1200) {
    x = 133.5 + 10;
    x_sum = 27.2;
    xx = 27.5;
  }

  var nextXPos = (window.innerWidth * x) / 1440;
  // var nextXPos_nt = (window.innerWidth * 30) / 1440;
  var nextYPos = (window.innerHeight * y) / 779;
  var nextYPos_nt = (window.innerHeight * moveY) / 779;

  // Add array to credit array
  for (let i = 0; i < currData.length; i++) {
    creditArr.push(0)
  }

  for (let i = 0; i < currData.length; i++) {
    tempi++;
    //have summer
    if (summerArr.includes(2)) {
      //check is summer is in year 1
      if (i === 3 && summerArr[i - 1] === 2) {
        xpos += (window.innerWidth * x_sum) / 1440;
      }
      //check is summer is in more than year 1
      if (summerArr[i] === 1 && i !== 3 && i !== 1 && i % 2 !== 0) {
        xpos += (window.innerWidth * x_sum) / 1440;
      } else if (i % 2 === 0 && summerArr[i] === 0 && summerArr[i - 1] === 2) {
        xpos += (window.innerWidth * xx) / 1440;
        
      } else if (
        i % 2 !== 0 &&
        summerArr[i] === 0 &&
        i !== 0 &&
        summerArr[i - 1] !== 2
      ) {
        if(summerArr[i - 2] === 2){
          xpos += (window.innerWidth * (xx - 27)) / 1440
        }else{
          xpos += (window.innerWidth * (xx+2)) / 1440
        }
        
      }
    }
    //normal term
    if (!summerArr.includes(2)) {
      
      if (i != 0 && i % 2 == 0) xpos += (window.innerWidth * xx) / 1440;
    }

    for (let j = 0; j < currData[0].length; j++) {
      //Prereq Calculation
      if (fetchData["haveRequisite"][currData[i][j]] !== undefined) {
        test_arr[j].add(currData[i][j]);

        if (fetchData["haveRequisite"][currData[i][j]].length === 1)
          test_arr[j].add(fetchData["haveRequisite"][currData[i][j]][0]);
        if (fetchData["haveRequisite"][currData[i][j]].length === 2) {
          test_arr[j].add(fetchData["haveRequisite"][currData[i][j]][0]);
          test_arr[j].add(fetchData["haveRequisite"][currData[i][j]][1]);
        }
        if (fetchData["haveRequisite"][currData[i][j]].length > 2) {
          for (
            let k = 0;
            k < fetchData["haveRequisite"][currData[i][j]].length;
            k++
          ) {
            test_arr[j].add(fetchData["haveRequisite"][currData[i][j]][k]);
          }
        }
      }

      lab.map((l) => {
        if (l.havelab === currData[i][j]) {
          test_arr[j].add(l.lab);
        }
      });

      // Node Calculation

      if (subid % shiftX == 0) {
        var ypos = nextYPos_nt;
        shiftX += currData[0].length;
      }
      var temp = String(subid);

      let strsubId = "" + currData[i][j];

      let tempId = subjId.indexOf(strsubId);
      var isPass = false;

      var node = {
        id: currData[i][j],
        type: "term_node",
        data: {
          sub_no: currData[i][j],
          pre: tempId,
          sub_data: fetchData["list of course"][currData[i][j]],
          category: "",
          credit: 3,
          is_pass: isPass,
        },
        position: { x: xpos, y: ypos },
        hidden: true,
      };

      if (currData[i][j] != "000000") {
        if (tempId >= 0) {
          if (subData[tempId].corequisite != "") {
            labIndex.push(termNode.length);
          }
          if (subData[tempId].prerequisites.length == 2) {
            have2pre.push({
              node: subData[tempId].courseNo,
              pre: subData[tempId].prerequisites[1],
              edId: "" + (tempId + 1) + "_2",
              l: edArr.length - 1,
            });

            test_arr[j].add(subData[tempId].prerequisites[1]);
          }

          //check if gen
          if (
            gen.map((value: any) => {
              if (value["courseNo"] === strsubId) {
                isPass = value["isPass"];
                typeNode = "gen";
              }
            })
          )
            if (
              core.map((value: any) => {
                if (value["courseNo"] == strsubId) {
                  isPass = value["isPass"];
                  typeNode = "sp";
                }
              })
            )
              if (
                major.map((value: any) => {
                  if (value["courseNo"] == strsubId) {
                    isPass = value["isPass"];
                    typeNode = "sp";
                  }
                })
              )
                if (
                  free.map((value: any) => {
                    if (value["courseNo"] == strsubId) {
                      isPass = value["isPass"];
                      typeNode = "free";
                    }
                  })
                )
                  //check if sp
                  //check if free
                  node = {
                    id: currData[i][j],
                    type: "term_node",
                    data: {
                      sub_no: currData[i][j],
                      pre: tempId,
                      sub_data: fetchData["list of course"][currData[i][j]],
                      category: typeNode,
                      credit: fetchData["list of course"][currData[i][j]]["credits"],
                      is_pass: isPass,
                    },
                    position: { x: xpos, y: ypos },
                    hidden: false,
                  };

                  creditArr[i] += fetchData["list of course"][currData[i][j]]["credits"]
        }

        if (currData[i][j] == "111111") {
          node = {
            id: temp,
            type: "term_node",
            data: {
              sub_no: currData[i][j],
              pre: 1,
              sub_data: {
                courseNo: "",
                recommendSemester: 0,
                recommendYear: 0,
                prerequisites: [],
                corequisite: "",
                credits: 0,
                GroupName: "",
              },
              category: "line",
              credit: 0,
              is_pass: isPass,
            },
            position: { x: xpos, y: ypos },
            hidden: true,
          };

          const pos = termNode.map((n) => n.position["y"]).indexOf(ypos);
          if (pos != -1) {
            // console.log(edArr)
            const edgepos = edArr
              .map((e) => e.source)
              .indexOf(termNode[pos]["id"]);
            // console.log(edgepos);
            if (edgepos != -1) {
              if (termNode[pos]["id"] === "252281")
                edArr[edgepos].data.edPos = xpos;
            }
          }
        }

        if (
          currData[i][j] == "Elective" ||
          currData[i][j] == "Co-Creator" ||
          currData[i][j] == "Learner Person"
        ) {
          var c = 3;
          if (currData[i][j] == "Elective") c = 3;
          if (currData[i][j] == "Co-Creator") c = 1;
          if (currData[i][j] == "Learner Person") c = 3;

          // if (
          //   fetchData["template"].length / 2 >= stdTerm.length &&
          //   stdTerm.length >= 4
          // )
          //   isPass = true;
          // if (stdTerm.length < 4) {
          //   if (i < stdTerm.length * 2) isPass = true;
          // }

          node = {
            id: temp,
            type: "term_node",
            data: {
              sub_no: currData[i][j],
              pre: tempId,
              sub_data: subData[tempId],
              category: "gen",
              credit: c,
              is_pass: isPass,
            },
            position: { x: xpos, y: ypos },
            hidden: false,
          };
        }

        if (currData[i][j] == "Major Elective") {
          // if (
          //   fetchData["template"].length / 2 >= stdTerm.length &&
          //   stdTerm.length >= 4
          // )
          //   isPass = true;
          // if (stdTerm.length < 4) {
          //   if (i < stdTerm.length * 2) isPass = true;
          // }
          node = {
            id: temp,
            type: "term_node",
            data: {
              sub_no: currData[i][j],
              pre: tempId,
              sub_data: subData[tempId],
              category: "sp",
              credit: 3,
              is_pass: isPass,
            },
            position: { x: xpos, y: ypos },
            hidden: false,
          };
        }

        if (currData[i][j] == "Free") {
          if (
            fetchData["template"].length / 2 >= stdTerm.length &&
            stdTerm.length >= 4
          )
            isPass = true;
          if (stdTerm.length < 4) {
            if (i < stdTerm.length * 2) isPass = true;
          }
          node = {
            id: temp,
            type: "term_node",
            data: {
              sub_no: currData[i][j],
              pre: tempId,
              sub_data: subData[tempId],
              category: "free",
              credit: 3,
              is_pass: isPass,
            },
            position: { x: xpos, y: ypos },
            hidden: false,
          };
        }

        if (tempi < 6) {
          if (
            currData[tempi][j] == "111111" &&
            currData[i][j] != "000000" &&
            currData[i][j] != "111111"
          ) {
            if (tempi < 5) {
              if (currData[tempi + 1][j] == "000000") {
                // console.log(currData[i][j] + "yayy " + currData[i + 2][j - 2]);
                spNode.push({
                  nodeId: currData[i][j],
                  edPos: xpos + nextXPos + nextXPos,
                });
              }
            }
          }
        }

        // console.log(node);
        termNode.push(node);
      }
      subid++;
      ypos += nextYPos;
    }

    xpos += nextXPos;
  }

  //lab Node

  for (let i = 0; i < lab.length; i++) {
    if (i % 2 == 0) {
      termNode[labIndex[i]]["type"] = "havelab";
      // console.log(termNode[labIndex[i]])
      edArr.push({
        id: "" + (labIndex[i] + 1) + "_havelab",
        source: lab[i]["havelab"],
        target: lab[i]["lab"],
        type: "straight",
        style: { stroke: "red", strokeWidth: 1.5 },
        sourceHandle: "b",

        data: { sp: false, edPos: {} },
        hidden: true,
      });
    } else {
      // console.log(termNode[labIndex[i]])
      termNode[labIndex[i]]["type"] = "lab";
    }
  }

  // console.log(have2pre);
  // console.log(spNode)
  //Sp Node
  for (let i = 0; i < have2pre.length; i++) {
    // console.log("log special node")
    // console.log(have2pre[i]);
    if (spNode[0] != undefined) {
      if (have2pre[i]["pre"] == spNode[0]["nodeId"]) {
        edArr[have2pre[i]["l"]]["data"]["sp"] = true;
        edArr[have2pre[i]["l"]]["data"]["edPos"] = spNode[0].edPos;
        edArr[have2pre[i]["l"]]["targetHandle"] = "b";
      }
      have2pre.pop();
    }
  }
  // console.log("all data");
  // console.log(edArr);
  // console.log(termNode);
  console.log("finish process data");

  // console.log(test_arr);

  // console.log("set after delete empty");

  function f(s: Set<any>) {
    return s.size > 1;
  }

  var preEdge1 = test_arr.filter(f);
  var preEdge2 = test_arr.filter(f);

  // console.log(preEdge1);

  var prereq: any = [];

  for (let i = 0; i < preEdge1.length; i++) {
    prereq[i] = Array.from(preEdge1[i]);
  }

  // console.log("convert set to array");
  // console.log(prereq);
  var delPreArrIndex: number[] = [];

  for (let i = 0; i < prereq.length; i++) {
    if (i != prereq.length - 1) {
      prereq[i].map((val1: any) => {
        prereq[i + 1].map((val2: any) => {
          if (val1 === val2) {
            // console.log("intersect " + i + " in " + (i + 1));
            // console.log(val1);
            prereq[i] = prereq[i].concat(prereq[i + 1]);

            if (!delPreArrIndex.includes(i + 1)) delPreArrIndex.push(i + 1);

            // prereq[i + 1] = prereq[i]
          }
        });
      });
    }
  }

  // console.log("update prereq");
  // console.log(prereq);
  // console.log("del index arr")
  // console.log(delPreArrIndex)

  for (let i = 0; i < prereq.length; i++) {
    if (delPreArrIndex.includes(i)) prereq[i] = [];
  }

  // console.log("prereq after delete")
  // console.log(prereq)

  var newPreReq = prereq.filter((i: any) => {
    return i.length > 0;
  });

  // console.log("log newwwwww prereq")
  // console.log(newPreReq)
  arrTogglePrereq = newPreReq;

  console.log(termNode);
  console.log(creditArr)

  // termNode.push({
  //   id: 'test2',
  //   type: "term_node",
  //   data: {
  //     sub_no: 'test',
  //     pre: 0,
  //     sub_data: {},
  //     category: 'free',
  //     credit: 3,
  //     is_pass: true
  //   },
  //   position: { x: 1196.251, y: 600 },
  //   hidden: false,
  // })
}

// comment ja

// processData()

export {
  termNode,
  spNode,
  lab,
  havelab,
  startNode,
  // currData,
  edArr,
  processData,
  mockjSon,
  fetchData,
  allTerm,
  allyear,
  summerArr,
  showPre,
  totalSubColumn,
  isCoop_api,
  arrTogglePrereq,
  creditArr
};
