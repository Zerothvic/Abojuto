import { registerUser, loginUser, logoutUser } from "../services/authService.js";

const register = async (req, res) => {
  try {
    // Pass the request body to the service
    const user = await registerUser(req.body);

    res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: { user },
    });
  } catch (error) {
    // Handle specific errors like "User already exists"
    res.status(400).json({
      status: "fail",
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Check if user is still active
    if (!user.isActive) {
      return res.status(403).json({ message: "Account deactivated, Contact admin" });
    }

     // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const result = await loginUser(email, password);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};


const logout = (req, res) => {
  const result = logoutUser();
  res.status(200).json(result);
};

export { register, login, logout };