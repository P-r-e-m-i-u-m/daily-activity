const { sanitizeString, validateEmail, validateUrl, sanitizeInput, validateRequired } = require("../sanitize");

jest.mock("../../services/logger");

describe("sanitizeString", () => {
  test("removes script tags", () => {
    expect(sanitizeString("<script>alert(1)</script>")).not.toContain("<script");
  });
  test("removes javascript: protocol", () => {
    expect(sanitizeString("javascript:alert(1)")).not.toContain("javascript:");
  });
  test("trims and limits length", () => {
    expect(sanitizeString("  hello  ")).toBe("hello");
    expect(sanitizeString("a".repeat(2000), 100)).toHaveLength(100);
  });
  test("returns empty string for non-string input", () => {
    expect(sanitizeString(null)).toBe("");
    expect(sanitizeString(123)).toBe("");
  });
});

describe("validateEmail", () => {
  test("validates correct email", () => {
    const result = validateEmail("Test@Example.com");
    expect(result.valid).toBe(true);
    expect(result.value).toBe("test@example.com");
  });
  test("rejects invalid email formats", () => {
    expect(validateEmail("notanemail").valid).toBe(false);
    expect(validateEmail("@nodomain.com").valid).toBe(false);
    expect(validateEmail("").valid).toBe(false);
  });
});

describe("sanitizeInput", () => {
  test("sanitizes valid input", () => {
    const result = sanitizeInput({ email: "test@test.com", name: "John Doe", age: "25" });
    expect(result.email).toBe("test@test.com");
    expect(result.name).toBe("John Doe");
    expect(result.age).toBe(25);
  });
  test("throws on invalid email", () => {
    expect(() => sanitizeInput({ email: "bad-email" })).toThrow("Validation failed");
  });
  test("throws on invalid age", () => {
    expect(() => sanitizeInput({ age: "999" })).toThrow("Validation failed");
  });
});

describe("validateRequired", () => {
  test("passes when all fields present", () => {
    expect(validateRequired({ name: "John", email: "j@j.com" }, ["name", "email"])).toBe(true);
  });
  test("throws when fields missing", () => {
    expect(() => validateRequired({ name: "John" }, ["name", "email"])).toThrow("Missing required fields: email");
  });
});
