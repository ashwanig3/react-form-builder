export const fetchFormFields = (): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 2000 + 1000; // Simulate 1-3 sec delay
      setTimeout(() => {
        const storedFields = localStorage.getItem("formFields");
        if (Math.random() > 0.1) {
          resolve(storedFields ? JSON.parse(storedFields) : []);
        } else {
          reject(new Error("Failed to fetch form data"));
        }
      }, delay);
    });
  };
  
  export const submitForm = (data: Record<string, string | number>): Promise<string> => {
    return new Promise((resolve, reject) => {
      const delay = Math.random() * 2000 + 1000;
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve("Form submitted successfully!");
        } else {
          reject(new Error("Submission failed. Try again!"));
        }
      }, delay);
    });
  };
  