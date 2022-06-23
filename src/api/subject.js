import { basePath, apiVersion } from "./config";

export function createSubject(data) {
  const url = `${basePath}/${apiVersion}/subject`;
  /*  http://localhost:3977/api/v1/signup  */
  console.log(url);
  const params = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  /* Cuando se crea el usuario se devuelve un objeto user_creado */
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then(result => {
      return result.message
    })
    .catch((err) => {
      return {
        subject_creado: false,
        message: err.message,
      };
    });
}

export function getSubjects() {
  const url = `${basePath}/${apiVersion}/subjects`;
  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      return err.message;
    });
}

export function updateSubject(user, subjectId) {
  const url = `${basePath}/${apiVersion}/subject/${subjectId}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function deleteSubject(subjectId) {
  const url = `${basePath}/${apiVersion}/subject/${subjectId}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result.message;
    })
    .catch((err) => {
      return err.message;
    });
}
