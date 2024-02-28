const y1t1 = 0;
const y1t2 = 150;
const y2t1 = 300;
const y2t2 = 450;
const y3t1 = 600;
const y3t2 = 750;
const y4t1 = 900;
const y4t2 = 1050;

export const rfNodes = [
    //Math
    {
      id: "cal1",
      data: { sub_no: "206162", sub_name: "Calculus1" },
      position: { x: y1t1, y: 50 },
      type: "gen_node",
    },
    {
      id: "cal2",
      data: { sub_no: "206162", sub_name: "Calculus2" },
      position: { x: y1t2, y: 50 },
      type: "gen_node",
    },
    {
      id: "cal3",
      data: { sub_no: "206261", sub_name: "Calculus3" },
      position: { x: y2t1, y: 50 },
      type: "gen_node",
    },
    {
      id: "numer",
      data: { sub_no: "261208", sub_name: "Numerical" },
      position: { x: y2t2, y: 50 },
      type: "gen_node",
    },
    {
      id: "prob",
      data: { sub_no: "261306", sub_name: "Prob & Stat" },
      position: { x: y3t2, y: 120 },
      type: "gen_node",
    },
    //CPE
    {
      id: "cpe1",
      data: { sub_no: "261103", sub_name: "Basic CPE" },
      position: { x: y1t1, y: 120 },
      type: "gen_node",
    },
    {
      id: "cpe2",
      data: { sub_no: "261207", sub_name: "CPE Lab" },
      position: { x: y2t1, y: 120 },
      type: "gen_node",
    },
    //191
    {
      id: "act1",
      data: { sub_no: "259191", sub_name: "Activities 1" },
      position: { x: y1t1, y: 190 },
      type: "gen_node",
    },
    //192
    {
        id: "act2",
        data: { sub_no: "259192", sub_name: "Activities 2" },
        position: { x: y4t2, y: 120 },
        type: "gen_node",
      },
    //Workshop
    {
      id: "9",
      data: { sub_no: "259106", sub_name: "Workshop" },
      position: { x: y1t1, y: 260 },
      type: "gen_node",
    },
    //Com
    {
      id: "compro",
      data: { sub_no: "261102", sub_name: "Com prog" },
      position: { x: y1t2, y: 260 },
      type: "gen_node",
    },
    {
      id: "datastruc",
      data: { sub_no: "261217", sub_name: "Data Struc" },
      position: { x: y2t1, y: 260 },
      type: "gen_node",
    },
    {
      id: "oop",
      data: { sub_no: "261200", sub_name: "OOP" },
      position: { x: y2t2, y: 330 },
      type: "gen_node",
    },
    {
      id: "se",
      data: { sub_no: "261361", sub_name: "SE" },
      position: { x: y3t2, y: 330 },
      type: "gen_node",
    },
    {
      id: "adv",
      data: { sub_no: "261405", sub_name: "Adv Com" },
      position: { x: y4t2, y: 330 },
      type: "gen_node",
    },
    //Algro
    {
      id: "discrete",
      data: { sub_no: "261261", sub_name: "Discrete Math" },
      position: { x: y2t1, y: 190 },
      type: "gen_node",
    },
    {
      id: "algro",
      data: { sub_no: "261218", sub_name: "Algrorithm" },
      position: { x: y2t2, y: 190 },
      type: "gen_node",
    },
    //db
    {
      id: "db",
      data: { sub_no: "261342", sub_name: "Database" },
      position: { x: y3t1, y: 190 },
      type: "haveLab_node",
    },
    {
      id: "dbLab",
      data: { sub_no: "261343", sub_name: "Database Lab" },
      position: { x: y3t1, y: 260 },
      type: "lab_node",
    },
    //Project
    {
      id: "pjSurvey",
      data: { sub_no: "261491", sub_name: "ProjectSur" },
      position: { x: y4t1, y: 190 },
      type: "gen_node",
    },
    {
      id: "pj",
      data: { sub_no: "261492", sub_name: "Project" },
      position: { x: y4t2, y: 190 },
      type: "gen_node",
    },
    //Datacom
    {
      id: "datacom",
      data: { sub_no: "261217", sub_name: "Data Com" },
      position: { x: y2t2, y: 400 },
      type: "gen_node",
    },
    //Network
    {
      id: "net",
      data: { sub_no: "261335", sub_name: "Network" },
      position: { x: y3t1, y: 400 },
      type: "haveLab_node",
    },
    //PhyLab
    {
      id: "phylab1",
      data: { sub_no: "207115", sub_name: "Phy lab 1" },
      position: { x: y1t1, y: 470 },
      type: "lab_node",
    },
    {
      id: "phylab2",
      data: { sub_no: "207116", sub_name: "Phy lab 2" },
      position: { x: y1t2, y: 470 },
      type: "lab_node",
    },
    //Logic lab
    {
      id: "logiclab",
      data: { sub_no: "261212", sub_name: "Logic lab" },
      position: { x: y2t1, y: 470 },
      type: "lab_node",
    },
    //Emblab
    {
      id: "emlab",
      data: { sub_no: "261213", sub_name: "Embed lab" },
      position: { x: y2t2, y: 470 },
      type: "lab_node",
    },
  
    //์Netlab
    {
      id: "netlab",
      data: { sub_no: "261336", sub_name: "Network Lab" },
      position: { x: y3t1, y: 470 },
      type: "lab_node",
    },
  
    //Phy
    {
      id: "phy1",
      data: { sub_no: "207105", sub_name: "Physic 1" },
      position: { x: y1t1, y: 540 },
      type: "haveLab_node",
    },
    {
      id: "phy2",
      data: { sub_no: "207106", sub_name: "Physic 2" },
      position: { x: y1t2, y: 540 },
      type: "haveLab_node",
    },
    {
      id: "logic",
      data: { sub_no: "261210", sub_name: "Logic" },
      position: { x: y2t1, y: 540 },
      type: "haveLab_node",
    },
    {
      id: "micro",
      data: { sub_no: "261214", sub_name: "Micro" },
      position: { x: y2t2, y: 540 },
      type: "haveLab_node",
    },
    {
      id: "comarch",
      data: { sub_no: "261304", sub_name: "ComArch" },
      position: { x: y3t1, y: 540 },
      type: "gen_node",
    },
    {
      id: "os",
      data: { sub_no: "261305", sub_name: "OS" },
      position: { x: y3t2, y: 540 },
      type: "gen_node",
    },
    //Drawing
    {
      id: "drawing",
      data: { sub_no: "259104", sub_name: "Drawing" },
      position: { x: y1t1, y: 610 },
      type: "gen_node",
    },
    //Circuit
    {
      id: "circuit",
      data: { sub_no: "252281", sub_name: "Circuits" },
      position: { x: y1t2, y: 610 },
      type: "gen_node",
    },
    //MajorE.
    {
      id: "mj1",
      data: { sub_no: "Major E.", sub_name: "choose 1" },
      position: { x: y3t1, y: 610 },
      type: "gen_node",
    },
    {
      id: "mj2",
      data: { sub_no: "Major E.", sub_name: "choose 1" },
      position: { x: y3t2, y: 610 },
      type: "gen_node",
    },
    {
      id: "mj3",
      data: { sub_no: "Major E.", sub_name: "choose 1" },
      position: { x: y4t1, y: 610 },
      type: "gen_node",
    },
    {
      id: "mj4",
      data: { sub_no: "Major E.", sub_name: "choose 1" },
      position: { x: y4t2, y: 610 },
      type: "gen_node",
    },
    //Eng
    {
      id: "eng1",
      data: { sub_no: "001011", sub_name: "English 1" },
      position: { x: y1t1, y: 680 },
      type: "gen_node",
    },
    {
      id: "eng2",
      data: { sub_no: "001102", sub_name: "English 2" },
      position: { x: y1t2, y: 680 },
      type: "gen_node",
    },
    {
      id: "eng3",
      data: { sub_no: "001201", sub_name: "English r/w" },
      position: { x: y2t1, y: 680 },
      type: "gen_node",
    },
    {
      id: "eng4",
      data: { sub_no: "001225", sub_name: "English in Sci" },
      position: { x: y2t2, y: 750 },
      type: "gen_node",
    },
    //Citizen
    {
      id: "ciz",
      data: { sub_no: "140104", sub_name: "Citizenship" },
      position: { x: y1t1, y: 750 },
      type: "gen_node",
    },
    //GE
    {
      id: "ge1",
      data: { sub_no: "GE", sub_name: "choose 1" },
      position: { x: y1t2, y: 750 },
      type: "gen_node",
    },
    {
      id: "ge2",
      data: { sub_no: "GE", sub_name: "choose 1" },
      position: { x: y1t2, y: 820 },
      type: "gen_node",
    },
    {
      id: "ge3",
      data: { sub_no: "GE", sub_name: "choose 1" },
      position: { x: y3t1, y: 750 },
      type: "gen_node",
    },
    {
      id: "ge4",
      data: { sub_no: "GE", sub_name: "choose 1" },
      position: { x: y3t2, y: 750 },
      type: "gen_node",
    },
    {
      id: "ge5",
      data: { sub_no: "GE", sub_name: "choose 1" },
      position: { x: y3t2, y: 680 },
      type: "gen_node",
    },
    //Free
    {
      id: "free1",
      data: { sub_no: "Free", sub_name: "Choose" },
      position: { x: y4t1, y: 680 },
      type: "gen_node",
    },
    {
      id: "free2",
      data: { sub_no: "Free", sub_name: "Choose" },
      position: { x: y4t2, y: 680 },
      type: "gen_node",
    },
  ];