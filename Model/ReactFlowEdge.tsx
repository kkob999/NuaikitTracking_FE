import React from "react";
import { MarkerType, Position } from "reactflow";

const edgeType = "straight";
const smartEdgeType = "smart";

const marker = {
  type: MarkerType.ArrowClosed,
};

export const rfEdges = [
  //Math
  {
    id: "cal1-cal2",
    source: "cal1",
    target: "cal2",
    type: edgeType,
    markerEnd: marker,
  },
  {
    id: "cal2-cal3",
    source: "cal2",
    target: "cal3",
    type: edgeType,
    markerEnd: marker,
  },
  {
    id: "cal3-numer",
    source: "cal3",
    target: "numer",
    type: edgeType,
    markerEnd: marker,
  },
  {
    id: "cal3-prob",
    source: "cal3",
    target: "prob",
    type: smartEdgeType,
    markerEnd: marker,
  },
  //cpe
  {
    id: "cpe1-cpe2",
    source: "cpe1",
    target: "cpe2",
    type: edgeType,
    markerEnd: marker,
  },
  //pj
  {
    id: "pjSurvey-pj",
    source: "pjSurvey",
    target: "pj",
    type: edgeType,
    markerEnd: marker,
  },
  //com
  {
    id: "compro-datastruc",
    source: "compro",
    target: "datastruc",
    type: edgeType,
    markerEnd: marker,
  },
  {
    id: "compro-oop",
    source: "compro",
    target: "oop",
    type: smartEdgeType,
    markerEnd: marker,
  },
  {
    id: "oop-se",
    source: "oop",
    target: "se",
    type: edgeType,
    markerEnd: marker,
  },
  {
    id: "se-adv",
    source: "se",
    target: "adv",
    type: edgeType,
    markerEnd: marker,
  },
  //
  {
    id: "algro-datastruc",
    source: "datastruc",
    target: "algro",
    type: smartEdgeType,
    markerEnd: marker,
  },
  {
    id: "discrete-algro",
    source: "discrete",
    target: "algro",
    type: edgeType,
    markerEnd: marker,
  },
  {
    id: "algro-db",
    source: "algro",
    target: "db",
    type: edgeType,
    markerEnd: marker,
  },
  //db
  {
    id: "dbLab-db",
    source: "dbLab",
    target: "db",
    sourceHandle: "top",
    targetHandle: "bottom",
    type: edgeType,
  },
  //phylab
  {
    id: "phylab1-phylab2",
    source: "phylab1",
    target: "phylab2",
    sourceHandle: "right",
    type: edgeType,
    markerEnd: marker,
  },
  //phy
  {
    id: "phy1-phy2",
    source: "phy1",
    target: "phy2",
    type: edgeType,
    markerEnd: marker,
  },
  {
    id: "phy1-phylab1",
    source: "phylab1",
    target: "phy1",
    sourceHandle: "bottom",
    targetHandle: "top",
    type: edgeType,
  },
  {
    id: "phy2-logic",
    source: "phy2",
    target: "logic",
    type: edgeType,
    markerEnd: marker,
  },
  {
    id: "phy2-phylab2",
    source: "phylab2",
    target: "phy2",
    sourceHandle: "bottom",
    targetHandle: "top",
    type: edgeType,
  },
  {
    id: "logic-micro",
    source: "logic",
    target: "micro",
    type: edgeType,
    markerEnd: marker,
  },
  {
    id: "logic-logiclab",
    source: "logiclab",
    target: "logic",
    sourceHandle: "bottom",
    targetHandle: "top",
    type: edgeType,
  },
  {
    id: "micro-comarch",
    source: "micro",
    target: "comarch",
    type: edgeType,
    markerEnd: marker,
  },
  {
    id: "micro-embedlab",
    source: "emlab",
    target: "micro",
    sourceHandle: "bottom",
    targetHandle: "top",
    type: edgeType,
  },
  {
    id: "comarch-os",
    source: "comarch",
    target: "os",
    type: edgeType,
    markerEnd: marker,
  },
  //phy2 to datacom
  {
    id: "phy2-datacom",
    source: "phy2",
    target: "datacom",
    type: smartEdgeType,
    markerEnd: marker,
  },
  {
    id: "datacom-net",
    source: "datacom",
    target: "net",
    type: edgeType,
    markerEnd: marker,
  },
  //network
  {
    id: "net-netlab",
    source: "netlab",
    target: "net",
    sourceHandle: "top",
    targetHandle: "bottom",
    type: edgeType,
  },
  //Drawing to circuit
  {
    id: "drawing-circuit",
    source: "drawing",
    target: "circuit",
    type: edgeType,
    markerEnd: marker,
  },
  //circuit to micro
  {
    id: "circuit-micro",
    source: "circuit",
    target: "micro",
    type: smartEdgeType,
    markerEnd: marker,
  },
  //Eng
  {
    id: "eng1-eng2",
    source: "eng1",
    target: "eng2",
    type: edgeType,
    markerEnd: marker,
  },
  {
    id: "eng2-eng3",
    source: "eng2",
    target: "eng3",
    type: edgeType,
    markerEnd: marker,
  },
  {
    id: "eng2-eng4",
    source: "eng2",
    target: "eng4",
    type: smartEdgeType,
    markerEnd: marker,
  },
];
