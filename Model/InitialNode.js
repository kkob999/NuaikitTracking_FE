const posX = 65;
const posY = 130;
const spaceX = 120;
const spaceY = 70;
const gap = 165;

const posX1year1sem = posX;
const posX1year2sem = posX+spaceX;
const posX2year1sem = spaceX+posX+gap;
const posX2year2sem = spaceX*2+posX+gap;
const posX3year1sem = spaceX*2+posX+gap*2;
const posX3year2sem = spaceX*3+posX+gap*2;
const posX4year1sem = spaceX*3+posX+gap*3;
const posX4year2sem = spaceX*4+posX+gap*3;



export const nodes = [

    {
      id: "1",
      data: { sub_no: "001011", sub_name: "English 1", category: "eng" },
      position: { x: posX1year1sem, y: posY },
      type: "gen_node",
      // sourcePosition: "right",
      selected: false,
    },
    {
      id: "2",
      data: { sub_no: "001102", sub_name: "English 2", category: "eng" },
      position: { x: posX1year2sem, y: posY },
      type: "gen_node",
      // sourcePosition: "right",
      // targetPosition: "left",
      selected: false,
    },
    {
      id: "3",
      data: { sub_no: "001201", sub_name: "English r/w", category: "eng" },
      position: { x: posX2year1sem, y: posY },
      type: "gen_node",
      // sourcePosition: "right",
      // targetPosition: "left",
      selected: false,
    },
    {
      id: "4",
      data: { sub_no: "001225", sub_name: "English in Sci", category: "eng" },
      position: { x: posX2year2sem, y: posY },
      type: "gen_node",
      // targetPosition: "left",
      selected: false,
    },
    {
      id: "5",
      data: { sub_no: "140104", sub_name: "Citizenship", category: "citizen" },
      position: { x: posX1year1sem, y: posY+spaceY },
      type: "gen_node",
      // targetPosition: "left",
      selected: false,
    },
    {
      id: "6",
      data: { sub_no: "206162", sub_name: "Calculus1", category: "math" },
      position: { x: posX1year1sem, y: posY+spaceY*2 },
      type: "spec_node",
      // targetPosition: "right",
      selected: false,
    },
    {
      id: "7",
      data: { sub_no: "206162", sub_name: "Calculus2", category: "math" },
      position: { x: posX1year2sem, y: posY+spaceY },
      type: "spec_node",
      // targetPosition: "left",
      selected: false,
    },
    {
      id: "8",
      data: { sub_no: "206261", sub_name: "Calculus3", category: "math" },
      position: { x: posX2year1sem, y: posY+spaceY },
      type: "spec_node",
      // targetPosition: "left",
      selected: false,
    },
    {
      id: "9",
      data: { sub_no: "261306", sub_name: "Prob & Stat", category: "math" },
      position: { x: posX3year2sem, y: posY+spaceY },
      type: "spec_node",
      // targetPosition: "left",
      selected: false,
    },
    {
      id: "10",
      data: { sub_no: "261208", sub_name: "Numerical", category: "math" },
      position: { x: posX2year2sem, y: posY+spaceY },
      type: "spec_node",
      // targetPosition: "left",
      selected: false,
    },
    {
      id: "11",
      data: { sub_no: "261335", sub_name: "Network", category: "network" },
      position: { x: posX3year1sem, y: posY+spaceY },
      type: "spec_node",
      // targetPosition: "left",
      selected: false,
    },
    {
      id: "12",
      data: { sub_no: "261306", sub_name: "Major E.", category: "m_choose" },
      position: { x: posX4year1sem, y: posY+spaceY },
      type: "spec_node",
      // targetPosition: "left",
      selected: false,
    },
    {
      id: "13",
      data: { sub_no: "261405", sub_name: "Advance CPE", category: "com" },
      position: { x: posX4year2sem, y: posY+spaceY },
      type: "spec_node",
      // targetPosition: "left",
      selected: false,
    },
    // {
    //   id: "14",
    //   data: { sub_no: "207160", sub_name: "Physic 2", category: "physic" },
    //   position: { x: posX1year2sem, y: posY+spaceY*2 },
    //   type: "spec_node",
    //   targetPosition: "left",
    //   selected: false,
    // },
    {
      id: "15",
      data: { sub_no: "261207", sub_name: "CPE Lab", category: "cpe" },
      position: { x: posX2year1sem, y: posY+spaceY*2 },
      type: "spec_node",
      // targetPosition: "left",
      selected: false,
    },
    {
      id: "16",
      data: { sub_no: "261218", sub_name: "Algorithm", category: "com" },
      position: { x: posX2year2sem, y: posY+spaceY*2 },
      type: "spec_node",
      // targetPosition: "left",
      selected: false,
    },
    {
      id: "17",
      data: { sub_no: "261336", sub_name: "Network Lab", category: "network" },
      position: { x: posX3year1sem, y: posY+spaceY*2 },
      type: "spec_node",
      // targetPosition: "left",
      selected: false,
    },
    {
      id: "18",
      data: { sub_no: "261361", sub_name: "SE", category: "network" },
      position: { x: posX3year2sem, y: posY+spaceY*2 },
      type: "spec_node",
      // targetPosition: "left",
      selected: false,
    },
  ];