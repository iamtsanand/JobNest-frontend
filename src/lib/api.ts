const API_BASE_URL = "http://localhost:5000/api";

async function handleRequest(
  path: string,
  options: RequestInit = {},
  requireAuth: boolean = false
) {
  const token = localStorage.getItem("authToken");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
    ...(requireAuth && token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Something went wrong");

  return data;
}


export const handleResumeUpload = async (file: File): Promise<string> => {
  const token = localStorage.getItem("authToken");
  if (!token) throw new Error("Not authenticated");

  const formData = new FormData();
  formData.append("resume", file); // 'resume' must match multer field name

  const res = await fetch(`${API_BASE_URL}/users/v1/profile/update-resume`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // Do NOT set Content-Type manually
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || "Resume upload failed");

  return data.resumePath;
};

export const api = {
  // Public (no auth token)
  register: (user: { name: string; email: string; password: string; role: string }) =>
    handleRequest("/auth/v1/register", {
      method: "POST",
      body: JSON.stringify(user),
    }),

  login: (user: { email: string; password: string }) =>
    handleRequest("/auth/v1/login", {
      method: "POST",
      body: JSON.stringify(user),
    }),

  // Protected (requires token)
  getProfile: () =>
    handleRequest("/users/v1/profile", { method: "GET" }, true),

  updateProfile: (data: object) =>
    handleRequest("/users/v1/profile/update", {
      method: "PUT",
      body: JSON.stringify(data),
    }, true),

  createJobPosting: (data: object) =>
    handleRequest("/users/v1/create-job-posting", {
      method: "POST",
      body: JSON.stringify(data),
    }, true),

    getAllJobs: async () => {
      const res = await handleRequest("/jobs/v1/jobs", { method: "GET" }, true);
      // console.log("Raw response in getAllJobs:", res);
      
      // Check if res is an array or a Response object
      if (res.json) {
        // It's a Response, so parse JSON
        const data = await res.json();
        console.log("Parsed JSON data:", data);
        return data;
      }
    
      // Otherwise, return res as is (assuming it's already JSON parsed)
      return res;
    },
      withdrawApplication: (data: object) =>
    handleRequest("/users/v1/withdrawApplication", {
      method: "POST",
      body: JSON.stringify(data),
    }, true),
    
  searchJobs: (query: string) =>
    handleRequest(`/search?q=${encodeURIComponent(query)}`, { method: "GET" }, true),

};
