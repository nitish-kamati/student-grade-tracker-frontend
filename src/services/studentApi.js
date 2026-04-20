const API_BASE = import.meta.env.VITE_API_URL + "/students";

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || "Request failed.");
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function fetchStudents() {
  return request(API_BASE);
}

export function fetchStudentStats() {
  return request(`${API_BASE}/stats`);
}

export function createStudent(payload) {
  return request(API_BASE, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function deleteStudent(studentId) {
  return request(`${API_BASE}/${studentId}`, {
    method: "DELETE",
  });
}