import { pizzaCost } from "@/common/helper";

describe("helper", () => {
  it("Правильно вычисляется стоимость пиццы", () => {
    const pizza = {
      ingredients: [
        { price: 100, count: 1 },
        { price: 50, count: 2 },
      ],
      size: { multiplier: 2 },
      dough: { price: 10 },
      sauce: { price: 1 },
    };
    const cost = pizzaCost(pizza);
    expect(cost).toEqual(422);
  });
});
