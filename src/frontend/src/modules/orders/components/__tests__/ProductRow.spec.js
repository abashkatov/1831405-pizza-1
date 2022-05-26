import { shallowMount } from "@vue/test-utils";
import ProductRow from "@/modules/orders/components/ProductRow";
import { generateMockStore } from "@/store/mock";

describe("ProductRow", () => {
  let store;
  let wrapper;
  let propsData;
  const defaultProduct = {
    name: "Название пиццы",
    image: "image",
    count: 2,
    price: 100,
  };

  const loadProduct = () => {
    return {
      product: {
        ...defaultProduct,
      },
    };
  };

  const createComponent = (options) => {
    wrapper = shallowMount(ProductRow, options);
  };

  beforeEach(() => {
    propsData = loadProduct();
    store = generateMockStore({});
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it("У картинки правильные параметры", () => {
    createComponent({ store, propsData });
    const image = wrapper.find('[data-test="productImage"');
    expect(image.attributes("alt")).toEqual(defaultProduct.name);
    expect(image.attributes("src")).toEqual(defaultProduct.image);
  });

  it("Выводится правильное название продукта", () => {
    createComponent({ store, propsData });
    expect(wrapper.find('[data-test="productName"').text()).toEqual(
      defaultProduct.name
    );
  });

  const productPriceDataProvider = [
    { count: 1, price: 100, expectedString: "100" },
    { count: 2, price: 200, expectedString: "2x200" },
  ];
  it.each(productPriceDataProvider)(
    "Отображается правильная стоимость продукта",
    ({ count, price, expectedString }) => {
      propsData.product.count = count;
      propsData.product.price = price;
      createComponent({ store, propsData });
      expect(wrapper.find('[data-test="productPrice"').text()).toEqual(
        `${expectedString} ₽`
      );
    }
  );
});
