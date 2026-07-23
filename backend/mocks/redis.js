module.exports = {
  get: jest.fn().mockResolvedValue(null),

  set: jest.fn().mockResolvedValue("OK"),

  del: jest.fn().mockResolvedValue(1),
};