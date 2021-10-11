<template>
  <div class="layout__content">
    <div class="layout__title">
      <h1 class="title title--big">Мои данные</h1>
    </div>

    <div class="user">
      <picture>
        <source
          type="image/webp"
          :srcset="`${user.avatar}@2x.webp 1x,${user.avatar}@4x.webp 2x`"
        />
        <img
          :src="`${user.avatar}@2x.jpg`"
          :srcset="`${user.avatar}@4x.jpg`"
          :alt="user.name"
          width="72"
          height="72"
        />
      </picture>
      <div class="user__name">
        <span>{{ user.name }}</span>
      </div>
      <p class="user__phone">
        Контактный телефон: <span>{{ user.phone }}</span>
      </p>
    </div>

    <div class="layout__address">
      <div class="sheet address-form">
        <div class="address-form__header">
          <b>Адрес №1. Тест</b>
          <div class="address-form__edit">
            <button type="button" class="icon">
              <span class="visually-hidden">Изменить адрес</span>
            </button>
          </div>
        </div>
        <p>Невский пр., д. 22, оф. 46</p>
        <small>Позвоните, пожалуйста, от проходной</small>
      </div>
    </div>

    <div class="layout__address">
      <form
        action="/"
        method="post"
        class="address-form address-form--opened sheet"
      >
        <div class="address-form__header">
          <b>Адрес №1</b>
        </div>

        <div class="address-form__wrapper">
          <div class="address-form__input">
            <label class="input">
              <span>Название адреса*</span>
              <input
                type="text"
                name="addr-name"
                placeholder="Введите название адреса"
                required
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--normal">
            <label class="input">
              <span>Улица*</span>
              <input
                type="text"
                name="addr-street"
                placeholder="Введите название улицы"
                required
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Дом*</span>
              <input
                type="text"
                name="addr-house"
                placeholder="Введите номер дома"
                required
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Квартира</span>
              <input
                type="text"
                name="addr-apartment"
                placeholder="Введите № квартиры"
              />
            </label>
          </div>
          <div class="address-form__input">
            <label class="input">
              <span>Комментарий</span>
              <input
                type="text"
                name="addr-comment"
                placeholder="Введите комментарий"
              />
            </label>
          </div>
        </div>

        <div class="address-form__buttons">
          <button type="button" class="button button--transparent">
            Удалить
          </button>
          <button type="submit" class="button">Сохранить</button>
        </div>
      </form>
    </div>

    <div class="layout__button">
      <button type="button" class="button button--border">
        Добавить новый адрес
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
