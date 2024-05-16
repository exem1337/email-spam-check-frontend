<template>
  <div class="mail-page">
    <h3>Ваша почта</h3>
    <v-data-table
      :items="emails"
      hide-default-footer
      :headers="headers"
      color="orange"
    >
      <template v-slot:item.isSpam="{ value }">
        <v-chip :color="value ? 'red' : 'green'">
          {{ value ? 'СПАМ' : 'Не спам' }}
        </v-chip>
      </template>
      <template v-slot:item.sentTs="{ value }">
        {{ (new Date(value).toLocaleDateString('ru')) }}
      </template>
      <template v-slot:item.id="{ value }">
        <div class="flex">
          <v-btn
            density="compact"
            icon="mdi-chevron-right"
            @click="onGoToMail(value)"
          />
          <v-btn
            density="compact"
            icon="mdi-delete"
            color="red"
            @click="onDeleteEmail(value)"
          />
        </div>

      </template>
      <template #no-data>
        Пока нет писем
      </template>
    </v-data-table>

    <v-fab
      color="orange"
      icon="mdi-pencil"
      class="mr-8 mb-4"
      location="bottom end"
      size="64"
      absolute
      app
      appear
      @click="onOpenCreateEmailModal"
    />

    <CreateEmailModal :dialog="isModalOpen" @update:dialog="onModalClose" />
  </div>
</template>

<script lang="ts" setup>
import { IEmailItem } from '../models/email.model';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const emails = ref<Array<IEmailItem>>([]);
const isModalOpen = ref<boolean>(false);
const route = useRoute();

const headers = [
  { title: 'Тема письма', key: 'title' },
  { title: 'Автор', key: 'author' },
  { title: 'Дата получения', key: 'sentTs' },
  { title: 'Подозрение на спам', key: 'isSpam' },
  { title: '', key: 'id' }
]

function onGoToMail(id: number): void {
  console.log(id)
}

function onDeleteEmail(id: number): void {
  emails.value = emails.value?.filter((email: IEmailItem) => email.id !== id);
  localStorage.setItem('emails', JSON.stringify(emails.value));
}

function onOpenCreateEmailModal(): void {
  isModalOpen.value = true;
}

function loadData(): void {
  const localEmails = localStorage.getItem('emails');
  if (!localEmails) {
    emails.value = [];
    return;
  }

  emails.value = JSON.parse(localEmails);
}

function onModalClose(): void {
  isModalOpen.value = false;
  loadData();
}

watch(
  () => route.query,
  (newValue) => {
    loadData();

    if (newValue.tab === 'spam') {
      emails.value = emails.value?.filter((email) => email.isSpam);
      return;
    }

    if (newValue.tab === 'safe') {
      emails.value = emails.value?.filter((email) => !email.isSpam)
      return;
    }
  }
);

onBeforeMount(() => {
  loadData();
});
</script>

<style lang="scss" scoped>
h3 {
  width: 100%;
  padding-bottom: 12px;
  border-bottom: 1px solid lightgray;
  margin-bottom: 12px;
}

.flex {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
