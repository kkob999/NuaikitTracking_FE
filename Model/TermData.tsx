import axios, { AxiosError, AxiosResponse } from "axios";
import { Set } from "typescript";
import { WhoAmIResponse } from "../pages/api/whoAmI";

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
        resolve(response.data);
        return response.data;
      })
      .catch((error) => {
        // handle errors
        console.log(error);
        reject(error);
        return "Network Error";
        // return testfail1
      });
  });
}

var termNode: any[] = [];
var edArr: any[] = [];
var creditArr: number[] = [];
var startNode: any[] = [];
var have2pre: any[] = [];
var lab: any[] = [];
var labIndex: any = [];

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

var stdId = "";

async function processData(year: string, isCoop: string, stdId: string) {
  const searchParams = new URLSearchParams(window.location.search);
  var search = searchParams.has("mockData");
  var qryValue = searchParams.get("mockData");

  termNode = [];
  edArr = [];
  creditArr = [];
  startNode = [];
  spNode = [];
  havelab = [];
  lab = [];
  have2pre = [];
  labIndex = [];

  summerArr = [];

  await axios
    .get<{}, AxiosResponse<WhoAmIResponse>, {}>("/api/whoAmI")
    .then((response) => {
      if (response.data.ok) {
        stdId = response.data.studentId ?? "No Student Id";
        year = "2563";
      }
    })
    .catch((error: AxiosError<WhoAmIResponse>) => {
      console.log(error);
      throw 500;
    });

  if (
    Number(stdId.substring(0, 2)) >= 63 &&
    Number(stdId.substring(0, 2)) <= 67
  ) {
    year = "2563";
  }

  var termURL =
    "http://localhost:8080/termView?year=" +
    year +
    "&curriculumProgram=CPE&isCOOP=" +
    isCoop;

  if (search) {
    termURL += "&mockData=mockData" + qryValue;
  } else {
    termURL += "&studentId=" + stdId;
  }

  var nuikitURL =
    "http://localhost:8080/categoryView?year=" +
    year +
    "&curriculumProgram=CPE&isCOOP=" +
    isCoop;

  if (search) {
    nuikitURL += "&mockData=mockData" + qryValue;
  } else {
    nuikitURL += "&studentId=" + stdId;
  }

  var subid = 1;

  var tempi = 0;

  fetchData = await fetchTermData(termURL);

  var major: any = [];
  var majorCredit: any = [];
  var core: any = [];
  var coreCredit: any = [];
  var free: any = [];
  var freeCredit: any = [];
  var gen: any = [];
  var genCredit: any = [];

  var stdTerm = fetchData["study term"];

  allTerm = fetchData["template"].length;

  totalSubColumn = fetchData["template"][0].length;

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

  var currData = fetchData["template"];
  var shiftX = fetchData["template"][0].length + 1; //18

  const subjId = Object.keys(fetchData["list of course"]);
  const subData: any = Object.values(fetchData["list of course"]);

  Object.values(fetchData["list of course"]).map((d: any) => {
    if (d.prerequisites.length === 0) {
      startNode.push(d.courseNo);
    }
  });

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
          hidden: false,
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
          hidden: false,
        });
        edArr.push({
          id: "" + (index + 1) + "_2",
          source: "" + subData[index].prerequisites[1],
          target: subData[index].courseNo,
          type: "custom-edge",
          targetHandle: "b",
          data: { sp: false, edPos: {} },
          hidden: false,
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

  // Config Position of Node
  var currXPos = (window.innerWidth * 21) / 1440;
  var currYPos = (window.innerHeight * 74) / 779;

  if (window.innerWidth < 1300) {
    currXPos = (window.innerWidth * 19) / 1024; //-3
  }
  if (window.innerWidth >= 1700 && window.innerWidth < 1900) {
    currXPos = (window.innerWidth * 23) / 1920;
  }

  if (window.innerWidth >= 1900 && window.innerWidth < 2100) {
    currXPos = (window.innerWidth * 32) / 1920;
  }

  if (window.innerWidth >= 1300 && window.innerWidth < 1440) {
    currXPos = (window.innerWidth * 17) / 1024; //-3
  }
  if (window.innerWidth >= 1200 && window.innerWidth < 1300) {
    currXPos = (window.innerWidth * 20) / 1280;
  }
  if (window.innerWidth >= 1100 && window.innerWidth < 1200) {
    currXPos = 20; //-3
  }
  if (window.innerWidth >= 600 && window.innerWidth < 700) {
    currXPos = (window.innerWidth * 15) / 604;
  }

  if (window.innerWidth >= 700 && window.innerWidth < 800) {
    currXPos = (window.innerWidth * 16) / 768;
  }

  if (window.innerWidth >= 800 && window.innerWidth < 900) {
    currXPos = (window.innerWidth * 15.4) / 860;
  }

  if (window.innerWidth >= 900 && window.innerWidth < 1200) {
    currXPos = (window.innerWidth * 17.4) / 1024;
  }

  if (window.innerWidth === 768) {
    currXPos = 26;
  }
  if (window.innerWidth === 2560) {
    currXPos = 16;
  }
  if (window.innerWidth === 2048) {
    currXPos = 32;
  }

  var xpos = currXPos;
  var ypos = currYPos;

  var y = 58;
  var moveY = 74;

  var x = 134.5;
  var x_sum = 27.2;
  var xx = 24.5;

  if (window.innerWidth > 600 && window.innerWidth < 700) {
    x = ((133.5 + 90.4) * 640) / window.innerWidth;
    x_sum = 27.2 + 37;
    xx = ((27.5 + 5) * 640) / window.innerWidth;
  }
  if (window.innerWidth > 700 && window.innerWidth < 800) {
    x = ((133.5 + 54.4) * 768) / window.innerWidth;
    x_sum = 27.2 + 37;
    xx = (27.5 * 768) / window.innerWidth;
  }

  if (window.innerWidth >= 800 && window.innerWidth < 900) {
    x = ((133.5 + 34.4) * 860) / window.innerWidth;
    x_sum = 27.2 + 37;
    xx = ((27.5 + 1.2) * 860) / window.innerWidth;
    // x = 133.5 + 97.4;
    // x_sum = 27.2 + 37;
    // xx = 27.5 + 37;
  }
  if (window.innerWidth >= 900 && window.innerWidth < 1000) {
    x = ((133.5 + 9) * 960) / window.innerWidth;
    x_sum = 27.2;
    xx = ((22 + 7.5) * 960) / window.innerWidth;
  }
  if (window.innerWidth >= 1000 && window.innerWidth < 1100) {
    if (window.innerWidth <= 1024) {
      x = ((133.5 + 11.5) * 1024) / window.innerWidth;
      x_sum = 27.2;
      xx = ((22 + 13) * 1024) / window.innerWidth;
    } else {
      x = ((133.5 + 14.5) * 1056) / window.innerWidth;
      x_sum = 27.2;
      xx = ((22 + 8.4) * 1056) / window.innerWidth;
    }
  }
  if (window.innerWidth >= 1100 && window.innerWidth < 1200) {
    x = ((133.5 + 8) * 1176) / window.innerWidth;
    x_sum = 27.2;
    xx = ((22 + 11) * 1176) / window.innerWidth;
  }

  // if (window.innerWidth > 900 && window.innerWidth < 1200) {
  //   console.log(window.innerWidth)
  //   x = ((133.5 + 8) * 1024) / window.innerWidth;
  //   x_sum = 27.2;
  //   xx = ((22 + 11) * 1024) / window.innerWidth;
  // }
  if (window.innerWidth === 1024) {
    x = 133.5 + 8;
    x_sum = 26.2;
    xx = 22 + 11;
  }
  if (window.innerWidth >= 2000) {
    x = (132.5 * 2560) / window.innerWidth;
    x_sum = 26.2;
    xx = (30 * 2560) / window.innerWidth;

    if (window.innerWidth === 2048) {
      x = 134.5;
      x_sum = 26.2;
      xx = 24;
    }
  }

  var nextXPos = (window.innerWidth * (x - 1)) / 1440;

  var nextYPos = (window.innerHeight * y) / 779;
  var nextYPos_nt = (window.innerHeight * moveY) / 779;

  // Add array to credit array
  for (let i = 0; i < currData.length; i++) {
    creditArr.push(0);
  }

  var isSumYear1 = false;

  var tempSpaceNode = 0;

  for (let i = 0; i < currData.length; i++) {
    tempi++;
    //have summer
    if (summerArr.includes(2)) {
      if (summerArr[i] === 1) {
        tempSpaceNode = i;
        if (i > 3 && summerArr[i + 1] === 1) {
          xpos += (window.innerWidth * xx) / 1440;
        }
      } else {
        if (i === tempSpaceNode + 2) {
          tempSpaceNode = i;
          xpos += (window.innerWidth * xx) / 1440;
        }
      }

      if (summerArr[i] === 1 && i == 2) {
        tempSpaceNode = i;
        xpos += (window.innerWidth * xx) / 1440;
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

      var cat = "free";

      var node = {
        id: currData[i][j],
        type: "term_node",
        data: {
          sub_no: currData[i][j],
          pre: tempId,
          sub_data: fetchData["list of course"][currData[i][j]],
          category: cat,
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

          var gn = fetchData["list of course"][currData[i][j]]["groupName"];

          if (gn === "Major Required" || gn === "Major Elective") {
            cat = "sp_major";
          }
          if (gn === "Core") {
            cat = "sp_core";
          }
          if (
            gn === "Learner Person" ||
            gn === "Co-Creator" ||
            gn === "Elective"
          ) {
            cat = "gen";
          }
          if (gn === "Free") {
            cat = "free";
          }

          if (
            fetchData["template"].length / 2 >= stdTerm.length &&
            stdTerm.length >= 4
          ) {
            if (i < stdTerm.length * 2) {
              isPass = true;
            }

            if (
              stdTerm[stdTerm.length - 1] === 1 &&
              i === fetchData["template"].length - 2
            ) {
              isPass = true;
            }
          }

          if (stdTerm.length < 4) {
            
            if (
              i < stdTerm.length * 2 
            )
              isPass = true;

            if (stdTerm.includes(3) && i - 1 < stdTerm.length * 2) {
              isPass = true;
            }

            if (i === (stdTerm.length*2)-1 && stdTerm[stdTerm.length - 1] === 1) {
              isPass = false;
            }
          }

          //check if sp
          //check if free
          node = {
            id: currData[i][j],
            type: "term_node",
            data: {
              sub_no: currData[i][j],
              pre: tempId,
              sub_data: fetchData["list of course"][currData[i][j]],
              category: cat,
              credit: fetchData["list of course"][currData[i][j]]["credits"],
              is_pass: isPass,
            },
            position: { x: xpos, y: ypos },
            hidden: false,
          };

          creditArr[i] +=
            fetchData["list of course"][currData[i][j]]["credits"];
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
            const edgepos = edArr
              .map((e) => e.source)
              .indexOf(termNode[pos]["id"]);

            if (edgepos != -1) {
              have2pre.map((n: any) => {
                if (n["pre"] === termNode[pos]["id"]) {
                  edArr[edgepos].data.edPos = xpos;
                }
              });
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
          creditArr[i] += 3;
        }

        if (currData[i][j] == "Major Elective") {
          node = {
            id: temp,
            type: "term_node",
            data: {
              sub_no: currData[i][j],
              pre: tempId,
              sub_data: subData[tempId],
              category: "sp_major",
              credit: 3,
              is_pass: isPass,
            },
            position: { x: xpos, y: ypos },
            hidden: false,
          };
          creditArr[i] += 3;
        }

        if (currData[i][j] == "Free") {
          if (
            fetchData["template"].length / 2 >= stdTerm.length &&
            stdTerm.length >= 4
          )
            if (
              fetchData["study term"][
                Math.floor(fetchData["template"].length / 2) - 1
              ] === 1
            ) {
              isPass = false;
            } else {
              isPass = true;
            }

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
          creditArr[i] += 3;
        }

        if (tempi < 6) {
          if (
            currData[tempi][j] == "111111" &&
            currData[i][j] != "000000" &&
            currData[i][j] != "111111"
          ) {
            if (tempi < 5) {
              if (currData[tempi + 1][j] == "000000") {
                spNode.push({
                  nodeId: currData[i][j],
                  edPos: xpos + nextXPos + nextXPos,
                });
              }
            }
          }
        }

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
      edArr.push({
        id: "" + (labIndex[i] + 1) + "_havelab",
        source: lab[i]["havelab"],
        target: lab[i]["lab"],
        type: "straight",
        style: { stroke: "red", strokeWidth: 1.5 },
        sourceHandle: "b",

        data: { sp: false, edPos: {} },
        hidden: false,
      });
    } else {
      termNode[labIndex[i]]["type"] = "lab";
    }
  }

  for (let i = 0; i < have2pre.length; i++) {
    if (spNode[0] != undefined) {
      if (have2pre[i]["pre"] == spNode[0]["nodeId"]) {
        edArr[have2pre[i]["l"]]["data"]["sp"] = true;
        edArr[have2pre[i]["l"]]["data"]["edPos"] = spNode[0].edPos;
        edArr[have2pre[i]["l"]]["targetHandle"] = "b";
      }
      have2pre.pop();
    }
  }

  function f(s: Set<any>) {
    return s.size > 1;
  }

  var preEdge1 = test_arr.filter(f);

  var prereq: any = [];

  for (let i = 0; i < preEdge1.length; i++) {
    prereq[i] = Array.from(preEdge1[i]);
  }

  var delPreArrIndex: number[] = [];

  for (let i = 0; i < prereq.length; i++) {
    if (i != prereq.length - 1) {
      prereq[i].map((val1: any) => {
        prereq[i + 1].map((val2: any) => {
          if (val1 === val2) {
            prereq[i] = prereq[i].concat(prereq[i + 1]);

            if (!delPreArrIndex.includes(i + 1)) delPreArrIndex.push(i + 1);
          }
        });
      });
    }
  }

  for (let i = 0; i < prereq.length; i++) {
    if (delPreArrIndex.includes(i)) prereq[i] = [];
  }

  var newPreReq = prereq.filter((i: any) => {
    return i.length > 0;
  });

  arrTogglePrereq = newPreReq;
}

export {
  termNode,
  spNode,
  lab,
  havelab,
  startNode,
  // currData,
  edArr,
  processData,
  fetchData,
  allTerm,
  allyear,
  summerArr,
  showPre,
  totalSubColumn,
  isCoop_api,
  arrTogglePrereq,
  creditArr,
};
