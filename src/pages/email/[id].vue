<script lang="ts" setup>
import { IEmailItem } from '../../models/email.model';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';

const email = ref<IEmailItem>();
const route = useRoute();

onBeforeMount(() => {
  const emails: Array<IEmailItem> = JSON.parse(localStorage.getItem('emails'));
  email.value = emails?.find((emailItem) => emailItem.id === +route.params.id);
});
</script>

<template>
  <div class="email">
    <div class="email--title">
      <h1>{{ email?.title }}</h1>
      <div>
        <p><span>Автор:</span> {{ email?.author }}</p>
        <p><span>Дата получения:</span> {{ (new Date(email?.sentTs)?.toLocaleDateString('ru')) }}</p>
      </div>
    </div>
    <v-chip :color="email?.isSpam ? 'red' : 'green'">
      {{ email?.isSpam ? 'Подозрение на спам' : 'Не спам' }}
    </v-chip>

    <p class="email--text">
      {{ email?.text }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.email {
  &--title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    h1 {
      margin-bottom: 32px;
    }

    span {
      font-weight: 500;
    }
  }

  &--text {
    margin-top: 32px;
  }
}
</style>
