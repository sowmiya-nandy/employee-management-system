const calculateBonus = require("../utils/salaryCalculator");


test("should calculate 10% bonus", () => {

    const salary = 50000;

    const bonus = calculateBonus(salary);

    expect(bonus).toBe(5000);

});