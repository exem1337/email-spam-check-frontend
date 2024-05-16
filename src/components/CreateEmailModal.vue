<template>
  <div class="pa-4 text-center">
    <v-dialog
      :model-value="dialog"
      max-width="600"
      @after-leave="onClose"
    >
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-regular"
          prepend-icon="mdi-email"
          text="Написать письмо"
          variant="tonal"
          v-bind="activatorProps"
        />
      </template>

      <v-card
        prepend-icon="mdi-email"
        title="Написать письмо"
      >
        <v-card-text>
          <v-text-field
            v-model="emailForm.title"
            label="Заголовок"
            required
          />
          <v-textarea
            v-model="emailForm.text"
            label="Текст письма"
            required
          />
          <v-text-field
            v-model="emailForm.author"
            label="Автор"
            required
          />
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />

          <v-btn
            text="Закрыть"
            variant="plain"
            @click="$emit('update:dialog', false)"
          />

          <v-btn
            color="primary"
            text="Отправить"
            :disabled="isConfirmDisabled"
            variant="tonal"
            @click="onConfirm"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import { IEmailItem } from '../models/email.model';
import { computed, reactive } from 'vue';

defineProps<{
  dialog: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:dialog', value: boolean);
}>();

const isConfirmDisabled = computed<boolean>(() => !emailForm.text || !emailForm.author || !emailForm.title);

const emailForm = reactive<Partial<IEmailItem>>({
  id: Math.random(),
  title: '',
  isSpam: Math.random() > 0.5,
  text: '',
  author: '',
  sentTs: Date.now(),
});

function clearForm(): void {
  emailForm.id = Math.random();
  emailForm.isSpam = Math.random() > 0.5;
  emailForm.title = null;
  emailForm.author = null;
  emailForm.text = null;
}

function onConfirm(): void {
  const emails = localStorage.getItem('emails');
  if (emails) {
    const parsedEmails: Array<IEmailItem> = JSON.parse(emails);
    parsedEmails.push(emailForm);
    setLocalEmails(parsedEmails);
    return;
  }

  const parsedEmails: Array<IEmailItem> = [emailForm];
  setLocalEmails(parsedEmails);
}

function setLocalEmails(emails: Array<IEmailItem>): void {
  localStorage.setItem('emails', JSON.stringify(emails));
  onClose();
}

function onClose(): void {
  clearForm();
  emits('update:dialog', false);
}
</script>
