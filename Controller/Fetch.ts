import axios from "axios";

export function fetchGEElective(groupName: string) {
  const urlFree =
    "http://localhost:8080/ge/elective?groupName=" +
    groupName +
    "&year=2563&curriculumProgram=CPE&isCOOP=false";
  return new Promise(function (resolve, reject) {
    axios
      .get(urlFree, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          mode: "no-cors",
        },
      })
      .then((response) => {
        console.log("fetch free elective data");
        resolve(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function fetchMajorElective() {
  const urlMajorE =
    "http://localhost:8080/major/elective?groupName=MajorElective&year=2563&curriculumProgram=CPE&isCOOP=false"

  return new Promise(function (resolve, reject) {
    axios
      .get(urlMajorE, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          mode: "no-cors",
        },
      })
      .then((response) => {
        console.log("fetch major elective data");
        resolve(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function fetchCourseDescription(courseId : string) {
  const url =
    "http://localhost:8080/courseDetail?courseId="+courseId

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
        console.log("fetch major elective data");
        resolve(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}

export function fetchFreeElective(groupName: string) {
  const urlFree =
    "http://localhost:8080/ge/elective?groupName=" +
    groupName +
    "&year=2563&curriculumProgram=CPE&isCOOP=false";
  return new Promise(function (resolve, reject) {
    axios
      .get(urlFree, {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          mode: "no-cors",
        },
      })
      .then((response) => {
        console.log("fetch free elective data");
        resolve(response.data);
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
}



export function fetchNuikitData(url: string) {
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
        console.log("fetch nuikit data");
        // console.log(response.data);
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

export async function FetchCourse(courseId: string) {
  let data: any = await fetchCourseDescription(courseId);
  return data;
}

export async function FetchIsFree(courseId: string) {
  var url =
    "http://localhost:8080/checkGroup?year=2563&curriculumProgram=CPE&isCOOP=false&courseNo="+courseId

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
        console.log(error);
        reject(error);
      });
  });
}