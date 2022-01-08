import { shallowMount } from "@vue/test-utils";
import AppDrag from "@/common/components/AppDrag";
import { DATA_TRANSFER_PAYLOAD, MOVE } from "@/common/constants";

describe("AppDrag", () => {
  const slots = { default: "content" };
  const propsData = { transferData: {}, isDraggable: true };

  let wrapper;
  const createComponent = (options) => {
    wrapper = shallowMount(AppDrag, options);
  };
  afterEach(() => {
    wrapper.destroy();
  });
  beforeEach(() => {
    propsData.transferData.setData = jest.fn();
  });

  it("Слот отображает верные данные", () => {
    createComponent({ slots, propsData });
    expect(wrapper.html()).toContain(slots.default);
  });

  const isDraggableDataSet = [[true], [false]];
  it.each(isDraggableDataSet)("isDraggable верно передаётся", (isDraggable) => {
    createComponent({
      slots,
      propsData: {
        ...propsData,
        isDraggable,
      },
    });
    const draggable = wrapper.find('[data-test="drag"]');
    expect(draggable.exists()).toBeTruthy();
    expect(draggable.attributes("draggable")).toBe(isDraggable.toString());
  });

  it("Событие dragstart правильно модифицирует объект transferData", async () => {
    createComponent({ slots, propsData });
    const draggable = wrapper.find('[data-test="drag"]');
    await draggable.trigger("dragstart", {
      dataTransfer: propsData.transferData,
    });
    expect(propsData.transferData.setData).toHaveBeenCalledWith(
      DATA_TRANSFER_PAYLOAD,
      JSON.stringify({
        ...propsData.transferData,
        effectAllowed: MOVE,
        dropEffect: MOVE,
      })
    );
  });
});
